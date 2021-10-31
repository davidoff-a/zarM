"use strict";

const $FORM = document.querySelector(".control");
const $LOGO = document.querySelector(".logo");
window.addEventListener("DOMContentLoaded", () => {
  const $SLIDE_DOOR_LEFT = document.querySelector(".wall-left");
  const $SLIDE_DOOR_RIGHT = document.querySelector(".wall-right");
  setTimeout(() => {
    $SLIDE_DOOR_LEFT.classList.add("open");
    $SLIDE_DOOR_RIGHT.classList.add("open");
    console.log("Opened");
    console.log($SLIDE_DOOR_LEFT);
    console.log($SLIDE_DOOR_RIGHT);
    setTimeout(() => {
      $FORM.style.display = "flex";
      const FIGHT_SOUND = new Audio("./assets/sound/fight/mk3-09020.mp3");
      FIGHT_SOUND.play();
    }, 5000);
  
  }, 1500);
  setTimeout(() => {
    $LOGO.classList.add("off");
  }, 3000)
});
