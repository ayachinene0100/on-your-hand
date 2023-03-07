import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({

    hostname: "https://localhost:8080",

    navbar,
    navbarLayout: {
        start: ["Brand"],
        center: ["Links"],
        end: ["Search", "Outlook"]
    },
    logo: "/images/logo.png",

    sidebar,
    sidebarSorter: ["readme", "order", "title", "filename"],
    headerDepth: 2,

    pageInfo: ["Author", "Date", "ReadingTime", "Word"],
    
    iconAssets: "iconfont",
    darkmode: "toggle",

    plugins: {
        mdEnhance: {
            codetabs: true
        }
    }
})