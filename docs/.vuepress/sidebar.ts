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
                "design-principle",
                "common-tools",
                "best-practice",
                "how-to"
            ]
        }
    ],
    "/common-operations/": [
        {
            text: "Linux",
            icon: "linux",
            prefix: "linux",
            collapsible: false,
            link: "linux",
            children: [
                "commons",
                "shell-script",
                "vi",
                "ftp"
            ]
        },
        {
            text: "Mysql",
            icon: "mysql",
            prefix: "mysql",
            collapsible: false,
            link: "mysql",
            children: [
                "commons"
            ]
        },
        {
            text: "Intellij IDEA",
            prefix: "intellij",
            collapsible: false,
            link: "intellij",
            children: [
                "commons", "idea-vim"
            ]
        }
    ]
})