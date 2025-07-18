# How to Sync Your Website Updates

This guide provides the exact commands to update your live website on Hostinger after making changes to the code on your local computer.

---

### Step 1: On Your Local Computer (e.g., Mac)

After you've made changes to your code, follow these steps in your project folder using the **Terminal** app to send your updates to your GitHub repository.

1.  **Add all your changed files for tracking:**
    ```bash
    git add .
    ```

2.  **Commit the changes with a descriptive message:**
    ```bash
    git commit -m "Describe the changes you made here"
    ```

3.  **Push the changes to your main branch on GitHub:**
    ```bash
    git push origin main
    ```

---

### Step 2: On Your Hostinger Server

After your changes are on GitHub, connect to your Hostinger VPS via SSH and run these commands to update the live application.

1.  **Navigate to your project directory:**
    ```bash
    cd your-repo-name 
    ```
    (Replace `your-repo-name` with your actual project folder name, e.g., `Brightplanetfinal`)

2.  **Pull the latest changes from GitHub:**
    ```bash
    git pull origin main
    ```

3.  **Install any new packages (good practice):**
    ```bash
    npm install
    ```

4.  **Re-build the application for production:**
    ```bash
    npm run build
    ```

5.  **Restart your application using PM2:**
    ```bash
    pm2 restart bright-planet-hub
    ```

Your website is now updated with the latest changes! You can check the status anytime with `pm2 list`.
