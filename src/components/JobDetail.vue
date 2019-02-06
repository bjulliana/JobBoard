<template>
    <section class="container">
        <div>{{job.title}}</div>
        <div>{{category.title}}</div>
        <div>{{job.type}}</div>
        <div>{{job.city}}</div>
        <div>{{job.province}}</div>
        <div v-html="job.description"></div>

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

</style>
