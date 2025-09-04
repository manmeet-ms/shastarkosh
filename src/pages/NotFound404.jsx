import React from 'react'
import { ThemeProvider } from "@/components/theme-provider";
import { Link } from 'react-router';
import { AppHeader } from '../components/Header/AppHeader';

const NotFound404 = () => {
  return (
   <>
   <ThemeProvider>
   <AppHeader/>
   <main className="bg-pattern-404  grid min-h-full  py-24 bg-background changed-px px-4    lg:px-8">
        <div className="  text-center">
          <p className="text-base font-semibold text-primary">404</p>
          <div className='divide-y divide-dashed  h-0.25  my-2 w-24 bg-primary/40 mx-auto ' ></div>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-foreground sm:text-7xl">
            Page not found
          </h1>
          <p className="mt-6 text-lg font-medium  text-foreground/60 sm:text-xl/8">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            
            
              <Link to="/" className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >Go back home</Link>
            <a href="mailto:manmeets.zsh@gmail.com" className="text-sm font-semibold text-foreground">
              Contact support <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
   {/* <AppFooter/> */}
   </ThemeProvider>
      </>
  )
}

export default NotFound404