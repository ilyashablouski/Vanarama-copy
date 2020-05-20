provider "aws" {
  region = "eu-west-2"
}

terraform {
  backend "s3" {}
}

data "terraform_remote_state" "grid" {
  backend = "s3"

  config = {
    bucket = "${var.state_bucket}"
    key    = "${var.env}/grid.tfstate"
    region = "eu-west-2"
  }
}

module "cluster-service" {
  source = "git@github.com:Autorama/autorama-infra-modules.git//ecs_service"

  env   = "${var.env}"
  stack = "${var.stack}"
  app   = "${var.app}"

  # service_name         = "${var.env}-${var.stack}-${var.app}"
  task_definition = "${var.task_definition}"

  cluster_arn          = "${data.terraform_remote_state.grid.outputs.cluster_arn}"
  env_subdomain_name   = "${data.terraform_remote_state.grid.outputs.env_subdomain_name}"
  vpc_id               = "${data.terraform_remote_state.grid.outputs.vpc_id}"
  ecs_service_role_arn = "${data.terraform_remote_state.grid.outputs.ecs_service_role_arn}"

  container_port  = "8080"
  target_grp_port = "8080"
  alb_listner_arn = "${data.terraform_remote_state.grid.outputs.aws_alb_listener_arn}"
  container_name  = "${var.app}"

  health_check_path = "/status"
}

resource "random_id" "secret_key_base" {
  byte_length = 16
}

resource "aws_ssm_parameter" "secret-key-base" {
  name       = "/${var.env}/${var.stack}/${var.app}/secret-key-base"
  type       = "SecureString"
  value      = "${random_id.secret_key_base.hex}"

  tags = {
    env        = "${var.env}"
    stack      = "${var.stack}"
    app        = "${var.app}"
    created-by = "terraform"
  }
}
