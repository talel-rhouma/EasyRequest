document.getElementById("registrationForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("motdepasse").value;
  const genre = document.getElementById("genre").value;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    alert("Adresse e-mail invalide !");
    return;
  }

  if (password.length < 6) {
    alert("Le mot de passe doit contenir au moins 6 caractères !");
    return;
  }

  if (genre !== "M" && genre !== "F") {
    alert("Veuillez sélectionner un genre valide !");
    return;
  }

  alert("Compte créé avec succès !");
});