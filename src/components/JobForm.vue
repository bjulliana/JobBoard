<template>
    <section class="container job-form">
        <form
            @submit.prevent="addJob"
            method="post"
            enctype="multipart/form-data"
        >
            <div class="columns">
                <b-field label="Job Title" class="column is-12">
                    <b-input name="title" size="is-medium" v-model="title" expanded></b-input>
                </b-field>
            </div>
            <div class="columns">
                <b-field label="Job Category" class="column is-full-mobile is-half-tablet" expanded>
                    <b-select name="type" size="is-medium" v-model="category" expanded>
                        <option v-for="category in categories" :key="category._id" v-bind:value="category._id">{{category.title}}</option>
                    </b-select>
                </b-field>
                <b-field label="Job Type" class="column is-full-mobile is-half-tablet" expanded>
                    <b-select name="type" size="is-medium" v-model="type" expanded>
                        <option>Full Time</option>
                        <option>Part Time</option>
                        <option>Temporary</option>
                        <option>Contract</option>
                    </b-select>
                </b-field>
            </div>

            <div class="columns">
                <b-field label="City" class="column is-full-mobile is-half-tablet" expanded>
                    <b-input name="city" size="is-medium" v-model="city"></b-input>
                </b-field>
                <b-field label="Province" class="column is-full-mobile is-half-tablet" expanded>
                    <b-input name="province" size="is-medium" v-model="province"></b-input>
                </b-field>
            </div>

            <b-field label="Job Description">
                <vue-editor v-model="description"></vue-editor>
                <!--<b-input name="description" type="textarea" v-model="description"></b-input>-->
            </b-field>

            <b-field><!-- Label left empty for spacing -->
                <p class="control has-text-right">
                    <button type="submit" class="button is-gradient has-margin-top-30 ">
                        <span>Submit Job</span>
                    </button>
                </p>
            </b-field>
        </form>
    </section>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
import storage from '../storage.js';
import {VueEditor} from 'vue2-editor';

export default {
    name      : 'JobForm',
    components: {
        VueEditor
    },
    data() {
        return {
            pageTitle  : 'Add New Job',
            categories : [],
            title      : '',
            category   : '',
            type       : '',
            city       : '',
            province   : '',
            description: ''
        };
    },
    created() {
        this.fetchCategories();
        this.$emit('title-change', this.pageTitle);

    },
    methods   : {
        fetchCategories() {
            axios.get(`${storage.urlServer}/categories`)
                 .then(response => {
                     console.log(response.data);
                     this.categories = response.data;
                 })
                 .catch(e => {
                     console.log(e);
                 });
        },
        addJob() {
            axios.post(`${storage.urlServer}/job/new`, {
                     title      : this.title,
                     category   : this.category,
                     type       : this.type,
                     city       : this.city,
                     province   : this.province,
                     description: this.description
                 })
                 .then(() => {
                     this.$router.push({name: 'Home'});
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
