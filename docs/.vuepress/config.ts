import { defineUserConfig } from "vuepress";
import theme from "./theme";
import { searchProPlugin } from "vuepress-plugin-search-pro";

export default defineUserConfig({
    base: "/on-your-hand/",
    lang: "zh-CN",
    title: "On your hand",
    description: "工作时的第一手参考资料，记录工作中的各种经验",
    head: [
        ['link', { rel: 'icon', href: '/images/logo.png' }],
        ['link', { rel: 'stylesheet', type: 'text/css', href: '/assets/font/iconfont.css'}]
    ],

    theme,

    plugins: [
        searchProPlugin({
            indexContent: true
        })
    ]
})