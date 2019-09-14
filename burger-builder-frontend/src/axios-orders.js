import axios from 'axios';

const instance = axios.create({
    baseURL: "https://burger-builder-96418.firebaseio.com/"
});

export default instance;