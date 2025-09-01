/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
  UploadCloud,
  Building2,
  MapPin,
  Map,
  Phone,
  Mail,
  ImageIcon,
  CheckCircle2,
} from "lucide-react"

const schema = z.object({
  name: z.string().min(2, "School name is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  contact: z
    .string()
    .min(7, "Contact number is too short")
    .max(15, "Contact number is too long")
    .regex(/^[0-9+\-()\s]+$/, "Invalid contact number"),
  email_id: z.string().email("Invalid email"),
  image: z
    .custom<FileList>((v) => v instanceof FileList && v.length > 0, { message: "Image is required" })
    .refine((files) => files && files[0]?.size <= 5 * 1024 * 1024, "Max file size is 5MB")
    .refine(
      (files) =>
        files &&
        ["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(files[0]?.type ?? ""),
      "Only PNG, JPG, JPEG, WEBP allowed"
    ),
})

type FormValues = z.infer<typeof schema>

export default function AddSchoolsPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
    setValue,
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const imageFile = watch("image")
  const [preview, setPreview] = React.useState<string | null>(null)
  const [serverMsg, setServerMsg] = React.useState<{ type: "success" | "error"; text: string } | null>(null)

  React.useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0]
      const url = URL.createObjectURL(file)
      setPreview(url)
      return () => URL.revokeObjectURL(url)
    }
    setPreview(null)
  }, [imageFile])

  const fileInputRef = React.useRef<HTMLInputElement | null>(null)
  const { ref: rhfImageRef, ...imageReg } = register("image")

  const onSubmit = async (values: FormValues) => {
    setServerMsg(null)
    const formData = new FormData()
    formData.append("name", values.name)
    formData.append("address", values.address)
    formData.append("city", values.city)
    formData.append("state", values.state)
    formData.append("contact", values.contact)
    formData.append("email_id", values.email_id)
    formData.append("image", values.image[0])

    try {
      const res = await fetch("/api/schools", { method: "POST", body: formData })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Failed to add school")
      setServerMsg({ type: "success", text: "School added successfully." })
      reset()
      setPreview(null)
      if (fileInputRef.current) fileInputRef.current.value = "" // full reset of native input
    } catch (e: any) {
      setServerMsg({ type: "error", text: e.message || "Something went wrong" })
    }
  }

  // Drag & drop support
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      setValue("image", files as any, { shouldValidate: true })
    }
  }

  return (
    <main className="min-h-[calc(100vh-64px)] bg-[radial-gradient(1200px_600px_at_20%_-10%,hsl(var(--primary)/0.08),transparent),radial-gradient(800px_400px_at_90%_10%,hsl(var(--muted-foreground)/0.08),transparent)]">
      <section className="container mx-auto px-4 py-10">
        {/* header */}
        <div className="mx-auto mb-6 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium">
            <UploadCloud className="h-4 w-4" />
            Add a new school
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Beautiful, Validated School Entry
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Upload an image, fill the details, and save. Your listing appears instantly in the catalog.
          </p>
        </div>

        <Card className="mx-auto max-w-5xl border-0 bg-background/70 shadow-xl ring-1 ring-black/5 backdrop-blur">
          <CardHeader className="border-b bg-gradient-to-r from-primary/10 via-transparent to-transparent">
            <CardTitle className="flex items-center gap-2">
              <UploadCloud className="h-5 w-5 text-primary" />
              Add School
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-8 lg:grid-cols-2">
              {/* LEFT - Form fields */}
              <div className="grid gap-5">
                {/* School Name */}
                <div className="grid gap-2">
                  <Label htmlFor="name">School Name</Label>
                  <div className="relative">
                    <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60" />
                    <Input id="name" placeholder="Springdale High School" className="pl-9" {...register("name")} />
                  </div>
                  {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                </div>

                {/* Address */}
                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3 top-3 h-4 w-4 opacity-60" />
                    <Textarea id="address" rows={3} placeholder="123 Street, Area" className="pl-9" {...register("address")} />
                  </div>
                  {errors.address && <p className="text-xs text-red-500">{errors.address.message}</p>}
                </div>

                {/* City / State */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="city">City</Label>
                    <div className="relative">
                      <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60" />
                      <Input id="city" placeholder="City" className="pl-9" {...register("city")} />
                    </div>
                    {errors.city && <p className="text-xs text-red-500">{errors.city.message}</p>}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="state">State</Label>
                    <div className="relative">
                      <Map className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60" />
                      <Input id="state" placeholder="State" className="pl-9" {...register("state")} />
                    </div>
                    {errors.state && <p className="text-xs text-red-500">{errors.state.message}</p>}
                  </div>
                </div>

                {/* Contact / Email */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="contact">Contact Number</Label>
                    <div className="relative">
                      <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60" />
                      <Input id="contact" placeholder="+91 98765 43210" className="pl-9" {...register("contact")} />
                    </div>
                    {errors.contact && <p className="text-xs text-red-500">{errors.contact.message}</p>}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email_id">Email</Label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60" />
                      <Input id="email_id" type="email" placeholder="school@example.com" className="pl-9" {...register("email_id")} />
                    </div>
                    {errors.email_id && <p className="text-xs text-red-500">{errors.email_id.message}</p>}
                  </div>
                </div>

                {/* Image (drag & drop + input overlay) */}
                <div className="grid gap-2">
                  <Label>School Image</Label>
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={onDrop}
                    className="group relative flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-6 transition hover:bg-muted/40"
                    role="button"
                    aria-label="Upload image"
                  >
                    {preview ? (
                      <div className="relative h-40 w-full overflow-hidden rounded-md">
                        <Image src={preview} alt="Preview" fill className="object-cover" />
                      </div>
                    ) : (
                      <>
                        <ImageIcon className="mb-2 h-8 w-8 opacity-70 group-hover:opacity-100" />
                        <p className="text-sm">
                          Drag & drop an image here, or <span className="underline">browse</span>
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">PNG, JPG, JPEG, WEBP — up to 5MB</p>
                      </>
                    )}

                    {/* CLICKABLE overlay input - no container onClick, so no double-open */}
                    <Input
                      id="image"
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                      className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      ref={(node) => {
                        rhfImageRef(node)
                        fileInputRef.current = node
                      }}
                      {...imageReg}
                    />
                  </div>
                  {errors.image && <p className="text-xs text-red-500">{errors.image.message as string}</p>}
                </div>

                {/* Submit */}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <Button type="submit" disabled={isSubmitting} className="gap-2">
                    {isSubmitting ? "Saving..." : "Save School"}
                    {!isSubmitting && <CheckCircle2 className="h-4 w-4" />}
                  </Button>
                  {serverMsg && (
                    <span className={`text-sm ${serverMsg.type === "success" ? "text-green-600" : "text-red-600"}`}>
                      {serverMsg.text}
                    </span>
                  )}
                </div>
              </div>

              {/* RIGHT - Live preview card */}
              <div className="grid">
                <div className="h-fit rounded-2xl border bg-card/60 p-4 shadow-sm backdrop-blur">
                  <div className="relative mb-3 h-44 w-full overflow-hidden rounded-xl bg-muted">
                    {preview ? (
                      <Image src={preview} alt="Preview" fill className="object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                        <span className="flex items-center gap-2 text-sm">
                          <ImageIcon className="h-5 w-5" /> Image preview
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <h3 className="line-clamp-1 text-lg font-semibold">
                      {watch("name") || "School Name"}
                    </h3>
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      {watch("address") || "Address will appear here"}
                    </p>
                    <p className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span className="line-clamp-1">
                        {watch("city") || "City"}, {watch("state") || "State"}
                      </span>
                    </p>
                  </div>
                </div>

                <ul className="mt-4 grid gap-2 text-xs text-muted-foreground">
                  <li>• Use a clear, landscape image for best card fit.</li>
                  <li>• Double-check contact & email—this shows on your school profile.</li>
                </ul>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
