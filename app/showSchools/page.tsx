/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import * as React from "react"
import Image from "next/image"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { MapPin, Search } from "lucide-react"

type School = {
  id: number
  name: string
  address: string
  city: string
  image: string
}

type ApiResponse = {
  ok: boolean
  items: School[]
  total: number
  page: number
  pages: number
  limit: number
}

export default function ShowSchoolsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [q, setQ] = React.useState(searchParams.get("q") || "")
  const [page, setPage] = React.useState(parseInt(searchParams.get("page") || "1", 10) || 1)
  const [data, setData] = React.useState<ApiResponse | null>(null)
  const [loading, setLoading] = React.useState(false)
  const limit = 9

  const fetchData = React.useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (q) params.set("q", q)
      params.set("page", String(page))
      params.set("limit", String(limit))

      const res = await fetch(`/api/schools?${params.toString()}`, { cache: "no-store" })
      const json: ApiResponse = await res.json()
      setData(json)
    } catch {
      setData({ ok: false, items: [], page: 1, pages: 1, total: 0, limit } as any)
    } finally {
      setLoading(false)
    }
  }, [q, page])

  React.useEffect(() => {
    fetchData()
  }, [fetchData])

  // keep URL in sync
  React.useEffect(() => {
    const params = new URLSearchParams()
    if (q) params.set("q", q)
    params.set("page", String(page))
    router.replace(`/showSchools?${params.toString()}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, page])

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
    fetchData()
  }

  const hasResults = (data?.items?.length || 0) > 0

  return (
    <main className="min-h-[calc(100vh-64px)] bg-background">
      <section className="container mx-auto px-4 py-8">
        {/* Header + Search */}
        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="text-2xl font-bold">Browse Schools</h1>

          <form onSubmit={onSearch} className="flex w-full max-w-md items-center gap-2">
            <div className="relative w-full">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by name, city, or address..."
                className="pl-9"
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
        </div>

        {/* Grid */}
        {loading ? (
          <GridSkeleton />
        ) : hasResults ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data!.items.map((s) => (
                <SchoolCard key={s.id} s={s} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Page {data!.page} of {data!.pages} · {data!.total} result{data!.total === 1 ? "" : "s"}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={data!.page <= 1}
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                >
                  Previous
                </Button>
                <Button
                  size="sm"
                  disabled={data!.page >= data!.pages}
                  onClick={() => setPage((p) => Math.min(p + 1, data!.pages))}
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        ) : (
          <EmptyState query={q} />
        )}
      </section>
    </main>
  )
}

function SchoolCard({ s }: { s: School }) {
  return (
    <Card className="overflow-hidden transition hover:shadow-md">
      <div className="relative h-44 w-full bg-muted">
        {/* Image path stored like /schoolImages/xxx.jpg */}
        <Image
          src={s.image || "/Images/placeholder.jpg"}
          alt={s.name}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="line-clamp-1 text-base font-semibold">{s.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{s.address}</p>
        <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span className="line-clamp-1">{s.city}</span>
        </div>
      </CardContent>
    </Card>
  )
}

function GridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 9 }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <Skeleton className="h-44 w-full" />
          <div className="space-y-2 p-4">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </Card>
      ))}
    </div>
  )
}

function EmptyState({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center rounded-md border p-8 text-center">
      <p className="text-lg font-medium">No schools found</p>
      <p className="mt-1 text-sm text-muted-foreground">
        {query ? (
          <>We couldn’t find results for “{query}”. Try a different search.</>
        ) : (
          <>Once you add schools, they’ll appear here.</>
        )}
      </p>
    </div>
  )
}
