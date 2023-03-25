// 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

// import { Configuration, OpenAIApi } from "openai";
const { Configuration, OpenAIApi } = require("openai");

const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

// put your own configuration here
const configuration = new Configuration({
    organization: "",
    apiKey: "",
});
const openai = new OpenAIApi(configuration);

const app = express()
app.use(bodyParser.json())
app.use(cors())

const port = 3080

app.post('/', async (req, res) => {
    const {message, currentModel} = req.body;
    console.log(message, "message");
    console.log(currentModel, "currentModel");
    const response = await openai.createCompletion({
        model: `${currentModel}`, // "text-davinci-003",
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0,
      });
    res.json({
        message: response.data.choices[0].text, 
    })
});

app.get('/models', async (req, res) => {
    console.log('Received request for models');
    const response = await openai.listEngines();
    // console.log(response.data.data)
    res.json({
        models: response.data.data
    })
});

app.listen(port, () => {
    console.log(`Example app listneing at http://localhost:${port}`)
});

