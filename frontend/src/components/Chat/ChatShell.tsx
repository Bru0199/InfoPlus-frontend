"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppSidebar from "./AppSidebar";
import Navbar from "@/components/Navbar/index";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { api } from "@/lib/api";

export default function ChatShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => {
        if (res.data?.authenticated && res.data?.user) {
          setAllowed(true);
        } else {
          setAllowed(false);
          router.replace("/login");
        }
      })
      .catch((err) => {
        const status = err.response?.status;
        if (status === 401) {
          setAllowed(false);
          router.replace("/login");
        } else {
          setAllowed(true);
        }
      });
  }, [router]);

  if (allowed !== true) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[var(--bg-main)]">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-[var(--brand-blue)] border-t-transparent" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-[var(--bg-main)]">
        {/* Full height sidebar from top to bottom */}
        <AppSidebar />

        <SidebarInset className="flex flex-col flex-1 min-w-0 overflow-hidden">
          {/* Navbar shifts automatically when sidebar expands/reduces */}
          <Navbar />
          <main className="flex-1 overflow-hidden relative">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
