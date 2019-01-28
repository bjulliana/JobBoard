<template>
    <section class="section has-padding-top-30 has-padding-bottom-30">
        <div class="container">
            <h1 class="title">Recently Posted Jobs</h1>

            <job-card></job-card>
        </div>
    </section>
</template>

<script>
import JobCard from './JobCard';

export default {
    name      : 'Job_List',
    components: {
        JobCard
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
