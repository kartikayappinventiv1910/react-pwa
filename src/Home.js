import React, { useState, useEffect } from "react";
import pwa from "../src/images/pwa.svg";
import spotify from "../src/images/spotify.jpg";

export default function Home() {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);

  const addToHome = () => {


    let deferredPrompt;

    // const addBtn = document.querySelector(".add-button");
    // addBtn.style.display = "none";
    // console.log(addBtn, "addbtn");
    window.addEventListener("beforeinstallprompt", (e) => {
      let addBtn = document.querySelector(".add-button");

      console.log("17");
      e.preventDefault();
      console.log("19");
      deferredPrompt = e;
      //   addBtn.style.display = "block";

      addBtn.addEventListener("click", () => {
        // addBtn.style.display = "none";

        deferredPrompt.prompt();
        console.log("25");
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === "accepted") {
            console.log("User accepted the A2HS prompt");
          } else {
            console.log("User dismissed the A2HS prompt");
          }
          deferredPrompt = null;
        });
      });
    });
  };

  const handleClick = () => {
    addToHome();
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };
  return (
    <div>
      <h1>home page</h1>
      <button onClick={handleClick} className="btnAdd">
        install
      </button>
      <button onClick={getLocation}>get location</button>

      <img alt="" src={pwa} height="400px" />
      <img alt="" src={spotify} height="400px" />
    </div>
  );
}
