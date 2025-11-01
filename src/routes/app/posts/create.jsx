import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import ProtectedLayout from "@/components/ProtectedLayout";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ChevronsUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesSrv } from "@/services/category.service";
import { createForumPostSrv } from "@/services/forumPost.service";

export const Route = createFileRoute("/app/posts/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const [selectvalue, setValue] = useState();
  const [categories, setCategories] = useState([{ name: "default" }]);
  const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      title: "",
      content: "",
      tags: "",
    },
  });

  const getCategoryFn = async () => {
    const resCatg = await getCategoriesSrv();
    setCategories(resCatg.data);
  };
  useEffect(() => {
    getCategoryFn();
  }, []);

  const onSubmit = async (data) => {
    const processedData = {
      ...data,
      tags: data.tags.split(",").map(t => t.trim()).filter(Boolean),
      category: selectvalue,
      author: user._id,
    };

    const responseSubmit = await createForumPostSrv(processedData);
    navigate({to:"/app/posts"});
  };

  return (
    <ProtectedLayout>
      <main className="px-4">
        <section>
          <form
            className="md:max-w-2xl mx-auto my-10 bg-background border rounded-xl shadow-sm p-8 flex flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Post Details Card */}
            <div className="bg-muted/40 rounded-lg p-6 flex flex-col gap-5 shadow-xs">
              <div>
                <div className="flex flex-col gap-1 mb-2">
                  <Label className="block" htmlFor="title">Title</Label>
                  <span className="text-xs text-muted-foreground/80">Give your post a clear and precise title (e.g., "Best Air Purifiers for Small Rooms")</span>
                </div>
                <Input
                  type="text"
                  {...register("title", { required: "Title is required", minLength: { value: 8, message: "Title should be at least 8 characters" } })}
                  placeholder="Enter Title"
                  id="title"
                />
                {errors.title && <span className="text-destructive mt-1 block text-sm">{errors.title.message}</span>}
              </div>
              <div>
                <div className="flex flex-col gap-1 mb-2">
                  <Label className="block" htmlFor="content">Content</Label>
                  <span className="text-xs text-muted-foreground/80">Describe your question, topic, or experience in detail</span>
                </div>
                <Textarea
                  {...register("content", { required: "Content is required", minLength: { value: 20, message: "Content should be at least 20 characters" } })}
                  placeholder="Write your post content here..."
                  id="content"
                  minRows={6}
                />
                {errors.content && <span className="text-destructive mt-1 block text-sm">{errors.content.message}</span>}
              </div>
            </div>

            {/* Category & Tags Card */}
            <div className="bg-muted/40 rounded-lg p-6 flex flex-col gap-5 shadow-xs">
              <div>
                <div className="flex flex-col gap-1 mb-2">
                  <Label className="block" htmlFor="category">Category</Label>
                  <span className="text-xs text-muted-foreground/80">Select the most relevant category for your post</span>
                </div>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" aria-expanded={open} className="w-[220px] justify-between">
                      {selectvalue ? categories.find((catg) => catg.name === selectvalue)?.name : "Select category"}
                      <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[220px] p-0">
                    <Command>
                      <CommandInput placeholder="Search category" />
                      <CommandList>
                        <CommandEmpty>Category doesn't exist.</CommandEmpty>
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
              </div>

              <div>
                <div className="flex flex-col gap-1 mb-2">
                  <Label className="block" htmlFor="tags">Tags</Label>
                  <span className="text-xs text-muted-foreground/80">Keywords, separated by commas (e.g., air purifier, HEPA, budget, allergy)</span>
                </div>
                <Input
                  type="text"
                  {...register("tags", {
                    required: "Tags are required",
                    validate: value => value.split(",").filter(Boolean).length > 0 || "At least one tag required"
                  })}
                  placeholder="Enter a comma-separated list of tags"
                  id="tags"
                />
                {errors.tags && <span className="text-destructive mt-1 block text-sm">{errors.tags.message}</span>}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Posting..." : "Create Post"}
              </Button>
            </div>
          </form>
        </section>
      </main>
    </ProtectedLayout>
  );
}
