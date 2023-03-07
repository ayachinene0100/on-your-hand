import { defineUserConfig } from "vuepress";
import theme from "./theme";
import { searchProPlugin } from "vuepress-plugin-search-pro";

export default defineUserConfig({

    /***** 站点配置 *****/
    // build到本地，通过index.html直接访问时
    // 需将值改为"./"
    // 并取消node_modules/.pnpm/@vuepress+cli@[版本号]/node_modules/@vuepress/cli/dist/index.js中
    // base的startWith("/")校验
    base: "/",
    lang: "zh-CN",
    title: "On your hand",
    description: "工作时的第一手参考资料，记录工作中的各种经验",
    head: [
        ['link', { rel: 'icon', href: '/images/logo.png' }]
    ],

    /***** Dev配置项 *****/
    host: "localhost",
    port: 8080,
    open: true,

    /***** 主题配置 *****/
    theme,

    plugins: [
        searchProPlugin({
            indexContent: true
        })
    ]
})