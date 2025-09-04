import { cn } from "@/lib/utils";


import { Link, useLocation } from 'react-router-dom';
import { SIDENAV_DASH } from '../../../shared/app-variables.shared.js';
const BottomNav = () => {
  
    // const [value, setValue] = React.useState(0);
  const pathname = useLocation().pathname; // useLocation().pathname if React Router

  return (
    <>
    
      <section className='fixed text-secondary-foreground/60  container bg-background border-t rounded-md   flex justify-evenly bottom-0 md:hidden '>
      {SIDENAV_DASH.map(({ title, url, icon: Icon }) => {
                      const isActive = pathname === url;
                      if (title !== "Beta" && title !==  "Analytics"&& title !==  "Timeline"&& title !==  "Leaderboard") return (
                        <Link
                          className={cn(
                            "rounded-lg py-2  gap-1 flex flex-col items-center justify-center px-2 text-sm font-medium transition-colors",
                             
                          )}
                          key={url}
                          to={url}>
                          <Icon  className={cn("px-2 py-1.5 rounded-full  w-14 h-8 ",isActive?"text-primary  ":"")} />
                          <span className={cn(
                            "",
                            isActive
                              ? "text-primary"
                              : // ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                " "
                          )}>{title}</span>
                        </Link>
                      );
                    })}
      </section>
   </>

  )
}

export default BottomNav