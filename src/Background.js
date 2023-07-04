import { createClient } from 'pexels';

export default class Background {
    static KEY = 'qYxRDxh9wckYUriQKh95zBNTuBwemBhcAmOo8Byq8RLa771HBlV8dsUi';

    static async fetchBackground(weather) {
        const client = createClient(this.KEY);
        client.videos.search({
            query: `${weather} weather`, orientation: 'landscape', size: 'large', per_page: 1,
        }).then((data) => {
            const { link } = data.videos[0].video_files.find((file) => file.quality === 'hd');
            this.setBackground(link);
        }).catch((err) => {
            console.log(err);
        });
    }

    static setBackground(newBg) {
        const background = document.querySelector('#myBackground');
        background.src = newBg;
    }
}
