<template>
    <section>
        <b-table
            :data="categories"
            :hoverable="isHoverable"
            :mobile-cards="hasMobileCards">

            <template slot-scope="props">
                <b-table-column field="image" label="Image" centered>
                    <img src="https://picsum.photos/50/50">
                </b-table-column>

                <b-table-column field="id" label="ID">
                    {{ props.row._id }}
                </b-table-column>

                <b-table-column field="title" label="Title">
                    {{ props.row.title }}
                </b-table-column>

                <b-table-column field="action" label="Actions">
                    <a class="button is-info is-outlined has-margin-right-20" @click="editCategory(props.row)">
                        <span class="icon is-small">
                            <i class="fas fa-pencil-alt"></i>
                        </span>
                    </a>
                    <a class="button is-danger is-outlined" @click="deleteCategory(props.row._id)">
                        <span class="icon is-small">
                            <i class="far fa-trash-alt"></i>
                        </span>
                    </a>
                </b-table-column>

            </template>

            <template slot="empty">
                <section class="section">
                    <div class="content has-text-grey has-text-centered">
                        <p>
                            <b-icon
                                icon="emoticon-sad"
                                size="is-large">
                            </b-icon>
                        </p>
                        <p>No Categories</p>
                    </div>
                </section>
            </template>
        </b-table>
    </section>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
import storage from '../storage.js';
import EventBus from '../event-bus.js';

export default {
    name   : 'CategoriesTable',
    data() {
        return {
            edit          : false,
            categories    : [],
            isHoverable   : true,
            hasMobileCards: true
        };
    },
    created() {
        this.fetchCategories();
    },
    mounted() {
        EventBus.$on('reload-table', event => {
            this.fetchCategories();
        });
    },
    methods: {
        fetchCategories() {
            axios.get(`${storage.urlServer}/categories`)
                 .then(response => {
                     console.log(response.data);
                     this.categories = response.data;
                     this.edit       = false;
                 })
                 .catch(e => {
                     console.log(e);
                 });
        },
        editCategory(item) {
            EventBus.$emit('edit-category', item);
        },
        deleteCategory(id) {
            this.$dialog.confirm({
                title      : 'Delete Category',
                message    : 'Are you sure you want to <b>delete</b> this category? This action cannot be undone.',
                confirmText: 'Delete Category',
                type       : 'is-danger',
                hasIcon    : true,
                onConfirm  : () => {
                    axios.delete(`${storage.urlServer}/category/${id}`)
                         .then(() => {
                             this.fetchCategories();
                         })
                         .catch(e => {
                             console.log(e);
                         });
                }
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
