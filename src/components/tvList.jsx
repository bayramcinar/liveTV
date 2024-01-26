import React, { useState, useEffect } from "react";
import axios from "axios";
import TvBox from "./tvBox";
import m3u from "./new.m3u";
import { TheosPlayer } from "@aka_theos/react-hls-player";

function TvList() {
  const [tvChannels, setTvChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(m3u);
        const { channels, categories } = parseM3UContent(response.data);
        setTvChannels(channels);
        setCategories(categories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const parseM3UContent = (m3uContent) => {
    const channels = [];
    const categories = new Set();
    const lines = m3uContent.split("\n");

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line.startsWith("#EXTINF:")) {
        const nameMatch = line.match(/tvg-name="([^"]+)"/);
        const logoMatch = line.match(/tvg-logo="([^"]+)"/);
        const categoryMatch = line.match(/group-title="([^"]+)"/);

        if (nameMatch) {
          const name = nameMatch[1];
          const logo = logoMatch ? logoMatch[1] : "";
          const streamUrl = lines[i + 1].trim();
          const category = categoryMatch ? categoryMatch[1] : "Uncategorized";

          channels.push({ name, logo, streamUrl, category });
          categories.add(category);
        }
      }
    }

    return { channels, categories: Array.from(categories) };
  };

  const handleChannelSelect = (channel) => {
    setSelectedChannel(channel);
  };

  const handleCategorySelect = (category) => {
    const filteredChannels = tvChannels.filter(
      (channel) => channel.category === category
    );
    setTvChannels(filteredChannels);
  };

  return (
    <>
      <div className="flex">
        <div className="categories flex flex-col bg-gray justify-around">
          {categories.map((category, index) => (
            <button
              className="p-2 bg-white rounded-r-xl m-2 ml-0"
              key={index}
              onClick={() => handleCategorySelect(category)}
            >
              {category.split("").map((letter, i) => (
                <div className="flex flex-col font-semibold">
                  <span>{letter}</span>
                </div>
              ))}
            </button>
          ))}
        </div>
        <div className="flex w-1/4">
          <div className="flex flex-wrap bg-gray h-[100vh] overflow-auto items-center justify-center">
            {tvChannels.map((channel, index) => (
              <TvBox
                key={index}
                name={channel.name}
                icon={channel.logo}
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
