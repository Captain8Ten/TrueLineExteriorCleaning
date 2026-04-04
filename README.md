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

### Contact form email (Cloudflare Pages + Email Routing)

The site sends quote requests through a **Cloudflare Pages Function** at `/api/contact` using Cloudflare’s **Email Routing** “send email from Workers” feature (no third-party email API).

**One-time setup**

1. Put your domain on Cloudflare and turn on **Email Routing**. Add and verify the inbox where you want leads (this becomes `CONTACT_TO`).
2. Use a **From** address on that same domain (e.g. `quotes@yourdomain.com`). Create it under Email Routing if needed. Set it as `CONTACT_FROM` in `wrangler.toml` `[vars]` or in **Pages → Settings → Environment variables** (production).
3. Edit `wrangler.toml` placeholders: `CONTACT_FROM`, `CONTACT_TO`. Optionally set `ALLOWED_ORIGIN` to your live site URL (e.g. `https://www.yourdomain.com`) so only your site can POST to the API.
4. Deploy with Wrangler or connect the Git repo to **Cloudflare Pages**. Use build command `npm run build` and output directory `dist`. Wrangler will pick up `functions/` and `wrangler.toml`.

**Docs:** [Send emails from Workers](https://developers.cloudflare.com/email-routing/email-workers/send-email-workers/)

**Local testing**

1. Terminal A: `npm run dev` (Vite, port 5173).
2. Terminal B: `npm run pages:dev` (builds, then serves `dist` + Functions on **8788**). Vite proxies `/api/contact` to 8788.

Miniflare cannot run Cloudflare’s `cloudflare:email` module, so **submits from local dev will get a 503** with a short explanation until you deploy. **Use a Cloudflare Pages preview/production URL to test real delivery.**

**Override API URL** (optional): set `VITE_CONTACT_API_URL` in a `.env` file if the form should post somewhere other than `/api/contact`.

## Project Structure

```
TrueLine/
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

