<script>
  // # # # # # # # # # # # # #
  //
  //  AUTHORS
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import get from "lodash/get"

  // *** PROPS
  export let authors = {}
</script>

<style lang="scss">
  @import "../variables.scss";

  .authors {
    font-style: italic;

    a {
      color: inherit;
      text-decoration: none;
      // background: yellow;
      margin-right: 0;
      display: inline;

      &:hover {
        color: $darkgrey;
      }
    }

    .divider {
      // background: red;
      margin-left: -6px;
      margin-right: 6px;
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
      &amp;&nbsp;
    {:else if index < authors.length - 1}<span class="divider">,</span>{/if}
  {/each}
</span>
