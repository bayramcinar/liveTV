import React, { useState, useEffect } from "react";
import axios from "axios";
import TvBox from "./tvBox";
import m3u from "./new.m3u";
import { TheosPlayer } from "@aka_theos/react-hls-player";
import belgesel from "../images/belgesel.png";
import haber from "../images/haber.png";
import spor from "../images/spor.png";
import müzik from "../images/müzik.png";
import ulusal from "../images/ulusal.png";

function TvList() {
  const [originalChannels, setOriginalChannels] = useState([]);
  const [tvChannels, setTvChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(m3u);
        const { channels, categories } = parseM3UContent(response.data);
        setTvChannels(channels);
        setOriginalChannels(channels);
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
    const filteredChannels = originalChannels.filter(
      (channel) => channel.category === category
    );
    setTvChannels(filteredChannels);
  };

  return (
    <>
      <div className="flex">
        <div className="flex w-[40%] lg:w-[20%]">
          <div className="flex flex-wrap bg-gray h-[100vh] overflow-auto items-center justify-center">
            <div className="categories flex backdrop-blur-sm justify-around sticky top-0 z-10 overflow-y-scroll">
              {categories.map((category, index) => (
                <button
                  className="p-2 bg-white rounded-xl m-2 "
                  key={index}
                  onClick={() => handleCategorySelect(category)}
                >
                  <div className="flex flex-col items-center justify-center">
                    {category === "BELGESEL" && (
                      <img src={belgesel} className="w-8" alt={category} />
                    )}
                    {category === "HABER" && (
                      <img src={haber} className="w-8" alt={category} />
                    )}
                    {category === "SPOR" && (
                      <img src={spor} className="w-8" alt={category} />
                    )}
                    {category === "MUZIK" && (
                      <img src={müzik} className="w-8" alt={category} />
                    )}
                    {category === "ULUSAL" && (
                      <img src={ulusal} className="w-8" alt={category} />
                    )}
                    <h1 className="text-xs mt-2 font-semibold">{category}</h1>
                  </div>
                </button>
              ))}
            </div>
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
        <div className="flex h-[100vh] w-[60%] lg:w-[80%]">
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
