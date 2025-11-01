import SectionTitleSubTitle from "@/components/SectionTitleSubTitle.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { faker } from "@faker-js/faker";
import { IconAccessPoint, IconBolt, IconBoltFilled, IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { Link, createFileRoute } from "@tanstack/react-router";
import dayjs from "dayjs";
import { DotIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { leaderboardUsersSrv } from "../../services/analytics.service";

export const Route = createFileRoute("/app/leaderboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isLoading, setIsLoading] = useState(true);
  const [leaderboardusers, setleaderboardusers] = useState([]);
  const getleaderboardusers = async () => {
    const res = await leaderboardUsersSrv();
    console.log(res.data);
    setleaderboardusers(res.data);
    setIsLoading(false);
  };
  useEffect(() => {
    getleaderboardusers();
  }, []);
  return (
    <> 
      <main className="flex px-4  flex-col justify-start items-start ">
        <div className=" flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4">
            <section className="grid grid-cols-1 items-start gap-4 md:grid-cols-4">
              <section className="col-span-3 md:border-r md:pr-4 ">
              

                  <div className="rounded-lg col-span-2 border  p-4">
                    <div className="flex items-center justify-between">
                      <div className="mb-2 flex flex-col gap-0   pb-2">
                        <h2 className="flex items-center gap-2 text-xl font-semibold">
                          Hall of Fame
                          <Badge>
                            <IconBoltFilled />
                            Top {leaderboardusers?.length}{" "}
                          </Badge>
                        </h2>
                        <span className="text-secondary-foreground/60 text-xs"> Leaderboard</span>
                      </div>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Rank</TableHead>
                          <TableHead>User</TableHead>
                          <TableHead> Credits</TableHead>
                          <TableHead>Joined</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {leaderboardusers.map((v, idx) => {
                          let topUserIcon;
                          let shiftPosition;
                          switch (idx) {
                            case 0: // Gold
                              // shiftPosition="relative right-9"

                              topUserIcon = (
                                <span className="ml-2 px-2 py-1 inline-flex  items-center justify-center rounded-full bg-yellow-400/20 text-yellow-500">
                                  <IconBolt size={14} stroke={2.5} />
                                </span>
                              );
                              break;
                            case 1: // Silver
                              // shiftPosition="relative right-9"
                              topUserIcon = (
                                <span className="ml-2 px-2 py-1 inline-flex  items-center justify-center rounded-full bg-gray-400/20 text-gray-400">
                                  <IconBolt size={14} stroke={2.5} />
                                </span>
                              );
                              break;
                            case 2: // Bronze
                              // shiftPosition="relative right-9"
                              topUserIcon = (
                                <span className="ml-2 px-2 py-1 inline-flex  items-center justify-center rounded-full bg-amber-700/20 text-amber-700">
                                  <IconBolt size={14} stroke={2.5} />
                                </span>
                              );
                              break;
                            default:
                              topUserIcon = null;
                              break;
                          }

                          return (
                            <TableRow key={v._id}>
                              <TableCell>{idx + 1}.</TableCell>

                              <TableCell className="flex items-center justify-start gap-2">
                                   <div className="dark">
    </div> <Avatar>
                                  <AvatarImage src={v.avatar} />
                                  <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                {v.name}
                              </TableCell>
                              <TableCell className={shiftPosition}>
                                {v.reputationPoints}
                                {topUserIcon}
                              </TableCell>
                              <TableCell>{dayjs(v.createdAt).format("DD MMM, YYYY")}</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                 

                <hr />
              </section>

              <section className=" text-foreground body-font">
                <div className="container flex flex-col px-4   mx-auto">
                  <SectionTitleSubTitle title="Points Txn." subtitle={faker.lorem.sentence()} />
                </div>

              

                <div className="container flex flex-col px-4 py-4 mx-auto">
                  <nav className="flex flex-wrap list-none -mb-1"></nav>
                </div>
              </section>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
// TODO make it discussions
