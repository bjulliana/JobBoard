<template>
    <div class="box">
        <article class="media">
            <div class="media-left">
                <figure class="image is-64x64">
                    <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image">
                </figure>
            </div>
            <div class="media-content columns align-items-center is-marginless">
                <div class="column is-6">
                    <p class="is-marginless"><strong>{{job.title}}</strong></p>
                    <div class="location-block">
                        <b-icon
                            icon="map-marker"
                            size="is-small">
                        </b-icon>
                        {{job.city}}, {{job.province}}
                    </div>
                </div>
                <div class="column is-6">
                    <div class="job-type is-uppercase has-text-centered">{{job.type}}</div>
                </div>
            </div>
            <div class="media-right">
                <a class="button is-gradient"><span>Apply</span></a>
            </div>
        </article>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name    : 'JobCard',
    props   : ['job'],
    data() {
        return {
            description: this.job.description
        };
    },
    computed: {
        shortDescription() {
            if (this.description.length > 60) {
                return this.description.substring(0, 60) + '...';
            } else {
                return this.description;
            }
        }
    }
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

</style>
