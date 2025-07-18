
# Bright Planet Hub - Next.js Project Deployment Guide

This guide provides comprehensive instructions for deploying your Next.js application to a Hostinger KVM VPS. It's written with macOS users in mind, but the server commands will work on any system.

## Section 1: Pushing Your Project to GitHub

Since your project is already on GitHub, you only need to push your latest changes before updating your server.

### Pushing Future Updates

For any future changes you make to your code, use these commands in the **Terminal** app on your Mac (in your project folder):
```bash
git add .
git commit -m "Describe your new changes here"
git push origin main
```

---

## Section 2: Deploying to Hostinger KVM VPS

This section details how to set up your Hostinger VPS and deploy the Next.js application. All commands in this section should be run on the **Hostinger server** unless specified otherwise.

### Step 1: Connect to Your VPS

1.  Find your server's IP address and root password in your Hostinger dashboard.
2.  Open the **Terminal** app on your Mac.
3.  Connect to your server as the `root` user by running this command, replacing `YOUR_SERVER_IP` with the actual IP:
    ```bash
    ssh root@YOUR_SERVER_IP
    ```
    You will be prompted for your password. Type it in and press Enter.

### Step 2: Initial Server Setup (Security Best Practices)

It's highly recommended to create a new user so you're not always working as `root`. Run these commands on your VPS (after connecting via SSH).

1.  **Create a new user:** (Replace `myuser` with a username of your choice)
    ```bash
    adduser myuser
    ```
    Follow the prompts to set a password and create the user.

2.  **Give the user `sudo` privileges:**
    ```bash
    usermod -aG sudo myuser
    ```

3.  **Log out and log back in as the new user:**
    ```bash
    exit
    ```
    Then, back in your Mac's Terminal, connect as the new user:
    ```bash
    ssh myuser@YOUR_SERVER_IP
    ```

From now on, all commands on the server should be run as this new user.

### Step 3: Install Required Software on the VPS

1.  **Update Package Lists:**
    ```bash
    sudo apt update && sudo apt upgrade -y
    ```

2.  **Install Git:**
    ```bash
    sudo apt install git -y
    ```

3.  **Install NVM (Node Version Manager):** This is the best way to install Node.js.
    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    ```
    After it finishes, close and reopen your SSH connection, or run:
    ```bash
    source ~/.bashrc
    ```

4.  **Install Node.js (LTS version):**
    ```bash
    nvm install --lts
    ```

5.  **Install PM2 (Process Manager):** This will keep your Next.js app running.
    ```bash
    npm install -g pm2
    ```

### Step 4: Clone and Configure Your Project

1.  **Clone Your GitHub Repository:**
    ```bash
    # Replace the URL with your repository's URL
    git clone https://github.com/your-username/your-repo-name.git
    ```

2.  **Navigate into the Project Directory:**
    ```bash
    cd your-repo-name
    ```

3.  **Set Up Environment Variables:** Your app needs API keys. Create a `.env.local` file to store them securely.
    ```bash
    nano .env.local
    ```
    This opens a text editor. Paste the following, replacing placeholders with your actual keys.

    ```env
    # Google AI API Key for Genkit
    GOOGLE_API_KEY=your_google_ai_api_key_here

    # Resend API Key for sending brochure request emails
    RESEND_API_KEY=your_resend_api_key_here

    # Email configuration for notifications
    NOTIFICATION_EMAIL_FROM=onboarding@resend.dev
    NOTIFICATION_EMAIL_TO=your-personal-email@example.com
    ```
    To save and exit in `nano`: press `Ctrl+X`, then `Y`, then `Enter`.

### Step 5: Install, Build, and Run the Application

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Build the Project for Production:**
    ```bash
    npm run build
    ```

3.  **Start the Application with PM2:**
    ```bash
    pm2 start npm --name "bright-planet-hub" -- start
    ```
    This command starts your app and gives it the name "bright-planet-hub".

4.  **Check Application Status:**
    ```bash
    pm2 list
    ```
    You should see `bright-planet-hub` with a status of `online`.

5.  **Save the PM2 Process List:** This ensures your app will automatically restart if the server reboots.
    ```bash
    pm2 save
    ```

Your Next.js application is now running on port `3000`. The final step is to configure a reverse proxy to make it accessible to the public.

### Step 6: Set Up Nginx as a Reverse Proxy (Recommended)

Nginx will forward traffic from port 80 (standard HTTP) to your app on port 3000.

1.  **Install Nginx:**
    ```bash
    sudo apt install nginx -y
    ```

2.  **Configure Firewall to Allow Nginx:**
    ```bash
    sudo ufw allow 'Nginx Full'
    ```

3.  **Create a New Nginx Configuration File:**
    ```bash
    sudo nano /etc/nginx/sites-available/brightplanetkw.com
    ```
    Paste the following configuration into the nano editor.

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
    Save and exit (`Ctrl+X`, then `Y`, then `Enter`).

4.  **Enable the Configuration:** This command creates a symbolic link from your new config file to the `sites-enabled` directory, which Nginx reads from.
    ```bash
    sudo ln -s /etc/nginx/sites-available/brightplanetkw.com /etc/nginx/sites-enabled/
    ```
    **Troubleshooting:** If you get an error that the file already exists, you may have created a link with the wrong name before. You can remove the wrong link with `sudo rm /etc/nginx/sites-enabled/your-wrong-filename` and try again.

5.  **Test Nginx Configuration and Restart:**
    ```bash
    sudo nginx -t
    ```
    If the test is successful, you'll see a message like `...test is successful`. Then, restart Nginx to apply the changes:
    ```bash
    sudo systemctl restart nginx
    ```

You should now be able to visit `http://brightplanetkw.com` in your browser and see your website!

---

## Section 3: Updating Your Live Application

When you make changes to your code and push them to GitHub, follow these steps on your Hostinger VPS to update the live site.

1.  **Connect to your VPS** (if you aren't already):
    ```bash
    ssh myuser@YOUR_SERVER_IP
    ```

2.  **Navigate to your project directory:**
    ```bash
    cd your-repo-name
    ```

3.  **Pull the Latest Changes from GitHub:**
    ```bash
    git pull origin main
    ```

4.  **Install/Update Dependencies:** (Good practice in case you added new packages)
    ```bash
    npm install
    ```

5.  **Re-build the Application:**
    ```bash
    npm run build
    ```

6.  **Restart the Application with PM2:**
    ```bash
    pm2 restart bright-planet-hub
    ```

Your website is now updated with the latest changes!

---

## Section 4: Getting Your Site Indexed on Google

After deploying, submit your sitemap to Google to get your site indexed faster. Your sitemap URL is: **`https://yourdomain.com/sitemap.xml`**.

Follow the steps in the [Google Search Console documentation](https://developers.google.com/search/docs/crawling-indexing/sitemaps-overview) to add your property and submit your sitemap.
