import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  defaultSidebar: [
    {
      type: "category",
      label: "Admin Guides",
      items: [
        "guides/quickstart",
        "guides/exposing",
        "guides/server-troubleshooting",
      ],
    },
    {
      type: "category",
      label: "User Guides",
      items: ["guides/getting-started", "guides/client-troubleshooting"],
    },
    {
      type: "category",
      label: "Installing Drop-app",
      items: [
        "installing-drop-app/index",
        "installing-drop-app/archlinux",
        "installing-drop-app/bazzite-steamdeck",
        "installing-drop-app/macos",
        "installing-drop-app/windows",
      ],
    },
    {
      type: "category",
      label: "Metadata",
      items: ["metadata/giantbomb", "metadata/igdb", "metadata/pcgamingwiki"],
    },
    {
      type: "category",
      label: "Authentication",
      items: ["authentication/simple", "authentication/oidc"],
    },
    {
      type: "category",
      label: "Advanced",
      items: [
        "advanced/building",
        "advanced/building-windows",
        "advanced/certificates",
      ],
    },
    {
      type: "category",
      label: "Documentation",
      items: ["library"],
    },
  ],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

export default sidebars;
