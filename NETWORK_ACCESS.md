# Network Access Guide

## Making the Application Accessible to Colleagues

The application has been configured to be accessible on your local network. Here's how to share it with your colleagues:

### Step 1: Find Your Computer's IP Address

**On Windows:**
1. Open Command Prompt or PowerShell
2. Type: `ipconfig`
3. Look for "IPv4 Address" under your active network adapter (usually starts with 192.168.x.x or 10.x.x.x)

**On Mac/Linux:**
1. Open Terminal
2. Type: `ifconfig` or `ip addr`
3. Look for your local IP address (usually starts with 192.168.x.x or 10.x.x.x)

### Step 2: Start the Application

Run the application as usual:
```bash
npm run dev
```

The server will display your IP address when it starts. Look for a message like:
```
Network access: http://192.168.1.41:3000
```

### Step 3: Share with Colleagues

Your colleagues can access the application by:
1. Making sure they're on the same network (same WiFi/LAN)
2. Opening their browser and going to: `http://YOUR_IP_ADDRESS:3000`

**Example:** If your IP is `192.168.1.41`, they would visit: `http://192.168.1.41:3000`

### Important Notes:

1. **Firewall**: You may need to allow Node.js through Windows Firewall:
   - Go to Windows Security > Firewall & network protection
   - Click "Allow an app through firewall"
   - Find Node.js and allow it for both Private and Public networks

2. **Same Network**: Colleagues must be on the same local network (WiFi or LAN)

3. **Port Forwarding**: For access from outside your network, you'll need:
   - Port forwarding on your router
   - Or use a service like ngrok, localtunnel, or deploy to a cloud service

### Alternative: Deploy to Cloud

For easier access, consider deploying to:
- **Heroku** (free tier available)
- **Vercel** (for frontend) + **Railway/Render** (for backend)
- **AWS/Azure/GCP** (for production use)

### Troubleshooting

**Can't access from other devices:**
- Check Windows Firewall settings
- Ensure both devices are on the same network
- Verify the IP address is correct
- Try disabling firewall temporarily to test

**Connection refused:**
- Make sure the server is running
- Check if port 3000 and 5000 are not blocked
- Verify the IP address shown in the server console
