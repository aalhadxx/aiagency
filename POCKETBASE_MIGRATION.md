# PocketBase Migration Guide

Complete migration from Directus to PocketBase - **zero cost, single binary, runs on your VPN**.

---

## Why PocketBase?

| Feature | Directus | PocketBase |
|---------|----------|------------|
| Size | Docker + Node.js | Single 20MB binary |
| Memory | 1GB+ recommended | 50MB works fine |
| Database | PostgreSQL/MySQL | SQLite (built-in) |
| Setup time | 30 minutes | 2 minutes |
| Your VPN cost | $5/month + hassle | $5/month only |

---

## Quick Start on Your VPN

### Step 1: SSH to Your VPN

```bash
ssh user@your-vpn-ip
cd /opt
mkdir pocketbase && cd pocketbase
```

### Step 2: Download & Run

```bash
# Download latest release
curl -LO https://github.com/pocketbase/pocketbase/releases/latest/download/pocketbase_linux_amd64.zip
unzip pocketbase_linux_amd64.zip
chmod +x pocketbase

# Create admin user
./pocketbase superuser upsert "admin@example.com" "your-admin-password"

# Start server
./pocketbase serve --http="0.0.0.0:8090"
```

**Or use Docker (easier):**

```bash
# Copy docker-compose file
cp /path/to/your/project/docker-compose.pocketbase.yml .
docker-compose up -d
```

### Step 3: Setup Database Schema

```bash
# On your local machine, run setup script
cd your-project
npm install pocketbase

# Set env vars
export POCKETBASE_URL=http://your-vpn-ip:8090
export POCKETBASE_ADMIN_EMAIL=admin@example.com
export POCKETBASE_ADMIN_PASSWORD=your-admin-password

# Run setup
node scripts/setup-pocketbase.js
```

### Step 4: Configure Environment

Update `.env.local`:

```env
# PocketBase (replace Directus)
POCKETBASE_URL=http://your-vpn-ip:8090
POCKETBASE_ADMIN_EMAIL=admin@example.com
POCKETBASE_ADMIN_PASSWORD=your-admin-password

# Keep existing
CONTENT_API_KEY=your-secret-key
GOOGLE_GENAI_API_KEY=your-google-key
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
VERCEL_REVALIDATE_TOKEN=random-token
```

### Step 5: Test

```bash
# Test API
curl http://your-vpn-ip:8090/api/collections/posts/records

# Generate first post
curl -X POST https://yourdomain.com/api/viral \
  -H "x-api-key: YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{"topic":"AI Security","keywords":["AI"],"targetAudience":"CTOs","contentType":"tutorial"}'
```

---

## Production Hardening

### Systemd Service (Auto-start)

Create `/etc/systemd/system/pocketbase.service`:

```ini
[Unit]
Description=PocketBase
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/opt/pocketbase
ExecStart=/opt/pocketbase/pocketbase serve --http=0.0.0.0:8090
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

Enable:
```bash
sudo systemctl enable pocketbase
sudo systemctl start pocketbase
sudo systemctl status pocketbase
```

### Nginx Reverse Proxy (SSL)

```nginx
server {
    listen 443 ssl http2;
    server_name pb.yourdomain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:8090;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Firewall

```bash
# Allow only necessary ports
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 443/tcp   # HTTPS
sudo ufw allow 8090/tcp  # PocketBase (if not using nginx)
sudo ufw enable
```

---

## Files Changed

| File | Change |
|------|--------|
| `src/lib/pocketbase.ts` | **NEW** - API client |
| `src/lib/pocketbase-blog.ts` | **NEW** - Blog utilities |
| `src/app/api/content/generate/route.ts` | Updated to use PocketBase |
| `src/app/api/viral/route.ts` | Updated to use PocketBase |
| `src/app/blog/page.tsx` | Import from `pocketbase-blog` |
| `src/app/blog/[slug]/page.tsx` | Import from `pocketbase-blog` |
| `docker-compose.pocketbase.yml` | **NEW** - Docker setup |
| `scripts/setup-pocketbase.js` | **NEW** - Database setup |

---

## API Endpoints (Same as Before)

| Endpoint | Description |
|----------|-------------|
| `POST /api/content/generate` | Generate AI post to PocketBase |
| `POST /api/viral` | Generate from trending topics |
| `GET /api/viral?mode=ideas` | Get content ideas |

---

## Backup Strategy

PocketBase uses SQLite - just backup the file:

```bash
# Automated daily backup
0 2 * * * cp /opt/pocketbase/pb_data/data.db /backup/pocketbase-$(date +\%Y\%m\%d).db
```

Or use PocketBase's built-in backup API.

---

## Monitoring

```bash
# Check if running
curl -f http://your-vpn:8090/api/health || echo "DOWN"

# Watch logs
journalctl -u pocketbase -f
```

---

## Troubleshooting

**Can't connect from Vercel?**
- Check firewall: `sudo ufw status`
- Verify PocketBase is listening on 0.0.0.0, not 127.0.0.1
- Test: `curl http://your-vpn-ip:8090/api/collections/posts/records`

**CORS errors?**
- Add to PocketBase Admin → Settings → CORS: `https://yourdomain.com`
- Or set `Access-Control-Allow-Origin: *` (dev only)

**Posts not showing?**
- Check `status` field = "published"
- Verify `published_at` is in the past
- Test API directly: `curl /api/collections/posts/records?filter=status='published'`

---

## Cost Breakdown

| Component | Monthly Cost |
|-----------|--------------|
| VPN/VPS (1 CPU, 1GB RAM) | $5 |
| Vercel (static) | $0 |
| Google Gemini API | ~$5 per 1000 posts |
| **Total** | **~$5-10/month** |

vs Directus self-hosted: Same cost but 10x more complex.

---

## Migration Complete

Your blog now runs on:
- ✅ **PocketBase** (your VPN)
- ✅ **Vercel** (frontend)
- ✅ **AI content** (automated)
- ✅ **Zero vendor lock-in**

Total control. Zero recurring SaaS costs.
