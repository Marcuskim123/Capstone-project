import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Bell, Mail, Search, UserPlus, MessageCircle, TrendingUp } from "lucide-react";

export default function OsuProfile() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input className="pl-8" placeholder="Search players or maps" />
            </div>
            <Button size="icon" variant="outline"><Bell /></Button>
            <Button size="icon" variant="outline"><Mail /></Button>
            <Avatar>
              <AvatarImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuD49yoALo65VBL7LDXU62pSsKW5NCYF1DeMKbH59tZGn6uEZNr6skLuSKDI8h5usa9pp8ZciVVEkj4KFH4sXMGARq88Xxlvi-gNMSoQok5ni3VKMYbgN8_SCU-QkSXbPCHCHe-nsLh9m15V2sexqsk2XpnJBefcoTmtVU9QU_e6e2TGhfIyT5QrtJxqAj6wunQhvHHtVXRXTb-wcGhFJlc_b1pO10_D0X5SOofymuBqPBNvZ3b8t4aSUnXDSJQaH-VvL84uC-BvkpA" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Profile */}
      <main className="max-w-[1400px] mx-auto p-6 space-y-8">
        <Card>
          <CardContent className="flex flex-col md:flex-row gap-8 p-6">
            <Avatar className="h-32 w-32 ring-4 ring-primary">
              <AvatarImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1bXXt9H1zxHkR-OZjsMNoWR-OwKdquf6ETN0bA2SRXNSrvxpajqZPwMLE-lj-8CxS1yn5oT93I02qDpuJh0ykesbmy_Y373-Oij7e0kjXvvk-0bFZUrhjKgrmG2M1bURLUpn50EVtKECCF1sfOyxFUTb0Pom-97flj-uxwPAUDw2dZO7hp24lUa1l4IJUAH5Jw_RmddzUWeQA24kBLjK7Ot7PUdFURlrmSuVEX0hfpsn85RJal1Dbd9APxzKbPrD48HPXqhaa9UI" />
            </Avatar>
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-4xl font-bold text-primary">User123</h2>
                <p className="text-sm text-muted-foreground">SUPPORTER · SINCE 2021</p>
              </div>
              <div className="flex gap-8">
                <div>
                  <p className="text-xs text-muted-foreground">Global Rank</p>
                  <p className="text-xl font-bold">#402</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Country Rank</p>
                  <p className="text-xl font-bold">#12</p>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs">
                  <span>Level 98</span>
                  <span className="text-primary">65%</span>
                </div>
                <Progress value={65} />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Button><UserPlus className="mr-2 h-4 w-4" />Add Friend</Button>
              <Button variant="outline"><MessageCircle className="mr-2 h-4 w-4" />Message</Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Total PP</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">7420</p>
              <p className="text-sm text-emerald-600 flex items-center gap-1"><TrendingUp className="h-4 w-4" /> +150 Today</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-sm">Accuracy</CardTitle></CardHeader>
            <CardContent><p className="text-3xl font-bold">98.50%</p></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-sm">Play Count</CardTitle></CardHeader>
            <CardContent><p className="text-3xl font-bold">45,210</p></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-sm">Total Hits</CardTitle></CardHeader>
            <CardContent><p className="text-3xl font-bold">12.4M</p></CardContent>
          </Card>
        </div>

        <Separator />

        {/* Placeholder sections */}
        <Card>
          <CardHeader><CardTitle>Performance History</CardTitle></CardHeader>
          <CardContent className="h-64 flex items-center justify-center text-muted-foreground">
            Chart goes here (Recharts / SVG)
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Recent Plays</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <div>
                <p className="font-bold">Yoru ni Kakeru</p>
                <p className="text-xs text-muted-foreground">YOASOBI · 6.2★</p>
                <div className="flex gap-2 mt-1">
                  <Badge>HD</Badge>
                  <Badge>DT</Badge>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary">+342pp</p>
                <p className="text-xs text-muted-foreground">2 minutes ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
