import { sidebar } from "vuepress-theme-hope";

export default sidebar([
    {
        text: "Java",
        icon: "java",
        prefix: "code/java",
        collapsible: false,
        link: "code/java",
        children: [
            "null-pointer-processing"
        ]
    }
])