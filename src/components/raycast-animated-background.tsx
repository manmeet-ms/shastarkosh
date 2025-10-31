import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import UnicornScene from "unicornstudio-react";
import React from "react";
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export const HeroRed = () => {

  const { width, height } = useWindowSize();

  return (
    <div className={cn("flex flex-col items-center")}>
        <UnicornScene 
    production={true} projectId="cbmTT38A0CcuYxeiyj5H" width={width} height={height} />
       <h1 className="font-space-mono absolute p-12 left-0 w-[70vw]   font-mono font-medium -tracking-[12px] text-[10rem] leading-36 uppercase">
       
        Recover\<br />ing lost cultures.
            {/* Where systems fail
       Those who just can't  FOcus
       Those who just can't stay FOcused */}

        </h1>
       
       

   </div>
  );
};

