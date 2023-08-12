"use client";
import { useProModal } from "@/hooks/use-pro-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Badge } from "./ui/badge";

import { BsChatSquareDots } from "react-icons/bs";
import { BsImageFill } from "react-icons/bs";
import { BsFileEarmarkCode } from "react-icons/bs";
import { AiFillVideoCamera } from "react-icons/ai";
import { FaMusic } from "react-icons/fa";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Check, Zap } from "lucide-react";
import { Button } from "./ui/button";

const tools = [
  {
    label: "Conversation",
    icon: BsChatSquareDots,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Image Generator",
    icon: BsImageFill,
    color: "text-pink-700",
    bgColor: "bg-pink-500/10",
  },
  {
    label: "Video Generator",
    icon: AiFillVideoCamera,
    color: "text-orange-700",
    bgColor: "bg-orange-500/10",
  },
  {
    label: "Music Generator",
    icon: FaMusic,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: "Code Generator",
    icon: BsFileEarmarkCode,
    color: "text-gray-700",
    bgColor: "bg-gray-500/10",
  },
];

export const ProModel = () => {
  const proModal = useProModal();
  return (
    <div className="">
      <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
              <div className="flex items-center gap-x-2 font-bold py-1">
                Upgrade to Helpon Pro
                <Badge variant="premium" className="uppercase text-sm py-1">
                  pro
                </Badge>
              </div>
            </DialogTitle>
            <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
              {tools.map((tool) => (
                <Card
                  key={tool.label}
                  className="p-3 border-black/5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-x-4">
                    <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                      <tool.icon className={cn(tool.color, "w-6 h-6")} />
                    </div>
                    <div className="text-sm">{tool.label}</div>
                  </div>
                  <Check className="text-primary w-5 h-5" />
                </Card>
              ))}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button size="lg" variant="premium" className="w-full">
              Upgrade
              <Zap className="w-4 h-4 ml-2 fill-white" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
