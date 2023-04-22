"use strict";

const BASE_URL = "https://randomuser.me/api/?inc=name,picture&results=48";

export default async function getUser() {
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