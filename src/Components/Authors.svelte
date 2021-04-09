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
    display: inline-block;

    a {
      color: inherit;
      text-decoration: none;
      margin-right: 0;
      display: inline;

      &:hover {
        color: $darkgrey;
      }
    }

    .divider {
      margin-left: -6px;
      margin-right: 6px;
    }
  }
</style>

<span class="authors">
  {#each authors as author, index}
    <a href={'/medverkande/' + get(author, 'slug.current', '')}>
      {author.title}{#if index == authors.length - 2}&nbsp;&amp;{:else if index < authors.length - 1}&#44;&nbsp;{/if}
    </a>
  {/each}
</span>
