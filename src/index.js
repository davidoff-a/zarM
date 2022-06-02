import { GAME } from "./js/game";
import { buildWelcomePage } from "./js/buildHTML";

import "./css/style.css";

const leftWall = require("./assets/wall-left.png");
const rightWall = require("./assets/wall-right.png");
const logoImg = require("./assets/logo.png");
buildWelcomePage();

GAME.init();
