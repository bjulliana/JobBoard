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
            path     : '/index',
            component: DefaultPage,
            props    : true,
            children : [
                {
                    path     : 'newcategory',
                    name     : 'New Category',
                    component: () => import('../components/CategoryForm.vue'),
                    props    : true
                },
                {
                    path     : 'newjob',
                    name     : 'New Job',
                    component: () => import('../components/JobForm.vue'),
                    props    : true
                },
                {
                    path     : 'job/:id',
                    name     : 'Job Info',
                    component: () => import('../components/JobDetail.vue'),
                    props    : true
                }
            ]
        }
    ]
});
