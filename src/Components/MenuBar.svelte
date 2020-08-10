<script>
  // # # # # # # # # # # # # #
  //
  //  MENUBAR
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  // import "intersection-observer";
  import { navigate } from "svelte-routing";
  import { onMount } from "svelte";
  import { links } from "svelte-routing";
  import { fade } from "svelte/transition";
  import _ from "lodash";
  // import Flickity from "flickity";

  // STORES
  import { menuBarText, location, filterTerm } from "../stores.js";

  // COMPONENTS
  import Logo from "./Graphics/Logo.svelte";
  import Hamburger from "./Graphics/Hamburger.svelte";
  import Close from "./Graphics/Close.svelte";

  $: {
    if (searchActive == true && searchInputElement) {
      searchInputElement.focus();
    }
  }

  // DOM REFERENCES
  let searchInputElement = {};

  // VARIABLES
  let menuOpen = false;
  let searchActive = false;
  let searchInputValue = "";
</script>

<style lang="scss">
  @import "../variables.scss";

  .bar {
    position: fixed;
    top: 0;
    left: 0;
    height: $menu_bar_height;
    line-height: $line-height;
    width: 100vw;
    z-index: 1000;
    background: white;
    overflow: hidden;
    user-select: none;
    border-bottom: 1px solid #e4e4e4;
    opacity: 1;
    font-size: 28px;
    font-size: $font_size_normal;

    transition: height 0.3s ease-out;

    &.open {
      height: 440px;
    }
  }

  .search {
    input {
      height: 1.2em;
      font-family: $serif-stack;
      // font-size: $large;
      // font-weight: 600;
      // line-height: 0.95em;
      background: transparent;
      border: 0;
      border-radius: 0;
      background: $grey;
      // border-bottom: 8px solid black;
      outline: 0;
      // font-size: $font_size_large;
      line-height: $line-height;
      font-weight: bold;
      text-align: right;
      padding-right: 5px;
      margin-right: 10px;
      color: black;
      text-decoration: none;
      display: block;
      float: right;
    }
    opacity: 0;

    &.active {
      opacity: 1;
    }
  }

  .logo {
    margin-top: $line-height;
    // height: calc(#{$menu_bar_height} - 25px);
    margin-left: $margin;
    display: inline-block;
    font-family: $logo-stack;
    color: inherit;
    text-decoration: none;
    font-weight: 900;
    letter-spacing: 0.05em;

    @include screen-size("small") {
      margin-left: 10px;
    }
    &:hover {
      color: $half-grey;
    }

    &:active {
      color: $full-grey;
    }
  }

  .hamburger {
    cursor: pointer;
    float: right;
    height: calc(#{$menu_bar_height} - 20px);
    // height: $menu_bar_height;
    margin-right: $margin;
    padding-top: $line-height;
    font-family: $logo-stack;
    color: inherit;
    text-decoration: none;
    font-weight: 900;
    letter-spacing: 0.05em;

    @include screen-size("small") {
      margin-right: 10px;
    }

    &:hover {
      color: $half-grey;
    }

    &:active {
      color: $full-grey;
    }
  }

  .menu {
    display: inline-block;
    // position: fixed;
    // top: 0;
    // left: 0;
    // height: 500px;
    width: 100%;
    padding-right: $margin;
    padding-left: $margin;
    font-size: 16px;
    // letter-spacing: 0.05em;
    // height: 100vh;
    z-index: 100;
    background: white;
    overflow: hidden;
    user-select: none;
    padding-top: $line-height;
    // padding-bottom: 20px;
    letter-spacing: 0.05em;
    // font-size: 32px;
    line-height: $line-height;

    .column {
      width: calc(33.3333% - 28px);
      width: 100%;

      // background: yellow;

      float: right;
      margin-bottom: $line-height;
      // margin-right: $margin;

      // height: 100vh;
      overflow-y: auto;
      position: relative;

      @include screen-size("small") {
        height: auto;
        width: calc(100% - 20px);
        margin-left: 10px;
      }

      // &.first {
      // }
      // &.second {
      //   margin-left: $margin;
      // }
      // &.third {
      //   margin-left: $margin;
      // }
    }

    &.open {
      height: auto;
      border-bottom: 1px solid #e4e4e4;
    }
    .menu-item {
      // font-size: $font_size_large;
      font-family: $serif-stack;
      // font-weight: bold;
      text-align: left;
      color: black;
      text-decoration: none;
      display: block;
      cursor: pointer;
      text-align: right;
      text-transform: uppercase;
      // margin-bottom: 8px;

      a {
        &:hover {
          color: $half-grey;
        }

        &:active {
          color: $full-grey;
        }
      }

      &.search {
        text-align: right;
      }

      // @include screen-size("small") {
      //   font-size: $font_size_large_phone;
      // }
    }
  }
</style>

<div class="bar" use:links class:open={menuOpen}>
  <!-- Logo -->
  <a
    href="/"
    class="logo"
    on:click={e => {
      menuOpen = false;
      searchActive = false;
      searchInputValue = '';
      navigate('/');
    }}>
    PALETTEN
    <!-- <Logo /> -->
  </a>

  <div
    class="hamburger"
    on:click={e => {
      menuOpen = !menuOpen;
      searchActive = false;
      searchInputValue = '';
    }}>
    {#if menuOpen}
      STÄNG
      <!-- <Close /> -->
    {:else}
      MENY
      <!-- <Hamburger /> -->
    {/if}
  </div>

  <div
    class="menu"
    use:links
    on:click={e => {
      menuOpen = false;
      searchActive = false;
      searchInputValue = '';
    }}>

    <div class="column second">
      <div class="menu-item">
        <a href="/artiklar">Artiklar</a>
      </div>
      <div class="menu-item">
        <a href="/tidskrift">Tidskrift</a>
      </div>
      <div class="menu-item">
        <a href="/projekt">Projekt</a>
      </div>
    </div>
    <div class="column first">
      <div class="menu-item">
        <a href="/om-paletten">Om Paletten</a>
      </div>
      <div class="menu-item">
        <a href="/prenumerationer">Prenumerationer</a>
      </div>
      <div class="menu-item">
        <a href="/kontakt">Kontakt</a>
      </div>
    </div>
    <div class="column third">
      <!-- {#if !searchActive} -->
      <div
        class="menu-item"
        on:click={e => {
          searchActive = true;
          e.stopPropagation();
        }}>
        <!-- <div
          class="search"
          class:active={true}
          on:click={e => {
            searchActive = true;
            e.stopPropagation();
          }}>
          <input
            bind:this={searchInputElement}
            bind:value={searchInputValue}
            on:keyup={e => {
              if (e.keyCode === 13) {
                navigate('/search/' + searchInputValue);
                searchActive = false;
                searchInputValue = '';
                menuOpen = false;
              }
            }} />
        </div> -->
        Sök
      </div>

      <!-- {/if} -->
    </div>

  </div>

</div>

<!-- {#if menuOpen} -->

<!-- {/if} -->
