import React from "react";
import Meta from "./Meta";

const Layout:React.FC = ({ children }) => {
  return (
    <div>
      <Meta />
      <div>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;