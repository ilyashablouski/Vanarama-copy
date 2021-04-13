variable "env" {
  type        = "string"
  description = "The environment (e.g. dev/test...)"
}

variable "stack" {
  type        = "string"
  description = "The stack (e.g. grid/core...)"
}

variable "app" {
  type        = "string"
  description = "The stack (e.g. rds/sample-rqor...)"
}

variable "task_definition" {
  type        = "string"
  description = "The urn of the task definitions - only applies on create (ecs-service module)"
  default     = ""
}

variable "state_bucket" {
  type        = "string"
  description = "The s3 bucket ref for state"
}

variable "region" {
  type    = "string"
  default = "eu-west-2"
}

variable "aws_master_role" {
  type = "string"
  description = "Role to be assumed for actions on master account resources"
  default = null
}

variable "aws_account_id" {
  type = "string"
}

variable "include_ecs_service" {
  type = bool
}

variable "alb_listener_host_override" {
  type = string
  description = "Optional extra host name to associate with the ALB listener for your target."
  default = null
}

variable "log_metric_alarms" {
  description = "list of map of log metric alarm configuration."
  type        = "list"
  default     = [
    {
      "name": "504-alert",
      "pattern": "\"504: Gateway Time-out\"",
      "threshold" : "1",
      "type" : "danger",
      "statistic" : "Average"
    }
  ]
} 
