let highScore = localStorage.getItem("highScore") || 0;
let currentScore = 0;
let favoriteLeague = null;

document.getElementById("startQuiz").addEventListener("click", startQuiz);

async function startQuiz() {
    const quizContainer = document.getElementById("quizContainer");
    quizContainer.innerHTML = "<h2>Vraag 1: Welke club is dit?</h2>";

    const response = await fetch("https://api.futdatabase.com/api/clubs");
    const data = await response.json();
    
    const randomClub = data.clubs[Math.floor(Math.random() * data.clubs.length)];
    const clubEmblem = randomClub.image;
    const correctName = randomClub.name;

    quizContainer.innerHTML += `<img src="${clubEmblem}" alt="Club Embleem" class="quiz-img">`;

    let options = data.clubs
        .sort(() => 0.5 - Math.random()) 
        .slice(0, 3) 
        .map(club => club.name);

    options.push(correctName);
    options = options.sort(() => 0.5 - Math.random());

    options.forEach(option => {
        quizContainer.innerHTML += `<button class="answer-btn" onclick="checkAnswer('${option}', '${correctName}')">${option}</button>`;
    });

    quizContainer.innerHTML += `
        <br>
        <button class="fav-btn" onclick="addToFavorites('${correctName}')">❤️ Favoriet</button>
        <button class="blacklist-btn" onclick="addToBlacklist('${correctName}')">🚫 Blacklist</button>
    `;
}

function checkAnswer(selected, correct) {
    if (selected === correct) {
        currentScore++;
        startQuiz();
    } else {
        alert(`Fout! Het juiste antwoord was: ${correct}`);
        showScore();
    }
}

function addToFavorites(team) {
    alert(team + " is toegevoegd aan je favorieten!");
}

function addToBlacklist(team) {
    alert(team + " is toegevoegd aan de blacklist!");
}

async function addLeagueToFavorites() {
    if (favoriteLeague) {
        alert("Je hebt al een favoriete league!");
        return;
    }

    const response = await fetch("https://api.futdatabase.com/api/v1/leagues");
    const data = await response.json();

    const randomLeague = data.leagues[Math.floor(Math.random() * data.leagues.length)];
    favoriteLeague = randomLeague.name;

    alert(favoriteLeague + " is nu je favoriete league!");
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
        <button onclick="startQuiz()">Opnieuw spelen</button>
    `;

    currentScore = 0;
}