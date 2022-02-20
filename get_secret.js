const fs = require("fs");
function getSecret() {
  //prompt input in terminal
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  readline.question(`Get your words secret ~> \n`, (word_get) => {
    //get json file and read
    fs.readFile("./secret.json", (err, data) => {
      if (err) {
        console.log("File reading failed", err);
        return;
      }
      try {
        const client = JSON.parse(data);
        Object.keys(client).forEach(function (key) {
          if (word_get === key) {
            console.log("Found ~>\n\n",key,client[key],"\n");
            return;
          }
        });
      } catch (err) {
        console.log("Error parsing JSON string:", err);
      }
      console.log("Exited With Code 0; ~!");
    });
    readline.close();
  });
}
getSecret();
