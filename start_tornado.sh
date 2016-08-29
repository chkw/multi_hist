#!/bin/sh
PYTHON=`which python`

PATH="./"

PORT="9886"

echo "server listening on port $PORT"
$PYTHON ./static_server.py $PATH $PORT
