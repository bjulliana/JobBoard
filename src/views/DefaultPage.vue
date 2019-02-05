<template>
    <div class="home">
        <DefaultHero></DefaultHero>
        <div class="columns">
            <router-view class="column is-8 has-padding-top-100 has-padding-bottom-100"></router-view>
        </div>
    </div>
</template>

<script>
import DefaultHero from '../components/DefaultHero';

export default {
    name      : 'Home',
    components: {
        DefaultHero
    }
};
</script>

<style scoped>

</style>
