import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
var URLs = process.env.URL.split(",");

const runTask = async (URLs) => {
    console.log("Running Node start script in every 15 minutes.");
    for (let url of URLs) {
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
    }
    console.log('Next task scheduled after 15 minutes.');
    setTimeout(runTask, 15 * 60 * 1000);
}

runTask(URLs);
