import postHbSent from './postHbSent.js';

function fetchAndDisplayStatistics() {
  fetch('/public/data.json')
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

function fetchMessagesData() {
  return fetch('/data.json')
    .then((response) => response.json());
}

function fetchImagesData() {
  return fetch('/pictures.json')
    .then((response) => response.json());
}

/// /// leftBarHTML

function createMessageHTML(lastMessages, picturesMessage, imageContains) {
  return `
  <div class="avatar">
  <img src="${picturesMessage}" alt="${lastMessages.name}" class="avatar">
  </div>

  <div class="name">${lastMessages.name}</div> 
      <div class="name nick">${lastMessages.nickname}</div>
       <p class="hsbSent">${lastMessages.time}</p>
      <p class="text">${lastMessages.message}</p>
      ${imageContains ? `<img src="${imageContains}" alt="ping-pong" class = 'photoPingPong'>` : ''}

          <div class="reactions">
              <div class="container">
              
              <div class="replies">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M4.6875 2.8125L1.40625 6.5625M1.40625 6.5625L4.6875 10.3125M1.40625 6.5625H8.4375C12.1875 6.5625 14.0625 8.4375 14.0625 12.1875" stroke="#ABACB1" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <p class="numbers">${lastMessages.reposts}</p>
              </div>

              <div class="replies">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M1.875 7.50002C0.46875 5.62502 0.9375 2.81252 3.28125 1.87502C5.625 0.937515 7.03125 2.81252 7.5 3.75002C7.96875 2.81252 9.84375 0.937515 12.1875 1.87502C14.5312 2.81252 14.5312 5.62502 13.125 7.50002C11.7187 9.37502 7.5 13.125 7.5 13.125C7.5 13.125 3.28125 9.37502 1.875 7.50002Z" stroke="#ABACB1" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <p class="numbers">${lastMessages.likes}</p>
              </div>

              <div class="replies">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M13.125 10.3125V14.0625H1.875V10.3125M7.5 1.875V11.25M7.5 1.875L3.75 5.625M7.5 1.875L11.25 5.625" stroke="#ABACB1" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <p class="numbers">${lastMessages.shares}</p>
              </div>
              </div>
          </div>
      </div>

  `;
}

Promise.all([fetchMessagesData(), fetchImagesData()])
  .then(([messagesData, imagesData]) => {
    const messagesArray = messagesData.lastMessages;

    const imageUrls = imagesData.picturesMessage.map((pic) => pic.urlAvatar);
    const imageContains = imagesData.picturesMessage.map((pic) => pic.urlMessagePic);

    console.log(imageUrls);
    if (messagesArray.length > 0) {
      messagesArray.forEach((message, index) => {
        const messageHTML = createMessageHTML(message, imageUrls[index], imageContains[index]);

        const postContainer = document.getElementById(`post${message.id}`); // Ищем контейнер по id

        if (postContainer) {
          postContainer.innerHTML = '';
          postContainer.innerHTML += messageHTML;
        }
      });
    }

    /// //// Times goes by...

    const HsbSentHTML = document.querySelectorAll('.hsbSent');

    HsbSentHTML.forEach((elementHTML, index) => {
      const actualTime = messagesArray[index].time;
      let count = 0;

      const updateElement = () => {
        elementHTML.textContent = postHbSent(actualTime + count);
        count++;
      };

      updateElement(); 

      setInterval(updateElement, 10000);
    });
  })
  .catch((error) => {
    console.error('Ошибка при выполнении запросов:', error);
  });

/// /////////// rightBarHTML

Promise.all([fetchMessagesData(), fetchImagesData()])
  .then(([messagesData, imagesData]) => {
    const arrayTopics = messagesData.сurrentTopics;

    const arrayBlogs = messagesData.blogs;

    const { picturesChannel } = imagesData;

    const topicsHtml = document.querySelectorAll('.top');
    const messageTopicsHtml = document.querySelectorAll('.bottom');
    const nameGroupHtml = document.querySelectorAll('.nameGroup');
    const nickGroupHtml = document.querySelectorAll('.nickGroup');
    const avatarImage = document.querySelectorAll('.avatarOfUser img');
    const readButtonHtml = document.querySelectorAll('.readButton');

    /// /// Current topics

    topicsHtml.forEach((topic, index) => {
      const curentTop = arrayTopics[index];

      topic.classList.remove('topic');
      topic.textContent = curentTop.tag;
    });

    messageTopicsHtml.forEach((topic, index) => {
      const curentTop = arrayTopics[index];

      topic.classList.remove('messagesTopic');
      topic.textContent = curentTop.messages;
    });

    /// /// Interesting groups

    nameGroupHtml.forEach((topic, index) => {
      const curentTop = arrayBlogs[index];

      topic.classList.remove('color-grey');
      topic.textContent = curentTop.channelName;
    });

    nickGroupHtml.forEach((topic, index) => {
      const curentTop = arrayBlogs[index];

      topic.classList.remove('color-grey');
      topic.textContent = curentTop.channelNick;
    });

    avatarImage.forEach((topic, index) => {
      const curentTop = picturesChannel[index].url;

      topic.classList.remove('color-grey');
      topic.src = `${curentTop}`;
    });

    readButtonHtml.forEach((topic) => {
      topic.classList.remove('color-grey');
    });

    // console.log(imageContains);
  });

/// /// Таймер Hsbsmessage setInterval

// Promise.all([fetchMessagesData()])
//   .then(([messagesData]) => {
//     const messagesArray = messagesData.lastMessages;
//     const HsbSentHTML = document.querySelectorAll('.hsbSent');

//     HsbSentHTML.forEach((elementHTML, index) => {
//       const actualTime = messagesArray[index].time;
//       let count = 0;

//       const updateElement = () => {
//         elementHTML.textContent = postHbSent(actualTime + count);
//         count++
//       };

//       updateElement(); // Инициализация значения

//       setInterval(updateElement, 60000); // Обновление каждую минуту
//     });
//   });
