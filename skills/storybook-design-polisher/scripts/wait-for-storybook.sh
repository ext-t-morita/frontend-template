#!/usr/bin/env bash

set -euo pipefail

url="${1:-http://127.0.0.1:6006}"
timeout_seconds="${2:-60}"

if ! [[ "$timeout_seconds" =~ ^[0-9]+$ ]]; then
  echo "timeout_seconds must be an integer" >&2
  exit 2
fi

start_time="$(date +%s)"

while true; do
  if curl --silent --fail --output /dev/null "$url"; then
    echo "Storybook is ready: $url"
    exit 0
  fi

  now="$(date +%s)"
  elapsed="$((now - start_time))"
  if (( elapsed >= timeout_seconds )); then
    echo "Timed out waiting for Storybook: $url" >&2
    exit 1
  fi

  sleep 1
done
