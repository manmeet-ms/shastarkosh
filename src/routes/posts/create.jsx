import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils.js";
import { IconCheck } from "@tabler/icons-react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ChevronsUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { getCategoriesSrv } from "../../services/category.service";
import { createForumPostSrv } from "../../services/forumPost.service";

export const Route = createFileRoute("/posts/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  console.log("creator:", user);

  const [open, setOpen] = useState(false);
  const [selectvalue, setValue] = useState();
  const [categories, setCategories] = useState([{ name: "default" }]);
  const { register, handleSubmit, reset, watch } = useForm();

  const getCategoryFn = async () => {
    const resCatg = await getCategoriesSrv();
    setCategories(resCatg.data);
  };
  useEffect(() => {
    getCategoryFn();
    console.log("categories", categories);
  }, []);

  const onSubmit = async (data) => {
    const processedData = data;
    //  TODO neeed sanitization lastmost comm will result n empty array item in tags, which will render on UI
    processedData.tags = processedData.tags.split(",");
    const formData = {
      ...processedData,
      category: selectvalue,
      author: user._id,
    };

    const responseSubmit = await createForumPostSrv(formData);

    console.log(data, responseSubmit);
    console.log("data", data, "\n\nformData", formData);
    navigate("/posts");
  };
  //  TODO add validation of onyl uniques posts, form reset and add which user is  creating his posts at the momenet
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label name="title" htmlFor="title">
          title
        </Label>
        <Input type="text" {...register("title")} placeholder="Enter Title" />

        <Label name="content" htmlFor="content">
          content
        </Label>

        <Textarea {...register("content")} placeholder="Enter Content" />
        <Label name="category" htmlFor="category">
          category
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
              {selectvalue ? categories.find((catg) => catg.name === selectvalue)?.name : "Select category"}
              <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search category" />
              <CommandList>
                <CommandEmpty>Category doesn't exists.</CommandEmpty>
                <CommandGroup>
                  {categories.map((catg) => (
                    <CommandItem
                      key={catg._id}
                      selectvalue={catg.name}
                      onSelect={(currentValue) => {
                        setValue(currentValue === selectvalue ? "" : currentValue);
                        setOpen(false);
                      }}>
                      {catg.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Input type="text" placeholder="Enter comma-separated list of tags you'd like to add" {...register("tags")} />
        <Button>Create Post</Button>
      </form>
    </>
  );
}
// TODO make t prteted route so that only registereduser can post and trck
