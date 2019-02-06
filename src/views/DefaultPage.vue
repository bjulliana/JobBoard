<template>
    <div class="home">
        <section class="hero is-light has-bg-img">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">{{pageTitle}}</h1>
                </div>
            </div>
        </section>
        <div class="columns">
            <router-view @title-change="updatePageTitle" class="column is-8 has-padding-top-100 has-padding-bottom-100"></router-view>
        </div>
    </div>
</template>

<script>

export default {
    name   : 'DefaultPage',
    data() {
        return {
            pageTitle: ''
        };
    },
    methods: {
        updatePageTitle(title) {
            this.pageTitle = title;
        }
    }
};
</script>

<style scoped>

</style>
