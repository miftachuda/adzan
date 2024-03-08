const player = require("play-sound")();
const adhan = require("adhan");
const schedule = require("node-schedule");

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
const coordinates = new adhan.Coordinates(-7.672971, 109.024851);
const params = adhan.CalculationMethod.Singapore();

const times = ["fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha"];

function calcPray() {
  const date = new Date();

  var prayerTimes = new adhan.PrayerTimes(coordinates, date, params);
  times.forEach((x) => {
    const prayerTime = new Date(prayerTimes[x]);
    if (date.getDay() === 5 && x === "dhuhr") {
      schedule.scheduleJob(
        prayerTime.setMinutes(prayerTime.getMinutes() - 71),
        function () {
          play("Juzz30.mp3");
        }
      );
    }
    const options = {
      timeZone: "Asia/Jakarta", // Replace with your desired timezone
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    console.log(x, ",", prayerTime.toLocaleString("en-US", options));
    schedule.scheduleJob(prayerTime, function () {
      console.log(`Its time to sholat ${x}`);
      if (x == "fajr") {
        play("6_Adzan_Subuh.mp3");
      } else {
        const file = [
          "1_Adzan_Masjidil_Haram.mp3",
          "2_Adzan.mp3",
          "3_Adzan.mp3",
          "4_Adzan.mp3",
          "5_Adzan_Syeikh_Misyari_Rasyid.mp3",
        ];
        play(file[Math.floor(Math.random() * 5)]);
      }
    });
    if (x == "fajr") {
      schedule.scheduleJob(
        prayerTime.setMinutes(prayerTime.getMinutes() + 10),
        function () {
          play("Qunut.mp3");
        }
      );
    }
  });
}
calcPray();
const dzikir_pagi_time = new Date().setHours(7, 0, 0, 0);
const dzikir_petang_time = new Date().setHours(16, 30, 0, 0);

function dzikirPagiPlay() {
  schedule.scheduleJob(dzikir_pagi_time, function () {
    play("Dzikir_Long.mp3");
  });
}

function dzikirPetangPlay() {
  schedule.scheduleJob(dzikir_petang_time, function () {
    play("Dzikir_Short.mp3");
  });
}
dzikirPagiPlay();
dzikirPetangPlay();
const job = schedule.scheduleJob("1 0 * * *", function () {
  console.log("Calc sholat time");
  calcPray();
  dzikirPagiPlay();
  dzikirPetangPlay();
});
