import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Drop",
  tagline: "An open Steam.",
  favicon: "/drop.svg",

  // Set the production url of your site here
  url: "https://docs.droposs.org",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "Drop-OSS", // Usually your GitHub org/user name.
  projectName: "drop-docs", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    navbar: {
      title: "Drop",
      logo: {
        alt: "Drop icon",
        src: "drop.svg",
      },
      items: [
        {
          type: "doc",
          docId: "guides/quickstart",
          label: "Quickstart",
        },
        {
          type: "docsVersionDropdown",
          position: "right",
        },
        {
          href: "https://forum.droposs.org",
          label: "Forum",
          position: "right",
        },
        {
          href: "https://github.com/Drop-OSS",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Quickstart",
              to: "/docs/guides/quickstart",
            },
            {
              label: "Client Getting Started",
              to: "/docs/guides/client",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Forum",
              href: "https://forum.droposs.org/",
            },
            {
              label: "Discord",
              href: "https://discord.gg/NHx46XKJWA",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/Drop-OSS/",
            },
          ],
        },
      ],
      copyright: `Licensed under GPL-3.0-or-later. Built by the Drop OSS project.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
