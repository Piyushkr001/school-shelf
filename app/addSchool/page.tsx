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
import { UploadCloud } from "lucide-react"

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
    } catch (e: any) {
      setServerMsg({ type: "error", text: e.message || "Something went wrong" })
    }
  }

  return (
    <main className="min-h-[calc(100vh-64px)] bg-background">
      <section className="container mx-auto px-4 py-10">
        <Card className="mx-auto max-w-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UploadCloud className="h-5 w-5 text-primary" />
              Add School
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
              {/* Name */}
              <div className="grid gap-2">
                <Label htmlFor="name">School Name</Label>
                <Input id="name" placeholder="e.g., Springdale High School" {...register("name")} />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
              </div>

              {/* Address */}
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" rows={3} placeholder="Street, Area" {...register("address")} />
                {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
              </div>

              {/* City/State */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="City" {...register("city")} />
                  {errors.city && <p className="text-sm text-red-500">{errors.city.message}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" placeholder="State" {...register("state")} />
                  {errors.state && <p className="text-sm text-red-500">{errors.state.message}</p>}
                </div>
              </div>

              {/* Contact / Email */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="contact">Contact Number</Label>
                  <Input id="contact" placeholder="+91 98765 43210" {...register("contact")} />
                  {errors.contact && <p className="text-sm text-red-500">{errors.contact.message}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email_id">Email</Label>
                  <Input id="email_id" type="email" placeholder="school@example.com" {...register("email_id")} />
                  {errors.email_id && <p className="text-sm text-red-500">{errors.email_id.message}</p>}
                </div>
              </div>

              {/* Image */}
              <div className="grid gap-2">
                <Label htmlFor="image">School Image</Label>
                <Input id="image" type="file" accept="image/png,image/jpeg,image/jpg,image/webp" {...register("image")} />
                {errors.image && <p className="text-sm text-red-500">{errors.image.message as string}</p>}
                {preview && (
                  <div className="mt-2 overflow-hidden rounded-md border">
                    <div className="relative h-40 w-full">
                      <Image src={preview} alt="Preview" fill className="object-cover" />
                    </div>
                  </div>
                )}
              </div>

              {/* Submit */}
              <div className="flex items-center gap-3">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save School"}
                </Button>
                {serverMsg && (
                  <p className={`text-sm ${serverMsg.type === "success" ? "text-green-600" : "text-red-600"}`}>
                    {serverMsg.text}
                  </p>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
