export default class WeatherApi {
    static async fetchData(area) {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=9b8d85f6347440f78d283631232606&q=${area}`);
        if (response.status === 200) {
            const jsonData = await response.json();
            return jsonData;
        }
        throw new Error(response.status);
    }

    static setLocation(data) {
        document.querySelector('.location').textContent = `${data.location.name}, ${data.location.country}`;
    }

    static setWeather(data, unit) {
        document.querySelector('.weather').textContent = data.current.condition.text;
        if (unit === 'C') {
            document.querySelector('.temp').innerHTML = `${data.current.temp_c}<span>&#8451;</span>`;
            document.querySelector('.feels-like').innerHTML = `${data.current.feelslike_c}<span>&#8451;</span>`;
            document.querySelector('.wind').innerHTML = `${data.current.wind_kph} km/h`;
        } else {
            document.querySelector('.temp').innerHTML = `${data.current.temp_f}<span>&#8451;</span>`;
            document.querySelector('.feels-like').innerHTML = `${data.current.feelslike_f}<span>&#8451;</span>`;
            document.querySelector('.wind').innerHTML = `${data.current.wind_mph} mp/h`;
        }
        document.querySelector('.humidity').innerHTML = `${data.current.humidity}%`;
    }

    static async updatePage(area, unit) {
        const data = await this.fetchData(area);
        this.setLocation(data);
        this.setWeather(data, unit);
    }
}
