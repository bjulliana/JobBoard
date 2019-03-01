<template>
    <section class="hero is-light is-medium has-bg-img" :style="{ backgroundImage: `url('${bgImage}')`}">
        <div class="hero-body columns">
            <div class="container column is-11-mobile is-10-tablet is-8-desktop">
                <h1 class="title has-text-centered is-uppercase has-text-dark has-text-weight-light">
                    Find the <span class="has-text-weight-semibold">Perfect</span> Job
                </h1>
                <b-field class="search">
                    <b-input placeholder="Search..."
                             v-model="search"
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
    name : 'HomeHero',
    props: {
        query: {
            type   : String,
            default: ''
        }
    },
    data() {
        return {
            search : null,
            bgImage: '/images/hero-default.jpg'
        };
    },
    watch: {
        search(val) {
            if (val !== null) {
                if (val.length !== 0) {
                    this.$router.push({
                        name : 'Search',
                        query: {q: val}
                    });
                } else if (val.length === 0) {
                    this.$router.push({
                        path: '/'
                    });
                }
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    @import "../assets/scss/variables";
    @import "../assets/scss/functions";

    .has-bg-img {
        background-size: cover;
        background-position: center;
    }

    .search {
        input,
        .input {
            box-shadow: none;

            &.is-large.is-large {
                font-size: rem-calc(18);
                height: rem-calc(48);
                padding-left: rem-calc(50);
            }
        }
    }

</style>
