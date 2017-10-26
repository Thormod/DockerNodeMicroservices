FROM mysql:5

ENV MYSQL_ROOT_PASSWORD 123  
ENV MYSQL_DATABASE meetings  
ENV MYSQL_USER meetings_service  
ENV MYSQL_PASSWORD 123

ADD setup.sql /docker-entrypoint-initdb.d  