import { IconHome2, IconListNumbers, IconMessages, IconPaperclip, IconTrident } from "@tabler/icons-react";

export const SIDENAV_DASH = [
  {
    title: "Home",
    url: "/app",
    icon: IconHome2,
    // icon: LayoutDashboardIcon,
  },
  // {
  //   title: "Submissions",
  //   url: "/app/submissions",
  //   icon: IconFileSpark,
  //   // icon: PaperclipIcon,
  // },
  {
    title: "Shastars",
    url: "/app/shastars",
    icon: IconTrident,
  },
  {
    title: "Discussion",
    url: "/app/posts", // TODO make it discussions
    icon: IconMessages,
  },
  {
    title: "Resources",
    url: "/app/resources",
    icon: IconPaperclip,
  },
  {
    title: "Leaderboard",
    url: "/app/leaderboard",
    icon: IconListNumbers,
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
