<template>
    <div id="app">
        <h1 class="is-hidden">ui.job - Job Board</h1>
        <Navigation />
        <router-view />
        <Footer />
    </div>
</template>

<script>
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import 'bulma-helpers/css/bulma-helpers.min.css';
import storage from './storage.js';
import EventBus from './event-bus.js';
import axios from 'axios';

/* eslint-disable */
export default {
    name      : 'App',
    components: {
        Navigation,
        Footer
    },
    created() {
        if (storage.userId) {
            this.fetchUser();
        }
        EventBus.$on('setUserStatus', this.setUserStatus);
    },
    methods   : {
        setUserStatus() {
            storage.sessionId = localStorage.getItem('sessionId') || null;
            storage.userId    = localStorage.getItem('userId') || null;
        },
        fetchUser() {
            axios.get(`${storage.urlServer}/user/${storage.userId}`)
                 .then(response => {
                     EventBus.$emit('userData', response.data);
                 })
                 .catch(e => {
                     console.log(e);
                 });
        }
    }
};
</script>

<style lang="scss">
    @import "assets/scss/variables";
    @import "assets/scss/functions";


    .columns.columns {
        margin-right: 0;
        margin-left: 0;
    }

    .title {
        letter-spacing: 3px;
    }

    .button {
        &.is-gradient {
            background: linear-gradient(to right, $red-100, $red-200);
            color: $red-100;
            letter-spacing: rem-calc(1.2);
            border-radius: rem-calc(18);
            padding: rem-calc(2);
            border: none;

            span {
                padding: rem-calc(5 30 6);
                background: $white;
                display: block;
                border-radius: rem-calc(18);
                transition: background .5s;
                text-transform: uppercase;
                font-size: rem-calc(14);
            }

            &.is-solid {
                span {
                    background: transparent;
                    color: $white;

                    &:hover {
                        background: $red-100;
                    }
                }
            }

            &:hover {

                span {
                    background: transparent;
                    color: $white;
                }
            }
        }
    }

    .field {

        .is-medium {
            input,
            textarea,
            select,
            .input,
            .textarea,
            .select {
                box-shadow: none;
                font-size: rem-calc(16);
                height: rem-calc(45);
                border-radius: 4px;
            }
        }
    }

    form {
        .field {
            &.is-grouped {
                .field + .field {
                    margin-left: 0;
                }
            }
        }
    }

</style>
