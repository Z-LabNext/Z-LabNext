import { defineConfig } from "vitepress";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  title: "Z-LabNext",
  description: "keep improving",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "ztool", link: "/ztool/tool/quick-start" },
    ],

    sidebar: {
      "/ztool/": [
        {
          text: "ztool",

          items: [
            {
              text: "tool",
              items: [
                { text: "快速上手", link: "/ztool/tool/quick-start" },
                { text: "API", link: "/ztool/tool/api" },
              ],
            },
            {
              text: "merger",
              items: [
                { text: "快速上手", link: "/ztool/merger/quick-start" },
                { text: "API", link: "/ztool/merger/api" },
              ],
            },
          ],
        },
      ],
    },

    socialLinks: [{ icon: "github", link: "https://github.com/Z-LabNext" }],

    search: {
      provider: "local",
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
  },
  vite: {
    resolve: {
      extensions: [".ts", ".js", ".vue"],
      alias: {
        "@": path.resolve(__dirname, "../"),
      },
    },
  },
  lastUpdated: true,
});
