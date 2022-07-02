import React, { ReactNode } from "react";
import Appbar from "./Appbar";

interface Props {
  children: ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Appbar />
      <div className="pt-16">{children}</div>
    </div>
  );
};

export default Layout;
