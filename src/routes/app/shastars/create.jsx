import ProtectedLayout from "@/components/ProtectedLayout.jsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createShastarSrv } from "@/services/shastarInfo.service.js";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

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
  //   watch(mainImage
  // ,images
  // ,title
  // ,alternativeNames
  // ,description
  // ,type
  // ,subType
  // ,material
  // ,weight
  // ,length
  // ,usage
  // ,region
  // ,culture
  // ,timePeriod
  // ,sourceTitle
  // ,sourceAuthor
  // ,sourceLink
  // ,sourcePublication
  // ,category
  // ,tags)

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
     const res=  await createShastarSrv(formData);
     if (res.status===(200 | 201)){
      navigate("/app/shastars");
     }
      
    } catch (err) {
      console.error("Shastar creation failed:", err);
    }
  };
  // const onSubmit = async (data) => {
  //   const formData = {
  //     title: data.title,
  //     alternativeNames: data.alternativeNames.split(",").map((n) => n.trim()),
  //     description: data.description,
  //     type: data.type,
  //     subType: data.subType,
  //     material: data.material,
  //     weight: data.weight,
  //     length: data.length,
  //     usage: data.usage.split(",").map((u) => u.trim()),
  //     origin: {
  //       region: data.region,
  //       culture: data.culture,
  //       timePeriod: data.timePeriod,
  //     },
  //     sources: [
  //       {
  //         title: data.sourceTitle,
  //         author: data.sourceAuthor,
  //         link: data.sourceLink,
  //         publication: data.sourcePublication,
  //       },
  //     ],
  //     category: data.category,
  //     tags: data.tags.split(",").map((t) => t.trim()),
  //     mainImage: `https://www.gravatar.com/avatar/${SparkMD5.hash(String(faker.number.int({ min: 50, max: 896 })))}?d=retro`,
  //     images: ["/assets/placeholder-weapon.png", "/assets/placeholder-weapon.png", "/assets/placeholder-weapon.png"],
  //     createdBy: user._id,
  //   };

  //   try {
  //     await createShastarSrv(formData);
  //     reset();
  //     navigate("/app/shastars");
  //   } catch (err) {
  //     console.error("Post creation failed:", err);
  //   }
  // };

  return (
    <ProtectedLayout>
      <form className="py-12 mb-24  flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        {/* Title */}
        {/* Main Image (Required) */}

        <div>
          <Label>Main Image</Label>
          <Input type="file" accept="image/*" {...register("mainImage", { required: "Main image is required" })} />
          {errors.mainImage && <span className="text-red-500">{errors.mainImage.message}</span>}
          {mainImagePreview && (
            <div className="mt-2">
              <img src={mainImagePreview} alt="Main preview" className="h-32 w-32 object-cover rounded" />
            </div>
          )}
        </div>

        {/* Additional Images (Optional) */}
        <div>
          <Label>Additional Images (up to 5)</Label>
          <Input type="file" accept="image/*" multiple {...register("images")} />
          {imagePreviews.length > 0 && (
            <div className="mt-2 flex gap-2 flex-wrap">
              {imagePreviews.map((src, i) => (
                <img key={i} src={src} alt={`Preview ${i + 1}`} className="h-20 w-20 object-cover rounded" />
              ))}
            </div>
          )}
        </div>
        <div>
          <Label>Title</Label>
          <Input {...register("title", { required: true })} placeholder="Title" />
          {errors.title && <span className="text-red-500">Title is required</span>}
        </div>

        {/* Alternative Names */}
        <div>
          <Label>Alternative names</Label>
          <Input {...register("alternativeNames")} placeholder="comma separated list" />
        </div>

        {/* Description */}
        <div>
          <Label>Description</Label>
          <Textarea {...register("description", { required: true })} />
        </div>

        {/* Type */}
        <div>
          <Label>Type</Label>
          <select {...register("type", { required: true })} className="border rounded px-2 py-1">
            <option value="">Select type</option>
            <option value="weapon">Weapon</option>
            <option value="tool">Tool</option>
            <option value="armor">Armor</option>
            <option value="manuscript">Manuscript</option>
            <option value="artifact">Artifact</option>
          </select>
        </div>

        {/* Sub Type */}
        <div>
          <Label>Sub type</Label>
          <Input {...register("subType")} placeholder="e.g., sword" />
        </div>

        {/* Material */}
        <div>
          <Label>Material</Label>
          <Input {...register("material")} placeholder="Iron, wood" />
        </div>

        {/* Weight & Length */}
        <div className="flex gap-2">
          <div>
            <Label>Weight</Label>
            <Input {...register("weight")} placeholder="e.g., 1.5 kg" />
          </div>
          <div>
            <Label>Length</Label>
            <Input {...register("length")} placeholder="e.g., 90 cm" />
          </div>
        </div>

        {/* Usage */}
        <div>
          <Label>Usage</Label>
          <Input {...register("usage")} placeholder="comma separated list" />
        </div>

        {/* Origin */}
        <div className="grid grid-cols-3 gap-2">
          <div>
            <Label>Region</Label>
            <Input {...register("region")} />
          </div>
          <div>
            <Label>Culture</Label>
            <Input {...register("culture")} />
          </div>
          <div>
            <Label>Time Period</Label>
            <Input {...register("timePeriod")} />
          </div>
        </div>

        {/* Sources */}
        <h3 className="font-semibold mt-4">Sources</h3>
        <div>
          <Label>Title</Label>
          <Input {...register("sourceTitle")} />
        </div>
        <div>
          <Label>Author</Label>
          <Input {...register("sourceAuthor")} />
        </div>
        <div>
          <Label>Link</Label>
          <Input {...register("sourceLink")} />
        </div>
        <div>
          <Label>Publication</Label>
          <Input {...register("sourcePublication")} />
        </div>

        {/* Category */}
        <div>
          <Label>Category</Label>
          <Input {...register("category")} />
        </div>

        {/* Tags */}
        <div>
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
