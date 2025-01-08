import Sidebar from "@/app/component/layouts/sidebar.layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agent Chat",
  description: "Agent Chat",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Sidebar>
      {children}
    </Sidebar>
  );
}
