const os = require("os");

console.log("Hello from NodeJS");

const hostName = os.hostname();
const user = os.userInfo();

// Consol.log using String literals instead of concatenating strings.
console.log(
  `Hostname: ${hostName} \nWelcome ${user.username}, your Home directoy is: ${user.homedir} and \nyou are using ${user.shell}`
);

// Getting the Environment Variables.
console.log(process.env);

// Setting the node process environemnt to "development".
process.env.NODE_ENV = "development";

// Checking whether the process execution environemnt is "development" or not.. Returns a Boolean value.
console.log(process.env.NODE_ENV === "development");
