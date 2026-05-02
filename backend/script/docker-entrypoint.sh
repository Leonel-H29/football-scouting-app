#!/bin/sh

echo "Running migrations..."
npx prisma migrate deploy

echo "Seeding database..."
npx prisma db seed

echo "Waiting for app build..."

# Wait until the file exists
while [ ! -f "dist/src/index.js" ]; do
    echo "dist/src/index.js doesn't exist, waiting..."
    sleep 2
done

echo "Starting app..."
node dist/src/index.js