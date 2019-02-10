<template>
    <section class="container login-form">
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
        login(e) {
            e.preventDefault();
            let login = () => {
                axios.post(`${storage.urlServer}/login`, {
                        username: this.username,
                        password: this.password
                    },
                    {withCredentials: true}
                     )
                     .then(response => {
                         console.log('Logged in');
                         let data  = response.data;
                         let token = data.cookie.sid;
                         localStorage.setItem('sessionId', token);
                         this.getUserInfo();
                         this.$router.push({name: 'Home'});
                     })
                     .catch(e => {
                         console.log(e);
                     });
            };
            login();
        },
        getUserInfo() {
            axios.get(`${storage.urlServer}/user`, {withCredentials: true})
                 .then(function (response) {
                     let data = response.data;
                     if (!localStorage.getItem('userId')) {
                         let user = data[0];
                         localStorage.setItem('userId', user._id);
                         EventBus.$emit('setUserStatus', user);
                     }
                 })
                 .catch(function (err) {
                     this.logOut();
                 });
        },
        logOut() {
            axios.get(`${storage.urlServer}/logout`)
                 .then(() => {
                     localStorage.clear();
                     EventBus.$emit('setUserStatus');
                     this.$router.push({name: 'Home'});
                 })
                 .catch(function (err) {
                     this.logOut();
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
