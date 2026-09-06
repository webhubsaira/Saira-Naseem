# Saira Naseem - Personal Developer Portfolio Website

A modern, responsive, and lightweight personal portfolio website designed for developers, designers, freelancers, and students. Built cleanly with **HTML5, CSS3, Vanilla JavaScript, and Bootstrap 5**.

This static website is 100% serverless and ready to be hosted effortlessly on **GitHub Pages**, Netlify, Vercel, or any static web host.

---

## 🚀 Live Demo & Preview

- **Preview**: [https://USERNAME.github.io/REPOSITORY-NAME/](https://USERNAME.github.io/REPOSITORY-NAME/)
- **Author**: Saira Naseem
- **Tech Stack**: HTML5, CSS3, Vanilla JavaScript (ES6+), Bootstrap 5.3.3, Bootstrap Icons 1.11.3, Google Fonts

---

## 📁 Project Structure

The project uses relative file paths so it works seamlessly both on local machines and on GitHub Pages subdirectories:

```text
portfolio/
│
├── index.html              # Main semantic HTML5 webpage & SEO metadata
├── css/
│   └── style.css           # Custom modern CSS styles and theme overrides
├── js/
│   └── script.js           # Vanilla JavaScript for animations, filtering & navbar
├── images/
│   ├── profile.jpg         # Developer profile avatar image
│   ├── project-1.jpg       # E-Commerce Website preview
│   ├── project-2.jpg       # Restaurant Website preview
│   ├── project-3.jpg       # Weather Application preview
│   ├── project-4.jpg       # Task Management App preview
│   ├── project-5.jpg       # Portfolio Theme preview
│   └── project-6.jpg       # Business Landing Page preview
└── README.md               # Documentation and GitHub Pages deployment guide
```

---

## ✨ Features

- **Semantic HTML5 & Accessibility**: Fully accessible semantic tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) with ARIA attributes and high color contrast.
- **Sticky Glassmorphic Navigation**: Shrinks smoothly on scroll, highlights active sections via `IntersectionObserver`, and collapses automatically on mobile.
- **Hero Section**: Modern typography, call-to-action buttons, animated floating status pills ("Available for Work", "5+ Years Experience"), and social media links.
- **About Me**: Professional biography, high-contrast metric counter badges (5+ Years Experience, 50+ Projects, 30+ Clients, 15+ Tech).
- **Animated Skills**: 8 technical skill progress bars that animate when scrolled into view.
- **Services Cards**: Interactive cards with custom gradients and hover elevation.
- **Interactive Project Filtering**: Instant category filtering (All, Web, JavaScript, UI/UX) powered purely by vanilla JavaScript.
- **Interactive Project Modals**: Live demo summaries and repository links.
- **Vertical Experience Timeline**: Polished milestone markers for career history and education.
- **Testimonials Section**: Card reviews with 5-star ratings.
- **Contact Form**: Bootstrap validation (`needs-validation`), error feedback, and an animated success confirmation. Ready for connection to Formspree or EmailJS.
- **Floating Back-to-Top Button**: Smoothly returns the user to the top after scrolling.
- **SEO & Social Share Ready**: Open Graph and Twitter card tags preconfigured.

---

## 🛠️ Step-by-Step GitHub Pages Deployment Guide

Deploying this portfolio on GitHub Pages is free and takes less than 3 minutes.

### Step 1: Create a GitHub Repository

1. Sign in to your [GitHub account](https://github.com/).
2. Click the **+** (plus) icon in the top-right corner and choose **New repository**.
3. Name your repository:
   - For a project portfolio (recommended): e.g. `portfolio` or `my-portfolio`.
   - For your main personal domain: name it `yourusername.github.io` (replace `yourusername` with your exact GitHub username).
4. Set visibility to **Public** (GitHub Pages is free for public repositories).
5. Leave "Initialize with a README" **unchecked** (we already have one).
6. Click **Create repository**.

---

### Step 2: Upload Files via Git Command Line

Open your computer's terminal (macOS/Linux) or Git Bash / Command Prompt (Windows) inside your `portfolio` project folder:

```bash
# 1. Initialize a new local Git repository
git init

# 2. Stage all project files (index.html, css, js, images, README)
git add .

# 3. Create your initial commit
git commit -m "Initial portfolio website"

# 4. Rename the default branch to 'main'
git branch -M main

# 5. Connect your local repository to your remote GitHub repository
# IMPORTANT: Replace YOUR_GITHUB_REPOSITORY_URL with the actual URL from GitHub
# Example: https://github.com/john-doe/portfolio.git
git remote add origin YOUR_GITHUB_REPOSITORY_URL

# 6. Push your code to GitHub
git push -u origin main
```

> **Note**: Where you see `YOUR_GITHUB_REPOSITORY_URL`, paste the clone URL provided by GitHub (e.g., `https://github.com/your-username/portfolio.git`).

---

### Step 3: Enable GitHub Pages in Repository Settings

1. On GitHub, navigate to your newly created repository page.
2. Click on the **Settings** tab located at the top right of the repository.
3. In the left sidebar navigation, click on **Pages** (under the "Code and automation" section).
4. Under **Build and deployment**:
   - **Source**: Select **Deploy from a branch**.
   - **Branch**: Select `main`.
   - **Folder**: Select `/ (root)`.
5. Click **Save**.
6. Wait 1 to 2 minutes. Refresh the GitHub Pages settings tab. A banner will appear displaying:
   > *"Your site is live at https://USERNAME.github.io/REPOSITORY-NAME/"*

---

### Step 4: Understanding Your Deployed URL

- **Standard Repository**:
  If your repository is named `portfolio`, your live website URL will be:
  ```text
  https://USERNAME.github.io/portfolio/
  ```

- **User Site Repository**:
  If your repository was created with the special name `USERNAME.github.io`, your live website URL will be at your top-level domain:
  ```text
  https://USERNAME.github.io/
  ```

---

### Step 5: How to Update Your Website Later

Whenever you want to modify projects, update your bio, or change styling:

```bash
# After making your changes in the code:
git add .
git commit -m "Update projects and contact details"
git push origin main
```

GitHub Pages will automatically rebuild and deploy your changes within 60 seconds!

---

## 🔌 Connecting the Contact Form to Email (Formspree or EmailJS)

Since this is a static site without a backend server, you can connect the form to a free email forwarding service:

### Option A: Using Formspree (Easiest, No JS Required)
1. Go to [https://formspree.io/](https://formspree.io/) and create a free account.
2. Create a new form and copy your unique Formspree endpoint URL (e.g. `https://formspree.io/f/mqkvywza`).
3. Open `index.html`, locate `<form id="portfolioContactForm">`, and update it with:
   ```html
   <form id="portfolioContactForm" action="https://formspree.io/f/YOUR_ENDPOINT_HERE" method="POST">
   ```

### Option B: Using EmailJS (Keeps User on Page)
1. Sign up at [https://www.emailjs.com/](https://www.emailjs.com/).
2. Add your EmailJS SDK script tag to `index.html`.
3. In `js/script.js`, call `emailjs.sendForm(...)` inside the submit event handler.

---

## 🛠️ Troubleshooting Guide

| Issue | Root Cause | Solution |
| :--- | :--- | :--- |
| **CSS not loading** | Using absolute path `/css/style.css` instead of relative `css/style.css` | Make sure the link in `index.html` is `<link rel="stylesheet" href="css/style.css">`. Absolute paths break when hosted under subdirectories on GitHub Pages. |
| **JavaScript not working** | Script loading before DOM or blocked path | Verify `<script src="js/script.js"></script>` is placed at the bottom before `</body>`. Ensure Bootstrap 5 bundle CDN is loaded above it. |
| **Images not showing** | Case-sensitivity or incorrect relative path | Linux servers on GitHub are strictly case-sensitive. Verify file names match exactly (`profile.jpg` vs `Profile.JPG`) and use `images/profile.jpg`. |
| **GitHub Pages 404** | `index.html` not in the root directory, or deployment in progress | Ensure `index.html` is at the very root of the repository, not inside a nested subfolder. Also allow 1-2 minutes for the initial GitHub Actions deployment runner. |
| **Changes not appearing immediately** | Browser caching | Hard refresh the browser using `Ctrl + F5` (Windows) or `Cmd + Shift + R` (macOS), or test in an Incognito/Private browsing window. |

---

## 📝 Customization Checklist

- [ ] Replace placeholder name "Alex Morgan" with your real name.
- [ ] Add your actual email (`alex@example.com`) and phone in `index.html`.
- [ ] Put your own portrait photograph in `images/profile.jpg`.
- [ ] Add your real GitHub, LinkedIn, and social URLs in the hero, about, and contact sections.
- [ ] Update project titles, descriptions, and add your actual project screenshots in `images/project-*.jpg`.
- [ ] Connect your Formspree endpoint for instant email notifications.

---

## 📄 License

This portfolio template is open-source and free to use for personal and commercial portfolios under the [MIT License](https://opensource.org/licenses/MIT).
