# TrueLine Exterior Cleaning - React Application

A modern, professional React application for TrueLine Exterior Cleaning, a power washing and exterior cleaning business.

## Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern UI**: Clean, professional design with smooth animations
- **Service Showcase**: Detailed display of all services offered
- **Contact Form**: Interactive contact form for customer inquiries
- **Smooth Scrolling**: Seamless navigation between sections
- **Professional Branding**: Integrated logo and brand colors

## Sections

1. **Hero Section**: Eye-catching landing area with call-to-action buttons
2. **Services**: Comprehensive list of power washing services
3. **About**: Company information and statistics
4. **Contact**: Contact form and business information
5. **Footer**: Additional links and contact details

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

To preview the production build:

```bash
npm run preview
```

### Contact form email (Worker + Pages proxy)

Cloudflare **Pages** cannot use `[[send_email]]` in `wrangler.toml`, and the **Send Email** binding does not attach to Pages Functions reliably.

**How it works now**

1. **`email-worker/`** — A **standalone Worker** sends mail via **`send_email`** / `NOTIFY` in its own `wrangler.toml`.  
2. **`functions/api/contact.js`** — A **Pages Function** that exports **`onRequestPost`** and **`onRequestOptions`**. It **proxies** the browser request to the Worker URL (`EMAIL_WORKER_URL`). That fixes **405** on `POST /api/contact` and works for **apex** and **www** the same way.

**1. Email Routing (zone)**  
- **`tlink1776@gmail.com`** verified as a **destination** in Email Routing.  
- **`contact@truelineexteriorcleaning.com`** in `email-worker/wrangler.toml` as **`CONTACT_FROM`**.

**2. Deploy the mail Worker**

```bash
npm run deploy:email
```

Copy the **`https://trueline-contact-email.<subdomain>.workers.dev`** URL from the output.

**3. Point Pages at that Worker (required)**

Set **`EMAIL_WORKER_URL`** to that URL (no trailing slash):

- In **`wrangler.toml`** under **`[vars]`** (then commit), **or**  
- **Cloudflare Pages** → your project → **Settings** → **Environment variables** → **Production** (and **Preview** if you use it).

Redeploy **Pages** after changing vars.

**4. Remove duplicate routes (if any)**  
If you added a **Worker route** on the zone for `/api/contact`, remove it so **only** the Pages app handles `/api/contact` and proxies to `EMAIL_WORKER_URL`. Otherwise two handlers can conflict.

**5. CORS** — `email-worker/wrangler.toml` **`ALLOWED_ORIGIN`** includes apex + `www`. The proxy forwards the browser **`Origin`** header to the Worker.

**6. Local dev** — Terminal A: `npm run dev` (Vite proxies `/api/contact` → port **8787**). Terminal B: `npm run email:dev`. For the proxy path, set **`EMAIL_WORKER_URL`** in **`wrangler.toml`** to your **deployed** `workers.dev` URL, then run **`npm run pages:dev`** to test the full proxy locally.

**Optional:** Set **`VITE_CONTACT_API_URL`** only if the form should call the Worker **directly** (skip proxy). Default is same-origin **`/api/contact`**.

**Docs:** [Send emails from Workers](https://developers.cloudflare.com/email-routing/email-workers/send-email-workers/)

## Project Structure

```
TrueLine/
├── email-worker/          # Worker: send_email (NOTIFY)
├── functions/api/
│   └── contact.js         # Pages Function: proxy POST → EMAIL_WORKER_URL
├── public/
│   └── TrueLineExteriorCleaningLogo.png
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── Services.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Technologies Used

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **CSS3**: Custom styling with CSS variables
- **React Router DOM**: For navigation (ready for future expansion)

## Customization

### Colors

Edit the CSS variables in `src/index.css`:

```css
:root {
  --primary-blue: #0066cc;
  --dark-blue: #004499;
  --light-blue: #3399ff;
  /* ... */
}
```

### Content

- Update service information in `src/components/Services.jsx`
- Modify company details in `src/components/About.jsx`
- Change contact information in `src/components/Contact.jsx` and `src/components/Footer.jsx`

## License

© 2024 TrueLine Exterior Cleaning. All rights reserved.

