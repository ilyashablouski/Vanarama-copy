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
}

variable "state_bucket" {
  type        = "string"
  description = "The s3 bucket ref for state"
}