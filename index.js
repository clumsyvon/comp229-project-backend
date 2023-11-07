const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const OpenAi = require('openai')

require('dotenv').config();

const PORT = 8081;
// const API_KEY = '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';



const openai = new OpenAi({
    apiKey: process.env.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
})

const app = express();
app.use(bodyParser.json());
app.use(cors());

//api handler 

app.post('/generate', async (req, res) => {
    const { userMessages } = req.body;

    const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: userMessages
    });

    res.send(completion.choices[0].message.content);
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on ${PORT}`);
})
