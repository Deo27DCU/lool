const BASE_URL = "https://taylor-swift-api.sarbo.workers.dev";

async function fetchAllSongs() {
  try {
    const response = await fetch(`${BASE_URL}/songs`);
    if (!response.ok) throw new Error("Failed to fetch song list.");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Could not load songs.");
  }
}

async function fetchLyrics(songID) {
  try {
    const response = await fetch(`${BASE_URL}/lyrics/${songID}`);
    if (!response.ok) throw new Error("Failed to fetch lyrics.");
    const data = await response.json();
    return data.lyrics;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to load lyrics.");
  }
}

document.getElementById("fetchLyrics").addEventListener("click", async () => {
  const songInput = document.getElementById("songInput").value.trim();
  const lyricsOutput = document.getElementById("lyricsOutput");

  if (!songInput) {
    lyricsOutput.textContent = "Please enter a song name!";
    return;
  }

  lyricsOutput.textContent = "Fetching lyrics...";

  try {
   
    const songs = await fetchAllSongs();


    if (!Array.isArray(songs)) {
      throw new Error("Unexpected response format.");
    }

   
    const song = songs.find(
      (s) => s.title && s.title.toLowerCase() === songInput.toLowerCase()
    );

    if (!song) {
      lyricsOutput.textContent = "Song not found in the API!";
      return;
    }

    
    const lyrics = await fetchLyrics(song.song_id);
    lyricsOutput.textContent =
      lyrics || "Lyrics not available for this song.";
  } catch (error) {
    lyricsOutput.textContent =
      error.message || "An unexpected error occurred.";
  }
});
