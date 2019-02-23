<template>
    <header class="container-header">
        <nav class="navbar container">
            <div class="navbar-brand">
                <a class="navbar-item" href="/">
                    <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
                </a>
                <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div id="navbarExampleTransparentExample" class="navbar-menu">
                <div class="navbar-start">
                    <a class="navbar-item" href="/">
                        Home
                    </a>
                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link" href="/">
                            Docs
                        </a>
                    </div>
                </div>

                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="field is-grouped">
                            <p class="control">
                                <router-link v-if="!userLoggedIn" class="button is-gradient" :to="{ name: 'Login'}"><span>Login</span></router-link>
                                <router-link v-if="userLoggedIn" class="button is-gradient has-margin-right-20" :to="{ name: 'New Job'}"><span>Post Job</span></router-link>
                            </p>
                        </div>
                    </div>
                    <b-dropdown v-if="userLoggedIn" position="is-bottom-left">
                        <a class="navbar-item" slot="trigger">
                            <span class="has-margin-right-5">{{user.first_name}} {{user.last_name}}</span>
                            <b-icon icon="chevron-down"></b-icon>
                        </a>
                        <b-dropdown-item value="categories" has-link>
                            <router-link :to="{ name: 'Categories'}">
                                <b-icon icon="book-outline" class="has-margin-right-5"></b-icon>
                                Manage Categories
                            </router-link>
                        </b-dropdown-item>
                        <b-dropdown-item value="categories" has-link>
                            <router-link :to="{ name: 'Jobs'}">
                                <b-icon icon="briefcase-outline" class="has-margin-right-5"></b-icon>
                                Manage Jobs
                            </router-link>
                        </b-dropdown-item>
                        <hr class="dropdown-divider">
                        <b-dropdown-item value="profile" custom class="is-disabled">
                            <b-icon icon="account-outline" class="has-margin-right-5"></b-icon>
                            Profile
                        </b-dropdown-item>
                        <b-dropdown-item value="logout" href="#" @click="logOut">
                            <b-icon icon="logout" class="has-margin-right-5"></b-icon>
                            Logout
                        </b-dropdown-item>
                    </b-dropdown>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
import EventBus from '../event-bus.js';
import storage from '../storage.js';
import axios from 'axios';

/* eslint-disable */
export default {
    name   : 'Navigation',
    data() {
        return {
            userLoggedIn: !!storage.sessionId,
            user        : []
        };
    },
    created() {
        EventBus.$on('userData', data => {
            console.log(data);
            this.user = data;
        });
        EventBus.$on('setUserStatus', this.setUserStatus);
    },
    methods: {
        setUserStatus(user) {
            this.userLoggedIn = !!storage.sessionId;
            this.user         = storage.userId;
        },
        logOut() {
            axios.get(`${storage.urlServer}/logout`)
                 .then(() => {
                     window.localStorage.clear();
                     EventBus.$emit('setUserStatus');
                     this.$router.push({name: 'Home'});
                 })
                 .catch(function (err) {
                     console.log(err);
                 });
        }
    }
};
</script>

<style lang="scss">
    @import "../assets/scss/variables";
    @import "../assets/scss/functions";

    .dropdown {

        .dropdown-menu {
            padding-top: 0;

            .dropdown-content {
                border-radius: 0;
            }
        }
    }

</style>
