<script>
  // # # # # # # # # # # # # #
  //
  //  ERROR 404
  //
  // # # # # # # # # # # # # #

  import { onMount } from "svelte";
</script>

<style lang="scss">
  @import "../variables.scss";

  .placeholder {
    margin-top: 160px;
    font-size: $xlarge;
    font-weight: 300;
    text-transform: uppercase;
    line-height: 0.9em;
    font-family: $serif-stack;
    margin-left: $margin;
    min-height: 80vh;

    @include screen-size("small") {
      font-size: $mobile_xlarge;
    }
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
