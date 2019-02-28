<template>
    <div class="container has-padding-top-80-touch has-padding-top-100 has-padding-bottom-100">
        <div v-if="jobsQnt > 0">
            <router-link v-for="job in paginatedJobs" :key="job.id" :to="{ name: 'Job Info', params: {id: job._id, title: job.title}}" class="job-card-wrapper">
                <job-card :job="job" class="job-card"></job-card>
            </router-link>
        </div>
        <div v-else>
            <p class="has-text-centered is-italic">No Jobs in this category</p>
        </div>
        <b-pagination
            v-if="['All Jobs', 'Category List'].includes($route.name)"
            :total="jobsQnt"
            :current.sync="current"
            :per-page="perPage"
        >
        </b-pagination>
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
            category  : [],
            title     : '',
            current   : 1,
            perPage   : 5
        };
    },
    /* eslint-disable */
    created() {
        this.fetchData();
    },
    watch     : {
        $route: 'fetchData'
    },
    computed  : {
        request() {
            if (this.$route.name === 'Category List') {
                this.categoryID = this.$route.params.id;
                return `${storage.urlServer}/jobs/category/${this.categoryID}`;
            }
            if (this.$route.name === 'All Jobs') {
                return `${storage.urlServer}/jobs`;
            }
        },
        paginatedJobs() {
            let page_number = this.current - 1;
            return this.jobs.slice(page_number * this.perPage, (page_number + 1) * this.perPage);
        }
    },
    methods   : {
        fetchData() {
            axios.get(this.request)
                 .then(response => {
                     this.jobs    = response.data;
                     this.jobsQnt = response.data.length;
                     if (this.$route.name === 'Category List') {
                         this.title = response.data[0].category.title;
                         this.$emit('title-change', this.title  + ' Jobs');
                     } else if (this.$route.name === 'All Jobs') {
                         this.title = 'All';
                         this.$emit('title-change', this.title + ' Jobs');
                     }
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
