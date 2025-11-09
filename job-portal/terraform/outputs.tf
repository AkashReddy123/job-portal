output "connect_ssh" {
  value = "ssh -i ~/.ssh/canary-key.pem ubuntu@${aws_instance.ec2.public_ip}"
}
