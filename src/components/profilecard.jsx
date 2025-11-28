"use client"

import { Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react";

export default function Profilecard({profile}) {
  const [infoProfile, setInfoProfile] = useState(profile); 

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>{infoProfile.title}</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
}
