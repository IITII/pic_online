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

## 扫描性能相关
> 以下耗时以 81w 文件为例.  
> 以下 wsl 扫描文件夹的方式均为 wsl 访问自动挂载的 Windows Ntfs卷. 貌似将文件放在 wsl 内部的文件系统上面速度可以快点, 未尝试.  
* 貌似 Windows docker desktop + wsl2 文件夹遍历性能非常低下，实测扫描时候的速度差了大约 30 倍。Mac docker desktop 好点，但差不多。
  * wsl 有的时候会出现文件夹访问问题, 比如 `Input/Output Error`. 这种情况下在 powershell 下使用 `wsl --shutdown; wsl` 重启 wsl 即可.
  * 当你发现在 powershell 下输入 wsl 一直卡住的时候大概率也需要重启 wsl.
* 特别是在文件夹多的时候这个启动耗时非常离谱
  * wsl 启动耗时 30min+
  * 这个速度也受限于 CPU, 当 CPU 被疯狂占用的时候, 这个扫描时间可能需要 5 个小时.
* 使用 linux 扫描性能基本没有损耗, 包括群辉, 扫描时间分钟级别。
  * 因为只读取文件元信息/扫描文件, 所以就算是机械磁盘扫描速度也有保证, 也可以做到分钟级别启动.

* https://github.com/docker/for-win/issues/188

## 内存占用
* 启动后内存占用不高，81w 文件大约 250MB（还有可优化空间）。

