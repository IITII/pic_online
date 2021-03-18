FROM node:slim as builder
RUN apt-get update && \
apt install -y git && \
git clone https://github.com/IITII/pic_online /pic_online && \
cd /pic_online && \
npm install -g @quasar/cli && \
export PIC_DEPLOY_DIR=/ && \
export PIC_OUTPUT_DIR=dist/ && \
npm install && \
npm run build

FROM nginx:alpine
LABEL maintainer="IITII <ccmejx@gmail.com>"
WORKDIR /usr/share/nginx/html/
COPY --from=builder /pic_online/dist/spa/ .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
