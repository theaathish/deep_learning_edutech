# EduTech Backend - VM Deployment Guide

## 🖥️ VM Specifications
- **RAM**: 2 GB
- **CPU**: 1 vCPU
- **Disk**: 50 GB SSD
- **Transfer**: 2 TB
- **Cost**: $12/month

## 🌐 Architecture
- **Frontend**: Vercel (React/Vite)
- **Backend**: VM with Node.js + PM2
- **Database**: PostgreSQL (local on VM)
- **Domain**: api.deeplearningedutech.com via Cloudflare Tunnel

## 🗄️ Data Storage
PostgreSQL data and uploads are stored on persistent paths:
- ✅ Data survives process restarts
- ✅ Data survives VM reboots
- ✅ Automatic daily backups to `/mnt/data/backups`

## 📁 Directory Structure on VM
```
/opt/edutech-backend/    # Application code
/mnt/data/
├── uploads/             # User uploaded files (videos, images, documents)
│   ├── videos/
│   ├── images/
│   ├── thumbnails/
│   └── documents/
└── backups/             # Daily database backups (7 days retention)

/var/lib/postgresql/     # PostgreSQL data
/var/log/edutech/        # Application logs
```

## 🚀 Initial Setup

### 1. SSH into your VM
```bash
ssh root@your-vm-ip
```

### 2. Run the setup script
```bash
# Download setup script
curl -O https://raw.githubusercontent.com/your-repo/edutech-education/main/backend/scripts/vm-setup-no-docker.sh
chmod +x vm-setup-no-docker.sh
./vm-setup-no-docker.sh
```

### 3. Clone and install backend
```bash
cd /opt/edutech-backend
git clone https://github.com/your-repo/edutech-education.git .
cd backend
npm ci
```

### 4. Configure environment
```bash
cp .env.production.example .env.production
nano .env.production
```

Fill in:
- `DATABASE_URL` - PostgreSQL connection with your password
- `JWT_SECRET` - Generate with `openssl rand -base64 64`
- `JWT_REFRESH_SECRET` - Generate with `openssl rand -base64 64`
- `CORS_ORIGIN` - Your Vercel frontend URL
- `STRIPE_SECRET_KEY` - Your Stripe live key
- `RAZORPAY_KEY_ID` - Your Razorpay key (for India payments)
- Email credentials

### 5. Build and migrate
```bash
npm run build
npx prisma migrate deploy
```

### 6. Start with PM2
```bash
npm run pm2:start
pm2 save
```

### 7. Configure Cloudflare Tunnel
In Cloudflare Zero Trust Dashboard:
1. Create a tunnel named `edutech-api`
2. Add public hostname: `api.deeplearningedutech.com` → `http://localhost:5000`
3. Install connector on VM:
```bash
cloudflared service install <TUNNEL_TOKEN>
```

## 📊 Resource Allocation

| Component | Memory |
|-----------|--------|
| PostgreSQL | ~300-500 MB |
| Node.js/PM2 | ~200-400 MB |
| OS/Buffer | ~800 MB |
| Swap | 2 GB |
| **Total** | **2 GB + 2 GB swap** |

## 🔄 Deployment

### Update backend
```bash
cd /opt/edutech-backend/backend
npm run deploy
```

Or manually:
```bash
git pull origin main
npm ci
npm run build
npx prisma migrate deploy
pm2 reload edutech-api
```

### PM2 Commands
```bash
pm2 status                    # Check status
pm2 logs edutech-api          # View logs
pm2 restart edutech-api       # Restart
pm2 reload edutech-api        # Zero-downtime reload
pm2 monit                     # Live monitoring
```

## 💾 Backup & Restore

### Automatic backups
Daily at 2 AM, retained for 7 days.

### Manual backup
```bash
/opt/backup-db.sh
```

### List backups
```bash
ls -lh /mnt/data/backups/
```

### Restore from backup
```bash
# Stop the app
pm2 stop edutech-api

# Restore database
gunzip -c /mnt/data/backups/edutech_YYYYMMDD_HHMMSS.sql.gz | sudo -u postgres psql edutech

# Start the app
pm2 start edutech-api
```

## 🔍 Monitoring

### Check health
```bash
curl https://api.deeplearningedutech.com/health
```

### Check logs
```bash
pm2 logs edutech-api --lines 100
tail -f /var/log/edutech/combined.log
```

### Check resources
```bash
htop
free -h
df -h
```

### Check database
```bash
sudo -u postgres psql -c "SELECT count(*) FROM pg_stat_activity WHERE datname='edutech';"
```

## 🔐 Security

### Firewall (configured by setup script)
- SSH (22): Open
- All other ports: Blocked (Cloudflare Tunnel handles HTTP/HTTPS)

### SSL
Handled automatically by Cloudflare Tunnel - no certificate management needed!

## 🌐 Frontend Configuration (Vercel)

Add environment variable:
```env
VITE_API_URL=https://api.deeplearningedutech.com
```

## 🆘 Troubleshooting

### Backend not starting
```bash
pm2 logs edutech-api --err --lines 50
npx prisma migrate status
```

### Database issues
```bash
sudo systemctl status postgresql
sudo -u postgres psql -c "\l"    # List databases
sudo -u postgres psql -c "\du"   # List users
```

### Out of memory
```bash
free -h
pm2 monit
# Restart if needed
pm2 restart edutech-api
```

### Cloudflare Tunnel issues
```bash
sudo systemctl status cloudflared
sudo journalctl -u cloudflared -f
```

### Check API logs
```bash
pm2 logs edutech-api
cat /var/log/edutech/error.log
```

## 📞 Quick Commands

```bash
# Restart everything
pm2 restart edutech-api && sudo systemctl restart postgresql

# Full deploy
cd /opt/edutech-backend/backend && npm run deploy

# Check status
pm2 status && curl -s localhost:5000/health | jq

# View all logs
pm2 logs
```
