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
  import { formattedDate } from "../global.js";

  // *** PROPS
  export let slug = "";

  // COMPONENTS
  import Footer from "../Components/Footer.svelte";

  // STORES
  import { location, menuBarText } from "../stores.js";
  location.set("single");

  // ** CONSTANTS
  const query = "*[slug.current == $slug]{..., author[]->{title}}[0]";
  const params = { slug: slug };
  // const query = "*[]";

  let post = loadData(query, params);

  // let fP = [];

  post.then(post => {
    console.dir(post);
    // fP = post.map(p => {
    //   return { file: p.originalFilename, id: p._id };
    // });
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
    font-size: $font_size_normal;
    font-family: $serif-stack;
    margin: 0;
    padding: 20px;
    width: 100vw;
    overflow-x: hidden;

    padding-top: calc(#{$menu_bar_height} + 20px);

    @include screen-size("small") {
      padding: 10px;
      padding-top: calc(#{$menu_bar_height} + 20px);
    }

    h1 {
      font-size: $font_size_large;
      line-height: 0.9em;
      font-weight: 600;
      margin: 0;
      padding: 0;

      @include screen-size("small") {
        font-size: $font_size_large_phone;
      }
    }
  }

  .meta {
    margin-bottom: 40px;
  }

  .caption {
    font-size: $font_size_small;
  }

  .inner-wrapper {
    width: 60ch;
    max-width: calc(100% - 20px);
  }

  .author {
    font-size: $font_size_normal;
    line-height: 0.9em;
    margin-bottom: 10px;
    font-style: italic;
  }

  .date {
    font-size: $font_size_small;
    font-family: Helvetica, Arial, sans-serif;
    margin-bottom: 10px;
    padding-left: 2px;
    // text-decoration: underline;
    letter-spacing: 0.1em;
  }
</style>

{#await post then post}
  <div class="single">

    <div class="inner-wrapper">

      <div class="meta">
        <div class="date">{formattedDate(post.publicationDate)}</div>
        <!-- AUTHOR -->
        {#if post.author && post.author[0]}
          <div class="author">{post.author[0].title}</div>
        {/if}
        <!-- TITLE -->
        <h1 class="title">{post.title}</h1>
      </div>

      <!-- INGRESS -->
      {#if post.ingress && post.ingress.content}
        <div class="ingress">
          <div>
            {@html renderBlockText(post.ingress.content)}
          </div>
        </div>
      {/if}

      <!-- MAIN CONTENT -->
      {#if post.content}
        <div class="content">
          <div>
            {@html renderBlockText(post.content.content)}
          </div>
        </div>
      {/if}

    </div>

  </div>

  <Footer />

{/await}
