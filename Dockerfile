FROM node:slim as builder
LABEL maintainer="IITII <ccmejx@gmail.com>"
COPY . /pic_online
WORKDIR /pic_online
RUN npm install && \
apt clean && \
cd ../
EXPOSE 8080
CMD ["npm","serve"]