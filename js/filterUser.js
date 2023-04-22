"use strict";

import ShowUser from "./showUser.js";

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
