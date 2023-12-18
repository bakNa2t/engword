const inputEl = document.getElementById("input");
const infoTextEl = document.getElementById("info_text");
const meaningContainerEl = document.getElementById("meaning_container");
const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("meaning");
const audioEl = document.getElementById("audio");
const btnSearch = document.getElementById("btn-search");

async function fetchApi(word) {
  try {
    infoTextEl.style.display = "block";
    meaningContainerEl.style.display = "none";
    infoTextEl.innerText = `Searching the meanig of "${word}"`;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(url).then((res) => {
      if (!res.ok) {
        throw new Error(error);
      } else {
        return res.json();
      }
    });

    if (result.title) {
      meaningContainerEl.style.display = "block";
      infoTextEl.style.display = "none";
      titleEl.innerText = word;
      meaningEl.innerText = "N/A";
      audioEl.style.display = "none";
    } else {
      infoTextEl.style.display = "none";
      meaningContainerEl.style.display = "block";
      audioEl.style.display = "inline-flex";
      titleEl.innerText = result[0].word;
      meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
      audioEl.src = result[0].phonetics[0].audio;
    }
  } catch (error) {
    console.log(error.message);
    infoTextEl.innerText = `The word "${word}" was not found, try again`;
    // infoTextEl.innerText = `Something happened worng, try it again later`;
  }
}

inputEl.addEventListener("keyup", (e) => {
  if (inputEl.value && e.key === "Enter") {
    fetchApi(inputEl.value);
  } else {
    infoTextEl.innerText = `Please provide a word to search`;
  }
});

btnSearch.addEventListener("click", () => {
  if (inputEl.value !== "") {
    fetchApi(inputEl.value);
  } else {
    infoTextEl.innerText = `Please provide a word to search`;
  }
});
