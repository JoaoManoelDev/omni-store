import { prismadb } from "@/lib/prismadb"

interface DashboardPageProps {
  params: {
    userId: string
  }
}

export default async function DashboardPage({
  params
}: DashboardPageProps) {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.userId
    }
  })

  return (
    <div>
      Loja ativa: {store?.name}
    </div>
  )
}
