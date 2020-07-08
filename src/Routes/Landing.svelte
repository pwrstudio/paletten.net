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

  .contact {
    background: $thirdColor;
    margin: 0;
    padding: 10px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 10;
  }

  .landing {
    font-size: $large;
    background: $firstColor;
    margin: 0;
    padding: 10px;
    padding-top: 1em;
    padding-bottom: 2em;
    min-height: 100vh;

    @include screen-size("small") {
      font-size: $mobile_large;
      padding-top: 1.5em;
    }
  }
</style>

<div class="landing">
  {#await posts then posts}
    {#each posts as p}
      <div>
        <a href={'/artikel/' + p.slug.current}>{p.title}</a>
      </div>
    {/each}
  {/await}
</div>
