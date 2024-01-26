import React, { useState, useEffect } from "react";
import axios from "axios";
import TvBox from "./tvBox";
import m3u from "./turk.m3u";
import { TheosPlayer } from "@aka_theos/react-hls-player";
function TvList() {
  const [tvChannels, setTvChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(m3u);
        const channels = parseM3UContent(response.data);
        setTvChannels(channels);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [tvChannels]);

  const parseM3UContent = (m3uContent) => {
    const channels = [];
    const lines = m3uContent.split("\n");

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      // console.log(line);
      if (line.startsWith("#EXTINF:")) {
        const nameMatch = line.match(/tvg-name="([^"]+)"/);

        if (nameMatch) {
          const name = nameMatch[1];

          const streamUrl = lines[i + 1].trim();
          channels.push({ name, streamUrl });
        }
      }
    }

    return channels;
  };

  const handleChannelSelect = (channel) => {
    console.log(channel);
    setSelectedChannel(channel);
  };

  return (
    <>
      <div className="flex">
        <div className="flex w-1/4">
          <div className="flex flex-wrap bg-gray h-[100vh] overflow-auto items-center justify-center">
            {tvChannels.map((channel, index) => (
              <TvBox
                key={index}
                name={channel.name}
                src={channel.streamUrl}
                onSelect={() => handleChannelSelect(channel)}
              />
            ))}
          </div>
        </div>
        <div className="flex h-[100vh] w-3/4">
          <TheosPlayer
            height={"100vh"}
            width="100%"
            autoPlay={true}
            src={
              selectedChannel.streamUrl
                ? selectedChannel.streamUrl
                : "https://tv8-live.daioncdn.net/tv8/tv8.m3u8"
            }
            title={selectedChannel.name ? selectedChannel.name : "TV8"}
          />
        </div>
      </div>
    </>
  );
}

export default TvList;
