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
    return userData;
  } catch (error) {
    console.log(error);
  }
}

async function ShowUser(userData = null) {
  document.querySelector(".users").innerHTML = "";

  try {
    if (userData === null) {
      userData = await getUser();
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

      userName.innerHTML = `${title} ${first} ${last}`;
      userImg.src = `${userPic}`;

      /// append
      userContainer.append(userImg, userName);
      document.querySelector(".users").appendChild(userContainer);
    }
    return userData;
  } catch (error) {
    console.log(error);
  }
}

(async function () {
  const userData = await ShowUser();
  let timeOut;
  document.querySelector("#filter").addEventListener("keyup", (e) => {
    const queryString = e.target.value.toLowerCase();
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      const filteredUser = userData.filter((item) => {
        const name = `${item.name.title} ${item.name.first} ${item.name.last}`;
        return name.toLowerCase().indexOf(queryString) > -1;
      });

      ShowUser(filteredUser);
    }, 500);
  });
})();
