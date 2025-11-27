"use client"

import { useState } from "react"
import { Plus, Search, Gamepad2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GamingProfilesSidebar } from "@/components/DashboardSidebar"
import { GamingProfileCard } from "@/components/gaming-profile-card"

// Sample data - replace with your actual data source
// const initialProfiles = [
//   {
//     id: 1,
//     name: "Main Valorant Account",
//     game: "Valorant",
//     bannerImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSFlAiioWZNFzjTXEJRqaE__JFeRGI23d8T2fZF04LGGDAr9kSpFMhGYNOwy9ShvE7M6zZJ51HuRlBYkkoF_OCa1UqIuJbhoMeDgQS5mm-twSGwA9chF5RJuH7wEqqAI_ujURoGZxypzIcQrUuzg3F9x1LvDtbvKw06VH2XckvhxQb6dwjAFy_YwadQJTY-DljR7Aoq38MtWNEVQkfdJd92G0IKVDndZa3A_kL-AUKFE--9ejYWohmObQklbwh8s_I123KZI92VJQP"
//   },
//   {
//     id: 2,
//     name: "Apex Predator",
//     game: "Apex Legends",
//     bannerImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-Ji45T25RI0bdrjXfGegI-YjLGAyx1X78gtdv9xdHqOGQJkEdj-otIejA9bntrb7R8wwvEezZsfIrUpTHyM9HiRD29uXlIrWreKtRokl9Kc1hcnEo7PGr062SvHbbHmfE1V5yMY6xshHKKB6T9HRRvzq5CK0E-eGGtPy9b9H9FeFh4XJBtZUFpqPwQTAcCVCPiKuPJukIDZwwdao-EluFBVIPC9R_q5hz5zcYpl54PoBZsDivvbWwbewaTSh0tuJI60Odp2IE-ee3"
//   },
//   {
//     id: 3,
//     name: "LoL Smurf",
//     game: "League of Legends",
//     bannerImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuB93kMcvEniIwYKeYdI-kV62QmfwGglEJPM8sZZeUBs0A03DGfz-ZPdsonKi-lbmayQ5_ED37NUPU5JyRFcTXcC4bHhJBx0NhChPyWAym7h2N6QPcwd_AtP6EIguJYRf2A1CaB8tKrRJlpygvd7BI2IVruaZJgzvCZQd9SktEMuq9BOQe9JOHWHY7_T4bq8D_PtL4OjUp5jhaYg3sFz6AhaZCKeVb1yNjV_LWR8QbOoNi2dPqCOmv1c2KhJj2zhwTKKW3iAxdsYYMNU"
//   },
//   {
//     id: 4,
//     name: "CS:GO Prime",
//         game: "Counter-Strike: GO",
//     bannerImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtEaRnZv8OHbq3IZXuS042Avfgi5DfhQsn6K9CWfYgRKESWAUXBo1xrqT7KOLcjON4KMdtsyeJ4jCKUJa0XfYgIuCe5jYB4bH1VHVoP3rZJ4J3ZBrQ-993CPdlsvEEaBrDtyNcMogBGXFoP1BESlSTslnQxvNFT0JZywv0QJSJK8c8dLdWfTFh8wj2ZA-1qNfw7tzhfeVfqEGy4Z00NsXqJLnAjnmGyeG8KuvYomKj9cfuUKBucht9ltqnITnUj78NregasART9ZDi"
//   }
// ]

export default function GamingProfilesPage() {
  const [profiles, setProfiles] = useState(initialProfiles)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProfiles = profiles.filter(profile => 
    profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.game.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex min-h-screen w-full">
      <GamingProfilesSidebar />
      
      <main className="flex-1 p-8">
        <div className="flex flex-col gap-6 max-w-7xl mx-auto">
          {/* Page Heading */}
          <header className="flex flex-wrap justify-between items-center gap-4">
            <h1 className="text-foreground text-4xl font-black leading-tight tracking-[-0.033em]">
              My Gaming Profiles
            </h1>
            <Button className="gap-2">
              <Plus className="size-4" />
              <span className="truncate">Create New Profile</span>
            </Button>
          </header>

          {/* Search Bar */}
          <div>
            <label className="flex flex-col w-full">
              <div className="flex w-full flex-1 items-stretch rounded-lg h-12 bg-card border border-transparent focus-within:border-primary transition-colors">
                <div className="text-muted-foreground flex items-center justify-center pl-4">
                  <Search className="size-5" />
                </div>
                <Input
                  className="flex w-full min-w-0 flex-1 resize-none overflow-hidden focus:outline-0 focus:ring-0 border-none bg-transparent h-full placeholder:text-muted-foreground px-4 pl-2 text-base font-normal leading-normal"
                  placeholder="Search by profile name or game..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </label>
          </div>

          {/* Profile Grid */}
          {filteredProfiles.length > 0 ? (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
              {filteredProfiles.map((profile) => (
                <GamingProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center gap-6 py-20 border-2 border-dashed border-border rounded-xl">
              <div className="text-primary">
                <Gamepad2 className="size-16" />
              </div>
              <div className="flex max-w-sm flex-col items-center gap-2">
                <p className="text-foreground text-lg font-bold leading-tight tracking-[-0.015em]">
                  No Profiles Found!
                </p>
                <p className="text-muted-foreground text-sm font-normal leading-normal">
                  {searchQuery 
                    ? "No profiles match your search. Try a different query."
                    : "It looks like you haven't created any gaming profiles. Get started by clicking the button below."}
                </p>
              </div>
              {!searchQuery && (
                <Button className="gap-2">
                  <Plus className="size-4" />
                  <span className="truncate">Create First Profile</span>
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
