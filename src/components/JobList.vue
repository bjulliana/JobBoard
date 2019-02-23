<template>
    <div class="container has-padding-top-100 has-padding-bottom-100">
        <h1 class="title has-text-centered has-margin-bottom-80 has-text-weight-light is-uppercase"><span class="has-text-weight-semibold">{{category.title}} </span>Jobs</h1>
        <div v-if="jobsQnt > 0">
            <router-link v-for="job in jobs" :key="job.id" :to="{ name: 'Job Info', params: {id: job._id, title: job.title}}" class="job-card-wrapper">
                <job-card :job="job" :category="category" class="job-card"></job-card>
            </router-link>
        </div>
        <div v-else>
            <p class="has-text-centered is-italic">No Jobs in this category</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import JobCard from './JobCard';
import storage from '../storage.js';

export default {
    name      : 'JobList',
    components: {
        JobCard
    },
    data() {
        return {
            jobs      : [],
            jobsQnt   : null,
            categoryID: '',
            category  : []
        };
    },
    /* eslint-disable */
    created() {
        this.fetchData();
    },
    computed  : {
        request() {
            if (this.$route.name === 'Category List') {
                this.categoryID = this.$route.params.id;
                return `${storage.urlServer}/jobs/category/${this.categoryID}`;
            }
        }
    },
    methods   : {
        fetchData() {
            axios.get(this.request)
                 .then(response => {
                     console.log(response.data);
                     this.jobs    = response.data;
                     this.jobsQnt = response.data.length;
                     this.getCategory();
                 })
                 .catch(e => {
                     console.log(e);
                 });
        },
        getCategory() {
            axios.get(`${storage.urlServer}/category/${this.categoryID}`)
                 .then(response => {
                     this.category = response.data;
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

    .job-card-wrapper {

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

</style>
