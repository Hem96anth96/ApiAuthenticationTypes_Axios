import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

app.use(express.static("public"));

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "678";
const yourPassword = "hem678";
const yourAPIKey = "5c7431fa-7f56-4153-ad3a-1e20e7536b6a";
const yourBearerToken = "16ce53f0-06f5-4274-8379-ce791258323c";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {

  const response = await axios.get("https://secrets-api.appbrewery.com/random")

  const data = response.data;
  console.log(data.secret);
  res.render("index.ejs", {content: data.secret})
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
});

app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  
  const response = await axios.get("https://secrets-api.appbrewery.com/all?page=1", {
      auth: {
        username:yourUsername,
        password: yourPassword,
      },
    });
    const pageData = response.data;
    const data = pageData[Math.floor(Math.random() * pageData.length)].secret;
    console.log(data);

    res.render("index.ejs", {content: data})

    
});

app.get("/apiKey", async(req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.

  const response = await axios.get(`https://secrets-api.appbrewery.com/filter?score=5&apiKey=${yourAPIKey}`)
  const pageData = response.data;
  const data = pageData[Math.floor(Math.random() * pageData.length)].secret;
  console.log(data);

  res.render("index.ejs", {content: data})



});

app.get("/bearerToken", async(req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
 
  const response = await  axios.get( "https://secrets-api.appbrewery.com/secrets/1", {
    headers: { 
      Authorization: `Bearer ${yourBearerToken}`,
    },
  });

  const pageData = response.data;
  
  console.log(pageData.secret);

  res.render("index.ejs", {content: pageData.secret})
  
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
