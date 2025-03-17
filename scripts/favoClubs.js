document.addEventListener("DOMContentLoaded", function () {
    loadFavoriteClubs();
});



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