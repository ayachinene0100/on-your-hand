import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({

    /***** 主题基本选项 *****/
    hostname: "https://localhost:8080",
    author: {
        name: "liy_1330",
        email: "liy_1330@bankcomm.com"
    },

    /***** 主题布局选项 *****/
    // 导航栏
    navbar,
    navbarIcon: true,
    navbarLayout: {
        start: ["Brand"],
        center: ["Links"],
        end: ["Search", "Outlook"]
    },
    logo: "/images/logo.png",
    repo: "liy_1330/on-your-hand",
    repoDisplay: true,
    navbarAutoHide: "mobile",
    hideSiteNameOnMobile: true,

    // 侧边栏
    sidebar,
    sidebarIcon: true,
    sidebarSorter: ["readme", "order", "title", "filename"],
    headerDepth: 2,

    // 路径导航
    breadcrumb: true,
    breadcrumbIcon: true,
    prevLink: true,
    nextLink: true,

    // 标题
    titleIcon: true,
    pageInfo: ["Author", "Date", "Category", "Tag", "ReadingTime", "Word"],
    
    // Meta
    lastUpdated: true,
    contributors: true,
    editLink: true,
    docsRepo: "https://.git",
    docsBranch: "main",
    docsDir: "on-your-hand/docs",

    // 页脚
    footer: "",
    copyright: "Copyright © liy_1330",
    displayFooter: false,

    // 杂项
    home: "/",
    rtl: false,
    toc: true,

    /***** 主题外观选项 *****/
    iconAssets: "iconfont",
    darkmode: "toggle",
    themeColor: false,
    fullscreen: false,
    backToTop: true,
    mobileBreakPoint: 719,
    wideBreakPoint: 1440,
    pure: false,
    print: false,

    plugins: {
        prismjs: {
        }
    }
})