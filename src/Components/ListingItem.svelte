<script>
  // # # # # # # # # # # # # #
  //
  //  LISTING ITEM
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import { onMount } from "svelte";
  import { links } from "svelte-routing";
  import { format, getYear, formatDistanceToNow } from "date-fns";
  import { urlFor } from "../sanity.js";
  import sample from "lodash/sample";
  import { fade } from "svelte/transition";

  // *** PROPS
  export let p = {};
  export let index = 0;

  // STORES
  import { menuBarText } from "../stores.js";

  // DOM REFS
  let sentinel = {};
  let imgEl = {};

  // CONSTANTS
  const leftPositions = ["5%", "10%", "15%", "20%", "30%", "35%", "40%"];
  const rightPositions = [
    "5%",
    "10%",
    "15%",
    "20%",
    "30%",
    "35%",
    "40%",
    "45%",
    "50%"
  ];

  const topPositions = ["0%", "5%", "10%", "15%", "20%"];
  const widthList = ["150px", "200px", "250px", "300px", "350px"];

  // FUNCTIONS
  const formattedDate = (start, end) => {
    if (!start) {
      return false;
    }

    const startDate = Date.parse(start);

    if (!end) {
      return format(startDate, "dd.MM.yyyy");
    }

    const endDate = Date.parse(end);

    if (format(startDate, "dd.MM.yyyy") == format(endDate, "dd.MM.yyyy")) {
      return format(startDate, "dd.MM.yyyy");
    }

    const startFormat =
      getYear(startDate) == getYear(endDate) ? "dd.MM" : "dd.MM.yyyy";
    const endFormat = "dd.MM.yyyy";

    return format(startDate, startFormat) + " – " + format(endDate, endFormat);
  };

  const yearClass = d => {
    const parsedDate = Date.parse(d);
    return "year-" + getYear(parsedDate);
  };

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          menuBarText.set(format(Date.parse(p.startDate), "yyyy"));
          // menuBarText.set(getYear(Date.parse(p.startDate)));
          window.setTimeout(() => {
            menuBarText.set(false);
          }, 5000);
        }
      });
    },
    { threshold: 0.5 }
  );

  // // *** ON MOUNT
  onMount(async () => {
    observer.observe(sentinel);
    // imgEl.top = sample(topPositions);
    // imgEl.left = sample(leftPositions);
  });
</script>

<style lang="scss">
  @import "../variables.scss";

  .link {
    font-family: "Janson Text LT Std";
    font-size: $large;
    line-height: 0.9em;
    margin-top: 0.4em;
    text-transform: uppercase;
    user-select: none;
    // margin-left: 10px;
    // margin-right: 10px;
    // width: calc(100% - 20px);
    width: 100%;
    display: inline-block;
    position: relative;

    @include screen-size("small") {
      font-size: $mobile_large;
    }

    a {
      color: black;
      text-decoration: none;

      &:hover {
        color: $secondColor;
      }
    }

    &.external {
      a:hover {
        color: $thirdColor;
      }
    }

    .title {
      font-weight: 600;
    }

    img {
      position: absolute;
      // max-height: 100%;
      margin-left: 10px;
      pointer-events: none;
      opacity: 1;
      transition: opacity 0.5s $transition;
      z-index: 100;
      // transition-delay: 1s;

      @include screen-size("small") {
        // max-width: 200px;
        display: none;
      }
    }

    &:hover {
      img {
        // transition-delay: 0s;
        opacity: 0;
      }
    }
  }
</style>

<!-- on:mouseenter={e => {
        console.log(formattedDate(p.startDate, p.endDate));
        menuBarText.set(formattedDate(p.startDate, p.endDate));
      }}
      on:mouseleave={e => {
        menuBarText.set(false);
      }} -->

<div
  class="link {p.category}
  {yearClass(p.startDate)}"
  in:fade={{ duration: 500, delay: 100 * index }}
  class:external={p.external}
  bind:this={sentinel}
  use:links>
  {#if p.external}
    <a href={p.externalLink} target="_blank">
      <span class="title">{p.title},</span>
      {#if formattedDate(p.startDate, p.endDate)}
        <span class="date">{formattedDate(p.startDate, p.endDate)},</span>
      {/if}
      {#if p.location}
        <span class="location">{p.location}</span>
      {/if}
    </a>
  {:else}
    <a href={'/post/' + p.slug.current}>
      {#if p.content && p.content[0]}
        <img
          in:fade={{ duration: 500, delay: 200 * index }}
          width={sample(widthList)}
          style="top:{sample(topPositions)}; right:{sample(rightPositions)};"
          alt={p.title}
          bind:this={imgEl}
          src={urlFor(p.content[0].asset)
            .width(400)
            .quality(100)
            .auto('format')
            .url()} />
      {/if}
      <span class="title">{p.title},</span>
      {#if formattedDate(p.startDate, p.endDate)}
        <span class="date">{formattedDate(p.startDate, p.endDate)},</span>
      {/if}
      {#if p.location}
        <span class="location">{p.location}</span>
      {/if}
    </a>
  {/if}
</div>
