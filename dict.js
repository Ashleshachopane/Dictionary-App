async function getWord() {
  const word = document.getElementById("wordInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (!word) {
    resultDiv.innerHTML = "<p>Please enter a word.</p>";
    return;
  }

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!response.ok) throw new Error("Word not found");

    const data = await response.json();
    const entry = data[0];

    //Extract word details
    const wordText = entry.word;
    const phonetics = entry.phonetics.find(p => p.text)?.text || "Not available";
    const audio = entry.phonetics.find(p => p.audio)?.audio || "";
    const meaning = entry.meanings[0]?.definitions[0]?.definition || "No definition found";
    const example = entry.meanings[0]?.definitions[0]?.example || "No example available";
    const antonyms = entry.meanings[0]?.antonyms?.join(", ") || "No antonyms available";

    resultDiv.innerHTML = `
      <p class="word">${wordText}</p>
      <p class="phonetics">
        <span id="playSound" style="cursor:pointer; color:#007bff;">🔊</span> ${phonetics}
      </p>
      <p class="meaning"><b>Meaning:</b> ${meaning}</p>
      <p class="example"><b>Example:</b> ${example}</p>
      <p class="antonyms"><b>Antonyms:</b> ${antonyms}</p>
      ${audio ? `<audio id="audioPlayer" controls src="${audio}"></audio>` : ""}
    `;

  
    if (audio) {
      document.getElementById("playSound").addEventListener("click", () => {
        new Audio(audio).play();
      });
    }

  } catch (error) {
    resultDiv.innerHTML = `<p style="color:red;">❌ Word not found.</p>`;
  }
}
