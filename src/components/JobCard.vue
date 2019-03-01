<template>
    <div class="box">
        <article class="media">
            <div class="media-content columns align-items-center is-marginless is-flex-mobile-md">
                <div class="column is-6-mobile-md is-flex align-items-center">
                    <figure class="image has-margin-right-40 job-icon-wrapper">
                        <img class="job-icon" :src="`/images/categories/${job.category._id}.svg `">
                    </figure>
                    <div>
                        <p class="is-marginless"><strong>{{job.title}}</strong></p>
                        <div class="location-block flex-row align-items-center">
                            <b-icon
                                pack="fas"
                                icon="map-marker-alt"
                                size="is-small">
                            </b-icon>
                            {{job.city}}, {{job.province}}
                        </div>
                    </div>
                </div>
                <div class="column is-6-mobile-md">
                    <div class="columns align-items-center">
                        <div class="column is-12-mobile is-6-tablet job-type is-uppercase is-hidden-mobile has-text-centered">{{job.type}}</div>
                        <div class="column is-12-mobile is-6-tablet has-text-centered-mobile has-text-right-tablet">
                            <a class="button is-gradient"><span>Apply</span></a>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name : 'JobCard',
    props: ['job']
};
</script>

<style scoped lang="scss">
    @import "../assets/scss/variables";
    @import "../assets/scss/functions";

    .media {
        align-items: center;
    }

    .location-block {
        color: $grey;
        font-size: rem-calc(12);
        text-transform: uppercase;
        margin-top: rem-calc(10);
    }

    .job-type {
        color: $red-100;
        font-size: rem-calc(14);
        letter-spacing: rem-calc(1);
    }

    .job-icon-wrapper {
        position: relative;

        .job-icon {
            max-width: rem-calc(40);
        }

        &::before {
            position: absolute;
            top: rem-calc(-6);
            left: rem-calc(-10);
            content: '';
            width: rem-calc(40);
            height: rem-calc(40);
            background-color: rgba($red-100, 0.1);
            border-radius: rem-calc(50 140);
        }
    }

</style>
