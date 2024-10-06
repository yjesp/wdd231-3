// Weather API configuration
const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
const city = 'Your City';
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

// Fetch current weather data
async function getWeather() {
    const response = await fetch(weatherUrl);
    const weatherData = await response.json();

    const temp = Math.round(weatherData.main.temp);
    const description = weatherData.weather.map(event => event.description).join(", ").split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    document.getElementById('temperature').textContent = `Current Temperature: ${temp}°F`;
    document.getElementById('description').textContent = `Weather: ${description}`;
}

// Fetch 3-day forecast
async function getForecast() {
    const response = await fetch(forecastUrl);
    const forecastData = await response.json();

    let forecastHTML = '';
    for (let i = 0; i < 3; i++) {
        const day = forecastData.list[i];
        const temp = Math.round(day.main.temp);
        forecastHTML += `<p>Day ${i + 1}: ${temp}°F</p>`;
    }
    document.getElementById('forecast').innerHTML = forecastHTML;
}

// Fetch and display weather on page load
getWeather();
getForecast();

// Company Spotlights (Using JSON Data)
const members = [
    { name: "Company A", level: 3, logo: "companyA.png", phone: "123-456-7890", address: "123 Main St", website: "http://companya.com" },
    { name: "Company B", level: 2, logo: "companyB.png", phone: "234-567-8901", address: "456 Elm St", website: "http://companyb.com" },
    { name: "Company C", level: 3, logo: "companyC.png", phone: "345-678-9012", address: "789 Oak St", website: "http://companyc.com" }
];

function getRandomMembers() {
    const goldAndSilver = members.filter(member => member.level === 2 || member.level === 3);
    const randomMembers = [];
    while (randomMembers.length < 2) {
        const randomIndex = Math.floor(Math.random() * goldAndSilver.length);
        const randomMember = goldAndSilver[randomIndex];
        if (!randomMembers.includes(randomMember)) {
            randomMembers.push(randomMember);
        }
    }
    return randomMembers;
}

function displaySpotlights() {
    const spotlightContainer = document.getElementById('spotlight-container');
    const randomMembers = getRandomMembers();

    randomMembers.forEach(member => {
        spotlightContainer.innerHTML += `
            <div class="spotlight">
                <img src="images/${member.logo}" alt="${member.name} Logo">
                <h3>${member.name}</h3>
                <p>${member.phone}</p>
                <p>${member.address}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
            </div>
        `;
    });
}

displaySpotlights();

// Footer Year and Last Modified Date
const yearSpan = document.getElementById('currentyear');
const currentYear = new Date().getFullYear();
yearSpan.textContent = currentYear;

const lastModifiedSpan = document.getElementById('lastModified');
lastModifiedSpan.textContent = `Last Modified: ${document.lastModified}`;
