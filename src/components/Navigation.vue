<template>
    <header class="container-header">
        <nav class="navbar container">
            <div class="navbar-brand">
                <a class="navbar-item" href="/">
                    <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
                </a>
                <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div id="navbarExampleTransparentExample" class="navbar-menu">
                <div class="navbar-start">
                    <a class="navbar-item" href="/">
                        Home
                    </a>
                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link" href="/">
                            Docs
                        </a>
                    </div>
                </div>

                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="field is-grouped">
                            <p class="control">
                                <router-link class="button is-gradient" :to="{ name: 'New Job', params: {title: 'Add New Job', subtitle: 'Fill the Form Below to Add a New Job'}}"><span>Post Job</span></router-link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
export default {
    name: 'Navigation'
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables";
@import "../assets/scss/functions";

    .container-header {
        padding: rem-calc(10 0);
    }

</style>
