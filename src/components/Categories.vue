<template>
    <section class="container">
        <div class="job-form has-margin-bottom-60">
            <form
                @submit.prevent="addCategory"
                method="post"
                enctype="multipart/form-data"
                v-if="!edit"
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

            <form
                @submit.prevent="updateCategory(editCategory)"
                method="post"
                enctype="multipart/form-data"
                v-if="edit"
            >
                <b-field label="Category Title">
                    <b-input name="title" size="is-medium" v-model="newTitle" expanded></b-input>
                </b-field>
                <b-field>
                    <p class="control has-text-right">
                        <button type="submit" class="button is-gradient has-margin-top-30 ">
                            <span>Update Category</span>
                        </button>
                    </p>
                </b-field>
            </form>
        </div>
        <div>
            <categories-table></categories-table>
        </div>
    </section>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
import storage from '../storage.js';
import CategoriesTable from './CategoriesTable';
import EventBus from '../event-bus.js';

export default {
    name      : 'Categories',
    components: {
        CategoriesTable
    },
    data() {
        return {
            edit        : false,
            title       : '',
            newTitle    : '',
            editCategory: [],
            categoryID  : '',
            pageTitle   : 'Categories Manager'
        };
    },
    created() {
        this.$emit('title-change', this.pageTitle);
    },
    mounted() {
        EventBus.$on('edit-category', item => {
            this.edit         = true;
            this.editCategory = item;
            this.newTitle     = item.title;
            //this.categoryID = item._id;
            //console.log(item);
        });
    },
    methods   : {
        addCategory() {
            axios.post(`${storage.urlServer}/category/new`, {
                     title: this.title
                 })
                 .then(() => {
                     this.title = '';
                     EventBus.$emit('reload-table', this.title);
                 })
                 .catch(e => {
                     console.log(e);
                 });
        },
        updateCategory(item) {
            axios.put(`${storage.urlServer}/category`, {
                     _id  : item._id,
                     title: this.newTitle
                 })
                 .then(() => {
                     EventBus.$emit('reload-table', this.title);
                     this.edit = false;
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
