# 局域网媒体浏览服务搭建

* 所有的文件都是使用者自己的文件，都是本地文件
* 推荐使用 linux 或者 mac 系统, 作为服务端系统
* 项目分为两个部分, 一个是服务端, 一个是客户端
  * 服务端: 用于提供服务, 服务端需要安装 nodejs, ffmpeg
  * 客户端: 浏览器即可, 无需安装任何东西.

> 以下的操作以 Ubuntu/Mac 为例

## 后端部署

### 安装依赖

#### linux
```bash
sudo apt update && sudo apt install -y git ffmpeg
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
nvm install 14.17.6
git clone https://github.com/IITII/pic_online_backend.git
```
#### mac

```bash
brew install git ffmpeg
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
nvm install 14.17.6
git clone https://github.com/IITII/pic_online_backend.git
```

### 文件结构
```
public
├── cache # 缓存文件夹, 无需关心
├── favicon.ico
├── images # 图片文件夹
├── pic # 前端文件夹
└── video # 视频文件夹
```

### 配置文件

> 后端支持 dns.he.net 的 ddns 功能, 如果不需要, 可以将 MOLECULER_DDNS_ENABLE 设置为 false
>
> 默认启用 ddns 功能

1. 假设你的域名是 xxx.baidu.com
2. 假设你的 ddns token 是 xxx.baidu.com
3. 假设按照上面的文件结构, 图片文件夹是 /tmp/images, 视频文件夹是 /tmp/video, 缓存文件夹是 /tmp/cache, 即 PIC_BASE_DIR=/tmp
   1. 这个 /tmp 可以替换为别的实际文件夹, 但是文件结构不能改变...
4. 假设你的服务端口是 89, 即 MOLECULER_PORT=89
5. 服务端的 ip 是自动扫描出来的, 无需配置, 也是 DDNS 的解析地址
6. 假设你的 JWT_TOKEN_EXPIRE 是 336, 即登陆过期时间是 336 小时

```bash
#!/bin/bash

export NAS_DOMAIN="xxx.baidu.com"
export PIC_BASE_DIR=/tmp
export MOLECULER_PORT=89
export MOLECULER_DDNS_ENABLE=true

export PIC_DIR=$PIC_BASE_DIR/images
export VIDEO_DIR=$PIC_BASE_DIR/video
export PIC_POSTER_DIR=$PIC_BASE_DIR/cache
export PIC_PREFIX=http://$NAS_DOMAIN:$MOLECULER_PORT
export MOLECULER_DDNS_DOMAIN=$NAS_DOMAIN
export MOLECULER_DDNS_TOKEN=$NAS_DOMAIN
# 登陆过期时间, 单位小时
export JWT_TOKEN_EXPIRE=336

npm run start
```

* 将修改后的配置文件保存为 `env.sh`
* 执行 `chmod +x env.sh`
* 执行 `bash env.sh` 即可启动服务

## 前端部署

1. 浏览器打开: https://github.com/IITII/pic_online/releases
2. 下载最新的 release 版本, pic_online_pic.zip, 解压到上面目录结构的 /tmp/pic 文件夹下
3. 浏览器打开: http://xxx.baidu.com:89/pic 即可
4. 如果 DNS 还未更新, 可以使用 ip:89/pic 作为代替, 这些都可以从后端启动日志看到
5. 启动后, 会自动跳转到登录页面, 第一次需要修改设置
6. 点击设置按钮, 修改 common 页下面, common/api_base_url 的值为 http://xxx.baidu.com:89
7. 点击提交按钮, 保存设置
8. 返回上一页, 刷新页面
9. 输入用户名和密码即可登录, 默认用户名密码是 admin/admin

## 修改密码

1. 修改 `services/user.service.js:176` 方法的内容
2. 将第三个 admin 改为你想要的密码
3. 删除 `data` 文件夹下内容, 重新启动服务即可
4. `rm -rf data/*`

