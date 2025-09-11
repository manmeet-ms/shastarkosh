
import { createFileRoute } from '@tanstack/react-router'
import { Button } from "@/components/ui/button"
import { useDispatch, useSelector } from "react-redux"
import { Link } from '@tanstack/react-router'
import SparkMD5 from 'spark-md5'
import { faker } from '@faker-js/faker'
import { useState } from 'react'

export const Route = createFileRoute('/beta')({
  component: RouteComponent,
})

function RouteComponent() {
    const dispatch = useDispatch();
    const {user}=useSelector((state)=>state.auth)
  

  const [hashed, setfirst] = useState()
  function name() {
    const hashd=SparkMD5.hash(faker.internet.email())
    setfirst(hashd)

  }
  
  return (
  
    <>
{JSON.stringify(user)}

    </>
  )
}
