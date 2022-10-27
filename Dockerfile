FROM nginx:latest

LABEL maintainer="heart<7362469@qq.com>"

COPY dist/ /usr/share/nginx/html/

COPY default.conf /etc/nginx/conf.d/default.conf
