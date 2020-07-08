<script>
  // # # # # # # # # # # # # #
  //
  //  ARTIKEL
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { onMount } from "svelte";
  import { fade, slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { urlFor, loadData, renderBlockText } from "../sanity.js";
  import { format, getYear, formatDistanceToNow } from "date-fns";

  // *** PROPS
  export let slug = "";

  // COMPONENTS

  // STORES
  import { location, menuBarText } from "../stores.js";
  location.set("single");

  // ** CONSTANTS
  const query = "*[slug.current == $slug][0]";

  let post = loadData(query, { slug: slug });

  post.then(post => {
    console.dir(post);
  });

  // menuBarText.set(false);

  // FUNCTIONS
  // const formattedDate = (start, end) => {
  //   if (!start) {
  //     return false;
  //   }

  //   const startDate = Date.parse(start);

  //   if (!end) {
  //     return format(startDate, "dd.MM.yyyy");
  //   }

  //   const endDate = Date.parse(end);

  //   if (format(startDate, "dd.MM.yyyy") == format(endDate, "dd.MM.yyyy")) {
  //     return format(startDate, "dd.MM.yyyy");
  //   }

  //   const startFormat =
  //     getYear(startDate) == getYear(endDate) ? "dd.MM" : "dd.MM.yyyy";
  //   const endFormat = "dd.MM.yyyy";

  //   return format(startDate, startFormat) + " – " + format(endDate, endFormat);
  // };

  // post.then(p => {
  //   console.dir(p);
  // });

  // // *** ON MOUNT
  // onMount(async () => {
  //   window.scrollTo(0, 0);
  //   setTimeout(() => {
  //     bannerActive = true;
  //   }, 3000);
  // });
</script>

<style lang="scss">
  @import "../variables.scss";

  .single {
    font-size: 18px;
    background: $thirdColor;
    font-family: "Janson Text LT Std";
    margin: 0;
    padding: 5px;
    width: 100vw;
    overflow-x: hidden;
    padding-top: calc(1em + 10px);

    @include screen-size("small") {
      font-size: $mobile_large;
    }
  }

  .meta {
    font-size: 16px;
    line-height: 1em;
    text-transform: uppercase;
    margin-bottom: $large-vertical-margin;
    margin-top: $small-vertical-margin;
    line-height: 1em;
    // max-width: 90%;
    font-family: "Janson Text LT Std";
    margin-left: $small-margin;
    opacity: 1;

    @include screen-size("small") {
      font-size: $mobile_large;
      margin-top: 0.5em;
    }

    .title {
      font-weight: 600;
    }

    // @include screen-size("small") {
    //   font-size: $mobile_xlarge;
    //   margin-bottom: $large-vertical-margin;
    //   overflow: hidden;
    // }

    transition: opacity $transition;
  }

  .description {
    font-size: $mid;
    font-weight: 500;
    line-height: 1em;
    text-transform: uppercase;
    margin-bottom: $large-vertical-margin;
    margin-top: $small-vertical-margin;
    line-height: 1em;
    max-width: 90%;
    font-family: "Janson Text LT Std";
    opacity: 1;
    max-width: 90%;

    @include screen-size("small") {
      font-size: $mobile_large;
    }
  }

  .caption {
    font-size: $small;
    font-weight: 500;
    line-height: 1em;
    text-transform: uppercase;
    margin-bottom: $large-vertical-margin;
    margin-top: $small-vertical-margin;
    line-height: 1em;
    max-width: 90%;
    font-family: "Janson Text LT Std";
    opacity: 1;
    max-width: 90%;
    letter-spacing: 1px;

    transition: opacity $transition;
  }

  .content {
    width: 70ch;
    max-width: 90%;
    margin-left: auto;
    margin-right: auto;
    font-family: "Janson Text LT Std";
  }

  .content-item {
    font-size: $xlarge;
    font-weight: 600;
    line-height: 1em;
    // background: $thirdColor;
    margin-bottom: 0.5em;

    img {
      // margin-left: auto;
      // margin-right: auto;
      display: block;
      width: 100%;
      max-height: 100vh;
      object-fit: contain;
    }
  }
</style>

{#await post then post}

  <div class="single">

    <!-- TITLE -->

    <div class="meta">
      <span class="title">{post.title},</span>
      <!-- {#if formattedDate(post.startDate, post.endDate)}
        <span class="date">{formattedDate(post.startDate, post.endDate)},</span>
      {/if}
      {#if post.location}
        <span class="location">{post.location}</span>
        ,
      {/if}
      {#if post.description}
        {@html renderBlockText(post.description)}
      {/if} -->
    </div>

    <!-- DESCRIPTION -->
    <!-- <div class="description" /> -->

    <!-- MAIN CONTENT -->
    <div class="content">
      {#if post.ingress}
        <div>
          {@html renderBlockText(post.ingress.content)}
        </div>
      {/if}
      {#if post.content}
        <div>
          {@html renderBlockText(post.content.content)}
        </div>
      {/if}
    </div>

  </div>

{/await}
