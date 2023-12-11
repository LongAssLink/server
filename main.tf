terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.67"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "eu-central-1"
}

resource "aws_ecr_repository" "lal_repo" {
  name = "lal_ecr_repo"
}

resource "aws_instance" "lal_app_server" {
  ami           = "ami-042e6fdb154c830c5"
  instance_type = "t2.micro"

  tags = {
    Name = "LongAssLinkBEI"
  }
}