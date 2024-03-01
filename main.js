const player = require("play-sound")();

// Path to your music file
const musicFile = "adzan.mp3";

// Play music
player.play(musicFile, (err) => {
  if (err) {
    console.error("Error playing music:", err);
  } else {
    console.log("Music has finished playing");
  }
});
