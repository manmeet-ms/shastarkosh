import { IconBrandTabler, IconLayoutDashboard, IconMessages, IconTrident, IconUser } from "@tabler/icons-react";

export const APP_VERSION = "6.0.0";
export const APP_NAME = "Shastarkosh";

export const APP_SHORT_DESCRIPTION = "External motivation is a crutch";
export let USERNAME = "@username";
// no slash!!!
export const BASE_API_URL_SHARED = "http://localhost:3000/api";
// export const BASE_API_URL_SHARED ="https://jathedarbe.onrender.com/api";
// export const BASE_API_URL_SHARED=  process.env.VITE_BACKEND_URL;

export const SIDENAV_DASH = [
  {
    title: "Home",
    url: "/",
    icon: IconLayoutDashboard,
    // icon: LayoutDashboardIcon,
  },
  // {
  //   title: "Submissions",
  //   url: "/submissions",
  //   icon: IconFileSpark,
  //   // icon: PaperclipIcon,
  // },
  {
    title: "Shastars",
    url: "/shastars",
    icon: IconTrident,
  },
  {
    title: "Discussions",
    url: "/discussions",
    icon: IconMessages,
  },

  {
    title: "Account",
    url: "/account",
    icon: IconUser,
  },

  {
    title: "Beta",
    url: "/beta",
    icon: IconBrandTabler,
    // icon: IconTestPipe,
  },
  // {
  //   title: "Book Notes",
  //   url: "/book-notes",
  // icon: IconBook,
  // },
];
