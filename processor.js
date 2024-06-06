require('dotenv').config()
const fs = require('fs')
const { MongoClient } = require('mongodb');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const url = 'mongodb://admin:fZUi3854zfadZgJWD9ldWf6qLv8pt@staywithme.at:27017';
const client = new MongoClient(url);

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const firestore = new Firestore({ 
    keyFilename: '/Users/mo/.config/gcloud/application_default_credentials.json',
    projectId: 'eu-tech-hack24vie-7985'
});

async function init() {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = read('prompt_1.txt')
    const report = read('message-10.txt')

    const result = await model.generateContent([prompt, report]);
    const response = await result.response.text();

    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db("esg");
    const collection = db.collection('documents');

}

init()

function read(file) {
    return fs.readFileSync('./' + file, { encoding: 'utf8', flag: 'r' });
}
