import { IconBrandTabler, IconLayoutDashboard, IconMessages, IconPaperclip, IconTrident, IconUser } from "@tabler/icons-react";


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
    title: "Discussion",
    url: "/posts", // TODO make it discussions
    icon: IconMessages,
  },
  {
    title: "Resources",
    url: "/resources",
    icon: IconPaperclip,
  },

  {
    title: "Account",
    url: "/user/account",
    icon: IconUser,
  },

  // {
  //   title: "Beta",
  //   url: "/beta",
  //   icon: IconBrandTabler,
  //   // icon: IconTestPipe,
  // },
  // {
  //   title: "Book Notes",
  //   url: "/book-notes",
  // icon: IconBook,
  // },
];
