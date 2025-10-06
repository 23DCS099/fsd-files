
const weatherData = {
  "Nadiad": { temperature: "30°C", condition: "Sunny" },
  "Vadodara": { temperature: "30°C", condition: "Cloudy" },
  "Ahmedabad": { temperature: "35°C", condition: "Sunny" },
  "Surat": { temperature: "35°C", condition: "Hot" },
  "Anand": { temperature: "32°C", condition: "Windy" },
};

document.getElementById("getWeatherBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");

  if (city in weatherData) {
    const { temperature, condition } = weatherData[city];
    resultDiv.innerHTML = `Weather in <strong>${city}</strong>: ${temperature}, ${condition}`;
  } else {
    resultDiv.innerHTML = `Sorry, weather data for "<strong>${city}</strong>" not found.`;
  }
});
