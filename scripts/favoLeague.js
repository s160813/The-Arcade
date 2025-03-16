document.addEventListener("DOMContentLoaded", function () {
    loadFavoriteLeague();
});

function loadFavoriteLeague() {
    const favoriteLeagueContainer = document.getElementById("favoriteLeagueContainer");
    favoriteLeagueContainer.innerHTML = ""; // Reset content

    let favoriteLeague = localStorage.getItem("favoriteLeague");

    if (!favoriteLeague) {
        favoriteLeagueContainer.innerHTML = `<p>Je hebt nog geen favoriete league. Speel de quiz om er een te kiezen!</p>`;
        return;
    }

    // Zoek de league info op basis van naam
    let league = leagues.find(l => l.name === favoriteLeague);

    if (!league) {
        favoriteLeagueContainer.innerHTML = `<p>Fout: League niet gevonden.</p>`;
        return;
    }

    // Maak de league weergave
    favoriteLeagueContainer.innerHTML = `
        <div class="league-card">
            <img src="${league.image}" alt="${league.name}" class="league-logo">
            <h2>${league.name}</h2>
            <p>Bekijk alle clubs in deze league:</p>
            <button class="remove-btn" onclick="removeFavoriteLeague()">❌ Verwijderen</button>
        </div>
        <div id="leagueClubs"></div>
    `;

    loadLeagueClubs(league.name);
}

function removeFavoriteLeague() {
    localStorage.removeItem("favoriteLeague");
    loadFavoriteLeague();
}

function loadLeagueClubs(leagueName) {
    const leagueClubsContainer = document.getElementById("leagueClubs");
    leagueClubsContainer.innerHTML = "<h3>Clubs in deze league:</h3>";

    // Simulatie van een clublijst per league
    let clubsInLeague = {
        "Premier League": [
            { name: "Manchester United", country: "Engeland", image: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg" },
            { name: "Chelsea", country: "Engeland", image: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg" }
        ],
        "La Liga": [
            { name: "Real Madrid", country: "Spanje", image: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg" },
            { name: "Barcelona", country: "Spanje", image: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg" }
        ],
    };

    let clubs = clubsInLeague[leagueName] || [];

    if (clubs.length === 0) {
        leagueClubsContainer.innerHTML += "<p>Geen clubs beschikbaar.</p>";
        return;
    }

    clubs.forEach(club => {
        let clubElement = document.createElement("div");
        clubElement.classList.add("club-item");
        clubElement.innerHTML = `
            <p onclick="showClubInfo('${club.name}', '${club.image}', '${club.country}')">${club.name} (${club.country})</p>
        `;
        leagueClubsContainer.appendChild(clubElement);
    });
}

function showClubInfo(name, image, country) {
    const clubInfoContainer = document.getElementById("clubInfoContainer");
    clubInfoContainer.innerHTML = `
        <div class="club-info">
            <img src="${image}" alt="${name}" class="club-logo">
            <h2>${name}</h2>
            <p>Land: ${country}</p>
            <button class="favorite-btn" onclick="addToFavorites('${name}', '${image}', '${country}')">⭐ Favoriet</button>
        </div>
    `;
}

function addToFavorites(name, image, country) {
    let favoriteClubs = JSON.parse(localStorage.getItem("favoriteClubs")) || [];
    favoriteClubs.push({ name, image, country });
    localStorage.setItem("favoriteClubs", JSON.stringify(favoriteClubs));
    alert(`${name} is toegevoegd aan je favorieten!`);
}