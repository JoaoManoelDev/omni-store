import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

import { Navbar } from "@/components/navbar"
import { prismadb } from "@/lib/prismadb"

interface DashboardLayoutProps {
  children: React.ReactNode,
  params: {
    storeId: string
  }
}

export default async function DashboardLayout({
  children,
  params
}: DashboardLayoutProps) {
  const { userId } = auth()

  if (!userId) redirect("/sign-in")

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      user_id: userId,
    }
  })

  if (!store) redirect("/")
  
  return (
    <>
      <Navbar />
      {children}
    </>
  )

}