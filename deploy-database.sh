#!/usr/bin/env bash

docker-compose -f ./docker/stack.yml -p familytree up -d db-master db-pgadmin