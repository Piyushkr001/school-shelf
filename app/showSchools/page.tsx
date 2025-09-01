/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import * as React from "react"
import Image from "next/image"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { MapPin, Search, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react"

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
    <main className="min-h-[calc(100vh-64px)] bg-[radial-gradient(1200px_600px_at_10%_-10%,hsl(var(--primary)/0.08),transparent),radial-gradient(900px_500px_at_100%_0%,hsl(var(--muted-foreground)/0.08),transparent)]">
      <section className="container mx-auto px-4 py-8">
        {/* Header + Search (glass bar) */}
        <div className="mb-8 rounded-2xl border bg-background/60 p-4 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/50">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Browse Schools</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Explore the catalog. Search by <span className="font-medium text-foreground/90">name</span>,{" "}
                <span className="font-medium text-foreground/90">city</span>, or{" "}
                <span className="font-medium text-foreground/90">address</span>.
              </p>
            </div>

            <form onSubmit={onSearch} className="w-full sm:w-auto">
              <div className="flex w-full items-center gap-2 rounded-full border bg-muted/40 p-1 pl-3 sm:min-w-[420px]">
                <Search className="h-4 w-4 opacity-70" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search schools…"
                  className="border-none bg-transparent focus-visible:ring-0"
                />
                <Button type="submit" className="rounded-full px-5">Search</Button>
              </div>
            </form>
          </div>
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

            <PaginationBlock
              page={data!.page}
              pages={data!.pages}
              total={data!.total}
              onChange={(p) => setPage(p)}
            />
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
    <Card className="group overflow-hidden border border-transparent bg-background/70 shadow-sm ring-1 ring-black/5 transition hover:shadow-md">
      <div className="relative h-44 w-full bg-muted">
        <Image
          src={s.image || "/Images/placeholder.jpg"}
          alt={s.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
        {/* subtle gradient overlay for legibility */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />
      </div>

      <CardContent className="p-4">
        <h3 className="line-clamp-1 text-base font-semibold tracking-tight">{s.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{s.address}</p>
        <div className="mt-2 inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          <span className="max-w-[180px] truncate">{s.city}</span>
        </div>
      </CardContent>
    </Card>
  )
}

function GridSkeleton() {
  return (
    <>
      {/* shimmering heading bar skeleton */}
      <div className="mb-6">
        <Skeleton className="h-8 w-48" />
        <div className="mt-2 flex gap-2">
          <Skeleton className="h-3 w-40" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>

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
    </>
  )
}

function EmptyState({ query }: { query: string }) {
  return (
    <div className="mx-auto max-w-xl rounded-2xl border bg-background/60 p-10 text-center shadow-sm backdrop-blur">
      <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-muted/60" />
      <h3 className="text-lg font-semibold">No schools found</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {query ? (
          <>We couldn’t find results for “{query}”. Try a different search.</>
        ) : (
          <>Once you add schools, they’ll appear here. Try adding your first one!</>
        )}
      </p>
      <div className="mt-4 text-xs text-muted-foreground">
        Tip: search by <span className="font-medium text-foreground/90">city</span> or{" "}
        <span className="font-medium text-foreground/90">address</span> for broader results.
      </div>
    </div>
  )
}

/* ------------------------- Pretty Pagination Block ------------------------ */

function PaginationBlock({
  page,
  pages,
  total,
  onChange,
}: {
  page: number
  pages: number
  total: number
  onChange: (p: number) => void
}) {
  // build a compact range like [1, …, 4, 5, 6, …, 12]
  const windowSize = 1
  const numbers = React.useMemo(() => {
    const items: (number | string)[] = []
    const push = (v: number | string) => items[items.length - 1] !== v && items.push(v)

    for (let p = 1; p <= pages; p++) {
      if (p === 1 || p === pages || (p >= page - windowSize && p <= page + windowSize)) {
        push(p)
      } else if (items[items.length - 1] !== "…") {
        push("…")
      }
    }
    return items
  }, [page, pages])

  return (
    <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
      <p className="text-sm text-muted-foreground">
        Page <span className="font-medium text-foreground">{page}</span> of{" "}
        <span className="font-medium text-foreground">{pages}</span> ·{" "}
        <span className="font-medium text-foreground">{total}</span>{" "}
        result{total === 1 ? "" : "s"}
      </p>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          disabled={page <= 1}
          onClick={() => onChange(1)}
          aria-label="First page"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          disabled={page <= 1}
          onClick={() => onChange(Math.max(page - 1, 1))}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {numbers.map((n, i) =>
          n === "…" ? (
            <span key={`el-${i}`} className="px-1 text-muted-foreground">…</span>
          ) : (
            <Button
              key={n}
              variant={n === page ? "default" : "outline"}
              size="sm"
              className="h-8 min-w-8 px-3"
              onClick={() => onChange(n as number)}
              aria-current={n === page ? "page" : undefined}
            >
              {n}
            </Button>
          )
        )}

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          disabled={page >= pages}
          onClick={() => onChange(Math.min(page + 1, pages))}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          disabled={page >= pages}
          onClick={() => onChange(pages)}
          aria-label="Last page"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
