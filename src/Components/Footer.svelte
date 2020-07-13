<script>
  // # # # # # # # # # # # # #
  //
  //  FOOTER
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  // import "intersection-observer";
  // import { navigate } from "svelte-routing";
  // import { onMount } from "svelte";
  // import { links } from "svelte-routing";
  // import { fade } from "svelte/transition";
  // import _ from "lodash";
  // import Flickity from "flickity";

  // // STORES
  // import { menuBarText, location, filterTerm } from "../stores.js";

  // COMPONENTS
  import Logo from "./Logo.svelte";
</script>

<style lang="scss">
  @import "../variables.scss";

  footer {
    width: 100vw;
    background: #f4f4f4;
    font-family: $serif-stack;
    line-height: 1.4em;
    overflow: hidden;
    user-select: none;
    padding: 20px;
    padding-bottom: 20px;
    font-weight: normal;

    @include screen-size("small") {
      padding: 10px;
    }

    font-size: $font_size_small;
    font-family: Helvetica, Arial, sans-serif;

    // text-decoration: underline;
    letter-spacing: 0.1em;

    .logo {
      height: calc(#{$menu_bar_height} - 20px);
      margin-left: 10px;
      margin-top: 10px;
      display: inline-block;
    }
  }

  .meta {
    p {
      display: inline;
    }
  }

  .column {
    width: 33.33%;
    float: left;

    @include screen-size("small") {
      width: 100%;
      margin-bottom: 10px;
    }

    // &.first {
    //   width: 50%;
    // }

    // &.second {
    //   width: 25%;
    // }
    &.last {
      // width: 25%;

      // text-align: right;
    }
    p {
      max-width: 40ch;
    }
  }
</style>

<footer>
  <div class="column first">
    <p>
      <strong>Paletten</strong>
      är idag en av samtidskonstens viktigaste tidskrifter. Ambition är att
      kritiskt diskutera och presentera konsten och dess förutsättningar i vår
      tid. Paletten fokuserar på konsten politiska villkor och funktioner i
      dagens samhälle.
    </p>
  </div>
  <div class="column second">
    Paletten
    <br />
    Östra Sänkverksgatan 2
    <br />
    413 27 Göteborg
    <br />
    <br />
    © Paletten 2017
  </div>
  <div class="column last">
    <div class="menu-item">Artiklar</div>
    <div class="menu-item">Projekt</div>
    <div class="menu-item">Tidskrift</div>
    <div class="menu-item">Om Paletten</div>
    <div class="menu-item">Prenumeration</div>
    <div class="menu-item">Kontakt</div>
    <div class="menu-item">Sök</div>
  </div>
</footer>
