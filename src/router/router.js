import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';
import DefaultPage from '../views/DefaultPage.vue';

Vue.use(Router);

export default new Router({
    mode  : 'history',
    base  : process.env.BASE_URL,
    routes: [
        {
            path     : '/',
            name     : 'Home',
            component: Home
        },
        {
            name     : 'Search',
            path     : '/search',
            component: Home,
            props    : route => ({query: route.query.q})
        },
        {
            path     : '',
            component: DefaultPage,
            props    : true,
            children : [
                {
                    path     : '/register',
                    name     : 'Register',
                    component: () => import('../components/Register.vue')
                },
                {
                    path     : '/login',
                    name     : 'Login',
                    component: () => import('../components/Login.vue')
                },
                {
                    path     : '/categories',
                    name     : 'Categories',
                    component: () => import('../components/Categories.vue')
                },
                {
                    path     : '/newjob',
                    name     : 'New Job',
                    component: () => import('../components/JobForm.vue')
                },
                {
                    path     : '/job/:id',
                    name     : 'Job Info',
                    component: () => import('../components/JobDetail.vue')
                },
                {
                    path     : '/category/:id',
                    name     : 'Category List',
                    component: () => import('../components/JobList.vue')
                }
            ]
        }
    ]
});
