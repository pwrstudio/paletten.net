<script>
  // # # # # # # # # # # # # #
  //
  //  LIST: PROJEKT
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
  const query = "*[_type == 'projekt'] | order(publicationDate desc)";

  // VARIABLES
  let posts = loadData(query);

  // posts.then(l => {
  //   console.dir(l);
  // });
</script>

<style lang="scss">
  @import "../../variables.scss";

  .projekt {
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
</style>

{#await posts then posts}

  <div class="projekt" use:links>
    <div class="column first" use:links>
      {#each posts as post}
        <LandingItem {post} />
      {/each}
    </div>

    <div class="column second" use:links>
      {#each posts as post}
        <LandingItem {post} />
      {/each}
    </div>

    <div class="column third" use:links>
      {#each posts as post}
        <LandingItem {post} />
      {/each}
    </div>

  </div>

{/await}
