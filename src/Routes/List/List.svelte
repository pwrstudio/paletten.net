<script>
  // # # # # # # # # # # # # #
  //
  //  LIST
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { urlFor, loadData, renderBlockText } from "../../sanity.js";
  import { links } from "svelte-routing";

  // COMPONENTS
  import ListItem from "../../Components/ListItem.svelte";
  import Footer from "../../Components/Footer.svelte";

  // *** PROPS
  export let category = "";

  let cat = "";

  if (category === "artikel") cat = "post";
  else if (category === "tidskrift") cat = "tidskrift";
  else if (category === "projekt") cat = "projekt";

  // ** CONSTANTS
  const query = "*[_type == $cat] | order(publicationDate desc)";

  // VARIABLES
  let posts = loadData(query, { cat: cat });

  posts.then(l => {
    console.dir(l);
  });
</script>

<style lang="scss">
  @import "../../variables.scss";

  .list {
    padding-top: calc(#{$menu_bar_height} + #{$line_height});
    min-height: 100vh;
    display: flex;
    flex-wrap: wrap;

    margin-left: $margin;
    margin-right: $margin;

    @include screen-size("small") {
      margin-left: $phone-margin;
      margin-right: $phone-margin;
    }
  }
</style>

{#await posts then posts}

  <div class="list" use:links>
    {#each posts as post}
      <ListItem {post} category={cat} />
    {/each}
  </div>

  <Footer />

{/await}
