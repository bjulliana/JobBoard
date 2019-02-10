<template>
    <section class="container register-form">
        <form
            @submit.prevent="register"
            method="post"
        >
            <div class="columns">
                <b-field label="First Name" class="column is-full-mobile is-half-tablet" expanded>
                    <b-input name="first_name" size="is-medium" v-model="first_name"></b-input>
                </b-field>
                <b-field label="Last Name" class="column is-full-mobile is-half-tablet" expanded>
                    <b-input name="last_name" size="is-medium" v-model="last_name"></b-input>
                </b-field>
            </div>
            <div class="columns">
                <b-field label="Username" class="column is-full-mobile is-half-tablet">
                    <b-input name="username" size="is-medium" v-model="username" expanded></b-input>
                </b-field>
                <b-field label="Password" class="column is-full-mobile is-half-tablet">
                    <b-input type="password" name="password" size="is-medium" v-model="password" expanded></b-input>
                </b-field>
            </div>
            <b-field><!-- Label left empty for spacing -->
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
                     email     : this.email,
                     username  : this.username,
                     first_name: this.first_name,
                     last_name : this.last_name
                 })
                 .then(() => {
                     this.$router.push({name: 'Home'});
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

</style>
