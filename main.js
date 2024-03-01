const player = require("play-sound")();
const adhan = require("adhan");
// Path to your music file
const musicFile = "adzan.mp3";
const exp = require("./exap.json");
const schedule = require("node-schedule");
function play() {
  player.play(musicFile, (err) => {
    if (err) {
      console.error("Error playing music:", err);
    } else {
      console.log("Music has finished playing");
    }
  });
}
const coordinates = new adhan.Coordinates(-7.672971, 109.024851);
const params = adhan.CalculationMethod.Singapore();

const times = ["fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha"];

function calcPray() {
  const date = new Date();
  var prayerTimes = new adhan.PrayerTimes(coordinates, date, params);
  times.forEach((x) => {
    const date = new Date(prayerTimes[x]);
    console.log(date);
    const job = schedule.scheduleJob(date, function () {
      console.log(`its time to sholat ${x}`);
      play();
    });
  });
  console.log(prayerTimes);
}
calcPray();
const job = schedule.scheduleJob("1 0 * * *", function () {
  console.log("Calc sholat time");
  calcPray();
});
