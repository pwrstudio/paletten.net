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
    height: 300px;
    width: 100vw;
    background: white;
    font-family: "Janson Text LT Std";
    line-height: 1.4em;
    overflow: hidden;
    user-select: none;
    padding: 20px;
    margin-top: 80px;
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
    }

    &.last {
      text-align: right;
    }
  }
</style>

<footer>
  <div class="column">
    Paletten
    <br />
    <br />
    Östra Sänkverksgatan 2
    <br />
    413 27 Göteborg
    <br />
    <br />
    © Paletten 2017
  </div>
  <div class="column">Paletten lorem ipsum</div>
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
