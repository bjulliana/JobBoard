import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';
import DefaultPage from '../views/DefaultPage.vue';

Vue.use(Router);

const accessToken = localStorage.getItem('sessionId');
const accessUser  = localStorage.getItem('userId');

const router = new Router({
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
                    component: () => import('../components/Categories.vue'),
                    meta     : {requiresAuth: true}
                },
                {
                    path     : '/jobs',
                    name     : 'Jobs',
                    component: () => import('../components/JobsTable.vue'),
                    meta     : {requiresAuth: true}
                },
                {
                    path     : '/all',
                    name     : 'All Jobs',
                    component: () => import('../components/JobList.vue')
                },
                {
                    path     : '/new',
                    name     : 'New Job',
                    component: () => import('../components/JobForm.vue'),
                    meta     : {requiresAuth: true}
                },
                {
                    path     : '/edit/:id',
                    name     : 'Edit Job',
                    component: () => import('../components/JobForm.vue'),
                    meta     : {requiresAuth: true}
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

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!accessToken || !accessUser) {
            next({
                path : '/login',
                query: {
                    redirect: to.fullPath
                }
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
