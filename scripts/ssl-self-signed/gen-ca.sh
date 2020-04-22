#!/usr/bin/env bash
DIR=$(cd `dirname $0` && pwd)

mkdir -p $DIR/gen
rm $DIR/gen/*

# Generate the certificate authority (CA) key
openssl genrsa -des3 -out $DIR/gen/ca.key 2048

# Generate CA certificate with key (valid for 10 years)
openssl req -x509 \
  -new -sha256 -nodes -days 3650 \
  -key $DIR/gen/ca.key \
  -out $DIR/gen/ca.crt \
  -subj '/C=ES/ST=Alava/L=Vitoria-Gasteiz/O=Arikata/OU=Arikata Dev/emailAddress=hi@arikata.dev/CN=dev.arikata'
