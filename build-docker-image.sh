#!/usr/bin/env bash

echo "Building image ${IMAGE_NAME}"
docker build -t ${IMAGE_NAME} -f ./docker/Dockerfile .
