"use strict";

import getUser from "./getUser.js";

export default async function ShowUser(userData = null) {
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