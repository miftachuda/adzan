const player = require("play-sound")();

const path = require("path");

function findpath(pathname) {
  return path.join(__dirname, pathname);
}

function play(file) {
  player.play(findpath(file), (err) => {
    if (err) {
      console.error("Error playing mp3:", err);
    } else {
      console.log("Mp3 has finished playing");
    }
  });
}
play("6_Adzan_Subuh.mp3");
console.log(__dirname);
