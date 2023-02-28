import { navbar } from "vuepress-theme-hope";

export default navbar([
    "/",
    {
        text: "代码开发",
        link: "/code/",
        icon: "code"
    },
    {
        text: "常用操作",
        link: "/common-operations/",
        icon: "operate"
    },
    {
        text: "常用模版",
        link: "/templates/",
        icon: "template"
    }
])