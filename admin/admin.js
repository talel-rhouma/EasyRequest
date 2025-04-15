// script.js

// Liste des demandes simulée pour l'exemple
const requests = [
  { client: 'Client A', date: '2025-04-10', lieu: 'Tunis', statut: 'En Attente', technicien: 'Technicien 1' },
  { client: 'Client B', date: '2025-04-11', lieu: 'Sousse', statut: 'En Cours', technicien: 'Technicien 2' },
  { client: 'Client C', date: '2025-04-12', lieu: 'Nabeul', statut: 'Terminée', technicien: 'Technicien 1' }
];

// Liste des paiements simulée
const payments = [
  { client: 'Client A', montant: '500 TND', date: '2025-04-10', statut: 'Payé' },
  { client: 'Client B', montant: '300 TND', date: '2025-04-11', statut: 'Non Payé' }
];

// Liste des notifications simulée
const notifications = [
  'Nouvelle demande soumise par Client A.',
  'Demande de Client B en cours de traitement.'
];

// Liste des historiques simulée
const history = [
  { demande: 'Demande de Client A', statut: 'Terminée', date: '2025-04-10' },
  { demande: 'Demande de Client B', statut: 'En Cours', date: '2025-04-11' }
];

// Fonction pour afficher le tableau de bord
function showDashboard() {
  hideSections();
  document.getElementById('dashboard').style.display = 'block';
  updateDashboardStats();
}

// Fonction pour afficher les demandes des clients
function showClientRequests() {
  hideSections();
  document.getElementById('clientRequests').style.display = 'block';
  displayClientRequests();
}

// Fonction pour afficher les paiements
function showPayments() {
  hideSections();
  document.getElementById('payments').style.display = 'block';
  displayPayments();
}

// Fonction pour afficher les notifications
function showNotifications() {
  hideSections();
  document.getElementById('notifications').style.display = 'block';
  displayNotifications();
}

// Fonction pour afficher l'historique
function showHistory() {
  hideSections();
  document.getElementById('history').style.display = 'block';
  displayHistory();
}

// Fonction pour cacher toutes les sections de contenu
function hideSections() {
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => section.style.display = 'none');
}

// Mettre à jour les statistiques du tableau de bord
function updateDashboardStats() {
  const totalRequests = requests.length;
  const completedRequests = requests.filter(request => request.statut === 'Terminée').length;
  const ongoingRequests = requests.filter(request => request.statut === 'En Cours').length;
  const pendingRequests = requests.filter(request => request.statut === 'En Attente').length;

  document.getElementById('totalRequests').innerText = totalRequests;
  document.getElementById('completedRequests').innerText = completedRequests;
  document.getElementById('ongoingRequests').innerText = ongoingRequests;
  document.getElementById('pendingRequests').innerText = pendingRequests;
}

// Fonction pour afficher les demandes des clients
function displayClientRequests() {
  const tableBody = document.querySelector('#clientRequestsTable tbody');
  tableBody.innerHTML = '';
  requests.forEach(request => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${request.client}</td>
          <td>${request.date}</td>
          <td>${request.lieu}</td>
          <td><span class="badge badge-${getRequestBadgeClass(request.statut)}">${request.statut}</span></td>
          <td>${request.technicien}</td>
          <td>
              <button class="btn btn-info btn-sm" onclick="changeRequestStatus('${request.client}')">Modifier Statut</button>
          </td>
      `;
      tableBody.appendChild(row);
  });
}

// Fonction pour afficher les paiements
function displayPayments() {
  const tableBody = document.querySelector('#paymentsTable tbody');
  tableBody.innerHTML = '';
  payments.forEach(payment => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${payment.client}</td>
          <td>${payment.montant}</td>
          <td>${payment.date}</td>
          <td><span class="badge badge-${getPaymentBadgeClass(payment.statut)}">${payment.statut}</span></td>
      `;
      tableBody.appendChild(row);
  });
}

// Fonction pour afficher les notifications
function displayNotifications() {
  const notificationList = document.getElementById('notificationList');
  notificationList.innerHTML = '';
  notifications.forEach(notification => {
      const listItem = document.createElement('li');
      listItem.classList.add('list-group-item');
      listItem.textContent = notification;
      notificationList.appendChild(listItem);
  });
}

// Fonction pour afficher l'historique
function displayHistory() {
  const tableBody = document.querySelector('#historyTable tbody');
  tableBody.innerHTML = '';
  history.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${item.demande}</td>
          <td><span class="badge badge-${getRequestBadgeClass(item.statut)}">${item.statut}</span></td>
          <td>${item.date}</td>
      `;
      tableBody.appendChild(row);
  });
}

// Fonction pour obtenir la classe de badge en fonction du statut de la demande
function getRequestBadgeClass(statut) {
  switch (statut) {
      case 'Terminée':
          return 'success';
      case 'En Cours':
          return 'danger';
      case 'En Attente':
          return 'warning';
      default:
          return 'secondary';
  }
}

// Fonction pour obtenir la classe de badge en fonction du statut du paiement
function getPaymentBadgeClass(statut) {
  return statut === 'Payé' ? 'success' : 'danger';
}


