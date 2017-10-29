FROM mysql:5

ENV MYSQL_ROOT_PASSWORD 123  
ENV MYSQL_DATABASE assistance  
ENV MYSQL_USER assistance_service  
ENV MYSQL_PASSWORD 123

ADD setup.sql /docker-entrypoint-initdb.d  