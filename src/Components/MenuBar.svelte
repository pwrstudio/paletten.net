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
  import Flickity from "flickity";

  // STORES
  import { menuBarText, location, filterTerm } from "../stores.js";

  // COMPONENTS
  import Logo from "./Logo.svelte";
  import Hamburger from "./Hamburger.svelte";
  import Close from "./Close.svelte";

  // DOM REFERENCES
  // let menuContainer = {};
  // let filterContainer = {};
  // let timeContainer = {};

  // VARIABLES
  let menuOpen = false;
  // let titleActive = true;
  // let menuActive = false;
  // let filterActive = false;
  // let timeActive = false;
  // let searchActive = false;
  // let aboutActive = false;

  // let menuSlide = {};
  // let filterSlide = {};
  // let timeSlide = {};

  // // CONSTANTS
  // const filterCategories = [
  //   {
  //     title: "SOLO",
  //     name: "solo-show"
  //   },
  //   {
  //     title: "GROUP",
  //     name: "group-show"
  //   },
  //   {
  //     title: "PERFORMANCE",
  //     name: "performance"
  //   },
  //   {
  //     title: "TALK",
  //     name: "talk"
  //   },
  //   {
  //     title: "WORKSHOP",
  //     name: "workshop"
  //   },
  //   {
  //     title: "ONLINE",
  //     name: "online"
  //   },
  //   {
  //     title: "EVENT",
  //     name: "event"
  //   },
  //   {
  //     title: "PRESS",
  //     name: "press"
  //   },
  //   {
  //     title: "RESIDENCY",
  //     name: "residency"
  //   }
  // ];
  // const yearList = ["2021", "2020", "2019", "2018", "2017", "2016", "2015"];
  // const sliderSettings = {
  //   freeScroll: true,
  //   prevNextButtons: false,
  //   pageDots: false,
  //   cellAlign: "left",
  //   contain: true,
  //   freeScrollFriction: 0.045
  // };

  // $: {
  //   if ($location == "single") {
  //     setTimeout(() => {
  //       menuSlide.resize();
  //       // filterSlide.resize();
  //       // timeSlide.resize();
  //     }, 500);
  //   }
  // }

  // // // *** ON MOUNT
  // onMount(async () => {
  //   menuSlide = new Flickity(menuContainer, sliderSettings);
  //   filterSlide = new Flickity(filterContainer, sliderSettings);
  //   timeSlide = new Flickity(timeContainer, sliderSettings);

  //   console.dir(menuSlide);

  //   if ($filterTerm) {
  //     titleActive = false;
  //     menuActive = false;
  //     filterActive = true;
  //     filterSlide.select(
  //       filterCategories.findIndex(f => f.name === $filterTerm)
  //     );
  //     filterSlide.resize();
  //   }

  //   menuSlide.on("staticClick", function(
  //     event,
  //     pointer,
  //     cellElement,
  //     cellIndex
  //   ) {
  //     menuSlide.resize();

  //     if (cellElement.dataset.link == "about") {
  //       aboutActive = true;
  //     } else if (cellElement.dataset.link == "filter") {
  //       menuActive = false;
  //       filterActive = true;
  //       filterSlide.resize();
  //     } else if (cellElement.dataset.link == "time") {
  //       menuActive = false;
  //       timeActive = true;
  //       timeSlide.resize();
  //     } else if (cellElement.dataset.link == "search") {
  //       menuActive = false;
  //       searchActive = true;
  //     }
  //   });

  //   filterSlide.on("staticClick", function(
  //     event,
  //     pointer,
  //     cellElement,
  //     cellIndex
  //   ) {
  //     if (cellElement.dataset.name == $filterTerm) {
  //       navigate("/");
  //     } else {
  //       navigate("/" + cellElement.dataset.name);
  //     }
  //   });

  //   timeSlide.on("staticClick", function(
  //     event,
  //     pointer,
  //     cellElement,
  //     cellIndex
  //   ) {
  //     const yOffset = -100;
  //     const firstOfYear = document.querySelector(
  //       ".year-" + cellElement.dataset.year
  //     );
  //     if (firstOfYear) {
  //       const y =
  //         firstOfYear.getBoundingClientRect().top +
  //         window.pageYOffset +
  //         yOffset;
  //       window.scrollTo({ top: y, behavior: "smooth" });
  //     }
  //   });
  // });
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
  }

  .search {
    input {
      height: 0.85em;
      font-family: $serif-stack;
      font-size: $large;
      font-weight: 600;
      line-height: 0.95em;
      background: transparent;
      border: 0;
      border-radius: 0;
      border-bottom: 8px solid black;
      outline: 0;
      text-transform: uppercase;
    }
  }

  .logo {
    height: calc(#{$menu_bar_height} - 20px);
    margin-left: 20px;
    margin-top: 10px;
    display: inline-block;

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
    margin-top: 10px;

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
      font-weight: bold;
      text-align: right;
      padding-right: 15px;
      color: black;
      text-decoration: none;
      display: block;

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
  <a href="/" class="logo">
    <Logo />
  </a>

  <div
    class="hamburger"
    on:click={e => {
      menuOpen = !menuOpen;
    }}>
    {#if menuOpen}
      <Close />
    {:else}
      <Hamburger />
    {/if}
  </div>

</div>

{#if menuOpen}
  <div
    class="menu"
    use:links
    on:click={e => {
      menuOpen = false;
    }}>
    <a href="/artiklar" class="menu-item">Artiklar</a>
    <a href="/tidskrift" class="menu-item">Tidskrift</a>
    <a href="/projekt" class="menu-item">Projekt</a>
    <a href="/artikel/xxx" class="menu-item">Om Paletten</a>
    <a href="/artikel/xxx" class="menu-item">Prenumeration</a>
    <a href="/artikel/xxx" class="menu-item">Kontakt</a>
    <a href="/artikel/xxx" class="menu-item">Sök</a>
  </div>
{/if}
