const axios = require("axios");
const fs = require("fs");
const symphonia = require("@tropicbliss/symphonia");

try {
  const buf = fs.readFileSync("chime.ogg"); // Gets a Buffer
  symphonia.playFromBuf(buf, { speed: 1.0, volume: 1.0, isBlocking: true }); // The option object is optional. The speed and volume is both set to 1.0 and `isBlocking` is set to `true` by default.

  // You can also obtain buffers from a web request
  axios
    .get(URL)
    .then((res) => Buffer.from(res.data, "binary"))
    .then((buf) => {
      symphonia.playFromBuf(buf);
    });

  // Play a sine wave at the frequency of 440Hz for 250ms
  symphonia.playFromSine(440.0, 250);
} catch (e) {
  console.log("Error playing audio: ", e);
}
