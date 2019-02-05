<template>
    <footer class="footer">
        <div class="content has-text-centered">
            <p>
                <strong>Job Board</strong> by <a href="http://www.jullianabauer.com">Julliana Bauer</a>.
            </p>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'Footer'
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/variables";
@import "../assets/scss/functions";

    footer {
        padding: rem-calc(48 24);
    }
</style>
