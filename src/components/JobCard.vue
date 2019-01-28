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
                    <p class="is-marginless"><strong>Job Title</strong></p>
                    <p class="is-marginless">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas. Nullam condimentum luctus turpis.</p>
                </div>
            </div>
            <div class="media-right">
                <a class="button is-primary">Apply</a>
            </div>
        </article>
    </div>
</template>

<script>
export default {
    name: 'JobCard'
};
</script>

<style scoped lang="scss">
    .media {
        align-items: center;
    }

</style>
