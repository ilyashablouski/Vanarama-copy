provider "aws" {
  region = "eu-west-2"
  allowed_account_ids = ["${var.aws_account_id}"]
}

provider "aws" {
  alias = "master_role"
  region = "${var.region}"
  assume_role {
    role_arn     = "${var.aws_master_role}"
  }
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

module "alb_target" {
  source = "git@github.com:Autorama/autorama-infra-modules.git//alb_target"

  env   = "${var.env}"
  stack = "${var.stack}"
  app   = "${var.app}"

  env_subdomain_name = "${data.terraform_remote_state.grid.outputs.env_subdomain_name}"
  vpc_id             = "${data.terraform_remote_state.grid.outputs.vpc_id}"

  target_grp_port = "8080"

  health_check_path = "/status"

  alb_listener_host_override = "${var.alb_listener_host_override}"
  
  alb_listener_arn = "${data.terraform_remote_state.grid.outputs.aws_alb_listener_arn}"
  alb_dns_name     = "${data.terraform_remote_state.grid.outputs.alb_dns_name}"
  route53_zone_ids = [data.terraform_remote_state.grid.outputs.route53_internal_zone_id, data.terraform_remote_state.grid.outputs.route53_zone_id]
}

module "ecs_service" {
  source = "git@github.com:Autorama/autorama-infra-modules.git//ecs_service-v2"

  _count = var.include_ecs_service ? 1 : 0

  env   = "${var.env}"
  stack = "${var.stack}"
  app   = "${var.app}"

  cluster_arn          = "${data.terraform_remote_state.grid.outputs.cluster_arn}"
  ecs_service_role_arn = "${data.terraform_remote_state.grid.outputs.ecs_service_role_arn}"
  ecs_target_group_arn = "${module.alb_target.target_group_arn}"

  task_definition      = "${var.task_definition}"

  container_port  = "8080"
  container_name  = "${var.app}"
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


resource "aws_ssm_parameter" "redis-cache-host" {
  name       = "/${var.env}/${var.stack}/${var.app}/redis-host"
  type       = "SecureString"
  value      = "${data.terraform_remote_state.grid.outputs.redis_endpoint}"

  tags = {
    env        = "${var.env}"
    stack      = "${var.stack}"
    app        = "${var.app}"
    created-by = "terraform"
  }
}

module "aws_cloudwatch_ecs_alarms" {
  source = "git@github.com:Autorama/autorama-infra-modules.git//ecs_service_alarms"

  env   = "${var.env}"
  stack = "${var.stack}"
  app   = "${var.app}"
  cluster = "${data.terraform_remote_state.grid.outputs.cluster_arn}"
}

module "aws_log_metric_alarms" {
  source = "git@github.com:Autorama/autorama-infra-modules.git//log_metric_alarms"

  env   = "${var.env}"
  stack = "${var.stack}"
  app   = "${var.app}"

  log_metric_alarms = "${var.log_metric_alarms}"
}
