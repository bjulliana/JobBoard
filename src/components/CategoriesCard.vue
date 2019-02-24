<template>
    <div>
        <figure class="category-icon-wrapper image has-margin-auto">
            <img class="category-icon" :src="`/images/categories/${category._id}.svg `">
        </figure>
        <p class="has-text-centered has-margin-top-20 category-title">{{category.title}}</p>
    </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
import storage from '../storage.js';

export default {
    name : 'CategoriesCard',
    props: ['category'],
};
/* eslint-enable */
</script>

<style lang="scss">
    @import "../assets/scss/variables";
    @import "../assets/scss/functions";

    .category-title {
        text-transform: uppercase;
        font-size: rem-calc(12);
        letter-spacing: 1px;
        color: $grey-darker;
    }

    .category-icon-wrapper {

        .category-icon {
            max-width: rem-calc(60);
            margin: 0 auto;
        }
    }

</style>
