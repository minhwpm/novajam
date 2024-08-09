# NovaJAM Project Setup

NovaJAM is an Multi-purpose All-in-One JAMstack Template & Web Page Composer which is built with cutting edge technologies: React, NextJS 14, Typescript, Tailwind and seamlessly integrated with Contentful CMS.

## Getting Started

1. Create `.env` file from `.env.template` file

```bash
cp .env.template .env
```

2. Install dependencies

```bash
yarn
```

3. Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Deployment

Easily deploy your Next.js app with [Vercel](https://vercel.com/new/git/external?repository-url=https://github.com/minhwpm/novajam) by clicking the button below:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/minhwpm/novajam)

## Integrate with [Contentful](https://www.contentful.com/), a Headless CMS

This project is initially served by static data in the format of JSON files, which you can find in [this directory](/src/helpers/query/static-data). However, you can easily integrate it with the leading Headless CMS, Contentful, to leverage its powerful features such as the Page Composing tool, Theme configuration, Form building, User form submissions, etc. Follow these steps:

1. Create a Contentful Account: Sign up for a free [Contentful account](https://www.contentful.com/sign-up/) 
2. Create a Contentful Space: In Contentful, a space acts as a database. Create a new space in your Contentful account.
3. Create a Contentful Delivery API Access Token: Generate an API key under Settings > API keys.
4. Create a Contentful Manangement Personal Access Token: Generate a Personal Access Token under Settings > CMA tokens.
5. Import Content Models and Entries: Follow the [instructions below](##-import-content-models-and-entries-into-contentful) to import content models and entries into your Contentful space.
6. Update Environment Variable 
* Local Development: 
  - Update the `DATA_SOURCE` variable in your `.env` file with `CONTENTFUL`
  - Update `CONTENTFUL_SPACE_ID`, `CONTENTFUL_DELIVERY_API_ACCESS_TOKEN`, and `CONTENTFUL_MANAGEMENT_PERSONAL_ACCESS_TOKEN` with the values generated in steps 2, 3, and 4.
* Vercel (if you choose to deploy with Vercel):
Open the Vercel dashboard, go to Settings > Environment Variables, and update the variables as specified for Local Development.
7. (OPTIONAL) Install Contentful extensions: Follow the [instruction below](##-install-contentful-extensions). Extensions are not required but provide a more intuitive and comfortable editing experience.

## Import Content Models and Entries into Contentful
1. Install Contentful CLI: Ensure you have the Contentful CLI installed locally. Follow the [Contentful CLI installation guide](https://www.contentful.com/developers/docs/tutorials/cli/installation/)
2. Authenticate Contentful CLI: Authenticate the CLI by running the following [Authentication with the Contentful CLI guide](https://www.contentful.com/developers/docs/tutorials/cli/authentication/)
3. Open your terminal and navigate to the directory containing the import [configuration file](/src/helpers/contentful-import/).
  * Update the config with the Contentful values (Space ID, Management Personal Access Token) generated previously
  * Then, run your import:

```bash
contentful space import --config config.json
```

Typically, the import process takes about 10 minutes to complete.

## Install Contentful extensions
THIS IS OPTIONAL. Extensions are not required but provide a more intuitive and comfortable editing experience.

Open Contentful dashboard, go to Apps > Marketplace, search for these 2 extensions (apps)
1. Composer (enables editors to easily create and manage web content in pages, built with structured content): Follow the default prompts to complete the installation.
2. Conditional Fields by Prototyp (add flexibility and customization to your content types with conditional field logic): After following the default prompts to complete the installation, add 2 new rules as shown in the pictures below
* Rule 1
![rule 1](<rule 1.webp>)

* Rule 2
![rule 2](<rule 2.webp>)

## About Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!