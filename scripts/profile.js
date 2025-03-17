// Profielfoto wijzigen
function changeProfilePhoto(imagePath) {
    document.getElementById("profile-photo").src = imagePath;
    localStorage.setItem("profilePhoto", imagePath);
}