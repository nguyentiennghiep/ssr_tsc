// shared/routes.js
import Home from './client/components/Home';
import Grid from './client/components/Grid';
import fetchPopularRepos from './utils/api';

const routes = [
    {
        path: '/',
        exact: true,
        component: Home,
    },
    {
        path: '/popular/:id',
        component: Grid,
        fetchInitialData: (path = '') => fetchPopularRepos(
            path.split('/').pop()
        )
    }
];

export default routes;