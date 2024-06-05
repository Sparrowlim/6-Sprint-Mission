import Header from "./Header";
import React, { FC } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="mx-auto max-w-[1200px]">
      <Header />
      <h1>레이아웃</h1>
      {children}
    </div>
  );
};

export default Layout;
