FROM node:slim as builder
RUN apt-get update && \
apt install -y git && \
git clone https://github.com/IITII/pic_online /pic_online && \
cd /pic_online && \
export PIC_DEPLOY_FIR=/ && \
export PIC_OUTPUT_DIR=dist/ && \
echo "VUE_APP_API_URL='static/mock/data.json'" > .env && \
npm install && \
npm run build

FROM nginx:alpine
LABEL maintainer="IITII <ccmejx@gmail.com>"
WORKDIR /usr/share/nginx/html/
COPY --from=builder /pic_online/dist/ .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]