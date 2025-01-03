import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import LanguageSwitch from "./LanguageSwitch";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-[#0D1117]">
        <div className="fixed top-4 right-4 z-10">
          <LanguageSwitch />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
    </div>
  );
}
