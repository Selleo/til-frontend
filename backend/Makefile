.PHONY: build
build:
	docker buildx build  -t til . --platform linux/amd64

.PHONY: tag
tag:
	docker tag til $(ACCOUNT_ID).dkr.ecr.eu-central-1.amazonaws.com/til:$(TAG)
	docker tag til $(ACCOUNT_ID).dkr.ecr.eu-central-1.amazonaws.com/til:latest

.PHONY: push
push:
	docker push $(ACCOUNT_ID).dkr.ecr.eu-central-1.amazonaws.com/til:$(TAG)
	docker push $(ACCOUNT_ID).dkr.ecr.eu-central-1.amazonaws.com/til:latest
