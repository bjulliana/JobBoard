<template>
    <div class="home">
        <HomeHero></HomeHero>
        <JobList></JobList>
    </div>
</template>

<script>
import HomeHero from './HomeHero';
import JobList from './Job_List';

export default {
    name      : 'Home',
    components: {
        HomeHero,
        JobList
    }
};
</script>

<style scoped>

</style>
