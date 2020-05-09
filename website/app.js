/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?'
const apiKey = '&appid=b1e4acaf20b9ba652fd4325adbc2cac0'; //deleted for Udacity reviewer

setTimeout(document.getElementById('generate').addEventListener('click', generateAction), 0);
setTimeout(document.getElementById('generate-de').addEventListener('click', generateActionDe), 0);

function generateAction(evt) {
    const zip = document.getElementById('zip').value;
    const userResp = document.getElementById('feelings').value;
    getWeatherData(baseURL, zip, apiKey, "us")
        // use data with then function
        .then(function(data) {
            // POST Data
            postData('/addEntry', { key: entryKey, date: newDate, temp: data.main.temp, name: data.name, description: data.weather[0].description, user: userResp })
                // Update GUI?
            updateGUI();
        })
};

function generateActionDe(evt) {
    const zip = document.getElementById('zip-de').value;
    const userResp = document.getElementById('feelings-de').value;
    getWeatherData(baseURL, zip, apiKey, "de")
        // use data with then function
        .then(function(data) {
            // POST Data
            postData('/addEntry', { key: entryKey, date: newDate, temp: data.main.temp, name: data.name, description: data.weather[0].description, user: userResp })
                // Update GUI?
            updateGUIDe();
        })
};

// update the GUI
const updateGUI = async() => {
    const request = await fetch('/getdata');
    try {
        const allData = await request.json();
        const degreeC = Math.round(parseFloat(allData[entryKey].temp) - 273.15);
        document.getElementById('date').innerHTML = `${allData[entryKey].date}, ${allData[entryKey].name}`;
        document.getElementById('temp').innerHTML = `${degreeC} C, ${allData[entryKey].description}`;
        document.getElementById('content').innerHTML = allData[entryKey].user;
        document.getElementById('entryHolder').style.visibility = 'visible';
    } catch (error) {
        console.log("error", error);
    }

}

const updateGUIDe = async() => {
    const request = await fetch('/getdata');
    try {
        const allData = await request.json();
        const degreeC = Math.round(parseFloat(allData[entryKey].temp) - 273.15);
        document.getElementById('date-de').innerHTML = `${allData[entryKey].date}, ${allData[entryKey].name}`;
        document.getElementById('temp-de').innerHTML = `${degreeC} C, ${allData[entryKey].description}`;
        document.getElementById('content-de').innerHTML = allData[entryKey].user;
        document.getElementById('entryHolderDe').style.visibility = 'visible';
    } catch (error) {
        console.log("error", error);
    }

}

// Create a new date instance dynamically with JS
let d = new Date();
// getMonth is zero indexed
let correctMonth = d.getMonth() + 1
let newDate = correctMonth + '.' + d.getDate() + '.' + d.getFullYear();
let entryKey = `${correctMonth}${d.getDate()}${d.getFullYear()}`;

// console.log(entryKey);
// console.log(newDate);

const getWeatherData = async(baseURL, zip, apiKey, country) => {

    const res = await fetch(`${baseURL}zip=${zip},${country}${apiKey}`)

    try {
        const data = await res.json();
        console.log("Weather data received!")
            // console.log(data);
        console.log(data.main.temp)
        return data;
    } catch (error) {
        console.log("error", error);
    };
};

const postData = async(url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newEntry = await response.json();
        return newEntry
    } catch (error) {
        console.log("error", error);
    }
}