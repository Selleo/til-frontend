#!/bin/sh
set -e

COMMAND="${1:-server}"

if [ $COMMAND == "server" ]; then
  echo "Starting server..."
  /app/bin/til start
elif [ $COMMAND == "migrate" ]; then
  echo "Running migrations..."
  /app/bin/til rpc Til.Release.migrate
else
  echo "Usage: entrypoint.sh [server|migrate]"
  exit 1
fi
