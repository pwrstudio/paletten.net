<script>
  // # # # # # # # # # # # # #
  //
  //  LIST
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { loadData } from "../../sanity.js"
  import { links } from "svelte-routing"
  // import startCase from "lodash/startCase"

  // COMPONENTS
  import ListItem from "../../Components/ListItem.svelte"
  import Footer from "../../Components/Footer.svelte"

  // *** PROPS
  export let category = ""
  export let term = ""

  // STORES
  import { currentPost } from "../../stores.js"

  // VARIABLES
  let query = ""
  let title = ""

  if (category === "artikel") {
    query = '*[_type == "post"] | order(publicationDate desc)'
    title = "Artiklar"
  } else if (category === "tidskrift") {
    query = '*[_type == "tidskrift"] | order(publicationDate desc)'
    title = "Tidskrift"
  } else if (category === "projekt") {
    query = '*[_type == "projekt"] | order(publicationDate desc)'
    title = "Projekt"
  } else if (category === "search") {
    query = '*[[title, content.content[].children[].text] match "' + term + '"]'
    title = "Sök: " + term
  } else if (category === "taxonomy") {
    query = '*["' + term + '" in tags]'
    title = "Tag: " + term
  }

  // __ Fetch data
  const posts = loadData(query)

  // __ Set metadata
  currentPost.set({ title: title })
</script>

<style lang="scss">
  @import "../../variables.scss";

  .list {
    padding-top: calc(#{$menu_bar_height} + #{$line_height});
    min-height: 100vh;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;

    margin-left: $margin;
    margin-right: $margin;

    @include screen-size("small") {
      margin-left: $phone-margin;
      margin-right: $phone-margin;
    }
  }

  .header {
    border-bottom: 1px solid $grey;
    height: $line-height * 3;
    line-height: $line-height * 3;
    width: 100%;
    margin-bottom: $line-height * 2;
  }
</style>

{#await posts then posts}
  <div class="list" use:links>
    {#if category === 'search' || category === 'taxonomy'}
      <div class="header">
        <strong>{posts.length}</strong>
        resultat för “{term}”
      </div>
    {/if}
    {#each posts as post}
      <ListItem {post} {category} />
    {/each}
  </div>

  <Footer />
{/await}
