import { useState } from "react";
import "./App.css";
import Picture from "./components/Picture";

function App() {
  const [word, setWord] = useState("");
  const [photo, setPhoto] = useState([]);

  function searchImage(e) {
    e.preventDefault();
    if (!word) {
      alert("Input the Image name!");
    } else {
      fetchImageFromAPI();
    }
  }

  async function fetchImageFromAPI() {
    const url = `${
      import.meta.env.VITE_API_URL
    }?page=1&query=${word}&client_id=${import.meta.env.VITE_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    const result = data.results;
    if (result.length === 0) {
      alert("Don't have image " + word);
      setWord("");
    } else {
      setPhoto(result);
    }
  }

  return (
    <>
      <h1>Search Images API</h1>
      <form onSubmit={searchImage}>
        <input
          type="text"
          placeholder="Image Name"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div className="search-result">
        {photo.map((data, index) => {
          return <Picture {...data} key={index} />;
        })}
      </div>
    </>
  );
}

export default App;
