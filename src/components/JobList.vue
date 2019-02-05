<template>
        <div class="container has-padding-top-100 has-padding-bottom-100">
            <h1 class="title has-text-centered has-margin-bottom-80 has-text-weight-light is-uppercase">Recently <span class="has-text-weight-semibold">Posted</span> Jobs</h1>
            <job-card v-for="job in jobs" :key="job.id" :job="job" class="job-card"></job-card>
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
        // fetch the data when the view is created
        this.fetchData();
    },
    methods   : {
        fetchData() {
            console.log('ok');
            axios.get(`${storage.urlServer}/jobs`)
                 .then(response => {
                     console.log(response.data);
                     this.jobs = response.data;
                 })
                 .catch(e => {
                     console.log(e);
                 });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/variables";
@import "../assets/scss/functions";

    .job-card {
        margin-bottom: rem-calc(20);

        &:last-child {
            margin-bottom: 0;
        }
    }
</style>
