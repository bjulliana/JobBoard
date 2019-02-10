<template>
    <div class="container has-padding-top-100 has-padding-bottom-100">
        <h1 class="title has-text-centered has-margin-bottom-80 has-text-weight-light is-uppercase">Recently <span class="has-text-weight-semibold">Posted</span> Jobs</h1>
        <router-link v-for="job in jobs" :key="job.id" :to="{ name: 'Job Info', params: {id: job._id, title: job.title}}" class="job-card-wrapper">
            <job-card :job="job" class="job-card"></job-card>
        </router-link>
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
            jobs   : [],
            jobsQnt: null
        };
    },
    /* eslint-disable */
    created() {
        this.fetchData();
    },
    methods   : {
        fetchData() {
            axios.get(`${storage.urlServer}/jobs`)
                 .then(response => {
                     this.jobs = response.data;
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
