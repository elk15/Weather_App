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
        return `${data.location.name} ${data.location.country}`;
    }

    static setWeather(data, unit) {
        return `${data.current.condition.text} ${unit === 'C' ? data.current.temp_c : data.current.temp_f}`;
    }

    static async updatePage(area, unit) {
        try {
            const data = await this.fetchData(area);
            console.log(data);
            console.log(this.setLocation(data));
            console.log(this.setWeather(data, unit));
        } catch (err) {
            console.log(err);
        }
    }
}
