// // import { useEffect } from 'react'

// // export function useKeyPress(callback, keyCodes) {
// //   useEffect(() => {
// //     const handler = (event) => {
// //       if (keyCodes.includes(event.code) && !event.shiftKey && !event.ctrlKey && !event.metaKey && !event.altKey) {
// //         callback(event)
// //       }
// //     }

// //     window.addEventListener('keydown', handler, { passive: true })
// //     return () => {
// //       window.removeEventListener('keydown', handler)
// //     }
// //   }, [callback, keyCodes])
// // }

// const btn = document.querySelector("#onEnterPress");
// logger("log",btn);

// btn.addEventListener("keydown", (event) => {
//   if (event.key === "Enter") {
//     logger("log",event, "Enter key pressed ");
//   }
// });

export const keypressAction=(key, action)=>{
  return (event) => {
    if (event.key === key) {
      action(event);
    }
  };
};
