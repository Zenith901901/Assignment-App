import { Component } from "react";

class jsonFs extends Component {
  fileWriter = (object, callback) => {
    let fs = require("browserify-fs");

    fs.writeFile("./user.json", JSON.stringify(object, null, 4), err => {
      if (err) return callback(err);
      callback(null);
    });
  };

  fileReader = callback => {
    let fs = require("browserify-fs");

    fs.readFile("/user.json", "utf-8", function (err, data) {
      if (err) return callback(err);
      callback(null, data);
    });
  };

}

export default jsonFs;
