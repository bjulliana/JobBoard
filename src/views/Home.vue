<template>
    <div class="home">
        <HomeHero></HomeHero>
        <div class="columns justify-center has-background-white">
            <div class="column is-12-mobile is-10-tablet is-8-desktop">
                <carousel class="columns has-padding-bottom-50-touch has-padding-top-50-touch has-padding-top-100 has-padding-bottom-100 category-cards-wrapper" v-if="!['Search'].includes($route.name)"
                          :scrollPerPage="true" :perPageCustom="[[0, 1], [480, 3], [768, 4], [1152, 5]]">
                    <h2 class="is-hidden">Categories List</h2>
                    <slide v-for="category in categories" :key="category.id">
                        <router-link :to="{ name: 'Category List', params: {id: category._id, title: category.title}}" class="categoy-card-link">
                            <categories-card :category="category" class="category-card"></categories-card>
                        </router-link>
                    </slide>
                </carousel>
            </div>
        </div>
        <div class="main-content columns justify-center has-padding-bottom-100">
            <div class="column is-12-mobile is-10-tablet is-8-desktop">
                <div class="has-padding-top-50-touch has-padding-top-100 has-padding-bottom-50">
                    <h1 class="title has-text-centered has-margin-bottom-40-touch has-margin-bottom-80 has-text-weight-light is-uppercase" v-if="['Search'].includes($route.name)">Search
                        <span class="has-text-weight-semibold">Results</span> for: <i>{{$route.query.q}}</i></h1>
                    <h2 class="title has-text-centered has-margin-bottom-40-touch has-margin-bottom-80 has-text-weight-light is-uppercase" v-else>Recently <span class="has-text-weight-semibold">Posted</span> Jobs</h2>
                    <router-link v-for="job in jobs" :key="job.id" :to="{ name: 'Job Info', params: {id: job._id, title: job.title}}" class="job-card-wrapper">
                        <job-card :job="job" class="job-card"></job-card>
                    </router-link>
                </div>
                <div class="has-text-centered">
                    <router-link v-if="!['Search'].includes($route.name)" class="button is-gradient is-solid has-margin-auto" :to="{ name: 'All Jobs'}"><span>View All</span></router-link>
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
import {Carousel, Slide} from 'vue-carousel';

export default {
    name      : 'Home',
    components: {
        HomeHero,
        JobCard,
        CategoriesCard,
        Carousel,
        Slide
    },
    data() {
        return {
            jobs      : [],
            categories: []
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
                     if (this.$route.name === 'Home') {
                         this.jobs = response.data.slice(0, 6);
                     } else {
                         this.jobs = response.data;
                     }
                 })
                 .catch(e => {
                     console.log(e);
                 });
        },
        fetchCategories() {
            axios.get(`${storage.urlServer}/categories`)
                 .then(response => {
                     this.categories = response.data;
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

    .VueCarousel-slide {
        /*position: relative;*/
        transition: .3s cubic-bezier(0.11, 0.7, 0, 1);

        .category-card {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: rem-calc(10 0);

            .category-icon-wrapper {
                position: relative;

                &::before {
                    position: absolute;
                    top: rem-calc(-10);
                    left: rem-calc(-30);
                    content: '';
                    width: rem-calc(80);
                    height: rem-calc(80);
                    background-color: $white;
                    border-radius: rem-calc(50 140);
                    transition: background-color .3s ease-in-out;
                    z-index: -1;
                }
            }
        }

        .category-title {
            display: inline-block;
            position: relative;
            padding-bottom: rem-calc(5);
            transition: color .3s cubic-bezier(0.11, 0.7, 0, 1);

            &::after {
                position: absolute;
                bottom: 0;
                left: 0;
                display: block;
                width: 100%;
                height: rem-calc(2);
                background-color: $red-100;
                content: '';
                transform: scale(0);
                transition: transform .3s cubic-bezier(0.11, 0.7, 0, 1);
            }
        }

        &:hover {
            .category-title {
                color: $red-100;

                &:after {
                    transform: scale(1);
                }
            }

            .category-icon-wrapper {
                &::before {
                    background-color: $white-ter;
                }
            }
        }
    }

</style>
