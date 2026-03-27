import React from "react";
import PlacementValue from "./PlacementValue";

function HomePage() {
  return (
    <>
      <div
        className="w-full overflow-hidden bg-black h-screen"
        style={{ height: "100vh" }}
      >
        <div className="relative w-full h-screen">
          <video
            key="home-video" /* <-- Forces video to reload on route change */
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            {/* Remove ../public and just use / */}
            <source
              src="/homevideo.mp4" 
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <PlacementValue />
    </>
  );
}

export default HomePage;