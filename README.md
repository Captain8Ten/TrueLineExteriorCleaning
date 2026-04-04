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

### Contact form email (separate Worker — required)

Cloudflare **Pages** builds reject `[[send_email]]` in `wrangler.toml`, and the **Send Email** binding often does **not** appear on Pages Functions (`env.NOTIFY` stays `undefined`).  

Quote requests are handled by a **standalone Worker** in **`email-worker/`**, where **`send_email` works** in `wrangler.toml`.

**1. Email Routing (zone)**  
- **Email Routing** on `truelineexteriorcleaning.com` with **`tlink1776@gmail.com`** verified as a **destination**.  
- **From** address for sends: **`contact@truelineexteriorcleaning.com`** (edit `email-worker/wrangler.toml` `[vars]` if you change addresses).

**2. Deploy the mail Worker**

```bash
npm run deploy:email
```

Note the **`*.workers.dev`** URL Wrangler prints (e.g. `https://trueline-contact-email.<account>.workers.dev`).

**3. Connect the website to the Worker — pick one**

- **Option A — Custom route (recommended, no rebuild):**  
  **Workers & Pages** → **trueline-contact-email** → **Settings** → **Triggers** → **Routes** → **Add route**  
  - Route: `www.truelineexteriorcleaning.com/api/contact` (or `*truelineexteriorcleaning.com/api/contact*` per Cloudflare’s pattern help).  
  The React app already POSTs to **`/api/contact`** on the same host, so no env var is needed.

- **Option B — workers.dev URL:**  
  In **Cloudflare Pages** → your site → **Settings** → **Environment variables** → **Build** (or **Production** if you inject at build time), set  
  `VITE_CONTACT_API_URL` = your Worker’s `https://....workers.dev` URL  
  Redeploy the **Pages** project so Vite bakes it in.

**4. CORS** — `email-worker/wrangler.toml` lists **`ALLOWED_ORIGIN`** for `www` and apex. Adjust if your live URL differs.

**5. Local dev** — Terminal A: `npm run dev`. Terminal B: `npm run email:dev` (Worker on port **8787**). Vite proxies `/api/contact` → the Worker.

**Docs:** [Send emails from Workers](https://developers.cloudflare.com/email-routing/email-workers/send-email-workers/)

## Project Structure

```
TrueLine/
├── email-worker/          # Cloudflare Worker: contact form → Email Routing (NOTIFY)
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

