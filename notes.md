```
set ACCOUNT_ID (aws sts get-caller-identity | jq -r ".Account")
aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin "$ACCOUNT_ID.dkr.ecr.eu-central-1.amazonaws.com"

```