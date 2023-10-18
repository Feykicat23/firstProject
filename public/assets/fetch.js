function fetchAndDisplayStatistics() {
  fetch('/data.json')
    .then((response) => response.json())
    .then((data) => {
      const { users, messagesSend, todayMessages } = data.statistic;

      document.getElementById('users').textContent = users;
      document.getElementById('messages').textContent = messagesSend;
      document.getElementById('todayMessages').textContent = todayMessages;
    })
    .catch((error) => {
      console.error('Ошибка при выполнении запроса:', error);
    });
}

fetchAndDisplayStatistics();
