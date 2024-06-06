require('dotenv').config()

const fs = require('fs')

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function init() {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

    const prompt = read('prompt_1.txt')
    const report = read('message-10.txt')

    const result = await model.generateContent([prompt, report]);
    console.log(result.response.text());
}

init()

function read(file) {
    return fs.readFileSync('./' + file, { encoding: 'utf8', flag: 'r' });
}
