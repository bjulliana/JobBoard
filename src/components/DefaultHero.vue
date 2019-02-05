<template>
    <section class="hero is-light has-bg-img">
        <div class="hero-body">
            <div class="container">
                <h1 class="title">{{title}}</h1>
                <h2 class="subtitle">{{subtitle}}</h2>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'HomeHero',
    data() {
        return {
            title   : this.$route.meta.title,
            subtitle: this.$route.meta.subtitle
        };
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
