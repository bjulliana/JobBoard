<template>
    <div class="home">
        <section class="hero is-light has-bg-img" :style="{ backgroundImage: `url('${bgImage}')`}">
            <div class="hero-body columns">
                <div class="container column is-12-mobile is-10-tablet is-8-desktop">
                    <h1 class="title">{{pageTitle}}</h1>
                </div>
            </div>
        </section>
        <div class="columns">
            <router-view @title-change="updatePageTitle" class="column is-12-mobile is-10-tablet is-8-desktop has-padding-top-100 has-padding-bottom-100"></router-view>
        </div>
    </div>
</template>

<script>

export default {
    name   : 'DefaultPage',
    data() {
        return {
            pageTitle: '',
            bgImage: '/images/hero-default.jpg'
        };
    },
    methods: {
        updatePageTitle(title) {
            this.pageTitle = title;
        }
    }
};
</script>

<style scoped lang="scss">
    .hero-body {
        padding-left: 0;
        padding-right: 0;
    }
</style>
