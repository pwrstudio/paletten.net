<script>
  // # # # # # # # # # # # # #
  //
  //  ToC Item
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { links } from 'svelte-routing'
  import { loadData } from '../sanity.js'

  // COMPONENTS
  import Authors from './Authors.svelte'

  // *** PROPS
  export let post = {}

  let query = ''
  let link = ''
  let postContent = {}

  if (post._type == 'postLink') {
    query = "*[_id == '" + post._ref + "']{..., author[]->{title, slug}}[0]"
    postContent = loadData(query)
  } else if (post._type == 'artikel') {
    let params = { authorRefs: post.author.map((a) => a._ref) }
    query = '*[_id in $authorRefs]{..., author[]->{title, slug}}'
    postContent = loadData(query, params)
  }
</script>

<style lang="scss">
  @import '../variables.scss';

  .toc-item {
    margin-bottom: 1em;
    color: inherit;
    text-decoration: none;
    line-height: $line-height;
    font-size: $font_size_normal;
    max-width: 50ch;

    .title {
      font-weight: bold;
      margin: 0;
      padding: 0;

      @include screen-size('small') {
        font-size: $font_size_large_phone;
      }
    }

    .authors {
      pointer-events: none;
    }
  }

  a {
    color: inherit;
    text-decoration: none;
    &:hover {
      color: $darkgrey;
    }
  }
</style>

{#await postContent then postContent}
  <div class="toc-item" use:links>
    {#if post._type === 'artikel'}
      <div class="authors">
        <Authors authors={postContent} />
      </div>
      <div class="title">{post.title}</div>
    {:else if post._type === 'postLink'}
      <a href={'/artiklar/' + postContent.slug.current}>
        <div class="authors">
          <Authors authors={postContent.author} />
        </div>
        <div class="title">{postContent.title}</div>
      </a>
    {/if}
  </div>

{/await}
