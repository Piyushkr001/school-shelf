// app/showSchools/page.tsx
import { Suspense } from "react"
import { GridSkeleton } from "./_components/skeleton"
import ShowSchoolsClient from "./_components/client"

export const dynamic = "force-dynamic" // avoid static export issues
export const revalidate = 0            // always fresh

export default function Page() {
  return (
    <Suspense fallback={<GridSkeleton />}>
      <ShowSchoolsClient />
    </Suspense>
  )
}
