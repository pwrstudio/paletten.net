<script>
  // # # # # # # # # # # # # #
  //
  //  LANDING
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import "simplebar"
  import { loadData, renderBlockText } from "../sanity.js"
  import { links } from "svelte-routing"

  // COMPONENTS
  import LandingItem from "../Components/LandingItem.svelte"
  import Footer from "../Components/Footer.svelte"

  // STORES
  // import { location, filterTerm } from "../stores.js";
  // location.set("index");

  // *** PROPS
  // export let term = "";

  // *** CONSTANTS
  const query = "*[_id == 'landingpage'][0]"

  // *** VARIABLES
  let landingPage = loadData(query)
  // let filteredPosts = [];

  // landingPage.then((l) => {
  //   console.dir(l)
  // })

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
    padding-top: calc(#{$menu_bar_height} + #{$line_height});
    min-height: 100vh;
    display: flex;
    flex-wrap: wrap;

    margin-right: $margin;
    margin-left: $margin;

    @include screen-size("small") {
      margin-right: $phone-margin;
      margin-left: $phone-margin;
    }
  }

  .column {
    width: calc(33.3333% - 28px);
    float: left;

    &.first {
    }
    &.second {
      margin-left: $margin;
    }
    &.third {
      margin-left: $margin;
    }

    @include screen-size("small") {
      width: 100%;

      &.second {
        margin-left: 0;
      }
      &.third {
        margin-left: 0;
      }
    }
  }

  .header {
    line-height: $line_height;
    height: $line_height;
    text-transform: uppercase;
    font-weight: bold;
    margin-bottom: $line_height;

    letter-spacing: 0.2em;
    font-size: 0.7em;
    border-bottom: 1px solid $grey;
  }
</style>

{#await landingPage then landingPage}
  <div class="landing" use:links>
    <div class="column first">
      {#each landingPage.first as post}
        {#if post._type == 'landingItem'}
          <LandingItem {post} />
        {/if}
        {#if post._type == 'headerItem'}
          <div class="header">{post.text}</div>
        {/if}
      {/each}
    </div>

    <div class="column second">
      {#each landingPage.second as post}
        {#if post._type == 'landingItem'}
          <LandingItem {post} />
        {/if}
        {#if post._type == 'headerItem'}
          <div class="header">{post.text}</div>
        {/if}
      {/each}
    </div>

    <div class="column third">
      {#each landingPage.third as post}
        {#if post._type == 'landingItem'}
          <LandingItem {post} />
        {/if}
        {#if post._type == 'headerItem'}
          <div class="header">{post.text}</div>
        {/if}
      {/each}
    </div>
  </div>

  <Footer />
{/await}
