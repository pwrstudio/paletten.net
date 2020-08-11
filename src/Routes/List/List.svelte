<script>
  // # # # # # # # # # # # # #
  //
  //  LIST
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { urlFor, loadData, renderBlockText } from '../../sanity.js'
  import { links } from 'svelte-routing'

  // COMPONENTS
  import ListItem from '../../Components/ListItem.svelte'
  import Footer from '../../Components/Footer.svelte'

  // *** PROPS
  export let category = ''
  export let term = ''

  // VARIABLES
  let cat = ''
  let query = ''

  if (category === 'artikel')
    query = '*[_type == "post"] | order(publicationDate desc)'
  else if (category === 'tidskrift')
    query = '*[_type == "tidskrift"] | order(publicationDate desc)'
  else if (category === 'projekt')
    query = '*[_type == "projekt"] | order(publicationDate desc)'
  else if (category === 'search')
    query = '*[[title, content.content[].children[].text] match "' + term + '"]'
  else if (category === 'taxonomy') query = '*["' + term + '" in tags]'

  // VARIABLES
  let posts = loadData(query)

  // posts.then((l) => {
  //   console.dir(l)
  // })
</script>

<style lang="scss">
  @import '../../variables.scss';

  .list {
    padding-top: calc(#{$menu_bar_height} + #{$line_height});
    min-height: 100vh;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;

    margin-left: $margin;
    margin-right: $margin;

    @include screen-size('small') {
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
