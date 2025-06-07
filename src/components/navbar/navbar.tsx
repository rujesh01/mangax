"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "../ui/button";
import { SearchIcon } from "lucide-react";
import NavbarCommand from "./NavbarCommand";

const Navbar = () => {
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <NavbarCommand open={commandOpen} setOpen={setCommandOpen} />

      <nav className="w-full sticky top-0 z-50 bg-background border-b shadow-sm px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <Link href="/" aria-label="Go to homepage">
              <div className="relative w-28 h-10 sm:w-32">
                <Image
                  src="/logo.svg"
                  alt="App Logo"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 112px, 128px"
                />
              </div>
            </Link>
          </div>

          <div className="flex-1 max-w-md hidden sm:flex">
            <Button
              variant="outline"
              size="sm"
              className="h-9 w-full justify-start gap-2"
              onClick={() => setCommandOpen(true)}
            >
              <SearchIcon className="w-4 h-4" />
              <span className="truncate">Search...</span>
              <span className="ml-auto text-xs text-muted-foreground hidden lg:inline">
                ctrl + K
              </span>
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
              Login
            </div>
          </div>
        </div>

        <div className="sm:hidden mt-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full h-9 justify-start gap-2"
            onClick={() => setCommandOpen(true)}
          >
            <SearchIcon className="w-4 h-4" />
            <span className="truncate">Search...</span>
            <span className="ml-auto text-xs text-muted-foreground">⌘ K</span>
          </Button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
