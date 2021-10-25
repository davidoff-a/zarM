import { $arenas, getArena } from './arena.js';
import {
  player1,
  player2,
  createPlayer,
} from "./player.js";
import {
  fight,
  createReloadButton,
} from "./render.js";
getArena();
fight();

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
$arenas.appendChild(createReloadButton());
