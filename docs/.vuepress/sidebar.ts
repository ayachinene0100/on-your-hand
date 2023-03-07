import { sidebar } from "vuepress-theme-hope";

export default sidebar({
    "/code/": [
        {
            text: "Java",
            icon: "java",
            prefix: "java",
            collapsible: false,
            link: "java",
            children: [
                "common-tools",
                "param-check",
                "best-practice",
                "how-to"
            ]
        }
    ]
})