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
    width: 100vw;
    z-index: 1000;
    background: white;
    overflow: hidden;
    user-select: none;
    border-bottom: 1px solid #e4e4e4;
    font-size: $font_size_normal;
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
      font-size: $font_size_large;
      line-height: 1.4em;
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
    height: calc(#{$menu_bar_height} - 25px);
    margin-left: 20px;
    margin-top: 6px;
    display: inline-block;
    font-family: $sans-stack;
    color: inherit;
    text-decoration: none;
    font-weight: 900;

    @include screen-size("small") {
      margin-left: 10px;
    }
  }

  .hamburger {
    cursor: pointer;
    float: right;
    height: calc(#{$menu_bar_height} - 20px);
    // height: $menu_bar_height;
    margin-right: 20px;
    margin-top: 6px;
    font-family: $sans-stack;
    color: inherit;
    text-decoration: none;
    font-weight: 900;

    @include screen-size("small") {
      margin-right: 10px;
    }
  }

  .menu {
    position: fixed;
    top: 0;
    left: 0;
    // height: 500px;
    width: 100vw;
    height: 100vh;
    z-index: 100;
    background: white;
    overflow: hidden;
    user-select: none;
    padding-top: calc(#{$menu_bar_height} + 20px);
    // padding-bottom: 20px;

    .menu-item {
      font-size: $font_size_large;
      line-height: 1.4em;
      font-weight: bold;
      text-align: right;
      padding-right: 15px;
      color: black;
      text-decoration: none;
      display: block;
      cursor: pointer;

      &:hover {
        color: $half-grey;
      }

      &:active {
        color: $full-grey;
      }

      @include screen-size("small") {
        font-size: $font_size_large_phone;
      }
    }
  }
</style>

<div class="bar" use:links>
  <!-- Logo -->
  <a
    href="/"
    class="logo"
    on:click={e => {
      menuOpen = false;
      searchActive = false;
      searchInputValue = '';
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

</div>

{#if menuOpen}
  <div
    class="menu"
    use:links
    in:fade={{ duration: 200 }}
    on:click={e => {
      menuOpen = false;
      searchActive = false;
      searchInputValue = '';
    }}>
    <a href="/artiklar" class="menu-item">Artiklar</a>
    <a href="/tidskrift" class="menu-item">Tidskrift</a>
    <a href="/projekt" class="menu-item">Projekt</a>
    <a href="/om-paletten" class="menu-item">Om Paletten</a>
    <a href="/prenumerationer" class="menu-item">Prenumerationer</a>
    <a href="/kontakt" class="menu-item">Kontakt</a>
    {#if !searchActive}
      <div
        class="menu-item"
        on:click={e => {
          searchActive = true;
          e.stopPropagation();
        }}>
        Sök
      </div>
    {/if}

    <div
      class="search"
      class:active={searchActive}
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
    </div>

  </div>
{/if}
