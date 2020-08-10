<script>
  // # # # # # # # # # # # # #
  //
  //  ERROR 404
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { onMount } from "svelte";

  // COMPONENTS
  import Footer from "../Components/Footer.svelte";
</script>

<style lang="scss">
  @import "../variables.scss";

  .placeholder {
    padding-top: calc(#{$menu_bar_height} + #{$line-height});
    text-transform: uppercase;
    line-height: $line-height;
    font-family: $sans-stack;
    margin-left: $margin;
    margin-right: $margin;

    min-height: 80vh;

    @include screen-size("small") {
      margin-left: $phone-margin;
      margin-right: $phone-margin;    }
    }
</style>

<svelte:head>
  <title>404</title>
</svelte:head>

<div class="placeholder">
  404
  <br />
  Page not found
</div>

<Footer/>
