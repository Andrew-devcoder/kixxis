#!/bin/bash

TIMESTAMP=$(date +"%Y-%m-%d_%H-%M")
BACKUP_DIR="/app/backups"
FILENAME="$BACKUP_DIR/backup_$TIMESTAMP.sql"

mkdir -p "$BACKUP_DIR"

docker exec -t kixxis-db pg_dump -U kixxis -d kixxisdb > "$FILENAME"

echo "✅ Backup created at $FILENAME"

