const fs = require("fs");

function setSecret() {
  //prompt text data
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  readline.question(`#~ Add anything to get it's secret ~> \n`, (word_set) => {
    //generate random fixed secret for a word
    var chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()";
    var secretLength = word_set.length;
    var secret = "";
    for (var i = 0; i <= secretLength; i++) {
      var randomNumber = Math.floor(Math.random() * chars.length);
      secret += chars.substring(randomNumber, randomNumber + 1);
    }
    //get json file and re write
    const data_set = JSON.parse(fs.readFileSync("./secret.json"));
    //set that added data secret and save to json data
    const setDictionary = (input_data) => {
      const newInput = {
        secret: `${secret}`,
      };
      if (newInput[input_data] !== data_set[input_data]) {
          console.log("Already exists!!!"); 
      }
      else if(newInput[input_data] === data_set[input_data]) {
        data_set[input_data] = newInput;  
        saveData(data_set, "secret.json");
      }
    };
    //save data function
        const saveData = (data, file) => {
          const finished = (error) => {
            if (error) {
              console.error(error);
              return;
            }
          };
          //set word and secret to json string data
          const jsonData = JSON.stringify(data, null, 1);
          fs.writeFile(file, jsonData, finished);
          console.log("Word saved to secret data!!!");
        };
    setDictionary(word_set);
    readline.close();
  });
}
setSecret();
