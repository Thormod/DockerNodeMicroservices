#!/bin/sh

# Run the MySQL container, with a database named 'users' and credentials
# for a users-service user which can access it.
echo "<<  Starting DB...  >>" 
docker run --name users_db \
    -e MYSQL_ROOT_PASSWORD=123 \
    -e MYSQL_DATABASE=users \
    -e MYSQL_USER=users_service \
    -e MYSQL_PASSWORD=123 \
    -p 3306:3306 \
    -d mysql:latest

sleep 5
# Wait for the database service to start up.
echo "<<  Waiting for DB to start up...  >>"  
docker exec -it users_db mysqladmin \
            --silent \
            --wait=40 \
            -uroot \
            -p123 ping || exit 1

sleep 5
# Run the setup script.
echo "<<  Setting up initial data...  >>"  
docker exec -i users_db mysql \
            -uroot \
            -p123 \
            users < setup.sql  

# echo "<<  MySQL container should be running now. Port 3306 should be exposed on container  >>"