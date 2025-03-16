document.addEventListener("DOMContentLoaded", function () {
    loadFavoriteClubs();
});

function loadFavoriteClubs() {
    const favoContainer = document.getElementById("favoClubsContainer");
    favoContainer.innerHTML = ""; // Leegmaken voor refresh

    let favoriteClubs = JSON.parse(localStorage.getItem("favoriteClubs")) || [];

    if (favoriteClubs.length === 0) {
        favoContainer.innerHTML = "<p>Geen favoriete clubs. Voeg er een toe via de quiz!</p>";
        return;
    }

    let row = document.createElement("div");
    row.classList.add("club-row");

    favoriteClubs.forEach((club, index) => {
        const clubCard = document.createElement("div");
        clubCard.classList.add("club-card");
        clubCard.innerHTML = `
            <img src="${club.image}" alt="${club.name}" class="club-logo">
            <h3>${club.name}</h3>
        `;
        clubCard.addEventListener("click", () => showClubDetails(index));
        row.appendChild(clubCard);

        if ((index + 1) % 4 === 0 || index === favoriteClubs.length - 1) {
            favoContainer.appendChild(row);
            row = document.createElement("div");
            row.classList.add("club-row");
        }
    });
}

function showClubDetails(index) {
    let favoriteClubs = JSON.parse(localStorage.getItem("favoriteClubs")) || [];
    let club = favoriteClubs[index];

    document.getElementById("clubName").textContent = club.name;
    document.getElementById("clubLogo").src = club.image;
    document.getElementById("clubInfo").textContent = club.info;

    let playerList = document.getElementById("playerList");
    playerList.innerHTML = "";
    club.players.forEach(player => {
        let li = document.createElement("li");
        li.textContent = player;
        playerList.appendChild(li);
    });

    document.getElementById("timesSeen").textContent = club.timesSeen;
    document.getElementById("seenButton").onclick = () => increaseSeenCount(index);

    document.getElementById("clubDetailContainer").classList.remove("hidden");
}

function increaseSeenCount(index) {
    let favoriteClubs = JSON.parse(localStorage.getItem("favoriteClubs")) || [];
    favoriteClubs[index].timesSeen++;
    localStorage.setItem("favoriteClubs", JSON.stringify(favoriteClubs));
    document.getElementById("timesSeen").textContent = favoriteClubs[index].timesSeen;
}