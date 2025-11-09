#!/usr/bin/env bash
set -e
EC2=${1:?Usage: ./deploy.sh <EC2_PUBLIC_IP>}
ssh -o StrictHostKeyChecking=no ubuntu@$EC2 "mkdir -p /opt/canary"
scp -o StrictHostKeyChecking=no docker-compose.yml -r nginx monitoring ubuntu@$EC2:/opt/canary/
ssh -o StrictHostKeyChecking=no ubuntu@$EC2 "cd /opt/canary && docker compose up -d --build"
