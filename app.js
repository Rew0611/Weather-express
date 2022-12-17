const express = require("express");
const bodyParser = require("body-parser");
const { dirname } = require("path");
const https = require("https");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/home.html");
});

app.post("/", function (request, response) {
  var city = request.body.city;
  var Desc = "";
  var Temp = "";
  var Pres = "";
  var Humi = "";
  var main = "";
  var link = "";
  var min = "";
  var max = "";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=07f760c2397a419a10b79e0d74a138e2&units=metric";
  https.get(url, function (resp) {
    resp.on("data", function (data) {
      const Data = JSON.parse(data);
      Desc = Data.weather[0].description;
      Temp = Data.main.temp;
      Pres = Data.main.pressure;
      Humi = Data.main.humidity;
      main = Data.weather[0].main;
      max = Data.main.temp_max;
      min = Data.main.temp_min;
      switch (main) {
        case "Snow":
          link = "https://mdbgo.io/ascensus/mdb-advanced/img/snow.gif";
          break;
        case "Clouds":
          link = "https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif";
          break;
        case "Fog":
          link = "https://mdbgo.io/ascensus/mdb-advanced/img/fog.gif";
          break;
        case "Rain":
          link = "https://mdbgo.io/ascensus/mdb-advanced/img/rain.gif";
          break;
        case "Clear":
          link = "https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif";
          break;
        case "Thunderstorm":
          link = "https://mdbgo.io/ascensus/mdb-advanced/img/thunderstorm.gif";
          break;
        default:
          link = "https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif";
          break;
      }
      response.render("weather", {
        cityname: city,
        citydes: Desc,
        citytemp: Temp,
        citypres: Pres,
        cityhumid: Humi,
        Theme: link,
        Maximum: max,
        Minimum: min,
      });
    });
  });
});

app.listen(3000);
