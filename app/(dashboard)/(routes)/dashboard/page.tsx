"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { BsChatSquareDots } from "react-icons/bs";
import { BsArrowRightShort } from "react-icons/bs";
import { BsImageFill } from "react-icons/bs";
import { BsFileEarmarkCode } from "react-icons/bs";
import { AiFillVideoCamera } from "react-icons/ai";
import { FaMusic } from "react-icons/fa";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const tools = [
  {
    label: "Conversation",
    icon: BsChatSquareDots,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation",
  },
  {
    label: "Image Generator",
    href: "/image",
    icon: BsImageFill,
    color: "text-pink-700",
    bgColor: "bg-pink-500/10",
  },
  {
    label: "Video Generator",
    href: "/video",
    icon: AiFillVideoCamera,
    color: "text-orange-700",
    bgColor: "bg-orange-500/10",
  },
  {
    label: "Music Generator",
    href: "/music",
    icon: FaMusic,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: "Code Generator",
    href: "/code",
    icon: BsFileEarmarkCode,
    color: "text-gray-700",
    bgColor: "bg-gray-500/10",
  },
];

export default function Dashboard() {
  const router = useRouter();
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2
          className="
                text-2xl md:text-4xl font-bold text-center
                "
        >
          Explore the power of AI
        </h2>

        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Chat with the smartest AI - Experience the power of AI. Generate
          anything you want.
        </p>
      </div>

      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
            onClick={() => {
              router.push(tool.href);
            }}
            key={tool.label}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>

              <div className="font-semibold">{tool.label}</div>
            </div>

            <div className="flex items-center gap-x-4">
              <BsArrowRightShort className="w-6 h-6 " />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
