let highScore = localStorage.getItem("highScore") || 0;
let currentScore = 0;
let favoriteLeague = null;
let blacklist = [];
let favoriteClub = null;

// Hardcoded clubs (15 clubs)
const clubs = [
    { name: "Real Madrid", image: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg" },
    { name: "Manchester United", image: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg" },
    { name: "Barcelona", image: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg" },
    { name: "Bayern Munich", image: "https://upload.wikimedia.org/wikipedia/en/1/1f/FC_Bayern_München_logo_%282017%29.svg" },
    { name: "Juventus", image: "https://upload.wikimedia.org/wikipedia/en/d/d2/Juventus_FC_2017_logo.svg" },
    { name: "Liverpool", image: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg" },
    { name: "Chelsea", image: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg" },
    { name: "Manchester City", image: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg" },
    { name: "AC Milan", image: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg" },
    { name: "Inter Milan", image: "https://upload.wikimedia.org/wikipedia/en/0/0b/FC_Internazionale_Milano_2021.svg" },
    { name: "Paris Saint-Germain", image: "https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg" },
    { name: "Arsenal", image: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg" },
    { name: "Borussia Dortmund", image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg" },
    { name: "Tottenham Hotspur", image: "https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg" },
    { name: "Napoli", image: "https://upload.wikimedia.org/wikipedia/commons/2/28/S.S.C._Napoli_logo.svg" }
];

// Hardcoded leagues (10 leagues)
const leagues = [
    { name: "Premier League", image: "https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg" },
    { name: "La Liga", image: "https://upload.wikimedia.org/wikipedia/en/1/13/LaLiga_logo_%282023%29.svg" },
    { name: "Bundesliga", image: "https://upload.wikimedia.org/wikipedia/en/d/df/Bundesliga_logo_%282017%29.svg" },
    { name: "Serie A", image: "https://upload.wikimedia.org/wikipedia/en/e/e1/Serie_A_logo_%282019%29.svg" },
    { name: "Ligue 1", image: "https://upload.wikimedia.org/wikipedia/en/b/ba/Ligue1_UberEats_logo.png" },
    { name: "Eredivisie", image: "https://upload.wikimedia.org/wikipedia/en/6/68/Eredivisie_logo.svg" },
    { name: "MLS", image: "https://upload.wikimedia.org/wikipedia/en/7/76/MLS_crest_logo_RGB.svg" },
    { name: "Primeira Liga", image: "https://upload.wikimedia.org/wikipedia/en/b/bf/Liga_Portugal_logo.svg" },
    { name: "Championship", image: "https://upload.wikimedia.org/wikipedia/en/2/2c/EFL_Championship.svg" },
    { name: "Brasileirão", image: "https://upload.wikimedia.org/wikipedia/en/3/32/Campeonato_Brasileiro_Série_A_logo.png" }
];

document.getElementById("startQuiz").addEventListener("click", function() {
    document.getElementById("startQuiz").style.display = "none"; // Verberg de knop
    document.getElementById("quizContainer").style.display = "block";
    askClubQuestion();
});

function askClubQuestion() {
    const quizContainer = document.getElementById("quizContainer");
    quizContainer.innerHTML = "<h2>Vraag 1: Welke club is dit?</h2>";

    let availableClubs = clubs.filter(club => !blacklist.includes(club.name));

    if (availableClubs.length < 4) {
        quizContainer.innerHTML = "<p class='error'>Geen clubs meer beschikbaar!</p>";
        return;
    }

    const randomClub = availableClubs[Math.floor(Math.random() * availableClubs.length)];
    const correctName = randomClub.name;

    quizContainer.innerHTML += `
        <img src="${randomClub.image}" alt="Club Embleem" class="quiz-img">
    `;

    let options = [...availableClubs]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(club => club.name);

    options.push(correctName);
    options = options.sort(() => 0.5 - Math.random());

    options.forEach(option => {
        quizContainer.innerHTML += `<button class="answer-btn" onclick="checkAnswer('${option}', '${correctName}')">${option}</button>`;
    });

    // Hier worden de knoppen toegevoegd: Blacklist en Favorieten
    quizContainer.innerHTML += `
        <br>
        <button class="fav-btn" onclick="addToFavorites('${correctName}', '${randomClub.image}')">❤️ Favoriet</button>
        <button class="blacklist-btn" onclick="addToBlacklist('${correctName}')">🚫 Blacklist</button>
    `;
}

function addToFavorites(clubName, clubImage) {
    let favoriteClubs = JSON.parse(localStorage.getItem("favoriteClubs")) || [];

    // Controleer of de club al in favorieten staat
    if (favoriteClubs.some(club => club.name === clubName)) {
        alert(`${clubName} staat al in je favorieten!`);
        return;
    }

    // Voeg de club toe
    let newClub = {
        name: clubName,
        image: clubImage || "../assets/default-club.png",
        info: "Dit is een geweldige club!",
        players: ["Speler 1", "Speler 2", "Speler 3"], 
        timesSeen: 0
    };

    favoriteClubs.push(newClub);
    localStorage.setItem("favoriteClubs", JSON.stringify(favoriteClubs));

    alert(`${clubName} is toegevoegd aan je favorieten!`);
}

function askLeagueQuestion() {
    const quizContainer = document.getElementById("quizContainer");
    quizContainer.innerHTML = "<h2>Vraag 2: Welke league is dit?</h2>";

    const randomLeague = leagues[Math.floor(Math.random() * leagues.length)];
    const correctName = randomLeague.name;

    quizContainer.innerHTML += `
        <img src="${randomLeague.image}" alt="League Embleem" class="quiz-img">
    `;

    let options = [...leagues]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(league => league.name);

    options.push(correctName);
    options = options.sort(() => 0.5 - Math.random());

    options.forEach(option => {
        quizContainer.innerHTML += `<button class="answer-btn" onclick="checkAnswer('${option}', '${correctName}')">${option}</button>`;
    });

    // Controleer of er al een favoriete league is
    let favoriteButton = `<button class="favorite-btn" onclick="setFavoriteLeague('${correctName}')">💛 Favoriet</button>`;

    if (favoriteLeague) {
        favoriteButton = `<button class="favorite-btn" onclick="confirmFavoriteLeague('${correctName}')">💛 Favoriet</button>`;
    }

    quizContainer.innerHTML += `
        <br>
        ${favoriteButton}
    `;
}

function setFavoriteLeague(league) {
    favoriteLeague = league;
    localStorage.setItem("favoriteLeague", league);
    alert(league + " is nu je favoriete league!");
}

function confirmFavoriteLeague(newLeague) {
    let confirmation = confirm(`Wil je ${favoriteLeague} vervangen door ${newLeague} als je nieuwe favoriete league?`);
    if (confirmation) {
        setFavoriteLeague(newLeague);
    }
}

function addLeagueToFavorites(league) {
    let currentFavorite = localStorage.getItem("favoriteLeague");

    if (currentFavorite) {
        let confirmChange = confirm(
            `${currentFavorite} is al je favoriete league. Wil je deze vervangen door ${league}?`
        );

        if (!confirmChange) {
            return; // Doe niets als de gebruiker niet wil vervangen
        }
    }

    localStorage.setItem("favoriteLeague", league);
    alert(`${league} is nu je favoriete league!`);
}

function checkAnswer(selected, correct) {
    if (selected === correct) {
        currentScore++;
        askLeagueQuestion();
    } else {
        alert(`Fout! Het juiste antwoord was: ${correct}`);
        showScore();
    }
}

function addToFavorites(team) {
    favoriteClub = team;
    alert(team + " is toegevoegd aan je favorieten!");
}

function addToBlacklist(team) {
    blacklist.push(team);
    alert(team + " is toegevoegd aan de blacklist!");
}
function addToBlacklist(team) {
    let blacklistedClubs = JSON.parse(localStorage.getItem("blacklist")) || [];

    // Controleer of de club al in de blacklist staat
    if (blacklistedClubs.some(club => club.name === team)) {
        alert(team + " staat al op de blacklist!");
        return;
    }

    // Zoek de club op basis van naam
    let clubToBlacklist = clubs.find(club => club.name === team);
    if (!clubToBlacklist) return;

    // Vraag om een reden
    let reason = prompt("Waarom wil je " + team + " op de blacklist zetten?", "Niet leuk / Slechte ervaring");

    blacklistedClubs.push({
        name: clubToBlacklist.name,
        image: clubToBlacklist.image,
        reason: reason || "Geen reden opgegeven"
    });

    localStorage.setItem("blacklist", JSON.stringify(blacklistedClubs));
    alert(team + " is toegevoegd aan de blacklist!");
}

function addLeagueToFavorites(league) {
    if (favoriteLeague) {
        alert("Je hebt al een favoriete league!");
    } else {
        favoriteLeague = league;
        alert(favoriteLeague + " is nu je favoriete league!");
    }
}

function showScore() {
    if (currentScore > highScore) {
        highScore = currentScore;
        localStorage.setItem("highScore", highScore);
        alert("Nieuwe Highscore: " + highScore);
    }

    document.getElementById("quizContainer").innerHTML = `
        <h2>Game Over!</h2>
        <p>Je score: ${currentScore}</p>
        <p>Hoogste score: ${highScore}</p>
        <button id="restartQuiz">Opnieuw spelen</button>
    `;

    document.getElementById("restartQuiz").addEventListener("click", function() {
        startQuiz();
    });

    currentScore = 0; // Reset de score
}
function startQuiz() {
    document.getElementById("startQuiz").style.display = "none"; // Verberg de startknop
    document.getElementById("quizContainer").style.display = "block"; // Toon de quiz-container
    askClubQuestion(); // Start de eerste vraag opnieuw
}