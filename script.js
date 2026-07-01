/* ==========================================================
   AVENMARK DIGITAL
   CLEAN SCRIPT (NO LAYOUT INTERFERENCE)
========================================================== */


/* ===========================
   CLOCK (LIVE TIME)
=========================== */

function updateDateTime() {

    const now = new Date();

    const timeString = now.toLocaleTimeString(undefined, {

        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"

    });

    const dateString = now.toLocaleDateString(undefined, {

        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric"

    });

    const el = document.getElementById("datetime");

    if (el) {
        el.textContent = `${dateString} • ${timeString}`;
    }

}


/* ===========================
   WEATHER (CLEMSON, SC)
   Open-Meteo (Fahrenheit)
=========================== */

async function updateWeather() {

    try {

        const url =
            "https://api.open-meteo.com/v1/forecast" +
            "?latitude=34.6834" +
            "&longitude=-82.8374" +
            "&current_weather=true" +
            "&temperature_unit=fahrenheit";

        const res = await fetch(url);
        const data = await res.json();

        const temp = Math.round(data.current_weather.temperature);
        const code = data.current_weather.weathercode;

        const el = document.getElementById("weather");

        if (el) {
            el.textContent = `${temp}°F • ${weatherCodeToText(code)}`;
        }

    } catch (err) {

        const el = document.getElementById("weather");

        if (el) {
            el.textContent = "Weather unavailable";
        }

    }

}


/* ===========================
   WEATHER CODE TRANSLATION
=========================== */

function weatherCodeToText(code) {

    if (code === 0) return "Clear";
    if (code <= 2) return "Partly Cloudy";
    if (code <= 3) return "Cloudy";
    if (code <= 48) return "Foggy";
    if (code <= 67) return "Rain";
    if (code <= 77) return "Snow";
    if (code <= 82) return "Showers";
    if (code <= 86) return "Snow Showers";
    if (code >= 95) return "Thunderstorm";

    return "Unknown";

}


/* ===========================
   INIT
=========================== */

window.addEventListener("load", () => {

    updateDateTime();
    updateWeather();

    setInterval(updateDateTime, 1000);
    setInterval(updateWeather, 10 * 60 * 1000);

});
