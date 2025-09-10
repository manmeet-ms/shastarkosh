import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { createResourceMaterialSrv } from "../../services/resourceMaterial.service.js";

export const Route = createFileRoute("/resources/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

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
    },
  });

  const onSubmit = async (data) => {
    const formData = {
      title: data.title,
      description: data.description,
      origin: {
        region: data.region,
        culture: data.culture,
        timePeriod: data.timePeriod,
        yearEstimated: data.yearEstimated ? Number(data.yearEstimated) : undefined,
      },
      sources: [
        {
          title: data.sourceTitle,
          author: data.sourceAuthor,
          link: data.sourceLink,
          publication: data.sourcePublication,
          year: data.sourceYear ? Number(data.sourceYear) : undefined,
        },
      ],
      category: data.category,
      tags: data.tags ? data.tags.split(",").map((t) => t.trim()) : [],
      mainImage: "/assets/placeholder-resource.png",
      images: ["/assets/placeholder-resource.png"],
      createdBy: user._id,
    };

    try {
      await createResourceMaterialSrv(formData);
      reset();
      navigate("/resources");
    } catch (err) {
      console.error("Post creation failed:", err);
    }
  };

  return (
    <form className="py-12 flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      {/* Title */}
      <div>
        <Label>Title</Label>
        <Input {...register("title", { required: "Title is required" })} placeholder="Title" />
        {errors.title && <span className="text-red-500">{errors.title.message}</span>}
      </div>

      {/* Description */}
      <div>
        <Label>Description</Label>
        <Textarea {...register("description", { required: "Description is required" })} />
        {errors.description && <span className="text-red-500">{errors.description.message}</span>}
      </div>

      {/* Origin */}
      <h3 className="font-semibold mt-4">Origin</h3>
      <div className="grid grid-cols-2 gap-2">
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
        <div>
          <Label>Year Estimated</Label>
          <Input {...register("yearEstimated")} type="number" />
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
      <div>
        <Label>Year</Label>
        <Input {...register("sourceYear")} type="number" />
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
  );
}
