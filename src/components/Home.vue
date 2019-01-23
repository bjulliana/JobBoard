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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
