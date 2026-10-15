// 🌍 Language selection
let selectedLanguage = "mix";

// 🔘 Change language
function setLanguage(lang) {
    selectedLanguage = lang;
    document.getElementById("result").innerHTML =
        "🔁 Language changed. Click again to refresh songs.";
}

// 🧠 Detect mood
function detectMood(input) {
    input = input.toLowerCase();

    if (input.match(/happy|excited|joy|great/)) return "happy";
    if (input.match(/sad|lonely|depressed|down|cry/)) return "sad";
    if (input.match(/angry|frustrated|mad/)) return "angry";
    if (input.match(/calm|relaxed|peaceful/)) return "chill";
    if (input.match(/romantic|love|crush/)) return "romantic";
    if (input.match(/focus|study|concentrate/)) return "focus";
    if (input.match(/tired|sleepy/)) return "sleep";
    if (input.match(/gym|workout|energy/)) return "workout";

    return "party";
}

// 🎵 Main function
async function getMusic() {
    let input = document.getElementById("moodInput").value;
    let mood = detectMood(input);

    document.getElementById("moodText").innerText =
        "Detected Mood: " + mood.toUpperCase();

    // 🎯 Mood-based queries
    let moodQueries = {
        happy: {
            hindi: ["happy hindi songs"],
            english: ["happy upbeat songs"],
            mix: ["happy hindi songs", "happy upbeat songs"]
        },
        sad: {
            hindi: ["emotional hindi songs"],
            english: ["sad emotional songs"],
            mix: ["emotional hindi songs", "sad emotional songs"]
        },
        romantic: {
            hindi: ["romantic hindi songs"],
            english: ["love songs"],
            mix: ["romantic hindi songs", "love songs"]
        },
        workout: {
            hindi: ["bollywood gym songs"],
            english: ["workout songs"],
            mix: ["bollywood gym songs", "workout songs"]
        },
        chill: {
            hindi: ["lofi hindi"],
            english: ["lofi chill beats"],
            mix: ["lofi hindi", "lofi chill beats"]
        },
        focus: {
            hindi: ["instrumental hindi"],
            english: ["study music"],
            mix: ["instrumental hindi", "study music"]
        },
        sleep: {
            hindi: ["calm hindi songs"],
            english: ["sleep music"],
            mix: ["calm hindi songs", "sleep music"]
        },
        angry: {
            hindi: ["hindi rap songs"],
            english: ["rock angry songs"],
            mix: ["hindi rap songs", "rock angry songs"]
        },
        party: {
            hindi: ["bollywood item songs"],
            english: ["dance songs"],
            mix: ["bollywood item songs", "dance songs"]
        }
    };

    // ✅ Safe query selection
    let queries = moodQueries[mood]?.[selectedLanguage] || ["popular songs"];

    console.log("Mood:", mood);
    console.log("Language:", selectedLanguage);
    console.log("Queries:", queries);

    document.getElementById("result").innerHTML = "⏳ Loading songs...";

    let allSongs = [];

    // 🔁 Fetch multiple queries
    for (let q of queries) {
        try {
            let url = `https://itunes.apple.com/search?term=${encodeURIComponent(q)}&media=music&limit=10`;

            let res = await fetch(url);
            let data = await res.json();

            if (data.results) {
                allSongs = allSongs.concat(data.results);
            }
        } catch (err) {
            console.error("Error fetching:", q, err);
        }
    }

    // ⚠️ No songs case
    if (allSongs.length === 0) {
        document.getElementById("result").innerHTML =
            "⚠️ No songs found. Try different mood.";
        return;
    }

    // 🎲 Shuffle + limit
    let songs = allSongs.sort(() => 0.5 - Math.random()).slice(0, 10);

    let output = "";

    songs.forEach(song => {
        output += `
        <div class="card">
            <img src="${song.artworkUrl100}">
            <h3>${song.trackName}</h3>
            <p>${song.artistName}</p>
            <audio controls src="${song.previewUrl}"></audio>
        </div>
        `;
    });

    document.getElementById("result").innerHTML = output;
}