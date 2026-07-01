function fitAllText() {
    const elements = document.querySelectorAll(".fit-text");

    elements.forEach(el => {
        let parentWidth = el.parentElement.offsetWidth;
        let fontSize = parseFloat(window.getComputedStyle(el).fontSize);

        el.style.transform = "scaleX(1)";
        el.style.fontSize = fontSize + "px";

        while (el.scrollWidth > parentWidth && fontSize > 8) {
            fontSize -= 0.5;
            el.style.fontSize = fontSize + "px";
        }

        if (el.scrollWidth > parentWidth) {
            let scale = parentWidth / el.scrollWidth;
            el.style.transform = `scaleX(${scale})`;
            el.style.transformOrigin = "left";
        }
    });
}

/* CLOCK */
function updateDateTime() {
    const now = new Date();

    const timeString = now.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    const dateString = now.toLocaleDateString(undefined, {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    document.getElementById("datetime").textContent =
        `${dateString} • ${timeString}`;
}

/* WEATHER */
async function updateWeather() {
    try {
        const res = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=34.6834&longitude=-82.8374&current_weather=true"
        );

        const data = await res.json();

        const temp = Math.round(data.current_weather.temperature);
        const code = data.current_weather.weathercode;

        document.getElementById("weather").textContent =
            `${temp}°F • ${weatherCodeToText(code)}`;

    } catch (e) {
        document.getElementById("weather").textContent =
            "Weather unavailable";
    }
}

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

/* INIT */
window.addEventListener("load", () => {
    fitAllText();
    updateDateTime();
    updateWeather();

    setInterval(updateDateTime, 1000);
    setInterval(updateWeather, 10 * 60 * 1000);
});

window.addEventListener("resize", fitAllText);
