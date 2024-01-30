import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Add() {
  const location = useLocation();

  useEffect(() => {
    const scriptElement = document.querySelector(
      'script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9149024490109255"]'
    );

    const handleScriptLoad = () => {
      try {
        if (window.adsbygoogle) {
          console.log("pushing ads");
          window.adsbygoogle.push({});
        } else {
          scriptElement.addEventListener("load", handleScriptLoad);
          console.log("waiting until adsense lib is loaded");
        }
      } catch (err) {
        console.log(err);
      }
    };

    handleScriptLoad();

    return () => {
      if (scriptElement) {
        scriptElement.removeEventListener("load", handleScriptLoad);
      }
    };
  }, [location.pathname, location.search]);

  return (
    <div className="overflow-hidden m-2">
      <ins
        className="adsbygoogle block"
        data-ad-client="ca-pub-9149024490109255"
        data-ad-slot="8881854965"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}

export default Add;
