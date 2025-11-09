variable "region" {
  default = "us-east-1"
}

variable "az" {
  default = "us-east-1a"
}

variable "instance_type" {
  default = "t3.small"
}

variable "key_name" {
  description = "Existing AWS key pair name"
  default     = "canary-key"
}

variable "pem_key_path" {
  description = "Local .pem file path"
  default     = "C:/Users/Y BALA AKASH REDDY/Downloads/canary-key.pem"
}

variable "my_ip_cidr" {
  description = "Your IP for SSH/Prometheus/Grafana"
  default     = "0.0.0.0/0"
}
