const os = require("os");

// Gives the result (Total memory of the system (RAM)) info in bytes.
const totalMemory = os.totalmem();

function bytesToMb(bytes) {
  if (!bytes) {
    throw new Error(`Invalid value for bytes ${bytes} `);
  }

  const kb = bytes / 1024;
  const mb = kb / 1024;

  return mb.toFixed(0);
}

function getMemoryUsage() {
  const freeMemory = bytesToMb(os.freemem());
  // Returing an object. In JS simply use curly braces to define an object.
  return {
    total: totalMemory,
    used: totalMemory - freeMemory,
    free: freeMemory,
  };
}

setInterval(function () {
  const memoryUsage = getMemoryUsage();
  console.log(
    `Total: ${memoryUsage.total}Mb ${os.EOL}Used: ${memoryUsage.used}Mb ${os.EOL}Free: ${memoryUsage.free}`
  );
}, 3000);
