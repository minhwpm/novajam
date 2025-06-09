# 🚀 NovaJAM – Next.js Landing Page Template

NovaJAM is an open-source, Jamstack-based web template designed to help you build modern, performant landing pages quickly. Built with **Next.js 15**, it delivers a clean developer experience, flexible layout system, and scalable design system.

> 🛠️ **Built for Developers. Loved by Makers.**

## ✨ Upgrade to NovaJAM Pro
Build smarter, launch faster. NovaJAM Pro is the premium version of NovaJAM — designed for developers, teams, and startups who want more power, flexibility, and CMS support.

✅ NovaJAM Pro includes:
- All premium modular components & layout variants
- CMS-ready templates (Contentful, Directus & more)
- SEO-optimized blog system
- Theme config, color tokens, border radius options
- Private GitHub access & premium support

🎁 EARLY BIRD OFFER → [View Pro Plans](https://getnovajam.com)

## 🚀 Why NovaJAM?

- ⚡ Fast and Optimized — Powered by Next.js for hybrid SSG + SSR
- 🎨 Modern Design System — Clean, minimal, fully responsive components
- 🧱 Composable Layouts — Mix-and-match section blocks with ease
- 🛠️ Developer-First — Structured for customization with TypeScript
- 📦 Simple Content Config — Driven by flexible JSON files

## 🧰 Tech Stack

- **Framework**: Next.js 15 (App Router, Server Actions)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **State**: Zustand
- **Content**: Static JSON (Pro version adds CMS)

## 🚨 Quick Start

Clone the Repository:

```
git clone https://github.com/minhwpm/novajam.git
cd novajam
```

Install Dependencies:

```
yarn install
```

Run the Development Server:

```
yarn dev
```

Access the app at http://localhost:3000.

## 📁 Project Structure

```
/src
  ├── app            # Next.js App Router structure
  ├── components     # Reusable UI components
  ├── lib            # Utilities and CMS clients
  └── store          # Global state management
```

## ✏️ Content Configuration

NovaJAM leverages JSON data to structure page content. You can find these JSON files in the `/src/lib/query/static-data/pages.json` directory.

```
{
  "title": "SaaS Landing Page",
  "url": "/demo/saas",
  "fontMain": "Poppins",
  "fontHeading": null,
  "colorPrimary": "indigo",
  "colorSecondary": "rose",
  "borderRadius": "large",
  ...
}
```
> Want dynamic content from Contentful or Directus?
> Upgrade to [NovaJAM Pro →](https://getnovajam.com)

## 🔌 CMS Integration (Pro Only)

The open-source version is ideal for simple, JSON-driven pages.

[NovaJAM Pro](https://getnovajam.com) includes:
- CMS-ready layouts and routes
- Pre-integrated content models
- Sample entries for Contentful, Directus, and more

## 📦 Deployment

Easily deploy to Vercel, Netlify, or other Jamstack platforms. Example for Vercel:
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fminhwpm%2Fnovajam)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to open a PR or issue on GitHub.

## 📄 License

MIT License — for the open-source version. See the LICENSE file for details.
Commercial licenses apply to [NovaJAM Pro](https://getnovajam.com).

## 💬 Support

Join the discussion or submit an issue on GitHub for questions and support. We'd love to hear from you!
