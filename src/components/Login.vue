<template>
    <section class="container login-form">
        <h2 class="is-hidden">Login Form</h2>
        <div class="columns justify-center">
            <div class="column is-12-mobile is-10-tablet is-8-desktop">
                <form
                    @submit.prevent="login"
                    method="post"
                >
                    <div class="columns">
                        <b-field label="Username" class="column is-12">
                            <b-input name="username" size="is-medium" v-model="username" expanded></b-input>
                        </b-field>
                    </div>
                    <div class="columns">
                        <b-field label="Password" class="column is-12">
                            <b-input type="password" name="password" size="is-medium" v-model="password" expanded></b-input>
                        </b-field>
                    </div>
                    <b-field><!-- Label left empty for spacing -->
                        <p class="control has-text-right">
                            <button type="submit" class="button is-gradient has-margin-top-30 ">
                                <span>Login</span>
                            </button>
                        </p>
                    </b-field>
                </form>
                <p>Don't have an account yet?
                    <router-link :to="{ name: 'Register'}">Register Here</router-link>
                </p>
            </div>
        </div>
    </section>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
import storage from '../storage.js';
import EventBus from '../event-bus.js';

export default {
    name   : 'Login',
    data() {
        return {
            pageTitle: 'Login',
            username : '',
            password : ''
        };
    },
    created() {
        this.$emit('title-change', this.pageTitle);

    },
    methods: {
        login() {
            axios.post(`${storage.urlServer}/login`, {
                    username: this.username,
                    password: this.password
                },
                {withCredentials: true}
                 )
                 .then(response => {
                     let data  = response.data;
                     let token = data.cookie.sid;
                     let user  = data.user._id;
                     localStorage.setItem('sessionId', token);
                     localStorage.setItem('userId', user);
                     EventBus.$emit('setUserStatus', user);
                     this.$router.push({name: 'Home'});
                 })
                 .catch(e => {
                     console.log(e);
                 });
        },
        logOut() {
            axios.get(`${storage.urlServer}/logout`)
                 .then(() => {
                     localStorage.clear();
                     EventBus.$emit('setUserStatus');
                     this.$router.push({name: 'Home'});
                 })
                 .catch(function (e) {
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
