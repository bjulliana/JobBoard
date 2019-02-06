<template>
    <div class="home">
        <HomeHero></HomeHero>
        <div class="main-content columns">
            <JobList class="column is-8"></JobList>
        </div>
    </div>
</template>

<script>
import HomeHero from '../components/HomeHero';
import JobList from '../components/JobList';

export default {
    name      : 'Home',
    components: {
        HomeHero,
        JobList
    }
};
</script>

<style lang="scss">
@import "../assets/scss/variables";
@import "../assets/scss/functions";

    .main-content {
        background-color: $white-bis;
    }
</style>
