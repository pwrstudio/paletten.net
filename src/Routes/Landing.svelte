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
  import { links } from "svelte-routing";

  // COMPONENTS
  import LandingItem from "../Components/LandingItem.svelte";
  import Footer from "../Components/Footer.svelte";

  // STORES
  // import { location, filterTerm } from "../stores.js";
  // location.set("index");

  // *** PROPS
  // export let term = "";

  // ** CONSTANTS
  const query = "*[_id == 'landingpage']{posts}[0]";

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
    // padding: 20px;
    padding-top: calc(#{$menu_bar_height} + 10px);
    // padding-top: $menu_bar_height;
    min-height: 100vh;
    display: flex;
    flex-wrap: wrap;
    margin-right: 20px;

    @include screen-size("small") {
      // padding: 10px;
      padding-top: calc(#{$menu_bar_height} + 10px);
      margin-right: 10px;
    }
  }
</style>

{#await landingPage then landingPage}

  <div class="landing" use:links>
    {#each landingPage.posts as post}
      <LandingItem {post} />
    {/each}
  </div>

  <Footer />

{/await}
