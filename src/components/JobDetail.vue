<template>
    <section class="container">
        <div class="columns">
            <div class="column is-full-mobile is-three-fifths-tablet is-two-thirds-desktop">
                <h2 class="sub-title is-size-4 has-margin-bottom-30 has-text-weight-light is-uppercase">Job <span class="has-text-weight-semibold">Description</span></h2>
                <div class="job-description" v-html="job.description"></div>
                <div class="apply">
                    <button class="button is-gradient has-margin-top-20" @click="isOpen = !isOpen"><span>Apply</span></button>
                    <b-collapse :open.sync="isOpen" id="applyForm">
                        <div class="notification has-margin-top-30">
                            <div class="content">
                                <form>
                                    <b-field label="Name" expanded>
                                        <b-input name="name" size="is-medium" v-model="name"></b-input>
                                    </b-field>
                                    <b-field label="Email" expanded>
                                        <b-input type="email" name="email" size="is-medium" v-model="email"></b-input>
                                    </b-field>

                                    <b-field label="Message">
                                        <b-input name="message" type="textarea" v-model="message"></b-input>
                                    </b-field>
                                    <b-field class="file">
                                        <b-upload v-model="file">
                                            <a class="button is-info">
                                                <b-icon pack="fas" icon="upload"></b-icon>
                                                <span>Upload Resume</span>
                                            </a>
                                        </b-upload>
                                        <span class="file-name" v-if="file">
                                            {{ file.name }}
                                        </span>
                                    </b-field>
                                    <b-field>
                                        <p class="control has-text-right">
                                            <a class="button is-gradient has-margin-top-30" @click="submitConfirmation">
                                                <span>Submit Application</span>
                                            </a>
                                        </p>
                                    </b-field>
                                </form>
                                <b-message type="is-success" :active.sync="isActive" class="has-margin-top-30">
                                    Your Application was submitted.
                                </b-message>
                            </div>
                        </div>
                    </b-collapse>
                </div>
            </div>
            <div class="column is-hidden-mobile">
                <div class="card">
                    <div class="card-content">
                        <div class="content">
                            <div class="sidebar-content">
                                <p class="sidebar-title has-margin-bottom-5">Date Posted</p>
                                <p>{{ updateDate(job.createdAt) }}</p>
                            </div>
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
                            <div class="sidebar-content has-text-centered">
                                <a class="button is-gradient has-margin-top-20" @click="isOpen = true" href="#" v-scroll-to="'#applyForm'"><span>Apply</span></a>
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
            isOpen     : false,
            isActive   : false,
            title      : '',
            pageTitle  : '',
            categoryID : '',
            category   : '',
            type       : '',
            city       : '',
            province   : '',
            description: '',
            name       : '',
            email      : '',
            message    : '',
            file       : null,
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
        getCategory() {
            axios.get(`${storage.urlServer}/category/${this.categoryID}`)
                 .then(response => {
                     this.category = response.data;
                 })
                 .catch(e => {
                     console.log(e);
                 });
        },
        submitConfirmation() {
            this.isActive = true;
            this.name     = '';
            this.email    = '';
            this.message  = '';
            this.file     = null;
        }
    }
};
/* eslint-enable */
</script>

<style lang="scss">
    @import "../assets/scss/variables";
    @import "../assets/scss/functions";

    .sub-title {
        letter-spacing: 3px;
    }

    .sidebar-content {
        margin-bottom: rem-calc(30);

        .sidebar-title {
            text-transform: uppercase;
            font-weight: 700;
            color: $red-100;
        }

        &:last-child {
            margin-bottom: 0;
        }
    }

    .job-description {
        p {
            margin-bottom: 10px;
            line-height: 1.8;
        }

        ul {
            list-style: disc;
            margin-left: 18px;

            li {
                margin-bottom: 10px;
            }
        }
    }

</style>
