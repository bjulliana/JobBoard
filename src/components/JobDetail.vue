<template>
    <section class="container">
        <div class="columns">
            <div class="column is-full-mobile is-three-fifths-tablet is-two-thirds-desktop">
                <div>{{job.title}}</div>
                <div v-html="job.description"></div>
            </div>
            <div class="column">
                <div class="card">
                    <div class="card-content">
                        <div class="content">
                            <div class="sidebar-content">
                                <p class="sidebar-title has-margin-bottom-5">Job Category</p>
                                <p>{{category.title}}</p>
                            </div>
                            <div class="sidebar-content">
                                <p class="sidebar-title has-margin-bottom-5">Job Type</p>
                                <p>{{job.type}}</p>
                            </div>
                            <div class="sidebar-content">
                                <p class="sidebar-title has-margin-bottom-5">Job Location</p>
                                <p>{{job.city}}, {{job.province}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
import storage from '../storage.js';

export default {
    name   : 'JobDetail',
    data() {
        return {
            job        : [],
            title      : '',
            pageTitle  : '',
            categoryID : '',
            category   : '',
            type       : '',
            city       : '',
            province   : '',
            description: '',
            dateCreated: ''
        };
    },
    created() {
        this.fetchDetails();
    },
    methods: {
        async fetchDetails() {
            let jobID = this.$route.params.id;

            await axios.get(`${storage.urlServer}/job/${jobID}`)
                       .then(response => {
                           console.log(response.data);
                           this.job         = response.data;
                           this.title       = this.job.title;
                           this.categoryID  = this.job.category;
                           this.type        = this.job.type;
                           this.city        = this.job.city;
                           this.province    = this.job.province;
                           this.description = this.job.description;
                           this.dateCreated = this.job.createdAt;

                           this.getCategory();
                           this.updateTitle();
                       })
                       .catch(e => {
                           console.log(e);
                       });
        },
        updateTitle() {
            this.$emit('title-change', this.job.title);
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
/* eslint-enable */
</script>

<style lang="scss">
    @import "../assets/scss/variables";
    @import "../assets/scss/functions";

    .sidebar-content {
        margin-bottom: rem-calc(30);

        .sidebar-title {
            text-transform: uppercase;
            font-weight: 700;
            color: $red-100;
        }
    }

</style>
