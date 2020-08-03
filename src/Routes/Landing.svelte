<script>
  // # # # # # # # # # # # # #
  //
  //  LANDING
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import "simplebar";
  import { onMount } from "svelte";
  import { fade, slide } from "svelte/transition";
  import { urlFor, loadData, renderBlockText } from "../sanity.js";
  import { links } from "svelte-routing";
  import shuffle from "lodash/shuffle";

  // COMPONENTS
  import LandingItem from "../Components/LandingItem.svelte";
  import Footer from "../Components/Footer.svelte";

  // STORES
  // import { location, filterTerm } from "../stores.js";
  // location.set("index");

  // *** PROPS
  // export let term = "";

  // ** CONSTANTS
  const query = "*[_id == 'landingpage'][0]";

  // VARIABLES
  let landingPage = loadData(query);
  // let filteredPosts = [];

  landingPage.then(l => {
    console.dir(l);
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

  .landing {
    margin: 0;

    padding-top: calc(#{$menu_bar_height} + 10px);
    // padding-top: $menu_bar_height;
    min-height: 100vh;
    display: flex;
    flex-wrap: wrap;
    margin-right: 20px;

    margin-right: 12px;
    margin-left: 12px;

    @include screen-size("small") {
      // padding: 10px;
      padding-top: calc(#{$menu_bar_height} + 10px);
      margin-right: 10px;
    }
  }

  .column {
    width: calc(33.3333% - 8px);
    // background: yellow;

    float: left;
    height: 100vh;
    overflow-y: auto;

    @include screen-size("small") {
      height: auto;
      width: calc(100% - 20px);
      margin-left: 10px;
    }

    &.first {
    }
    &.second {
      margin-left: 12px;
    }
    &.third {
      margin-left: 12px;
    }
  }

  .header {
    // background: $grey;
    padding-top: 10px;
    padding-bottom: 10px;
    line-height: 1.1em;
    text-transform: uppercase;
    font-weight: bold;
    margin-bottom: 20px;
    letter-spacing: 0.1em;
    font-size: 0.6em;
    border-bottom: 1px solid $grey;
  }
</style>

{#await landingPage then landingPage}

  <div class="landing">

    <!-- <div class="left-pane" use:links>
      {#each landingPage.posts as post}
        <LandingItem {post} />
      {/each}
    </div> -->

    <div class="column first" use:links data-simplebar>
      {#each landingPage.first as post}
        {#if post._type == 'landingItem'}
          <LandingItem {post} />
        {/if}
        {#if post._type == 'headerItem'}
          <div class="header">{post.text}</div>
        {/if}
      {/each}
    </div>

    <div class="column second" use:links data-simplebar>
      {#each landingPage.second as post}
        {#if post._type == 'landingItem'}
          <LandingItem {post} />
        {/if}
        {#if post._type == 'headerItem'}
          <div class="header">{post.text}</div>
        {/if}
      {/each}
    </div>

    <div class="column third" use:links data-simplebar>
      {#each landingPage.third as post}
        {#if post._type == 'landingItem'}
          <LandingItem {post} />
        {/if}
        {#if post._type == 'headerItem'}
          <div class="header">{post.text}</div>
        {/if}
      {/each}
    </div>

    <!-- <div class="right-pane" use:links>
      {#each landingPage.right as post}
        <LandingItem {post} />
      {/each}
    </div> -->

  </div>

  <!-- <Footer /> -->

{/await}
