// TODO add video upload support in coming versions
import ProtectedLayout from "@/components/ProtectedLayout.jsx";
import SectionTitleSubTitle from "@/components/SectionTitleSubTitle.jsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createShastarSrv } from "@/services/shastarInfo.service.js";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export const Route = createFileRoute("/app/shastars/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      alternativeNames: "",
      description: "",
      type: "",
      subType: "",
      material: "",
      weight: "",
      length: "",
      usage: "",
      region: "",
      culture: "",
      timePeriod: "",
      category: "",
      tags: "",
      sourceTitle: "",
      sourceAuthor: "",
      sourceLink: "",
      sourcePublication: "",
    },
  });

  const watchedMainImage = watch("mainImage");
  const watchedImages = watch("images");

  useEffect(() => {
    if (watchedMainImage && watchedMainImage[0]) {
      const url = URL.createObjectURL(watchedMainImage[0]);
      setMainImagePreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setMainImagePreview(null);
    }
  }, [watchedMainImage]);

  useEffect(() => {
    if (watchedImages && watchedImages.length) {
      const urls = Array.from(watchedImages).map((f) => URL.createObjectURL(f));
      setImagePreviews(urls);
      return () => urls.forEach((u) => URL.revokeObjectURL(u));
    } else {
      setImagePreviews([]);
    }
  }, [watchedImages]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("alternativeNames", data.alternativeNames);
    formData.append("description", data.description);
    formData.append("type", data.type);
    formData.append("subType", data.subType);
    formData.append("material", data.material);
    formData.append("weight", data.weight);
    formData.append("length", data.length);
    formData.append("usage", data.usage);
    formData.append("region", data.region);
    formData.append("culture", data.culture);
    formData.append("timePeriod", data.timePeriod);
    formData.append("category", data.category);
    formData.append("tags", data.tags);

    formData.append("sourceTitle", data.sourceTitle);
    formData.append("sourceAuthor", data.sourceAuthor);
    formData.append("sourceLink", data.sourceLink);
    formData.append("sourcePublication", data.sourcePublication);

    if (data.mainImage && data.mainImage[0]) {
      formData.append("mainImage", data.mainImage[0]);
    }

    if (data.images) {
      Array.from(data.images).forEach((file) => {
        formData.append("images", file);
      });
    }

    try {
      const res = await createShastarSrv(formData);
      if (res.status === (200 | 201)) {
        navigate("/app/shastars");
      }
    } catch (err) {
      console.error("Shastar creation failed:", err);
    }
  };

  return (
    <ProtectedLayout>
      <main className="px-4  ">
        <SectionTitleSubTitle title="Create Shastar" subtitle="Create a new shastar" />
        <section>
        <form className=" md:max-w-4xl mx-auto my-10 bg-background border rounded-xl shadow-sm p-8 flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
  {/* Title and Images Card */}
  <div className="bg-muted/40 rounded-lg p-6 flex flex-col gap-5 shadow-xs">
    <div>
      <div className="flex flex-col gap-1 mb-2">
        <Label className="block">Main Image</Label>
        <span className="text-xs text-muted-foreground/80">Best: Clear, front-facing image of the shastar</span>
      </div>
      <Input type="file" accept="image/*" {...register("mainImage", { required: "Main image is required" })} />
      {errors.mainImage && <span className="text-destructive mt-1 block text-sm">{errors.mainImage.message}</span>}
      {mainImagePreview && (
        <div className="mt-3 flex justify-center">
          <img src={mainImagePreview} alt="Main preview" className="h-32 w-32 object-cover rounded-lg border" />
        </div>
      )}
    </div>

    <div>
      <div className="flex flex-col gap-1 mb-2">
        <Label className="block">Additional Images (up to 5)</Label>
        <span className="text-xs text-muted-foreground/80">Optional: Close-ups, angles, in-use, or details</span>
      </div>
      <Input type="file" accept="image/*" multiple {...register("images")} />
      {imagePreviews.length > 0 && (
        <div className="mt-3 flex gap-3 flex-wrap">
          {imagePreviews.map((src, i) => (
            <img key={i} src={src} alt={`Preview ${i + 1}`} className="h-20 w-20 object-cover rounded-lg border" />
          ))}
        </div>
      )}
    </div>
    <div>
      <div className="flex flex-col gap-1 mb-2">
        <Label className="block">Title</Label>
        <span className="text-xs text-muted-foreground/80">e.g., Kirpan, Talwar, Katar</span>
      </div>
      <Input {...register("title", { required: true })} placeholder="Title" />
      {errors.title && <span className="text-destructive mt-1 block text-sm">Title is required</span>}
    </div>
  </div>

  {/* Details Card */}
  <div className="bg-muted/40 rounded-lg p-6 flex flex-col gap-5 shadow-xs">
    <div>
      <div className="flex flex-col gap-1 mb-2">
        <Label className="block">Alternative Names</Label>
        <span className="text-xs text-muted-foreground/80">e.g., Kirpaan, Guru's Sword (comma separated)</span>
      </div>
      <Input {...register("alternativeNames")} placeholder="Comma separated list" />
    </div>
    <div>
      <div className="flex flex-col gap-1 mb-2">
        <Label className="block">Description</Label>
        <span className="text-xs text-muted-foreground/80">Short summary (origin, key features, history)</span>
      </div>
      <Textarea {...register("description", { required: true })} minRows={3} />
    </div>
    <div>
      <div className="flex flex-col gap-1 mb-2">
        <Label className="block">Type</Label>
        <span className="text-xs text-muted-foreground/80">Select main classification</span>
      </div>
      <select {...register("type", { required: true })} className="border rounded-md px-2 py-1 w-full bg-background">
        <option value="">Select type</option>
        <option value="weapon">Weapon</option>
        <option value="tool">Tool</option>
        <option value="armor">Armor</option>
        <option value="manuscript">Manuscript</option>
        <option value="artifact">Artifact</option>
      </select>
    </div>
    <div>
      <div className="flex flex-col gap-1 mb-2">
        <Label className="block">Sub Type</Label>
        <span className="text-xs text-muted-foreground/80">e.g., sword, dagger, shield</span>
      </div>
      <Input {...register("subType")} placeholder="e.g., sword" />
    </div>
  </div>

  <div className="bg-muted/40 rounded-lg p-6 flex flex-col gap-5 shadow-xs">
    <div className="grid grid-cols-2 gap-4">
      <div>
        <div className="flex flex-col gap-1 mb-2">
          <Label className="block">Material</Label>
          <span className="text-xs text-muted-foreground/80">e.g., Iron, steel, wood, brass</span>
        </div>
        <Input {...register("material")} placeholder="Iron, wood" />
      </div>
      <div className="flex gap-3">
        <div className="w-1/2">
          <div className="flex flex-col gap-1 mb-2">
            <Label className="block">Weight</Label>
            <span className="text-xs text-muted-foreground/80">e.g., 1.5 kg</span>
          </div>
          <Input {...register("weight")} placeholder="e.g., 1.5 kg" />
        </div>
        <div className="w-1/2">
          <div className="flex flex-col gap-1 mb-2">
            <Label className="block">Length</Label>
            <span className="text-xs text-muted-foreground/80">e.g., 90 cm</span>
          </div>
          <Input {...register("length")} placeholder="e.g., 90 cm" />
        </div>
      </div>
    </div>
    <div>
      <div className="flex flex-col gap-1 mb-2">
        <Label className="block">Usage</Label>
        <span className="text-xs text-muted-foreground/80">e.g., self-defense, ceremonial, display (comma separated)</span>
      </div>
      <Input {...register("usage")} placeholder="Comma separated list" />
    </div>
  </div>

  {/* Origin Card */}
  <div className="bg-muted/40 rounded-lg p-6 flex flex-col gap-5 shadow-xs">
    <div className="grid grid-cols-3 gap-4">
      <div>
        <div className="flex flex-col gap-1 mb-2">
          <Label className="block">Region</Label>
          <span className="text-xs text-muted-foreground/80">e.g., Punjab, South Asia</span>
        </div>
        <Input {...register("region")} />
      </div>
      <div>
        <div className="flex flex-col gap-1 mb-2">
          <Label className="block">Culture</Label>
          <span className="text-xs text-muted-foreground/80">e.g., Sikh, Rajput, Maratha</span>
        </div>
        <Input {...register("culture")} />
      </div>
      <div>
        <div className="flex flex-col gap-1 mb-2">
          <Label className="block">Time Period</Label>
          <span className="text-xs text-muted-foreground/80">e.g., 18th century, Medieval era</span>
        </div>
        <Input {...register("timePeriod")} />
      </div>
    </div>
  </div>

  {/* Sources Card */}
  <div className="bg-muted/40 rounded-lg p-6 flex flex-col gap-5 shadow-xs">
    <h3 className="font-semibold text-lg mb-3">Sources</h3>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <div className="flex flex-col gap-1 mb-2">
          <Label className="block">Title</Label>
          <span className="text-xs text-muted-foreground/80">Book/article/video/document name</span>
        </div>
        <Input {...register("sourceTitle")} />
      </div>
      <div>
        <div className="flex flex-col gap-1 mb-2">
          <Label className="block">Author</Label>
          <span className="text-xs text-muted-foreground/80">e.g., Dr. Ganda Singh</span>
        </div>
        <Input {...register("sourceAuthor")} />
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <div className="flex flex-col gap-1 mb-2">
          <Label className="block">Link</Label>
          <span className="text-xs text-muted-foreground/80">Paste a URL if available</span>
        </div>
        <Input {...register("sourceLink")} />
      </div>
      <div>
        <div className="flex flex-col gap-1 mb-2">
          <Label className="block">Publication</Label>
          <span className="text-xs text-muted-foreground/80">e.g., Sikh History Journal, 1995</span>
        </div>
        <Input {...register("sourcePublication")} />
      </div>
    </div>
  </div>

  {/* Category & Tags Card */}
  <div className="bg-muted/40 rounded-lg p-6 flex flex-col gap-5 shadow-xs">
    <div className="grid grid-cols-2 gap-4">
      <div>
        <div className="flex flex-col gap-1 mb-2">
          <Label className="block">Category</Label>
          <span className="text-xs text-muted-foreground/80">e.g., Sword, Dagger, Polearm</span>
        </div>
        <Input {...register("category")} />
      </div>
      <div>
        <div className="flex flex-col gap-1 mb-2">
          <Label className="block">Tags</Label>
          <span className="text-xs text-muted-foreground/80">e.g., Sikh, Battle, 1700s, Kirpan (comma separated)</span>
        </div>
        <Input {...register("tags")} placeholder="Comma separated list" />
      </div>
    </div>
  </div>

  <div className="mt-6 flex justify-end">
    <Button type="submit" disabled={isSubmitting} className="px-6 py-2">
      {isSubmitting ? "Submitting..." : "Submit"}
    </Button>
  </div>
</form>

        </section>
      </main>
    </ProtectedLayout>
  );
}
