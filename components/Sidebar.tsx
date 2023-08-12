"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { BiSolidDashboard } from "react-icons/bi";
import { BsChatSquareDots } from "react-icons/bs";
import { BsImageFill } from "react-icons/bs";
import { AiFillVideoCamera } from "react-icons/ai";
import { FaMusic } from "react-icons/fa";
import { BsFileEarmarkCode } from "react-icons/bs";
import { BsGearFill } from "react-icons/bs";
import { FreeCounter } from "./FreeCounter";

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const routes = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: BiSolidDashboard,
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    href: "/conversation",
    icon: BsChatSquareDots,
    color: "text-violet-500",
  },
  {
    label: "Image Generator",
    href: "/image",
    icon: BsImageFill,
    color: "text-pink-700",
  },
  {
    label: "Video Generator",
    href: "/video",
    icon: AiFillVideoCamera,
    color: "text-orange-700",
  },
  {
    label: "Music Generator",
    href: "/music",
    icon: FaMusic,
    color: "text-emerald-500",
  },
  {
    label: "Code Generator",
    href: "/code",
    icon: BsFileEarmarkCode,
    color: "text-gray-700",
  },
  {
    label: "Settings",
    href: "/settings",
    icon: BsGearFill,
    color: "text-yellow-500",
  },
];

interface SidebarProps {
  apiLimitCount: number;
}

const Sidebar = ({ apiLimitCount = 0 }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4 ">
            <Image fill alt="logo" src="/logo.png" />
          </div>
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>
            Helpon
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center px-3 py-2 rounded-md",
                "hover:bg-gray-700 hover:text-white",
                "focus:bg-gray-700 focus:text-white",
                "transition-colors duration-200",
                route.href === pathname
                  ? "bg-gray-700 text-white"
                  : "text-gray-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("w-5 h-5 mr-3", route.color)} />
                <span className="font-medium">{route.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <FreeCounter apiLimitCount={apiLimitCount} />
    </div>
  );
};

export default Sidebar;
