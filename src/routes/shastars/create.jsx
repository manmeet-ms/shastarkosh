import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import SectionTitleSubTitle from "../../components/SectionTitleSubTitle";
import { createShastarSrv } from "../../services/shastarInfo.service.js";

// import {createShastarSrv} from "../../"

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
      description: "",
      category: "",

 
      tags: [],
    },
  });
  const onSubmit = async (data) => {
    const formData = {
      ...data,
      mainImage:"/assets/placeholder-weapon.png",
      images:["/assets/placeholder-weapon.png","/assets/placeholder-weapon.png","/assets/placeholder-weapon.png"],
      createdBy:  user._id, 
    };
    console.log(formData);
    try {
      await createShastarSrv(formData);
      reset();
      navigate("/shastars");
    } catch (err) {
      console.error("Post creation failed:", err);
    }
  };

  //  TODO add validation of onyl uniques posts, form reset and add which user is  creating his posts at the momenet
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto p-4">
        {/* Title */}
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Enter post title"
            {...register("title", {
              required: "Title is required",
              maxLength: { value: 120, message: "Max 120 characters allowed" },
            })}
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Write your description here..."
            {...register("description", {
              required: "Description is required",
              minLength: { value: 10, message: "At least 10 characters required" },
            })}
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        {/* Category */}
        <div>
          <Label htmlFor="category">Category</Label>
          <Select
            onValueChange={(val) => {
              // react-hook-form controller alternative could be used
            }}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="swords">Swords</SelectItem>
              <SelectItem value="shields">Shields</SelectItem>
              <SelectItem value="archery">Archery</SelectItem>
            </SelectContent>
          </Select>
          {/* For proper RHF binding, wrap Select with Controller if needed */}
        </div>

        {/* Tags */}
        <div>
          <Label htmlFor="tags">Tags</Label>
          <Input
            id="tags"
            placeholder="Comma-separated tags"
            {...register("tags", {
              validate: (val) => val.split(",").length <= 5 || "Max 5 tags allowed",
            })}
          />
          {errors.tags && <p className="text-red-500 text-sm">{errors.tags.message}</p>}
        </div>

        {/* Images */}
        {/* <div>
        <Label htmlFor="mainImage">Main Image</Label>
        <Input id="mainImage" accept="image/*,video/*" type="file" {...register("mainImage")} />
      </div>
      <div>
        <Label htmlFor="images">Other Images</Label>
        <Input id="images" accept="image/*,video/*" type="file" multiple {...register("images")} />
      </div> */}

        {/* Origin Section */}
        <SectionTitleSubTitle title="Origin" subtitle="Provide historical context" />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="region">Region</Label>
            <Input id="region" placeholder="Region of origin" {...register("region")} />
          </div>
          <div>
            <Label htmlFor="culture">Culture</Label>
            <Input id="culture" placeholder="Culture of origin" {...register("culture")} />
          </div>
        </div>

        {/* Time Period */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="timePeriodStart">Start Year</Label>
            <Input id="timePeriodStart" type="date" {...register("timePeriodStart")} />
          </div>
          <div>
            <Label htmlFor="timePeriodEnd">End Year</Label>
            <Input id="timePeriodEnd" type="date" {...register("timePeriodEnd")} />
          </div>
        </div>

        {/* Submit */}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Posting..." : "Create Post"}
        </Button>
      </form>
    </>
  );
}
// TODO make t prteted route so that only registereduser can post and trck
