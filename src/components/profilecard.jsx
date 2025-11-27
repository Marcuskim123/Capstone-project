"use client"

import { Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {Card, CardContent, CardHeader } from "@/components/ui/card"
import { useState } from "react/cjs/react.production"

export default function Profilecard({profile}) {
  const [profile, setProfile] = useState();

  return (
    <div>
      <Card>
        <CardHeader></CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
}
