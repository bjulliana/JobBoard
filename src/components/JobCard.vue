<template>
    <div class="box">
        <article class="media">
            <div class="media-left">
                <figure class="image is-64x64">
                    <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image">
                </figure>
            </div>
            <div class="media-content">
                <div class="content">
                    <p class="is-marginless"><strong>{{job.title}}</strong></p>
                    <div class="location-block">
                        <b-icon
                            icon="map-marker"
                            size="is-small">
                        </b-icon>
                        {{job.city}}, {{job.province}}
                    </div>
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

</style>
