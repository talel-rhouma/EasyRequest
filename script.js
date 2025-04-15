let isLoggedIn = false;
let tasks = [
  { id: 1, titre: "Test micros", description: "Salle A", statut: "EnCours" },
  { id: 2, titre: "Vérifier câblage", description: "Salle B", statut: "Terminee" }
];
let currentFilter = "Toutes";

function showLogin() {
  document.getElementById('mainContent').innerHTML = `
    <div class="login">
      <h2>Connexion</h2>
      <input type="text" id="username" placeholder="Nom d'utilisateur" />
      <input type="password" id="password" placeholder="Mot de passe" />
      <button onclick="login()">Se connecter</button>
    </div>
  `;
}

function login() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  if (user === "technicien" && pass === "1234") {
    isLoggedIn = true;
    renderDashboard();
  } else {
    alert("Identifiants incorrects.");
  }
}

function renderDashboard() {
  const container = document.getElementById('mainContent');
  container.innerHTML = `
    <div class="filters">
      <label>Filtrer les demandes :</label>
      <select onchange="filterTasks(this.value)">
        <option value="Toutes">Toutes</option>
        <option value="EnCours">En cours</option>
        <option value="Terminee">Terminée</option>
      </select>
    </div>
    <div id="taskContainer"></div>
    <div class="add-form">
      <h2>Ajouter une demande</h2>
      <input id="newTitre" placeholder="Titre" />
      <textarea id="newDesc" placeholder="Description"></textarea>
      <button onclick="addTask()">Ajouter</button>
    </div>
    <div class="card">
      <h2>Historique des demandes</h2>
      <ul id="historyList"></ul>
    </div>
  `;
  renderTasks();
  renderHistory();
}

function renderTasks() {
  const taskContainer = document.getElementById('taskContainer');
  taskContainer.innerHTML = "";
  tasks.filter(t => currentFilter === "Toutes" || t.statut === currentFilter)
    .forEach(task => {
      taskContainer.innerHTML += `
        <div class="card">
          <h3>${task.titre}</h3>
          <span class="status ${task.statut}">${task.statut === "EnCours" ? "En cours" : "Terminée"}</span>
          <p>${task.description}</p>
          ${task.statut === "EnCours" ? `<button onclick="markAsDone(${task.id})">Marquer comme terminée</button>` : ""}
        </div>
      `;
    });
}

function renderHistory() {
  const history = document.getElementById('historyList');
  history.innerHTML = "";
  tasks.forEach(task => {
    history.innerHTML += `<li>${task.titre} - ${task.description} [${task.statut}]</li>`;
  });
}

function filterTasks(value) {
  currentFilter = value;
  renderTasks();
}

function markAsDone(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.statut = "Terminee";
    renderTasks();
    renderHistory();
  }
}

function addTask() {
  const titre = document.getElementById('newTitre').value.trim();
  const desc = document.getElementById('newDesc').value.trim();
  if (!titre || !desc) {
    alert("Remplis tous les champs !");
    return;
  }
  const newTask = { id: tasks.length + 1, titre, description: desc, statut: "EnCours" };
  tasks.push(newTask);
  showNotification(`Nouvelle demande assignée : ${titre}`);
  document.getElementById('newTitre').value = "";
  document.getElementById('newDesc').value = "";
  renderTasks();
  renderHistory();
}

function showNotification(message) {
  const notif = document.createElement("div");
  notif.textContent = message;
  notif.style.position = "fixed";
  notif.style.bottom = "20px";
  notif.style.right = "20px";
  notif.style.background = "#f1c40f";
  notif.style.color = "#000";
  notif.style.padding = "10px 20px";
  notif.style.borderRadius = "8px";
  notif.style.boxShadow = "0 0 10px rgba(0,0,0,0.2)";
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 4000);
}

showLogin();
