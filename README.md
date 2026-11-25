# Veerasurya — Personal Portfolio

A responsive personal portfolio website for **Veerasurya A**, Assistant System Engineer Trainee at Tata Consultancy Services (TCS), with a Computer Science background and full-stack development experience.

🌐 **Live website:** https://veera-folio.vercel.app/  
💻 **GitHub:** https://github.com/Veerasuryahub  
🔗 **LinkedIn:** https://www.linkedin.com/in/link2veera/

## Overview

This lightweight static portfolio is built with HTML, CSS and vanilla JavaScript. It is deployed on Vercel and uses Supabase Authentication and PostgreSQL for the private admin inbox and public contact form.

The website presents professional experience, education, technical skills, selected personal projects, certifications and contact information. TCS experience is described as a training and learning role; it does not claim an unassigned TCS project.

## Features

- Responsive layout for desktop, tablet and mobile.
- Hero, About, Experience, Education, Skills, Projects, Certifications and Contact sections.
- Project category filters: Full Stack, AI & Data, and Web Apps.
- Accessible mobile navigation, keyboard focus styles and reduced-motion support.
- SEO metadata, Open Graph/Twitter previews, canonical URL, robots.txt and sitemap.xml.
- Contact form submissions stored in Supabase PostgreSQL with Row Level Security (RLS).
- Private admin inbox protected by Supabase Auth and database RLS policies.
- Vercel response security headers and static-asset caching.

## Technology stack

| Area | Technology |
|---|---|
| Structure | HTML5 |
| Styling | CSS3, responsive Grid and Flexbox |
| Interactions | Vanilla JavaScript (ES6+) |
| Fonts | Google Fonts — Inter and Playfair Display |
| Contact form / inbox | Supabase Auth, PostgreSQL, Row Level Security |
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
│   ├── admin.js               # Supabase Auth and admin inbox
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

You can also use the VS Code Live Server extension. Supabase-backed contact submissions and admin sign-in require the Supabase project and an owner Auth user to be configured.

## Supabase setup

The production portfolio backend is configured to use the Supabase project:

- **Project:** `veera-portfolio`
- **Region:** Mumbai (`ap-south-1`)
- **Project URL:** `https://xmqdfvlsyckqbyeqagig.supabase.co`
- **Admin email:** `veerasurya39@gmail.com`

### 1. Create the owner account

In the Supabase Dashboard, open **Authentication → Users → Add user** and invite or create the owner account using the admin email above. Set a unique password and verify the email. Public sign-ups should remain disabled; do not expose an open registration flow.

### 2. Configure Auth redirect URLs

In **Authentication → URL Configuration**:

- Set the Site URL to `https://veera-folio.vercel.app`.
- Add `https://veera-folio.vercel.app/admin.html` to the allowed redirect URLs.
- If using a Vercel preview deployment, add that exact preview origin only when needed for testing.

The admin page includes a **Forgot password?** action. Password reset emails return to `/admin.html`, where the new password can be set.

### 3. Database security

The `public.contact_messages` table is created with:

- Row Level Security enabled.
- Anonymous users may insert validated contact messages only.
- Only the authenticated owner email `veerasurya39@gmail.com` may read, update or delete messages.
- No public read policy exists.

The browser uses the Supabase **publishable** key in `js/supabase-client.js`. Never place a Supabase `service_role` or secret key in frontend code or GitHub.

### 4. Existing Firebase data

The old Firebase project and its data have not been deleted. Existing Firestore messages have not been copied automatically; keep Firebase intact until you decide whether any historical messages need exporting and importing. The old Firebase configuration file is no longer loaded by the website.

### 5. Local testing

Run a static server as described above, then test:
- Submit a contact form message.
- Sign in to `/admin.html` with the owner Auth account.
- Mark a message read/unread and delete a test message.
- Use the password reset flow.

Basic validation and a honeypot are included. For stronger spam protection, add a server-verified CAPTCHA or rate-limited Edge Function before the form receives significant public traffic.

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
- Re-test the contact form, admin inbox and password reset flow after changing Supabase Auth or RLS settings.
- Check mobile layout, keyboard navigation and reduced-motion behavior before major releases.

---

Built and maintained by **Veerasurya A**.
