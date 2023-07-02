import Weather from './Weather';

export default class UI {
    static currentUnit = 'C';

    static searchCity() {
        const searchBar = document.querySelector('.search');
        searchBar.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                Weather.updatePage(searchBar.value, this.currentUnit).catch(
                    (err) => {
                        console.log(err);
                        document.querySelector('.error').style.opacity = 1;
                    },
                );
                searchBar.value = '';
                document.querySelector('.error').style.opacity = 0;
            }
        });
    }

    static initializePage() {
        this.searchCity();
        Weather.updatePage('Estonia', this.currentUnit);
    }
}
