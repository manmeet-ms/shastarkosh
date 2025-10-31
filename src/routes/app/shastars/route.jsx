import { createFileRoute, Outlet } from '@tanstack/react-router';
import { useEffect, useState } from "react";
import { getShastarSrv } from "@/services/shastarInfo.service.js";

export const Route = createFileRoute('/app/shastars')({
  component: RouteComponent,
})

function RouteComponent() {
   const [shastars, setShastars] = useState([]);
      const getShastarsListinfo = async () => {
        const resShastars = await getShastarSrv(10);
    
        setShastars(resShastars.data);
        console.log("resShastars", shastars);
      };
      useEffect(() => {
        getShastarsListinfo();
      }, []);
    
  return (
      <Outlet/>
  )
}
