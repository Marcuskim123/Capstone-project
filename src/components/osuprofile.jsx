import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Bell, Mail, Search, UserPlus, MessageCircle, TrendingUp } from "lucide-react";
import { useState } from "react";

// import { RechartsDevtools } from '@recharts/devtools';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';


export function Playcounts({ data }) {

  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  return (
    <LineChart responsive data={sortedData}>
      <XAxis dataKey="start_date" />
      <YAxis />
      <Tooltip />
      <Line dataKey="count" />
    </LineChart>
  );
}

export function RecentRank({ playerRank }) {

  // const chartData = Object.entries(data.data)
  //   .map(([key, value]) => ({
  //     index: Number(key),   // 0 → 90
  //     value
  //   }))
  //   .sort((a, b) => a.index - b.index);


  const chartData = playerRank.data.map((rank, index) => ({
    index: index + 1,
    rank
  }));


  return (
    <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} />

      <YAxis
        reversed
        type="number"
        domain={['dataMin', 'dataMax']}
        allowDecimals={false}
        label={{ value: "Rank", angle: -90, position: "insideLeft" }}
      />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="rank"
        stroke="#8884d8"
        strokeWidth={2}
        dot={{ r: 3 }}
      />
    </LineChart>
  );
}

export default function OsuProfile({ profileData }) {
  const mainMode = {
    osu: "standard",
    mania: "mania",
    taiko: "drum",
    catch: "fruits"
  }
  const { profile } = profileData
  const [gamemode, setGamemode] = useState(() => {
    mainMode[profile.gamemode];
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Profile */}
      <main className="max-w-[1400px] mx-auto p-6 space-y-8">
        <Card>
          <CardContent className="flex flex-col md:flex-row gap-8 p-6">
            <Avatar className="h-32 w-32 ring-4 ring-primary">
              <AvatarImage src={profile.avatar_url} />
            </Avatar>
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-4xl font-bold text-primary">{profile.username}</h2>
                <p className="text-md text-muted-foreground">{profile.country.name}</p>
              </div>
              <div className="flex gap-8">
                <div>
                  <p className="text-xs text-muted-foreground">Global Rank</p>
                  <p className="text-xl font-bold">#{profile.statistics.global_rank}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Country Rank</p>
                  <p className="text-xl font-bold">#{profile.statistics.rank.country}</p>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Level {profile.statistics.level.current}</span>
                  <span className="text-primary">{profile.statistics.level.progress}%</span>
                </div>
                <Progress value={profile.statistics.level.progress} />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {/* <Button><UserPlus className="mr-2 h-4 w-4" />Add Friend</Button>
              <Button variant="outline"><MessageCircle className="mr-2 h-4 w-4" />Message</Button> */}
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Total Performance Point</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{profile.statistics.pp.toLocaleString()}</p>
              {/* <p className="text-sm text-emerald-600 flex items-center gap-1"><TrendingUp className="h-4 w-4" /> +0 Today</p> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-sm">Accuracy</CardTitle></CardHeader>
            <CardContent><p className="text-3xl font-bold">{profile.statistics.hit_accuracy.toFixed(2)} %</p></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-sm">Play Count</CardTitle></CardHeader>
            <CardContent><p className="text-3xl font-bold">{profile.statistics.play_count.toLocaleString()}</p></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-sm">Total Hits</CardTitle></CardHeader>
            <CardContent><p className="text-3xl font-bold">{profile.statistics.total_hits.toLocaleString()}</p></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-sm">Total Hits</CardTitle></CardHeader>
            <CardContent><p className="text-3xl font-bold">{profile.statistics.total_hits.toLocaleString()}</p></CardContent>
          </Card>
        </div>

        <Separator />

        {/* Placeholder sections */}
        <Card>
          <CardHeader><CardTitle>Performance History</CardTitle></CardHeader>
          <CardTitle>Playcounts</CardTitle>
          <CardContent className="h-64 flex items-center justify-center text-muted-foreground">
            <ResponsiveContainer width="100%" height="100%">
              <Playcounts data={profile.monthly_playcounts}></Playcounts>
            </ResponsiveContainer>
          </CardContent>
          <CardTitle>Rank History</CardTitle>
          <CardContent className="h-64 flex items-center justify-center text-muted-foreground">
            <ResponsiveContainer width="100%" height="100%">
              <RecentRank playerRank={profile.rank_history}></RecentRank>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Recent Plays</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {profileData.topScore.map((profiles) => (
              <div className="flex justify-between" key={profiles.id}>
                <div>
                  <p className="text-lg font-bold">{profiles.beatmapset.title}</p>
                  <p className="text-sm text-muted-foreground">{profiles.beatmapset.artist} · {profiles.beatmap.difficulty_rating.toFixed(2)}★</p>
                  {profiles.mods.length > 0 ? (
                    <div className="flex gap-2 mt-1">
                      {profiles.mods.map((mod) => (
                        <Badge key={mod}>{mod}</Badge>
                      ))}
                    </div>
                  ) : (
                    <div className="flex gap-2 mt-1" />
                  )}

                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">{profiles.pp.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">{Date(profiles.created_at)}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
