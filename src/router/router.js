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
            children : [
                {
                    path     : 'newjob',
                    name     : 'New Job',
                    component: () => import('../components/JobForm.vue'),
                    meta     : {
                        title   : 'Add New Job',
                        subtitle: 'Fill the Form Below to Add a New Job Posting'
                    }
                }
            ]
        }
    ]
});
