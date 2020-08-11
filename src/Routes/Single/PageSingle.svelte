<script>
  // # # # # # # # # # # # # #
  //
  //  SINGLE: PAGE
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { onMount } from 'svelte'
  import { fade, slide } from 'svelte/transition'
  import { quintOut } from 'svelte/easing'
  import { urlFor, loadData, renderBlockText } from '../../sanity.js'
  import { formattedDate } from '../../global.js'
  import get from 'lodash/get'
  import flatMap from 'lodash/flatMap'

  // *** PROPS
  export let slug = ''

  // COMPONENTS
  import Footer from '../../Components/Footer.svelte'
  import Authors from '../../Components/Authors.svelte'
  import ImageBlock from '../../Components/Blocks/ImageBlock.svelte'
  import VideoBlock from '../../Components/Blocks/VideoBlock.svelte'
  import AudioBlock from '../../Components/Blocks/AudioBlock.svelte'
  import EmbedBlock from '../../Components/Blocks/EmbedBlock.svelte'

  // ** CONSTANTS
  const query = '*[_id == $slug][0]'
  const medverkandeQuery = "*[_type == 'medverkande'] | order(title asc)"

  let params = { slug: slug }
  let footnotePosts = []
  let oldSlug = slug
  let post = loadData(query, params)
  let medverkande = loadData(medverkandeQuery)

  let mArray = []

  post.then((post) => {
    let a = flatMap(
      post.content.content
        .filter((c) => c._type == 'block')
        .map((x) => x.markDefs)
    )
    footnotePosts = a.filter((x) => x._type === 'footnote')
  })

  medverkande.then((medverkande) => {
    // console.dir(medverkande)
    mArray = medverkande
  })

  $: {
    if (slug !== oldSlug) {
      oldSlug = slug
      params = { slug: slug }
      post = loadData(query, params)

      post.then((post) => {
        let a = flatMap(
          post.content.content
            .filter((c) => c._type == 'block')
            .map((x) => x.markDefs)
        )

        footnotePosts = a.filter((x) => x._type === 'footnote')
      })
    }
  }
</script>

<style lang="scss">
  @import '../../variables.scss';

  .page {
    font-size: $font_size_normal;
    font-family: $serif-stack;
    padding-bottom: $line-height * 2;
    width: calc(100% - #{$margin * 2});
    overflow-x: hidden;
    margin-left: $margin;
    margin-right: $margin;

    @include screen-size('small') {
      width: calc(100% - #{$phone-margin * 2});
      margin-left: $phone-margin;
      margin-right: $phone-margin;
    }

    .meta {
      margin-bottom: $line-height * 2;
      margin-left: auto;
      margin-right: auto;
      width: 600px;
      max-width: 100%;

      .authors {
        font-size: $font_size_large;
        line-height: $line-height;
        margin-bottom: $line-height / 2;
        font-style: italic;
      }

      .date {
        font-size: $font_size_small;
        font-family: $sans-stack;
        margin-bottom: $line-height / 2;
        padding-left: 2px;
        letter-spacing: 0.1em;
      }

      .title {
        font-size: $font_size_large;
        line-height: $line-height;
        font-weight: normal;
        margin: 0;
        padding: 0;
        font-weight: bold;
      }
    }

    .column {
      padding-top: calc(#{$menu_bar_height} + #{$line-height});
      width: calc(50% - #{$margin});
      float: left;

      &.first {
        margin-right: $margin;
      }

      @include screen-size('small') {
        width: calc(100% - #{$phone-margin * 2});
      }
    }
  }
</style>

{#await post then post}
  <div class="page">

    <div class="column first">
      <div class="meta">
        <!-- <div class="date">{formattedDate(post.publicationDate)}</div> -->
        <!-- AUTHOR -->
        {#if post.author}
          <Authors authors={post.author} />
        {/if}
        <!-- TITLE -->
        <h1 class="title">{post.title}</h1>
      </div>

      <!-- MAIN CONTENT -->
      {#if post.content}
        <div class="content">
          {#each post.content.content as block}
            {#if block._type === 'block'}
              {@html renderBlockText(block)}
            {/if}
            {#if block._type === 'image'}
              <ImageBlock {block} />
            {/if}
            {#if block._type === 'videoBlock'}
              <VideoBlock {block} />
            {/if}
            {#if block._type === 'audioBlock'}
              <AudioBlock {block} />
            {/if}
            {#if block._type === 'embedBlock'}
              <EmbedBlock {block} />
            {/if}
          {/each}

        </div>

        <div class="footnotes">
          <ol>
            {#each footnotePosts as footnote}
              <li id={'note-' + footnote._key}>
                {@html renderBlockText(footnote.content.content)}
                <a href={'#link-' + footnote._key} class="back-link">↳</a>
              </li>
            {/each}
          </ol>
        </div>
      {/if}

    </div>

    {#if slug == 'om-paletten'}
      <div class="column">

        <div class="meta">
          <h1 class="title">Medverkande</h1>
        </div>

        <div class="content">
          {#each mArray as m, i}
            <a href={'/medverkande/' + get(m, 'slug.current', '')}>{m.title}</a>
            {#if i < mArray.length - 1},&nbsp;{/if}
          {/each}
        </div>

      </div>
    {/if}

  </div>

  <Footer />

{/await}
