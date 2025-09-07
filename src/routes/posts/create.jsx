import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
 
import { createForumPostSrv } from "../../services/forumPost.service";

export const Route = createFileRoute("/posts/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  console.log("post create:", user);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  const { register, handleSubmit, reset, watch } = useForm();
  const frameworks = [
    {
      //  TODO caregory routes and fethc in comboxx
    },
  ];
  const onSubmit = async (data) => {
    const formData = {
      ...data,
      author: {
        aId: user._id,
        name: user.name,
        avatar: user.avatar,
      },
    };
    // console.log(formData);

    const responseSubmit = await createForumPostSrv(formData);

    console.log(data, responseSubmit);
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
        <Input type="text" {...register("category")} placeholder="Enter Category" />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
              {value ? frameworks.find((framework) => framework.value === value)?.label : "Select framework..."}
              <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search framework..." />
              <CommandList>
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {frameworks.map((framework) => (
                    <CommandItem
                      key={framework.value}
                      value={framework.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}>
                      <CheckIcon className={cn("mr-2 h-4 w-4", value === framework.value ? "opacity-100" : "opacity-0")} />
                      {framework.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Button type="submit">Button</Button>
      </form>
    </>
  );
}
// TODO make t prteted route so that only registereduser can post and trck
