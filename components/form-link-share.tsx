"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { Copy } from "lucide-react";

const FormLinkShare = ({ shareUrl }: { shareUrl: string }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const shareLink = `${window.location.origin}/submit/${shareUrl}`;
  return (
    <div className="flex flex-grow gap-4 items-center">
      <Input value={shareLink} readOnly />
      <Button
        className="w-[250px] gap-2 items-center"
        onClick={() => {
          navigator.clipboard.writeText(shareLink);
          toast.success("Link copied!", {
            description: "Link copied to clipboard",
            richColors: true,
          });
        }}
      >
        <Copy className="size-4" />
        Copy link
      </Button>
    </div>
  );
};

export default FormLinkShare;
