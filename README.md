# NovaJAM

NovaJAM is an open-source, Jamstack-based web template designed for building modern landing pages quickly and effectively. Built with Next.js, it offers a developer-first structure, flexible content configuration, and clean, scalable design.

## 🚀 Why NovaJAM?

- ⚡ Fast and Performance-Optimized: Powered by Next.js for server-side rendering and static site generation.
- 🎨 Modern Design System: Clean, minimal, and fully responsive components.
- 🧱 Composable Sections: Modular, reusable sections for building diverse layouts.
- 🛠️ Developer-First Approach: Organized folder structure and TypeScript support.
- 📦 Content Configuration: Manage content through JSON data files.

## 🧰 Tech Stack

- Next.js (version 15, App Router, Server Actions)
- TypeScript
- Tailwind CSS
- Zustand for state management

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

## 🔌 CMS Integration (Pro Version)

The open-source version only supports JSON-based content configuration. For CMS integration (Contentful, Directus) and pre-built layout demos, consider upgrading to NovaJAM Pro.

Learn more about [NovaJAM Pro](https://getnovajam.com)

## 📦 Deployment

Easily deploy to Vercel, Netlify, or other Jamstack platforms. Example for Vercel:

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to open a PR or issue on GitHub.

## 📄 License

This project is open-source under the MIT License. See the LICENSE file for details.

## 💬 Support

Join the discussion or submit an issue on GitHub for questions and support. We'd love to hear from you!
