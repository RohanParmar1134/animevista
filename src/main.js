import React, { useState } from "react";
import axios from "axios";
import "./main.css"; // Import your custom CSS file for styling
// const bg1 = require("./long.mp4")
// const bg2 = require("./main.mp4")
// const bg3 = require("./bg3.mp4")
// const bg4 = require("./bg4.mp4")
// const bg5 = require("./bg5.mp4")
// const bg = require("./bg.mp4")
function Main() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [animeInfo, setAnimeInfo] = useState([]);
  const [name, setName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Please select an image file.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await axios.post(
        "https://api.trace.moe/search",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setAnimeInfo(response.data.result[0]);
      // setName(response.data.result[0].filename.split("][")[1]);
      console.log(response.data.result[0]);

      setSelectedFile(null);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (<>
 <link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Alegreya+Sans+SC:wght@400&family=Exo&family=Martian+Mono:wght@500;800&family=Rubik+Iso&display=swap" rel="stylesheet"/>
  <video id="video-background" autoPlay muted src="https://firebasestorage.googleapis.com/v0/b/microcontroller-80.appspot.com/o/rohan%2Fyt1s.com%20-%20Middle%20of%20the%20NightAMVAnime%20Mix%20-%20Trim.mp4?alt=media&token=7073a8e1-7ece-4e91-8506-9ef9425db8e3" type="video/mp4" >
  {/* <video id="video-background" autoPlay muted src={bg} type="video/mp4" > */}


    </video>
    {/* <script>{document.getElementById("video-background").volume  = "0.5"}</script> */}
    <div className="container">
      <header>
        <p id="headingname">AnimeVista</p>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <label>
            Select Image:
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </label>
          <button type="submit">Search</button>
        </form>
        {animeInfo && (
          <div className="results">
            <p>Results</p>
            <div className="anime-detailss">
              <p className="results">Anime Title: {animeInfo.filename}</p>
              <p className="results">Episode: {animeInfo.episode}</p>
              <p className="results">From-Duration: {parseInt(animeInfo.from)/60}</p>
              <p className="results">To-Duration: {parseInt(animeInfo.to)/60}</p>
            </div>
            <div className="anime-media">
              <img src={animeInfo.image} alt="Image Shows Here"/>
              <video src={animeInfo.video} width="750" height="500" controls />
            </div>
          </div>
        )}
      </main>
    </div>
    </>
  );
}

export default Main;
