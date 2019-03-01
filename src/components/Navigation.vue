<template>
    <header class="container-header">
        <nav class="navbar container">
            <div class="navbar-brand">
                <a class="navbar-item" href="/">
                    <img src="/images/logo.svg" alt="ui.jobs" class="logo">
                </a>
                <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="mainNav">
                    <span></span>
                    <span></span>
                    <span></span>
                </a>
            </div>

            <div id="mainNav" class="navbar-menu">
                <div class="navbar-start">
                    <router-link class="navbar-item" :to="{ name: 'Home'}">
                        Home
                    </router-link>
                    <router-link class="navbar-item" :to="{ name: 'All Jobs'}">
                        All Jobs
                    </router-link>
                    <router-link v-if="!userLoggedIn" class="navbar-item is-hidden-desktop" :to="{ name: 'Login'}">
                        Login
                    </router-link>
                    <router-link v-if="userLoggedIn" class="navbar-item is-hidden-desktop" :to="{ name: 'New Job'}">
                        Post Job
                    </router-link>

                </div>

                <div class="navbar-end">
                    <div class="navbar-item is-hidden-touch">
                        <div class="field is-grouped">
                            <p class="control">
                                <router-link v-if="!userLoggedIn" class="button is-gradient" :to="{ name: 'Login'}"><span>Login</span></router-link>
                                <router-link v-if="userLoggedIn" class="button is-gradient has-margin-right-20" :to="{ name: 'New Job'}"><span>Post Job</span></router-link>
                            </p>
                        </div>
                    </div>
                    <div v-if="userLoggedIn" class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link toggle-mobile">
                            <span class="has-margin-right-5">{{user.first_name}} {{user.last_name}}</span>
                        </a>
                        <div class="navbar-dropdown is-hidden-small">
                            <router-link :to="{ name: 'Categories'}" class="navbar-item">
                                <b-icon icon="book-outline" class="has-margin-right-5"></b-icon>
                                Manage Categories
                            </router-link>
                            <router-link :to="{ name: 'Jobs'}" class="navbar-item">
                                <b-icon icon="briefcase-outline" class="has-margin-right-5"></b-icon>
                                Manage Jobs
                            </router-link>
                            <hr class="dropdown-divider">
                            <a href="#" class="navbar-item is-disabled">
                                <b-icon icon="account-outline" class="has-margin-right-5"></b-icon>
                                Profile
                            </a>
                            <a href="#" class="navbar-item" @click="logOut">
                                <b-icon icon="logout" class="has-margin-right-5"></b-icon>
                                Logout
                            </a>
                        </div>
                    </div>
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
            this.user = data;
        });

        EventBus.$on('setUserStatus', this.setUserStatus);
    },
    mounted() {
        let $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0),
            toggleMobile   = document.querySelector('.toggle-mobile');

        if ($navbarBurgers.length > 0) {
            $navbarBurgers.forEach(el => {
                el.addEventListener('click', () => {
                    const target  = el.dataset.target;
                    const $target = document.getElementById(target);
                    el.classList.toggle('is-active');
                    $target.classList.toggle('is-active');
                });
            });
        }

        if (toggleMobile) {
            toggleMobile.addEventListener('click', function () {
                document.querySelector('.navbar-dropdown').classList.toggle('is-hidden-small');
            });
        }
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
                 .catch(function (e) {
                     console.log(e);
                 });
        }
    }
};
</script>

<style lang="scss">
    @import "../assets/scss/variables";
    @import "../assets/scss/functions";

    .logo {
        min-width: rem-calc(130);
    }

    .dropdown {

        .dropdown-menu {
            padding-top: 0;

            .dropdown-content {
                border-radius: 0;
            }
        }
    }

    .navbar-item {
        &.is-disabled {
            cursor: not-allowed;
            opacity: 0.5;
            text-decoration: none;

            &:hover {
                background-color: transparent;
            }
        }
    }

    .is-hidden-small {
        display: none;

        @media screen and (min-width: $widescreen) {
            display: block;
        }
    }

</style>
