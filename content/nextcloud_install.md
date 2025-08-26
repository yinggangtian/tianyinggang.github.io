---
title: "Deploy Nextcloud Server"
date: "2024-03-14"
tags: ["cloud"]
excerpt: "Build your own private cloud storage."
---

Solution:
Tech stack: Ubuntu 24.02 + AIO + Cloudflare + Reverse Proxy
Reverse Proxy is implemented using Cloudflare Tunnel
Hardware requirements:

 - CPU cores: 4
 - RAM: 6 GB
 - Storage: 50GB
 - Physical server location: Melbourne

| Access Location | Speed | ping bing.com |
|--|--|--|
| Melbourne | 5-6ms | 5ms |
| China     | 233ms | 55ms |

---


## ✅ 1. Deploy the Server (Assuming you have completed this step)
- Recommended OS: **Debian / Ubuntu LTS**
- Open the following ports:
  - `80` and `443` (HTTP/HTTPS for Cloudflare)
  - `3478` (for Nextcloud Talk)
  - `8080` (Nextcloud AIO management interface, local access only)
  - `11000` (Apache backend port for Nextcloud container, used by reverse proxy)

---


ingress:

## ✅ 3. Configure Cloudflare Tunnel (Recommended)
Cloudflare Tunnel acts as a reverse proxy, so you don't need a public IP or to apply for HTTPS certificates yourself.

### Install Cloudflare Tunnel:
```bash
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared-linux-amd64.deb
cloudflared --version
```

### Log in to your Cloudflare account and create a tunnel:
```bash
cloudflared tunnel login
```
You will see output like:
```bash
ytia0059@instance-20250410-024649:~$ cloudflared tunnel login
Please open the following URL and log in with your Cloudflare account:

https://dash.cloudflare.com/argotunnel?aud=&callback=https%3A%2F%2Flogin.cloudflareaccess.org%2FArj0rQZlAQOpyVXNSiVBF1NdSxwvyZ0SG81O6o0-tT8%3D

Leave cloudflared running to download the cert automatically.
2025-04-10T02:54:52Z INF Waiting for login...
2025-04-10T02:54:53Z INF You have successfully logged in.
If you wish to copy your credentials to a server, they have been saved to:
/home/ytia0059/.cloudflared/cert.pem
```
Click the URL, log in to Cloudflare, and select your domain.
```bash
cloudflared tunnel create nextcloud-tunnel
```
You will see output like:
```bash
Tunnel credentials written to /home/ytia0059/.cloudflared/e9fb1288-5c4e-4afe-9602-e37b76190b53.json. cloudflared chose this file based on where your origin certificate was found. Keep this file secret. To revoke these credentials, delete the tunnel.

Created tunnel nextcloud-tunnel with id e9fb1288-5c4e-4afe-9602-e37b76190b53
```
The **id** and the generated json file path are important.

### Create the tunnel config file:
```bash
sudo mkdir -p /etc/cloudflared/
sudo nano /etc/cloudflared/config.yml
```

**Sample content (replace with your domain):**

```yaml
tunnel: <generated id>
credentials-file: /root/.cloudflared/xxxxxxxxx.json # path to the generated json file


  - hostname: nextcloud.yourdomain.com # your subdomain configured in Cloudflare
    service: http://localhost:11000
  - service: http_status:404
```

### Start and enable on boot:
```bash
cloudflared tunnel run nextcloud-tunnel
sudo cloudflared service install
```
---


## ✅ 4. Configure Cloudflare DNS
Go to the Cloudflare website → DNS settings → Add a CNAME record:
- Type: `CNAME`
- Name: `nextcloud`
- Content: `nextcloud-tunnel-id.cfargotunnel.com` (auto-filled Tunnel address)
- Proxy status: Enable Cloudflare proxy (orange cloud)

---

ghcr.io/nextcloud-releases/all-in-one:latest

## ✅ 2. Install Docker and Start Nextcloud AIO
Make sure Docker is installed on your system, then run the following command:

```bash
sudo docker run \
--init \
--sig-proxy=false \
--name nextcloud-aio-mastercontainer \
--restart always \
--publish 8080:8080 \
--env APACHE_PORT=11000 \
--env APACHE_IP_BINDING=127.0.0.1 \
--env SKIP_DOMAIN_VALIDATION=true \
--volume nextcloud_aio_mastercontainer:/mnt/docker-aio-config \
--volume /var/run/docker.sock:/var/run/docker.sock:ro \
ghcr.io/nextcloud-releases/all-in-one:latest
```

⚠️ Notes:
- `APACHE_PORT=11000`: Apache container listens on this port (for reverse proxy)
- `APACHE_IP_BINDING=127.0.0.1`: Apache only listens locally for enhanced security
- `SKIP_DOMAIN_VALIDATION=true`: Validation will fail under Cloudflare Tunnel, so you must skip it

---





## ✅ 5. Open the AIO Management Page and Set the Domain
Visit:
```plaintext
https://<your server public IP>:8080
```
Ignore the TLS warning. On the page:
- Enter your domain `nextcloud.yourdomain.com`
- Click verify (since you skipped validation, you should be able to proceed)

---


## ✅ 6. Access After Installation
Now you should be able to access your Nextcloud service directly via:
```plaintext
https://nextcloud.yourdomain.com
```

---

