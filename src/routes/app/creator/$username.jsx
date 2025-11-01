import ForumPostCard from "@/components/ForumPostCard.jsx";
//TODO paginantion here in user's content
import ResourceMaterialCard from "@/components/ResourceMaterialCard";
import SectionTitleSubTitle from "@/components/SectionTitleSubTitle.jsx";
import ShastarCard from "@/components/ShastarCard.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserContentSrv } from "@/services/user.service.js";
import Masonry from "@mui/lab/Masonry";
import { useSelect } from "@react-three/drei";
import { IconCircle, IconCircleFilled, IconDots, IconUser } from "@tabler/icons-react";
import { Link, createFileRoute } from "@tanstack/react-router";
import millify from "millify";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const Route = createFileRoute("/app/creator/$username")({
  component: Index,
});

function Index() {
  const { user } = useSelector((state) => state.auth);

  const [shastarList, setShastarList] = useState([]);
  const [resourceMaterial, setResourceMaterial] = useState([]);
  const [forumPosts, setForumPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserContent = async () => {
    try {
      const { data } = await getUserContentSrv();
      console.log(data.data.userPosts);
      setForumPosts(data.data.userPosts);
      setShastarList(data.data.userShastars);
      setResourceMaterial(data.data.userResources);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetchUserContent();
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <main className="flex px-4 flex-col justify-start items-center">
        <div className="flex flex-1 flex-col gap-2 items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your content...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex px-4 flex-col justify-start items-start">
      <section className="flex flex-1 flex-col gap-2 w-full">
        <section className="py-8 bg-background">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12 max-w-4xl mx-auto p-6 rounded-xl border bg-card shadow-sm">
              {/* Avatar & Name */}
              <div className="shrink-0">
                <Avatar className="w-24 h-24 border-4 border-primary/20">
                  <AvatarImage src={user?.avatar} alt={user?.username} />
                  <AvatarFallback>
                    <IconUser className="h-12 w-12 text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="grow text-center lg:text-left space-y-3">
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <h2 className="text-2xl font-bold text-foreground">{user?.name}</h2>
                  {user?.role === "admin" && (
                    <Badge variant="outline" className="text-xs py-0.5 px-2">
                      Admin
                    </Badge>
                  )}
                  {user?.role === "moderator" && (
                    <Badge variant="secondary" className="text-xs py-0.5 px-2">
                      Moderator
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{user?.bio}</p>
                <div className="flex items-center ">
                  <Badge variant="outline" className="mr-2 text-sm text-muted-foreground">
                    <IconCircleFilled className="text-yellow-500 "/> {user?.reputationPoints} pts
                  </Badge>
                  <p className="text-sm text-muted-foreground">@{user?.username} </p> 
                </div>

                {/* Stats Card */}
                <Card className="mt-4 bg-muted/50 border-none">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4 justify-around items-center">
                      {/* Posts */}
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-3xl font-semibold text-foreground">{forumPosts.length}</span>
                        <span className="text-xs text-muted-foreground">Posts</span>
                      </div>

                      <Separator orientation="vertical" className="hidden sm:block h-10" />

                      {/* Shastars */}
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-3xl font-semibold text-foreground">{shastarList.length}</span>
                        <span className="text-xs text-muted-foreground">Shastars</span>
                      </div>

                      <Separator orientation="vertical" className="hidden sm:block h-10" />

                      {/* Resources */}
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-3xl font-semibold text-foreground">{resourceMaterial.length}</span>
                        <span className="text-xs text-muted-foreground">Resources</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <div className="flex flex-col gap-4">
          <SectionTitleSubTitle title="My Content" subtitle="Manage your posts, shastars, and resources" />

          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="posts">Forum Posts</TabsTrigger>
              <TabsTrigger value="shastars">Shastars</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="mt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <SectionTitleSubTitle title="Forum Posts" badge={`${millify(forumPosts.length)}`} />
                </div>

                <div className="space-y-4">
                  {forumPosts.map((post) => (
                    <ForumPostCard key={post._id} {...post} />
                  ))}
                </div>

                {forumPosts.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No posts yet. Create your first post!</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="shastars" className="mt-6">
              <div className="space-y-4">
                <SectionTitleSubTitle title="Shastar Submissions" badge={`${millify(shastarList.length)}`} />
                <Masonry columns={{ sm: 2, md: 2, lg: 3 }} spacing={1}>
                  {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
                  {shastarList.map((shastar, idx) => (
                    <ShastarCard key={idx} {...shastar} />
                  ))}
                  {/* </div> */}
                </Masonry>
                {shastarList.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No shastars submitted yet.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="resources" className="mt-6">
              <div className="space-y-4">
                <SectionTitleSubTitle title="Resource Materials" badge={`${millify(resourceMaterial.length)}`} />

                <Masonry columns={{ sm: 2, md: 3, lg: 4 }} spacing={1}>
                  {resourceMaterial.map((post) => {
                    return <ResourceMaterialCard key={post._id} id={post._id} title={post.title} mainImage={post.mainImage} images={post.images} description={post.description} createdBy={post.createdBy} categories={post.category} tags={post.tags} likes={post.likes} dislikes={post.dislikes} commentCount={post.commentCount} views={post.views} isPinned={post.isPinned} isEdited={post.isEdited} status={post.status} createdAt={post.createdAt} updatedAt={post.updatedAt} />;
                  })}
                </Masonry>

                {resourceMaterial.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No resources shared yet.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
}
