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

  // DOM REFERENCES
  // let menuContainer = {};
  // let filterContainer = {};
  // let timeContainer = {};

  // VARIABLES
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

  .close {
    background: $secondColor;
    position: fixed;
    z-index: 1000;
    padding-left: 0px;
    padding-right: 10px;
    font-weight: 600;
    right: 0;
    top: 0;
    height: 1em;
    width: 60px;
    box-shadow: -30px -5px 10px $secondColor;

    &:hover {
      color: $thirdColor;
      cursor: pointer;
    }

    &:active {
      color: white;
    }
  }

  .about {
    font-size: $large;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 10000;
    background: #ff4500;
    font-family: "Janson Text LT Std";
    font-size: $large;
    font-weight: 500;
    line-height: 0.95em;
    padding-left: 10px;
    overflow: hidden;
    display: none;
    overflow-y: auto;

    &.active {
      display: block;
    }

    @include screen-size("small") {
      font-size: $mobile_large;
    }
  }

  .bar {
    font-size: $large;
    position: fixed;
    top: 0;
    left: 0;
    height: 1em;
    width: 100vw;
    z-index: 1000;
    background: $secondColor;
    font-family: "Janson Text LT Std";
    font-size: $large;
    font-weight: 600;
    line-height: 0.95em;
    overflow: hidden;
    user-select: none;

    @include screen-size("small") {
      font-size: $mobile_large;
      height: 1.5em;
      line-height: 1.5em;
    }

    .title {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      display: block;
      opacity: 0;
      pointer-events: none;
      padding-left: 10px;
      white-space: nowrap;

      &.active {
        opacity: 1;
        pointer-events: all;
        overflow-x: scroll;
      }

      // .inner {
      //   &:hover {
      //     color: $thirdColor;
      //     cursor: pointer;
      //   }
      //   &:active {
      //     color: white;
      //   }
      // }
    }

    .menu {
      position: fixed;
      top: 0;
      left: 0;
      display: block;
      opacity: 0;
      pointer-events: none;
      width: 100vw;
      padding-left: 10px;
      height: 1em;

      &.active {
        opacity: 1;
        pointer-events: all;
      }
    }

    .filter,
    .timeline,
    .search {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      display: block;
      opacity: 0;
      padding-left: 10px;
      pointer-events: none;

      &.active {
        opacity: 1;
        pointer-events: all;
      }
    }

    .menu-item {
      margin-right: 15px;
      color: inherit;
      text-decoration: none;
      // background: yellow;

      &:hover {
        color: $thirdColor;
        cursor: pointer;
      }

      &.selected {
        color: white;
      }

      &:active {
        color: white;
      }
    }
  }

  .search {
    input {
      height: 0.85em;
      font-family: "Janson Text LT Std";
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

  .slider {
    width: calc(100vw - 80px);
    // background: green;
  }
</style>

<div class="bar" use:links>
  <!-- TITLE -->
  <div class="title active">
    <span class="inner">PALETTEN</span>
  </div>
</div>
