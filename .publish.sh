#!/usr/bin/env bash

TOKEN=${1?Error: no name given}

body='{
    "description": "Trigger Auto Build",
    "ref": "source", 
    "required_contexts": [], 
    "environment": "production",
    "auto_merge": false,
    "payload": {
        "deploy": "migrate"
    }
}'


curl -s -X POST \
    -H "Authorization: token $TOKEN" \
    -H "Accept: application/vnd.github.ant-man-preview+json" \
    -H "Content-Type: application/json" \
    https://api.github.com/repos/ELC/blog-template-full/deployments \
    --data "$body"

   