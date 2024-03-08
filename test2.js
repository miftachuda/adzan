import Audic from "audic";

const audic = new Audic("Qunut.mp3");

await audic.play();

audic.addEventListener("ended", () => {
  audic.destroy();
});
