"use client";

import { useState } from "react";
import { Plus, Search, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DashboardSidebar,
  GamingProfilesSidebar,
} from "@/components/DashboardSidebar";
import { Profilecard } from "@/components/profilecard";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

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
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex">
      <SidebarProvider>
        <DashboardSidebar></DashboardSidebar>
        <main>
          <SidebarTrigger>Open</SidebarTrigger>
          <Profilecard></Profilecard>
        </main>
      </SidebarProvider>
    </div>
  );
}
