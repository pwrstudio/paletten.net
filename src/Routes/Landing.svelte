<script>
  // # # # # # # # # # # # # #
  //
  //  LANDING
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { onMount } from "svelte";
  import { fade, slide } from "svelte/transition";
  import { urlFor, loadData, renderBlockText } from "../sanity.js";
  import { format } from "date-fns";

  // COMPONENTS
  // import ListingItem from "../Components/ListingItem.svelte";

  // STORES
  import { location, filterTerm } from "../stores.js";
  location.set("index");

  // *** PROPS
  export let term = "";

  // ** CONSTANTS
  const query = "*[_type ==  'post']";

  // VARIABLES
  let posts = loadData(query);
  // let filteredPosts = [];

  posts.then(posts => {
    console.dir(posts);
  });

  // $: {
  //   posts.then(posts => {
  //     filterTerm.set(term);
  //     filteredPosts = [];
  //     window.scrollTo({ top: 0 });
  //     setTimeout(() => {
  //       filteredPosts = term ? posts.filter(p => p.category === term) : posts;
  //     }, 200);
  //   });
  // }
</script>

<style lang="scss">
  @import "../variables.scss";

  .list-item {
    // background: red;
    display: flex;
    width: 100%;
    margin-bottom: 20px;
    text-decoration: none;
    font-size: $font_size_normal;

    @include screen-size("small") {
      flex-wrap: wrap;
    }

    .image {
      width: 66.66%;
      max-height: 400px;

      // background: green;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      @include screen-size("small") {
        width: 100%;
      }
    }

    .text {
      width: 33.333%;
      padding-right: 20px;
      text-decoration: none;
      color: black;

      @include screen-size("small") {
        width: 100%;
      }

      .title {
        font-size: $font_size_large;
        line-height: 0.9em;
        margin-bottom: 10px;
        font-weight: bold;

        @include screen-size("small") {
          font-size: $font_size_large_phone;
        }
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
    }
  }

  .landing {
    margin: 0;
    padding: 20px;
    padding-top: calc(#{$menu_bar_height} + 20px);
    // padding-top: $menu_bar_height;
    min-height: 100vh;

    @include screen-size("small") {
      padding: 10px;
      padding-top: calc(#{$menu_bar_height} + 10px);
    }
  }
</style>

<div class="landing">
  {#await posts then posts}
    {#each posts as p}
      <a href={'/artikel/' + p.slug.current} class="list-item">
        <div class="text">
          <div class="date">
            {format(new Date(p.publicationDate), 'yyyy-MM-dd')}
          </div>
          <div class="author">{p.author}</div>
          <div class="title">{p.title}</div>
        </div>
        {#if p.mainImage && p.mainImage.asset}
          <div class="image">
            <img
              alt={p.title}
              src={urlFor(p.mainImage.asset)
                .width(600)
                .quality(100)
                .auto('format')
                .url()} />
          </div>
        {/if}
      </a>
    {/each}
  {/await}
</div>
