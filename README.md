# Veerasurya — Personal Portfolio

A responsive personal portfolio for **Veerasurya A**, Assistant System Engineer – Trainee at Tata Consultancy Services (TCS), with a Computer Science background and hands-on full-stack development experience.

- **Live portfolio:** https://veera-folio.vercel.app/
- **GitHub:** https://github.com/Veerasuryahub
- **LinkedIn:** https://www.linkedin.com/in/link2veera/

## Overview

This is a lightweight static website built with HTML, CSS and vanilla JavaScript. It is deployed on Vercel and uses **Supabase Authentication and PostgreSQL** for the private admin inbox and public contact form.

The portfolio includes professional experience, education, technical skills, selected personal projects, certifications and contact information. TCS experience is accurately presented as a trainee and learning role; no unassigned TCS project is claimed.

## Features

- Responsive portfolio layout for desktop, tablet and mobile.
- About, Experience, Education, Skills, Projects, Certifications and Contact sections.
- Project filters for Full Stack, AI & Data, and Web Apps.
- Accessible navigation, keyboard focus styles and reduced-motion support.
- SEO metadata, Open Graph/Twitter previews, canonical URL, robots.txt and sitemap.xml.
- Contact form with client-side validation and a honeypot field.
- Supabase-backed contact message storage with Row Level Security (RLS).
- Admin sign-in, private inbox, unread status, message deletion and password reset.
- Vercel response security headers and static-asset caching.

## Technology

| Area | Technology |
|---|---|
| Structure | HTML5 |
| Styling | CSS3, Grid and Flexbox |
| Interactions | Vanilla JavaScript (ES modules) |
| Fonts | Google Fonts — Inter and Playfair Display |
| Backend | Supabase Auth and PostgreSQL |
| Security | Supabase Row Level Security |
| Hosting | Vercel, connected to GitHub |

## Repository structure

```text
Veera_folio/
├── index.html                 # Main portfolio page
├── admin.html                 # Private admin sign-in and inbox UI
├── assets/
│   ├── profile.png            # Profile photograph
│   ├── profile-placeholder.svg
│   └── vs-logo.svg            # Brand mark / favicon
├── css/
│   └── style.css              # Responsive styles
├── js/
│   ├── admin.js               # Supabase Auth and inbox operations
│   ├── contact.js             # Contact form validation and submission
│   ├── main.js                # Navigation, reveal effects and filters
│   └── supabase-client.js     # Public Supabase URL and publishable key
├── robots.txt                 # Search crawler rules
├── sitemap.xml                # Public page sitemap
├── vercel.json                # Rewrites and response headers
├── .gitignore
└── README.md
```

## Run locally

No build step or package installation is required.

1. Clone the repository:

   ```bash
   git clone https://github.com/Veerasuryahub/Veera_folio.git
   cd Veera_folio
   ```

2. Start a local static server:

   ```bash
   python -m http.server 8000
   ```

3. Open http://localhost:8000.

Supabase-backed contact submissions and admin sign-in require the configured Supabase project and an authorized admin Auth account.

## Supabase configuration

The production site connects to the Supabase project **veera-portfolio** in the Mumbai region.

- Project URL: `https://xmqdfvlsyckqbyeqagig.supabase.co`
- Browser key: Supabase publishable key in `js/supabase-client.js`
- Admin sign-in email: `veerasurya39@gmail.com`

The publishable key is intended for browser use. **Never put a Supabase secret or service-role key, database password, or admin password in this repository.**

### Database and access

The website uses the `public.contact_messages` table. Row Level Security is enabled.

- Anonymous and authenticated visitors can insert validated contact messages.
- Only the authorized portfolio owner account can read, update or delete messages.
- Public visitors cannot read the inbox.
- The admin UI additionally checks the signed-in email before showing the dashboard.

The current insert policy validates name, email and message lengths. Client-side validation and a honeypot are basic spam controls, not a substitute for server-side rate limiting or CAPTCHA. Consider adding a server-verified anti-spam control if submission abuse becomes an issue.

### Admin account and password reset

The owner account is managed in Supabase Dashboard → Authentication → Users. Public user registration should remain disabled. Use the **Forgot password?** action on `/admin.html` to request a reset email.

In Supabase Dashboard → Authentication → URL Configuration:

- Site URL: `https://veera-folio.vercel.app`
- Add `https://veera-folio.vercel.app/admin.html` to allowed redirect URLs.
- Add a local or Vercel preview URL only when you need to test that exact origin.

Use a unique password and keep it in a password manager, not in GitHub.

### Legacy Firebase project

The portfolio frontend now uses Supabase. Old Firebase configuration and CLI files have been removed from this repository to avoid confusion. The separate Firebase project and any historical Firestore data have **not** been deleted. Export or migrate any old messages you still need before making changes to that Firebase project.

## Deployment

The GitHub repository is connected to the Vercel project `veera-folio`.

- Push changes to `main` to trigger a production deployment.
- Vercel serves the static site from the repository root.
- `vercel.json` configures the `/admin` rewrite, response security headers and static-asset caching.
- Check the Vercel deployment status after each release.

## Maintenance checklist

- Keep role descriptions, dates, education and skills accurate.
- Add TCS project work only after actual project allocation and delivery.
- Keep project links, demos and certificate links valid.
- Add project screenshots and concise case studies as they become available.
- Re-test contact submission, admin sign-in, inbox actions and password reset after backend changes.
- Check mobile layout, keyboard navigation and reduced-motion behavior before major releases.
- Never commit secrets, credentials, private keys, tokens, logs or local environment files.

---

Built and maintained by **Veerasurya A**.
