<script>
  // # # # # # # # # # # # # #
  //
  //  FOOTER
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  // import _ from "lodash";
  // import "intersection-observer";
  import { links } from "svelte-routing";
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
    line-height: $line-height;
    overflow: hidden;
    user-select: none;
    padding-left: $margin;
    padding-right: $margin;
    padding-top: $line-height;
    padding-bottom: $line-height * 4;
    font-weight: normal;
    margin-top: $line-height;

    @include screen-size("small") {
      padding-left: $phone-margin;
      padding-right: $phone-margin;
      padding-bottom: $line-height * 2;
    }

    font-size: $font_size_small;
    font-family: $sans-stack;
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


  .column {
    width: calc(33.3333% - 28px);
    float: left;

    &.second {
      margin-left: $margin;
    }
    &.third {
      margin-left: $margin;
    }

    p {
      max-width: 40ch;
    }

    @include screen-size("small") {
      width: 100%;
      // text-align: center;

      // p {
      //   display:block;
      //   margin-left: auto;
      //   margin-right: auto;
      // }

      &.second {
        margin-left: 0;
      }
      &.third {
        margin-left: 0;
        display: none;
      }
    }
  }

  .menu-item {
    display: block;
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

  <div class="column third" use:links>
    <a href='/artiklar' class="menu-item">Artiklar</a>
    <a href='/projekt' class="menu-item">Projekt</a>
    <a href='/tidskrift' class="menu-item">Tidskrift</a>
    <a href='/om-paletten' class="menu-item">Om Paletten</a>
    <a href='/prenumeratio' class="menu-item">Prenumeration</a>
    <a href='/kontakt'  class="menu-item">Kontakt</a>
  </div>

</footer>
