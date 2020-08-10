<script>
  // # # # # # # # # # # # # #
  //
  //  FOOTER
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  // import _ from "lodash";
  // import "intersection-observer";
  // import { navigate } from "svelte-routing";
  // import { onMount } from "svelte";
  // import { links } from "svelte-routing";
  // import { fade } from "svelte/transition";
  // import Flickity from "flickity";

  // // STORES
  // import { menuBarText, location, filterTerm } from "../stores.js";

  // COMPONENTS
</script>

<style lang="scss">
  @import "../variables.scss";

  footer {
    width: 100vw;
    background: #f4f4f4;
    font-family: $serif-stack;
    line-height: $line-height;
    overflow: hidden;
    user-select: none;
    padding-left: $margin;
    padding-right: $margin;
    padding-top: $line-height;
    padding-bottom: $line-height * 5;
    font-weight: normal;
    margin-top: $line-height;

    @include screen-size("small") {
      padding: 10px;
    }

    font-size: $font_size_small;
    font-family: $sans-stack;

    // text-decoration: underline;
    letter-spacing: 0.1em;

    .logo {
      display: inline-block;
    }
  }

  .meta {
    p {
      display: inline;
    }
  }

  // .column {
  //   width: 33.33%;
  //   float: left;

  //   @include screen-size("small") {
  //     width: 100%;
  //     margin-bottom: 10px;
  //   }

  //   // &.first {
  //   //   width: 50%;
  //   // }

  //   // &.second {
  //   //   width: 25%;
  //   // }
  //   &.last {
  //     // width: 25%;

  //     // text-align: right;
  //   }
  //   p {
  //     max-width: 40ch;
  //   }
  // }

  .column {
    width: calc(33.3333% - 28px);
    // width: calc(50% - 24px);

    // background: yellow;

    float: left;
    // height: 100vh;
    // overflow-y: auto;

    // @include screen-size("small") {
    //   height: auto;
    //   width: calc(100% - 20px);
    //   margin-left: 10px;
    // }

    &.first {
    }
    &.second {
      margin-left: $margin;
    }
    &.third {
      margin-left: $margin;
    }

    p {
      max-width: 60ch;
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
    <div class="menu-item">Artiklar</div>
    <div class="menu-item">Projekt</div>
    <div class="menu-item">Tidskrift</div>
    <div class="menu-item">Om Paletten</div>
    <div class="menu-item">Prenumeration</div>
    <div class="menu-item">Kontakt</div>
    <div class="menu-item">Sök</div>
  </div>
  <div class="column third">
    Paletten
    <br />
    Östra Sänkverksgatan 2
    <br />
    413 27 Göteborg
    <br />
    <br />
    © Paletten 2017
  </div>

</footer>
