import Weather from './Weather';
import Background from './Background';

export default class UI {
    static currentUnit = 'C';

    static currentLocation = 'Estonia';

    static displayLoading() {
        document.querySelector('.loader-container').style.display = 'block';
    }

    static hideLoading() {
        document.querySelector('.loader-container').style.display = 'none';
    }

    static searchCity() {
        const searchBar = document.querySelector('.search');
        searchBar.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.displayLoading();
                Weather.updatePage(searchBar.value, this.currentUnit)
                    .then(
                        () => {
                            this.currentLocation = searchBar.value;
                            document.querySelector('.error').style.opacity = 0;
                            this.changeBackground();
                        },
                    ).catch(
                        (err) => {
                            console.log(err);
                            document.querySelector('.error').style.opacity = 1;
                        },
                    )
                    .finally(
                        () => {
                            searchBar.value = '';
                            this.hideLoading();
                        },
                    );
            }
        });
    }

    static changeUnit() {
        const switchBtn = document.querySelector('.switch-unit');
        switchBtn.addEventListener('click', () => {
            if (this.currentUnit === 'C') {
                this.currentUnit = 'F';
                switchBtn.innerHTML = 'Switch to C';
            } else {
                this.currentUnit = 'C';
                switchBtn.innerHTML = 'Switch to F';
            }
            Weather.updatePage(this.currentLocation, this.currentUnit);
        });
    }

    static changeBackground() {
        const weatherText = document.querySelector('.weather').textContent;
        Background.fetchBackground(weatherText)
            .catch((err) => console.log(err));
    }

    static initializePage() {
        this.searchCity();
        this.changeUnit();
        this.displayLoading();
        Weather.updatePage(this.currentLocation, this.currentUnit)
            .then(() => this.changeBackground())
            .then(() => this.hideLoading())
            .catch((err) => console.log(err));
    }
}
