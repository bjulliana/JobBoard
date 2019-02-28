<template>
    <section class="container">
        <b-table
            :data="jobs"
            :hoverable="isHoverable"
            :mobile-cards="hasMobileCards"
            :loading="isLoading"
            :paginated="isPaginated"
            :per-page="perPage"
            :current-page.sync="currentPage">

            <template slot-scope="props">

                <b-table-column field="createdAt" label="Date Posted" sortable :custom-sort="sortByDate">
                    {{new Date(props.row.createdAt).toLocaleDateString()}}
                </b-table-column>

                <b-table-column field="title" label="Title" sortable>
                    <router-link :to="{ name: 'Job Info', params: {id: props.row._id, title: props.row.title}}">{{ props.row.title }}</router-link>
                </b-table-column>

                <b-table-column field="type" label="Type" sortable>
                    {{ props.row.type }}
                </b-table-column>

                <b-table-column field="title" label="Category" sortable>
                    <router-link :to="{ name: 'Categories'}">{{ props.row.category.title }}</router-link>
                </b-table-column>

                <b-table-column field="action" label="Actions">
                    <router-link class="button is-info is-outlined has-margin-right-20" :to="{ name: 'Edit Job', params: {id: props.row._id, title: props.row.title}}">
                        <span class="icon is-small">
                            <i class="fas fa-pencil-alt"></i>
                        </span>
                    </router-link>
                    <a class="button is-danger is-outlined" @click="deleteJob(props.row._id)">
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
                        <p>No Jobs</p>
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
    name   : 'JobsTable',
    data() {
        return {
            edit          : false,
            jobs          : [],
            isHoverable   : true,
            hasMobileCards: true,
            pageTitle     : 'Jobs Manager',
            isLoading     : true,
            isPaginated   : true,
            sort          : 'asc',
            currentPage   : 1,
            perPage       : 10
        };
    },
    created() {
        this.fetchJobs();
        this.$emit('title-change', this.pageTitle);
    },
    methods: {
        sortByDate(a, b, isAsc) {
            if (isAsc) {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            } else {
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            }
        },
        fetchJobs() {
            axios.get(`${storage.urlServer}/jobs`)
                 .then(response => {
                     this.jobs      = response.data;
                     this.results   = response.data.length;
                     this.isLoading = false;
                 })
                 .catch(e => {
                     console.log(e);
                 });
        },
        updateDate(date) {
            let newDate = new Date(date);
            let dd      = newDate.getDate();
            let mm      = newDate.getMonth() + 1; //January is 0!

            let yyyy = newDate.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            newDate = dd + '/' + mm + '/' + yyyy;

            return newDate;
        },
        editJob(item) {
            EventBus.$emit('edit-job', item);
        },
        deleteJob(id) {
            this.$dialog.confirm({
                title      : 'Delete Job',
                message    : 'Are you sure you want to <b>delete</b> this job? This action cannot be undone.',
                confirmText: 'Delete Job',
                type       : 'is-danger',
                hasIcon    : true,
                onConfirm  : () => {
                    axios.delete(`${storage.urlServer}/job/${id}`)
                         .then(() => {
                             this.fetchJobs();
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

    .category-image {
        max-width: rem-calc(50);
    }

    .table td {
        vertical-align: middle;
    }

</style>
