const player = require("play-sound")();
function play(file) {
  player.play(file, (err) => {
    if (err) {
      console.error("Error playing mp3:", err);
    } else {
      console.log("Mp3 has finished playing");
    }
  });
}
play("6_Adzan_Subuh.mp3");
