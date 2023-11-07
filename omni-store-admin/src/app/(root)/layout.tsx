import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

import { prismadb } from "@/lib/prismadb"

interface SetupLayoutProps {
  children: React.ReactNode
}

export default async function SetupLayout({
  children
}: SetupLayoutProps) {
  const { userId } = auth()

  if (!userId) redirect("/sign-in")

  const store = await prismadb.store.findFirst({
    where: {
      user_id: userId
    }
  })

  if (store) redirect(`/${store.id}`)

  return (
    <>
      {children}
    </>
  )
}