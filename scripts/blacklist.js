document.addEventListener("DOMContentLoaded", function () {
    loadBlacklistedClubs();
});

function loadBlacklistedClubs() {
    const blacklistContainer = document.getElementById("blacklistContainer");
    blacklistContainer.innerHTML = ""; // Leegmaken voor refresh

    let blacklistedClubs = JSON.parse(localStorage.getItem("blacklist")) || [];

    if (blacklistedClubs.length === 0) {
        blacklistContainer.innerHTML = "<p>Geen clubs in de blacklist.</p>";
        return;
    }

    let row = document.createElement("div");
    row.classList.add("blacklist-row");

    blacklistedClubs.forEach((club, index) => {
        const clubCard = document.createElement("div");
        clubCard.classList.add("blacklist-club");

        clubCard.innerHTML = `
            <img src="${club.image}" alt="${club.name}" class="club-logo">
            <h3>${club.name}</h3>
            <p class="reason">Reden: <span>${club.reason}</span></p>
            <button class="edit-btn" onclick="editReason(${index})">reden aanpassen</button>
            <button class="remove-btn" onclick="removeFromBlacklist(${index})">Verwijderen</button>
        `;

        row.appendChild(clubCard);

        // Maak een nieuwe rij na elke 4 clubs
        if ((index + 1) % 4 === 0 || index === blacklistedClubs.length - 1) {
            blacklistContainer.appendChild(row);
            row = document.createElement("div");
            row.classList.add("blacklist-row");
        }
    });
}

function editReason(index) {
    let blacklistedClubs = JSON.parse(localStorage.getItem("blacklist")) || [];
    let newReason = prompt("Geef een nieuwe reden voor de blacklist:", blacklistedClubs[index].reason);

    if (newReason) {
        blacklistedClubs[index].reason = newReason;
        localStorage.setItem("blacklist", JSON.stringify(blacklistedClubs));
        loadBlacklistedClubs();
    }
}

function removeFromBlacklist(index) {
    let blacklistedClubs = JSON.parse(localStorage.getItem("blacklist")) || [];
    blacklistedClubs.splice(index, 1); // Verwijder club uit array
    localStorage.setItem("blacklist", JSON.stringify(blacklistedClubs));
    loadBlacklistedClubs();
}