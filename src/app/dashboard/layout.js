import { AuthProvider } from "@/lib/AuthContext";
import { Geist, Geist_Mono } from "next/font/google";
import Topbar from "@/components/topbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <div>
      <Topbar></Topbar>
        {/* <AuthProvider> */}
        <SidebarProvider>
        <div>
          <DashboardSidebar></DashboardSidebar>
        </div>

          <main className="w-full flex flex-col p-10">
          <SidebarTrigger>Open</SidebarTrigger>
            {children}</main>
        {/* </AuthProvider> */}
        </SidebarProvider>
    </div> 
  );
}
