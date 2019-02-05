<template>
    <section class="hero is-light is-medium has-bg-img">
        <div class="hero-body columns">
            <div class="container column is-6">
                <h1 class="title has-text-centered is-uppercase has-text-dark has-text-weight-light">
                    Find the <span class="has-text-weight-semibold">Perfect</span> Job
                </h1>
                <b-field class="search">
                    <b-input placeholder="Search..."
                             type="search"
                             icon="magnify"
                             size="is-large"
                             rounded
                             expanded>
                    </b-input>
                </b-field>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'HomeHero'
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

    .has-bg-img {
        background: url('../assets/images/blank-business-composition-373076.jpg') center center;
        background-size: cover;
    }

    .search {
        input,
        .input {
            box-shadow: none;
        }
    }

</style>
