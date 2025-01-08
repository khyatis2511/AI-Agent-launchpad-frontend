import type { Metadata } from "next";
import Sidebar from "../component/layouts/sidebar.layout";

export const metadata: Metadata = {
  title: "Agent Dashboard",
  description: "Agent Dashboard",
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
