# docker-compose

```
wget https://raw.githubusercontent.com/IITII/pic_online_backend/main/docker-compose.yml
docker-compose up -d
```

## 启动后设置

> 假设 compose 文件环境变量里面 NAS_DOMAIN="127.0.0.1"  
> 设置 NAS_DOMAIN="127.0.0.1" 只能在本机访问  

1. 启动后, 访问 http://127.0.0.1:8089
1. 点击设置按钮, 修改 common 页下面, common/api_base_url 的值为 http://127.0.0.1:8089
1. 点击提交按钮, 保存设置
1. 返回上一页, 刷新页面
1. 输入用户名和密码即可登录, 默认用户名密码是 admin/admin

## 修改密码

> 容器内操作  

1. 修改 `services/user.service.js:176` 方法的内容
2. 将第三个 admin 改为你想要的密码
3. 删除 `data` 文件夹下内容, 重新启动服务即可
4. `rm -rf data/*`

## 局域网访问

> docker network_mode 为 bridge, host 都可  
> 假设宿主机局域网 ip 为 192.168.0.15  

1. 设置 NAS_DOMAIN="192.168.0.15"
2. `docker-compose up -d`
1. 启动后, 访问 http://192.168.0.15:8089
1. 点击设置按钮, 修改 common 页下面, common/api_base_url 的值为 http://192.168.0.15:8089
1. 其他同上

## DDNS

> docker network_mode 为 host 都可  

1. 添加 dns.he.net ddns 解析
2. 设置 ddns key 和 ddns 域名一致, 比如 nas.baidu.com
3. 设置 NAS_DOMAIN="nas.baidu.com", MOLECULER_DDNS_ENABLE=true
2. `docker-compose up -d`
3. 其他同上

## SSL

1. 将 SSL 证书放到容器里面, 比如放在映射的 volume 里面. 如: ./data
2. 将 MOLECULER_HTTPS_CERT 和 MOLECULER_HTTPS_KEY 分别指定为容器里面 证书和私钥的绝对地址.
3. `docker-compose up -d`
3. 其他同上


