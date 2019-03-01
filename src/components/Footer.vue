<template>
    <footer class="footer">
        <div class="content has-text-centered">
            <p>
                <strong>ui.jobs</strong> by <a href="http://www.jullianabauer.com">Julliana Bauer</a>.
            </p>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'Footer'
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables";
@import "../assets/scss/functions";

    footer {
        padding: rem-calc(24);
        background-color: $white-ter;
    }
</style>
