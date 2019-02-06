<template>
    <section class="container job-form">
        <form
            @submit.prevent="addCategory"
            method="post"
            enctype="multipart/form-data"
        >
            <b-field label="Category Title">
                <b-input name="title" size="is-medium" v-model="title" expanded></b-input>
            </b-field>
            <b-field>
                <p class="control has-text-right">
                    <button type="submit" class="button is-gradient has-margin-top-30 ">
                        <span>Save Category</span>
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
    name   : 'CategoryForm',
    data() {
        return {
            title    : '',
            pageTitle: 'Add New Category'
        };
    },
    created() {
        this.$emit('title-change', this.pageTitle);
    },
    methods: {
        addCategory() {
            axios.post(`${storage.urlServer}/newcategory`, {
                     title: this.title
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
