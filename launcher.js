import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
const url = process.env.URL.split(",");
console.log(url);

const runTask = async (url) => {
    console.log("Running Node start script in every 15 minutes.");
    try {
        console.log(`Sending request to: ${url}`);
        const response = await fetch(url);

        if (response.ok) {
            console.log("Request successful:", response.status);
        } else {
            console.error("Request failed:", response.status);
        }
        const body = await response.text();
        console.log(`Response received from ${url}:`, body);
    } catch (error) {
        console.error('Error occurred:', error.message);
    }
    console.log('Next task scheduled after 15 minutes.');
    setTimeout(runTask, 15 * 60 * 1000, url);
}

for(let i=0;i<url.length; i++) {
    runTask(url[i]);
}