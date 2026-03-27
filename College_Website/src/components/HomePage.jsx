
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
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source
              src="../public/homevideo.mp4"
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