# Next.js Project Deployment Guide for Brightplanetfinal

This guide provides step-by-step instructions to deploy the Brightplanetfinal Next.js application to a Linux VPS (e.g., from Hostinger, DigitalOcean, etc.).

---

## Section 1: Initial Server Setup

These steps only need to be done once when you first set up your server.

### 1. Connect to Your Server

First, connect to your server as the `root` user using its IP address.
```bash
ssh root@YOUR_SERVER_IP
```

### 2. Create a New User (Recommended)

Running everything as `root` is risky. Let's create a new user. Replace `myuser` with a username of your choice.
```bash
# Create the user
adduser myuser

# Give the user admin privileges
usermod -aG sudo myuser

# Log out of the root session
exit
```
Now, log back into the server with your new user account:
```bash
ssh myuser@YOUR_SERVER_IP
```

### 3. Install Required Software

Run these commands on your server to install all the necessary tools.

**a. Update the System:**
```bash
sudo apt update && sudo apt upgrade -y
```

**b. Install Git:**
```bash
sudo apt install git -y
```

**c. Install NVM (Node Version Manager):**
This is the best way to install and manage Node.js versions.
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```
After installation, either close and reopen your terminal or run `source ~/.bashrc` to apply the changes.

**d. Install Node.js:**
This command installs the latest Long-Term Support (LTS) version of Node.js.
```bash
nvm install --lts
```

**e. Install PM2:**
PM2 is a process manager that will keep your Next.js app running continuously.
```bash
npm install -g pm2
```

---

## Section 2: Deploying Your Application

Now that the server is ready, let's deploy your project.

### 1. Clone Your Repository

Clone your `Brightplanetfinal` project from GitHub. Replace `your-github-username` with your actual GitHub username.
```bash
git clone https://github.com/your-github-username/Brightplanetfinal.git
```

### 2. Go to the Project Directory
```bash
cd Brightplanetfinal
```

### 3. Set Up Environment Variables

Your application needs API keys to function. Create a `.env.local` file to store them securely.
```bash
nano .env.local
```
Paste the following content into the file, replacing the placeholder values with your actual keys.

```env
# Google AI API Key for the AI Activity Planner
# Get this from https://aistudio.google.com/
GOOGLE_API_KEY=your_google_ai_api_key_here

# Resend API Key for sending emails from forms
# Get this from https://resend.com/
RESEND_API_KEY=your_resend_api_key_here

# Email configuration for notifications
NOTIFICATION_EMAIL_FROM=onboarding@resend.dev
NOTIFICATION_EMAIL_TO=your-personal-email@example.com
```
Press `Ctrl + X`, then `Y`, then `Enter` to save and exit the editor.

### 4. Install Dependencies and Build the App
```bash
# Install all required packages
npm install

# Build the app for production
npm run build
```

### 5. Start the App with PM2

Start your application using PM2. We will name the process `brightplanetkw.com` as requested.
```bash
pm2 start npm --name "brightplanetkw.com" -- start
```
To ensure your app automatically restarts if the server reboots, run:
```bash
pm2 save
```
You can check the status of your app anytime with `pm2 list`.

---

## Section 3: Configure Nginx as a Reverse Proxy

Your app is running on port 3000. Nginx will direct public traffic from port 80 (HTTP) to your app.

### 1. Install Nginx
```bash
sudo apt install nginx -y
```

### 2. Configure Nginx for Your Domain

Create a new Nginx configuration file for your domain `brightplanetkw.com`.
```bash
sudo nano /etc/nginx/sites-available/brightplanetkw.com
```
Paste the following configuration into the file. It's already set up for your domain.

```nginx
server {
    listen 80;
    server_name brightplanetkw.com www.brightplanetkw.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
Save and exit the editor (`Ctrl + X`, `Y`, `Enter`).

### 3. Enable the Nginx Configuration

Link your new config file to the `sites-enabled` directory to activate it.
```bash
sudo ln -s /etc/nginx/sites-available/brightplanetkw.com /etc/nginx/sites-enabled/
```
Now, test your Nginx configuration for any errors and restart it.
```bash
sudo nginx -t
sudo systemctl restart nginx
```

**Your website should now be live at `http://brightplanetkw.com`!**

---

## Section 4: How to Update Your Live Website

When you push new changes to your GitHub repository, follow these simple steps on your server to update the live site.

1.  **Connect to your server** with SSH.
2.  **Navigate to your project directory:** `cd Brightplanetfinal`
3.  **Pull the latest code from GitHub:** `git pull origin main`
4.  **Install any new packages:** `npm install`
5.  **Re-build the application:** `npm run build`
6.  **Restart the app with PM2:** `pm2 restart brightplanetkw.com`

Your website is now updated!
