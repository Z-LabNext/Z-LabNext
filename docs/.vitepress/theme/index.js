import DefaultTheme from "vitepress/theme";
import ElementPlus from "element-plus";
import "../styles/element/index.scss";
import ToolDemo from "../components/ToolDemo.vue";

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(ElementPlus);
    app.component("ToolDemo", ToolDemo);
  },
};
