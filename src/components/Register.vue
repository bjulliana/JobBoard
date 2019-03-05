<template>
    <section class="container register-form">
        <h2 class="is-hidden">Registration Form</h2>
        <form
            @submit.prevent="register"
            method="post"
        >
            <b-field label="First Name" class="column" expanded>
                <b-input name="first_name" size="is-medium" v-model="first_name"></b-input>
            </b-field>
            <b-field label="Last Name" class="column " expanded>
                <b-input name="last_name" size="is-medium" v-model="last_name"></b-input>
            </b-field>
            <b-field label="Username" class="column">
                <b-input name="username" size="is-medium" v-model="username" expanded></b-input>
            </b-field>
            <b-field label="Password" class="column">
                <b-input type="password" name="password" size="is-medium" v-model="password" expanded></b-input>
            </b-field>
            <b-field>
                <p class="control has-text-right">
                    <button type="submit" class="button is-gradient has-margin-top-30 ">
                        <span>Register</span>
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
import EventBus from '../event-bus.js';

export default {
    name   : 'Register',
    data() {
        return {
            pageTitle : 'New Account',
            username  : '',
            first_name: '',
            last_name : '',
            password  : ''
        };
    },
    created() {
        this.$emit('title-change', this.pageTitle);
    },
    methods: {
        register() {
            axios.post(`${storage.urlServer}/register`, {
                     password  : this.password,
                     username  : this.username,
                     first_name: this.first_name,
                     last_name : this.last_name
                 })
                 .then((response) => {
                     let data  = response.data;
                     let token = data.cookie.sid;
                     let user  = data.user._id;
                     localStorage.setItem('sessionId', token);
                     localStorage.setItem('userId', user);
                     this.getUserInfo(user);
                     this.$router.push({name: 'Home'});
                     //this.$router.push({name: 'Home'});
                 })
                 .catch(e => {
                     console.log(e);
                 });
        },
        getUserInfo(user) {
            axios.get(`${storage.urlServer}/user/${user}`, {withCredentials: true})
                 .then(function (response) {
                     let data = response.data;
                     let user = data[0];
                     EventBus.$emit('setUserStatus', user);
                 })
                 .catch(function (e) {
                     console.log(e)
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
