"use strict";

const BASE_URL = "https://randomuser.me/api/?inc=name,picture&results=48";

async function getUser() {
  try {
    let userData = [];

    if (localStorage.hasOwnProperty("userList")) {
      userData = JSON.parse(localStorage.getItem("userList"));
    } else {
      const response = await fetch(BASE_URL);
      const result = await response.json();
      userData = await result.results;
      localStorage.setItem("userList", JSON.stringify(userData));
    }

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
  } catch (error) {
    console.log(error.status);
  }
}

getUser();
