const fs = require("fs");
const symphonia = require("@tropicbliss/symphonia");

try {
  const buf = fs.readFileSync("adzan.mp3"); // Gets a Buffer
  symphonia.playFromBuf(buf, { speed: 1.0, volume: 1.0, isBlocking: true }); // The option object is optional. The speed and volume is both set to 1.0 and `isBlocking` is set to `true` by default.
} catch (e) {
  console.log("Error playing audio: ", e);
}
