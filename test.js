var axios = require('axios');

function fetchData(language = 'all') {
    return axios.get(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)
        .then(res => console.log(res.data.items[5].name)).catch(err => err);
}

fetchData('tensorflow');