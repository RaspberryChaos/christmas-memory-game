import React from "react";
import Meta from "./Meta";
import MusicPlayer from "./MusicPlayer";

interface Props {
  music: boolean;
}

const Layout: React.FC<Props> = ({ music, children }) => {
  return (
    <div>
      <Meta />
      <div>
        {music && <MusicPlayer />}
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
