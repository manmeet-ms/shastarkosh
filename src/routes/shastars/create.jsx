import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { createShastarSrv } from "../../services/shastarInfo.service.js";
import ProtectedLayout from "../../components/ProtectedLayout.jsx";

export const Route = createFileRoute("/shastars/create")({
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

  const onSubmit = async (data) => {
    const formData = {
      title: data.title,
      alternativeNames: data.alternativeNames.split(",").map((n) => n.trim()),
      description: data.description,
      type: data.type,
      subType: data.subType,
      material: data.material,
      weight: data.weight,
      length: data.length,
      usage: data.usage.split(",").map((u) => u.trim()),
      origin: {
        region: data.region,
        culture: data.culture,
        timePeriod: data.timePeriod,
      },
      sources: [
        {
          title: data.sourceTitle,
          author: data.sourceAuthor,
          link: data.sourceLink,
          publication: data.sourcePublication,
        },
      ],
      category: data.category,
      tags: data.tags.split(",").map((t) => t.trim()),
      mainImage: "/assets/placeholder-weapon.png",
      images: ["/assets/placeholder-weapon.png"],
      createdBy: user._id,
    };

    try {
      await createShastarSrv(formData);
      reset();
      navigate("/shastars");
    } catch (err) {
      console.error("Post creation failed:", err);
    }
  };

  return (
    <ProtectedLayout>
    <form className="py-12 flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      {/* Title */}
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
