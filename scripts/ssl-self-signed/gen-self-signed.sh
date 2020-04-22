#!/usr/bin/env bash
DIR=$(cd `dirname $0` && pwd)

# Clean
rm $DIR/gen/server*

# Generate dev server's private Key and a Certificate Signing Requests (CSR)
openssl req \
  -new -sha256 -nodes -out $DIR/gen/server.csr \
  -newkey rsa:2048 -keyout $DIR/gen/server.key \
  -config $DIR/server.csr.cnf

# Generate dev server self-signed certificate
openssl x509 -req \
  -in $DIR/gen/server.csr \
  -CA $DIR/gen/ca.crt -CAkey $DIR/gen/ca.key -CAcreateserial \
  -out $DIR/gen/server.crt -days 825 -sha256 -extfile $DIR/v3.ext

# Deploy
OUT_REL_DIRECTORY='../../docker/ssl'
OUT_DIRECTORY=$(cd $DIR && cd $OUT_REL_DIRECTORY && pwd)
rm $OUT_DIRECTORY/certs/* 2> /dev/null
rm $OUT_DIRECTORY/private/* 2> /dev/null
cp $DIR/gen/server.crt $OUT_DIRECTORY/certs/
cp $DIR/gen/server.key $OUT_DIRECTORY/private/
