<template>
    <div class="home">
        <HomeHero></HomeHero>
        <div class="columns justify-center has-background-white">
            <div class="column is-12-mobile is-10-tablet is-8-desktop">
                <div class="columns has-padding-top-100 has-padding-bottom-100 category-cards-wrapper" v-if="!['Search'].includes($route.name)">
                    <router-link v-for="category in categories" :key="category.id" :to="{ name: 'Category List', params: {id: category._id, title: category.title}}">
                        <categories-card :category="category" class="category-card"></categories-card>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="main-content columns justify-center">
            <div class="column is-12-mobile is-10-tablet is-8-desktop">
                <div class="has-padding-top-100 has-padding-bottom-100">
                    <h1 class="title has-text-centered has-margin-bottom-80 has-text-weight-light is-uppercase" v-if="['Search'].includes($route.name)">Search
                        <span class="has-text-weight-semibold">Results</span> for: <i>{{$route.query.q}}</i></h1>
                    <h1 class="title has-text-centered has-margin-bottom-80 has-text-weight-light is-uppercase" v-else>Recently <span class="has-text-weight-semibold">Posted</span> Jobs</h1>
                    <router-link v-for="job in jobs" :key="job.id" :to="{ name: 'Job Info', params: {id: job._id, title: job.title}}" class="job-card-wrapper">
                        <job-card :job="job" class="job-card"></job-card>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HomeHero from '../components/HomeHero';
import axios from 'axios';
import JobCard from '../components/JobCard';
import storage from '../storage.js';
import CategoriesCard from '../components/CategoriesCard';

export default {
    name      : 'Home',
    components: {
        HomeHero,
        JobCard,
        CategoriesCard
    },
    data() {
        return {
            jobs         : [],
            jobsQnt      : null,
            results      : '',
            categories   : [],
            categoriesQnt: ''
        };
    },
    /* eslint-disable */
    created() {
        this.fetchData();
        this.fetchCategories();
    },
    watch     : {
        $route: 'fetchData'
    },
    computed  : {
        request() {
            if (this.$route.name === 'Search') {
                let q = this.$route.query.q;
                return `${storage.urlServer}/search/${q}`;
            } else {
                return `${storage.urlServer}/jobs`;
            }
        }
    },
    methods   : {
        fetchData() {
            axios.get(this.request)
                 .then(response => {
                     this.jobs    = response.data;
                     this.results = response.data.length;
                 })
                 .catch(e => {
                     console.log(e);
                 });
        },
        fetchCategories() {
            axios.get(`${storage.urlServer}/categories`)
                 .then(response => {
                     console.log(response.data);
                     this.categories    = response.data;
                     this.categoriesQnt = this.categories.length;
                 })
                 .catch(e => {
                     console.log(e);
                 });
        }
    }
};
</script>

<style lang="scss">
    @import "../assets/scss/variables";
    @import "../assets/scss/functions";

    .main-content {
        background-color: $white-bis;
    }

    .job-card-wrapper {
        margin-right: rem-calc(30);

        &:last-child {
            margin-right: 0;
        }

        .job-card {
            margin-bottom: rem-calc(20);
            transition: 0.1s ease-in-out;
        }

        &:hover {
            .job-card {
                transform: scale(1.02);

                .button.is-gradient {
                    span {
                        background: transparent;
                        color: $white;
                    }
                }
            }

        }
    }

    .category-cards-wrapper {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

        .category-card {
            min-width: rem-calc(100);
            padding: rem-calc(10);


        }
    }

</style>
