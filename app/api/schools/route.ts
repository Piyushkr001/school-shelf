/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/schools/route.ts
import { NextResponse } from "next/server"
import { pool } from "@/lib/db"
import fs from "fs/promises"
import path from "path"

export const runtime = "nodejs" // needed for fs

// Small helper for consistent JSON responses
function reply(status: number, where: string, extra: Record<string, any> = {}) {
  return NextResponse.json({ ok: status < 400, where, ...extra }, { status })
}

/* ------------------------------- POST /create ------------------------------ */
export async function POST(req: Request) {
  try {
    // 1) Parse form data
    let formData: FormData
    try {
      formData = await req.formData()
    } catch (e: any) {
      console.error("FORM_PARSE_ERROR:", e?.message || e)
      return reply(400, "form_parse", { error: "Invalid multipart/form-data" })
    }

    const name = String(formData.get("name") || "").trim()
    const address = String(formData.get("address") || "").trim()
    const city = String(formData.get("city") || "").trim()
    const state = String(formData.get("state") || "").trim()
    const contact = String(formData.get("contact") || "").trim()
    const email_id = String(formData.get("email_id") || "").trim()
    const file = formData.get("image") as File | null

    if (!name || !address || !city || !state || !contact || !email_id || !file) {
      return reply(400, "validate_required", { error: "Missing required fields" })
    }

    // 2) Validate image (type + size)
    const allowed = ["image/png", "image/jpeg", "image/jpg", "image/webp"]
    if (!file.type || !allowed.includes(file.type)) {
      return reply(400, "validate_image_type", {
        error: `Unsupported image type: ${file.type || "unknown"}`,
      })
    }
    const maxBytes = 5 * 1024 * 1024 // 5MB
    if ((file as any).size && (file as any).size > maxBytes) {
      return reply(400, "validate_image_size", { error: "Max image size is 5MB" })
    }

    // 3) Save file under public/schoolImages
    let imagePath = ""
    try {
      const imagesDir = path.join(process.cwd(), "public", "schoolImages")
      await fs.mkdir(imagesDir, { recursive: true })

      const safeName = (file.name || "image").replace(/[^a-zA-Z0-9.\-_]/g, "_")
      const filename = `${Date.now()}_${safeName}`
      const filepath = path.join(imagesDir, filename)

      const buffer = Buffer.from(await file.arrayBuffer())
      await fs.writeFile(filepath, buffer)

      imagePath = `/schoolImages/${filename}`
    } catch (fileErr: any) {
      console.error("FILE_WRITE_ERROR:", fileErr?.message || fileErr)
      return reply(500, "file_write", { error: "Failed to save image to disk" })
    }

    // 4) Insert row
    try {
      const [result]: any = await pool.execute(
        `INSERT INTO schools (name, address, city, state, contact, image, email_id)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [name, address, city, state, contact, imagePath, email_id]
      )

      return reply(201, "ok", {
        message: "School added successfully.",
        id: result?.insertId ?? null,
        image: imagePath,
      })
    } catch (dbErr: any) {
      console.error("DB_INSERT_ERROR:", dbErr?.code || dbErr?.message || dbErr)
      return reply(500, "db_insert", { error: dbErr?.code || dbErr?.message || "DB insert failed" })
    }
  } catch (err: any) {
    console.error("POST /api/schools UNEXPECTED:", err?.message || err)
    return reply(500, "unexpected", { error: err?.message || "Server error" })
  }
}

/* -------------------------------- GET /list ------------------------------- */
/** Supports:
 *   q?     -> search in name/city/address
 *   page?  -> default 1
 *   limit? -> default 9 (max 24)
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const q = (searchParams.get("q") || "").trim()
    const pageNum = Number.parseInt(searchParams.get("page") || "1", 10)
    const limitNum = Number.parseInt(searchParams.get("limit") || "9", 10)

    const page = Number.isFinite(pageNum) && pageNum > 0 ? pageNum : 1
    const limit = Number.isFinite(limitNum) ? Math.min(Math.max(limitNum, 1), 24) : 9
    const offset = (page - 1) * limit

    const selectCols = "id, name, address, city, image"

    const whereClauses: string[] = []
    const params: any[] = []
    if (q) {
      whereClauses.push("(name LIKE ? OR city LIKE ? OR address LIKE ?)")
      params.push(`%${q}%`, `%${q}%`, `%${q}%`)
    }
    const whereSQL = whereClauses.length ? `WHERE ${whereClauses.join(" AND ")}` : ""

    try {
      const [rows] = await pool.query(
        `SELECT ${selectCols}
         FROM schools
         ${whereSQL}
         ORDER BY id DESC
         LIMIT ? OFFSET ?`,
        [...params, limit, offset]
      )

      const [cnt]: any = await pool.query(
        `SELECT COUNT(*) AS total FROM schools ${whereSQL}`,
        params
      )
      const total = cnt?.[0]?.total ?? 0
      const pages = Math.max(Math.ceil(total / limit), 1)

      return reply(200, "ok", { items: rows, total, page, pages, limit })
    } catch (dbErr: any) {
      console.error("GET DB_ERROR:", dbErr?.code || dbErr?.message || dbErr)
      return reply(500, "db_read", { error: dbErr?.code || dbErr?.message || "DB read failed" })
    }
  } catch (err: any) {
    console.error("GET /api/schools UNEXPECTED:", err?.message || err)
    return reply(500, "unexpected", { error: err?.message || "Server error" })
  }
}
