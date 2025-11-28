"use client"

import { Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react";

export default function Profilecard({profile}) {
  const [infoProfile, setInfoProfile] = useState(profile); 

  return (
    <div className="w-full max-w-full">
      <Card>
        <CardHeader>
          <CardTitle>{infoProfile.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{infoProfile.description}</CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
