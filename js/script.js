"use strict";

const BASE_URL = "https://randomuser.me/api/?inc=name,picture&results=48";
const response = fetch(BASE_URL);

response
  .then((res) => res.json())
  .then((result) => {
    const userData = result.results;

    for (const user of userData) {
      // create  profile for each user
      const userContainer = document.createElement("div");
      userContainer.className = "user col-2";
      const userImg = document.createElement("img");
      const userName = document.createElement("h3");

      /// Data extraction using object destructuring
      const {
        name: { first, last, title },
        picture: { large: userPic },
      } = user;

      userName.innerHTML = `${first} ${last} ${title}`;
      userImg.src = `${userPic}`;

      /// append
      userContainer.append(userImg, userName);
      document.querySelector(".users").appendChild(userContainer);
    }
  })
  .catch((err) => console.log(err));
