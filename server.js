//set up the server
const express = require("express");
const axios = require("axios");
const app = express();

// Set the view engine to EJS
app.set("view engine", "ejs");

// Serve the public folder as static files, css
app.use(express.static("public"));

// Render the index template with default values for weather and error
app.get("/", (req, res) => {
  res.render("index", { weather: null, error: null }); 
  //render to the ejs file and weather and error is passed in as null
});

// Handle the /weather route //implementing the logic of finding the weather
app.get("/weather", async (req, res) => {
  // Get the city from the query parameters
  const city = req.query.city;
  const apiKey = "c3c9e3c17cc890b0c7825f71f455719b  ";

  // Add your logic here to fetch weather data from the API
  const APIUrl= `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  let weather;
  let error = null;
  try { //make the actual call for http request (/weather)
    const response = await axios.get(APIUrl);
    weather = response.data;
  } catch (error) {
    //console.error(err); // Log the specific error
    weather = null;
    error = "Error, Please try again";
  }
  // Render the index template with the weather data and error message
  res.render("index", { weather, error });
});

// Start the server and listen on port 3000 or the value of the PORT environment variable
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
