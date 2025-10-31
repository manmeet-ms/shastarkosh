import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useState } from "react";

import ProtectedLayout from "@/components/ProtectedLayout.jsx";
import { createResourceMaterialSrv } from "@/services/resourceMaterial.service.js";

export const Route = createFileRoute("/app/resources/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      region: "",
      culture: "",
      timePeriod: "",
      yearEstimated: "",
      category: "",
      tags: "",
      sourceTitle: "",
      sourceAuthor: "",
      sourceLink: "",
      sourcePublication: "",
      sourceYear: "",
      mainImage: null,
      images: [],
      videos: [],
      pdfFile: null,
    },
  });

  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [videoPreviews, setVideoPreviews] = useState([]);
  const [pdfName, setPdfName] = useState("");

  const MAX_SIZE = 10 * 1024 * 1024; // 10MB

  const onSubmit = async (data) => {
    // Client-side validation for file sizes and types
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("region", data.region || "");
    formData.append("culture", data.culture || "");
    formData.append("timePeriod", data.timePeriod || "");
    if (data.yearEstimated) formData.append("yearEstimated", String(data.yearEstimated));
    formData.append("category", data.category || "");
    formData.append("tags", data.tags || "");
    formData.append("sourceTitle", data.sourceTitle || "");
    formData.append("sourceAuthor", data.sourceAuthor || "");
    formData.append("sourceLink", data.sourceLink || "");
    formData.append("sourcePublication", data.sourcePublication || "");
    if (data.sourceYear) formData.append("sourceYear", String(data.sourceYear));

    const tooBig = (file) => file && file.size > MAX_SIZE;

    if (data.mainImage?.[0]) {
      if (tooBig(data.mainImage[0])) return alert("Main image must be under 10MB");
      formData.append("mainImage", data.mainImage[0]);
    }

    if (data.images) {
      for (const file of Array.from(data.images)) {
        if (tooBig(file)) return alert("Each image must be under 10MB");
        formData.append("images", file);
      }
    }

    if (data.videos) {
      for (const file of Array.from(data.videos)) {
        if (tooBig(file)) return alert("Each video must be under 10MB");
        formData.append("videos", file);
      }
    }

    if (data.pdfFile?.[0]) {
      if (tooBig(data.pdfFile[0])) return alert("PDF must be under 10MB");
      formData.append("pdfFile", data.pdfFile[0]);
    }

    try {
      const res = await createResourceMaterialSrv(formData);
      if (res.status === 201 || res.data?.success) {
        reset();
        navigate("/app/resources");
      }
    } catch (err) {
      console.error("Resource create failed:", err);
    }
  };

  return (
    <ProtectedLayout>
      <form className="p-12 pb-24 flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        {/* Files */}
        <div className="flex flex-col gap-2">
          <Label>Main Image</Label>
          <Input
            type="file"
            accept="image/*"
            {...register("mainImage")}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const url = URL.createObjectURL(file);
                setMainImagePreview(url);
              } else {
                setMainImagePreview(null);
              }
            }}
          />
          {mainImagePreview && (
            <img alt="preview" src={mainImagePreview} className="h-32 w-32 object-cover rounded" />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>Gallery Images</Label>
          <Input
            type="file"
            accept="image/*"
            multiple
            {...register("images")}
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              const urls = files.map((f) => URL.createObjectURL(f));
              setImagePreviews(urls);
            }}
          />
          {imagePreviews.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {imagePreviews.map((src, i) => (
                <img key={i} src={src} className="h-20 w-20 object-cover rounded" />
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>Videos</Label>
          <Input
            type="file"
            accept="video/*"
            multiple
            {...register("videos")}
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              const urls = files.map((f) => URL.createObjectURL(f));
              setVideoPreviews(urls);
            }}
          />
          {videoPreviews.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {videoPreviews.map((src, i) => (
                <video key={i} src={src} className="h-24" controls />
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>PDF</Label>
          <Input
            type="file"
            accept="application/pdf"
            {...register("pdfFile")}
            onChange={(e) => setPdfName(e.target.files?.[0]?.name || "")}
          />
          {pdfName && <div className="text-sm text-muted-foreground">{pdfName}</div>}
        </div>
        {/* Title */}
        <div className="flex flex-col gap-2">
          <Label>Title</Label>
          <Input {...register("title", { required: "Title is required" })} placeholder="Title" />
          {errors.title && <span className="text-red-500">{errors.title.message}</span>}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <Label>Description</Label>
          <Textarea {...register("description", { required: "Description is required" })} />
          {errors.description && <span className="text-red-500">{errors.description.message}</span>}
        </div>

        {/* Origin */}
        <h3 className="font-semibold mt-4">Origin</h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-2">
            <Label>Region</Label>
            <Input {...register("region")} />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Culture</Label>
            <Input {...register("culture")} />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Time Period</Label>
            <Input {...register("timePeriod")} />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Year Estimated</Label>
            <Input {...register("yearEstimated")} type="number" />
          </div>
        </div>

        {/* Sources */}
        <h3 className="font-semibold mt-4">Sources</h3>
        <div className="flex flex-col gap-2">
          <Label>Title</Label>
          <Input {...register("sourceTitle")} />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Author</Label>
          <Input {...register("sourceAuthor")} />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Link</Label>
          <Input {...register("sourceLink")} />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Publication</Label>
          <Input {...register("sourcePublication")} />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Year</Label>
          <Input {...register("sourceYear")} type="number" />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-2">
          <Label>Category</Label>
          <Input {...register("category")} />
        </div>

        {/* Tags */}
        <div className="flex flex-col gap-2">
          <Label>Tags</Label>
          <Input {...register("tags")} placeholder="comma separated list" />
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </ProtectedLayout>
  );
}
