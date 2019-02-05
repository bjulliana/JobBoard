<template>
    <section class="container job-form">
        <form
            @submit.prevent="addJob"
            method="post"
            enctype="multipart/form-data"
        >
            <b-field label="Job Title">
                <b-input name="title" size="is-medium" v-model="title" expanded></b-input>
            </b-field>

            <b-field grouped>
                <b-field label="Job Category" expanded>
                    <b-input name="category" v-model="category" size="is-medium"></b-input>
                </b-field>
                <b-field label="Job Type" expanded>
                    <b-select name="type" size="is-medium" v-model="type" expanded>
                        <option value="flint">Full Time</option>
                        <option value="flint">Part Time</option>
                        <option value="flint">Temporary</option>
                        <option value="flint">Contract</option>
                    </b-select>
                </b-field>
            </b-field>

            <b-field grouped>
                <b-field label="City" expanded>
                    <b-input name="city" size="is-medium" v-model="city"></b-input>
                </b-field>
                <b-field label="Province" expanded>
                    <b-input name="province" size="is-medium" v-model="province"></b-input>
                </b-field>
            </b-field>

            <b-field label="Job Description">
                <b-input name="description" type="textarea" v-model="description"></b-input>
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

export default {
    name   : 'JobForm',
    data() {
        return {
            title      : '',
            category   : '',
            type       : '',
            city       : '',
            province   : '',
            description: ''
        };
    },
    methods: {
        addJob() {
            axios.post(`${storage.urlServer}/newjob`, {
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

    .job-form {

        .field {

            input,
            textarea,
            .input,
            .textarea {
                box-shadow: none;

                &.is-medium {
                    font-size: rem-calc(16);
                    height: rem-calc(45);
                }
            }
        }

    }

</style>
