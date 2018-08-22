import axios from 'axios';

export default function fetchData(language = 'all') {
    return axios.get(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)
        .then(res => res.data.items).catch(err => err);
}