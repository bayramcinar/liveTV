// PlayerTV.js
import React from "react";
import { TheosPlayer } from "@aka_theos/react-hls-player";

function PlayerTV({ src, name }) {
  return (
    <div className="flex">
      <TheosPlayer
        src={src}
        title={name}
        hlsConfig={{
          liveSyncDurationCount: 1,
          liveDurationInfinity: true,
          liveMaxLatencyDurationCount: Infinity,
        }}
      />
    </div>
  );
}

export default PlayerTV;
