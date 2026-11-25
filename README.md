# Veerasurya — Personal Portfolio

A responsive personal portfolio website for **Veerasurya A**, Assistant System Engineer Trainee at Tata Consultancy Services (TCS), with a Computer Science background and full-stack development experience.

🌐 **Live website:** https://veera-folio.vercel.app/  
💻 **GitHub:** https://github.com/Veerasuryahub  
🔗 **LinkedIn:** https://www.linkedin.com/in/link2veera/

## Overview

This lightweight static portfolio is built with HTML, CSS and vanilla JavaScript. It is deployed on Vercel and uses Firebase Authentication and Cloud Firestore for the private admin inbox and public contact form.

The website presents professional experience, education, technical skills, selected personal projects, certifications and contact information. TCS experience is described as a training and learning role; it does not claim an unassigned TCS project.

## Features

- Responsive layout for desktop, tablet and mobile.
- Hero, About, Experience, Education, Skills, Projects, Certifications and Contact sections.
- Project category filters: Full Stack, AI & Data, and Web Apps.
- Accessible mobile navigation, keyboard focus styles and reduced-motion support.
- SEO metadata, Open Graph/Twitter previews, canonical URL, robots.txt and sitemap.xml.
- Contact form submissions stored in Cloud Firestore.
- Private admin inbox protected by Firebase Authentication and Firestore security rules.
- Vercel response security headers and static-asset caching.

## Technology stack

| Area | Technology |
|---|---|
| Structure | HTML5 |
| Styling | CSS3, responsive Grid and Flexbox |
| Interactions | Vanilla JavaScript (ES6+) |
| Fonts | Google Fonts — Inter and Playfair Display |
| Contact form / inbox | Firebase Authentication, Cloud Firestore |
| Hosting / deployment | Vercel + GitHub integration |

## Repository structure

```text
Veera_folio/
├── index.html                 # Main portfolio page
├── admin.html                 # Admin sign-in and inbox UI
├── assets/
│   ├── profile.png            # Profile photograph
│   ├── profile-placeholder.svg
│   └── vs-logo.svg            # Brand mark / favicon
├── css/
│   └── style.css              # Styles and responsive layout
├── js/
│   ├── admin.js               # Firebase Auth and admin inbox
│   ├── contact.js             # Contact form validation and submission
│   ├── firebase-config.js     # Public Firebase web-app configuration
│   └── main.js                # Navigation, reveal effects and project filters
├── firestore.rules            # Firestore access-control rules
├── firestore.indexes.json     # Firestore index configuration
├── firebase.json              # Firebase CLI configuration
├── vercel.json                # Vercel rewrites and response headers
├── robots.txt                 # Search crawler rules
├── sitemap.xml                # Public page sitemap
└── README.md
```

## Run locally

This is a static site; no Node.js build step is required.

1. Clone the repository:

   ```bash
   git clone https://github.com/Veerasuryahub/Veera_folio.git
   cd Veera_folio
   ```

2. Start a local static server from the repository root:

   ```bash
   python -m http.server 8000
   ```

3. Open http://localhost:8000 in your browser.

You can also use the VS Code Live Server extension. Firebase-backed contact submissions and admin sign-in require a configured Firebase project.

## Firebase setup

### 1. Configure the web app

1. Open the Firebase project console for the portfolio.
2. Confirm that the web app configuration in `js/firebase-config.js` matches the intended Firebase project.
3. The Firebase web API key in this file is a browser identifier, not an admin secret. Restrict it in Google Cloud to the portfolio domains and only the APIs the app needs.
4. Enable **Authentication → Sign-in method → Email/Password**.
5. Enable Cloud Firestore.

### 2. Create the admin account

Create and verify the portfolio owner's Firebase Authentication user:

- **Admin email:** `veerasurya39@gmail.com`
- Use a new, unique password stored in a password manager.
- Verify the email address before using the admin page.

No admin password is stored in this repository. The admin UI signs in through Firebase Authentication, and the Firestore rules only permit the verified admin email to read contact messages.

### 3. Deploy Firestore rules and indexes

Install and authenticate the Firebase CLI, then select the correct Firebase project:

```bash
npm install -g firebase-tools
firebase login
firebase use --add
firebase deploy --only firestore:rules,firestore:indexes
```

**Important:** A GitHub/Vercel deployment does not automatically publish Firestore rules. Deploy the rules to Firebase using the command above. Until the updated rules are deployed, the live Firestore database continues to use its previously published rules.

### 4. Recommended abuse protection

Enable Firebase App Check for the web app (for example, reCAPTCHA Enterprise) and enforce it for Cloud Firestore after testing. The contact form includes basic validation and a honeypot field, but those measures alone are not a substitute for server-side abuse protection.

## Deploy to Vercel

The repository is connected to the Vercel project `veera-folio`.

- Push changes to `main` to trigger a production deployment.
- Vercel serves the static site from the repository root.
- `vercel.json` configures the `/admin` rewrite, security headers and asset caching.
- Verify the latest deployment in the Vercel dashboard after each release.

## Security notes

- Never commit Firebase service-account JSON, private keys, admin passwords, access tokens or `.env` files.
- The Firebase browser API key is visible to visitors by design; secure access with Firebase Authentication, Firestore rules, API-key restrictions and App Check.
- Firestore allows unauthenticated visitors to create only validated contact messages. Only the verified owner account can read them.
- The admin page is not a substitute for Firestore security rules: authorization is enforced by Firebase, not by hiding the admin page.
- The old client-side password check has been removed. If that previously committed password was reused anywhere else, change it there as well.

## Maintenance checklist

- Keep experience dates, role descriptions and education details accurate.
- Add TCS project work only after actual project allocation and delivery.
- Add project screenshots, live demos and concise case studies when available.
- Keep project links and certificates valid.
- Re-test the contact form and admin inbox after changing Firebase rules.
- Check mobile layout, keyboard navigation and reduced-motion behavior before major releases.

---

Built and maintained by **Veerasurya A**.
