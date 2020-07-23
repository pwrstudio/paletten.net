<script>
  // # # # # # # # # # # # # #
  //
  //  LIST: TIDSKRIFT
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { urlFor, loadData, renderBlockText } from "../../sanity.js";
  import { links } from "svelte-routing";

  // COMPONENTS
  import LandingItem from "../../Components/LandingItem.svelte";
  import Footer from "../../Components/Footer.svelte";

  // STORES
  // import { location, filterTerm } from "../stores.js";
  // location.set("index");

  // *** PROPS
  // export let term = "";

  // ** CONSTANTS
  const query = "*[_type == 'tidskrift'] | order(publicationDate desc)";

  // VARIABLES
  let posts = loadData(query);

  // posts.then(l => {
  //   console.dir(l);
  // });
</script>

<style lang="scss">
  @import "../../variables.scss";

  .landing {
    margin: 0;
    // padding: 20px;
    padding-top: calc(#{$menu_bar_height} + 10px);
    // padding-top: $menu_bar_height;
    min-height: 100vh;
    display: flex;
    flex-wrap: wrap;
    // margin-right: 20px;

    @include screen-size("small") {
      // padding: 10px;
      padding-top: calc(#{$menu_bar_height} + 10px);
      margin-right: 10px;
    }
  }
</style>

{#await posts then posts}

  <div class="landing" use:links>
    {#each posts as post}
      <LandingItem {post} />
    {/each}
  </div>

  <Footer />

{/await}
