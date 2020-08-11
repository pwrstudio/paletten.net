<script>
  // # # # # # # # # # # # # #
  //
  //  AUTHORS
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import get from 'lodash/get'

  // *** PROPS
  export let authors = {}
</script>

<style lang="scss">
  @import '../variables.scss';

  .authors {
    font-style: italic;

    a {
      color: inherit;
      text-decoration: none;

      &:hover {
        color: $darkgrey;
      }
    }
  }
</style>

<span class="authors">
  {#each authors as author, index}
    <a href={'/medverkande/' + get(author, 'slug.current', '')}>
      {author.title}
    </a>
    <!-- {index} {authors.length} -->
    {#if index == authors.length - 2}
      &nbsp;&amp;&nbsp;
    {:else if index < authors.length - 1},&nbsp{/if}
  {/each}
</span>
