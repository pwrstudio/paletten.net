<script>
  // # # # # # # # # # # # # #
  //
  //  SINGLE: MEDVERKANDE
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
  import { links } from 'svelte-routing'

  // *** PROPS
  export let slug = ''

  // COMPONENTS
  import Footer from '../../Components/Footer.svelte'
  import Authors from '../../Components/Authors.svelte'
  import ImageBlock from '../../Components/Blocks/ImageBlock.svelte'
  import VideoBlock from '../../Components/Blocks/VideoBlock.svelte'
  import AudioBlock from '../../Components/Blocks/AudioBlock.svelte'
  import EmbedBlock from '../../Components/Blocks/EmbedBlock.svelte'
  import ListItem from '../../Components/ListItem.svelte'

  // ** CONSTANTS
  const query = "*[_type == 'medverkande' && slug.current == $slug][0]"
  const params = { slug: slug }

  let post = loadData(query, params)
  let footnotePosts = []

  let linkedPosts = []

  post.then((post) => {
    let fetchLinked = loadData("*[_type == 'post' && author[]._ref == $id]", {
      id: post._id,
    })

    fetchLinked.then((f) => {
      linkedPosts = f
    })

    // let a = flatMap(
    //   post.content.content.filter(c => c._type == "block").map(x => x.markDefs)
    // );

    // footnotePosts = a.filter(x => x._type === "footnote");

    // console.dir(footnotePosts);
  })
</script>

<style lang="scss">
  @import '../../variables.scss';

  .medverkande {
    font-size: $font_size_normal;
    font-family: $serif-stack;
    padding-bottom: $line-height * 2;
    width: calc(100% - #{$margin * 2});
    overflow-x: hidden;
    margin-left: $margin;
    margin-right: $margin;
    padding-top: calc(#{$menu_bar_height} + #{$line-height});
    border-bottom: 1px solid $grey;
    margin-bottom: $line-height * 2;

    @include screen-size('small') {
      width: calc(100% - #{$phone-margin * 2});
      margin-left: $phone-margin;
      margin-right: $phone-margin;
    }

    h1 {
      font-size: $font_size_large;
      font-weight: bold;
      margin: 0;
      padding: 0;

      @include screen-size('small') {
        font-size: $font_size_large_phone;
      }
    }
  }

  .meta {
    margin-bottom: 2rem;
    width: $text_width;
    max-width: 100%;
  }

  .author {
    font-size: $font_size_normal;
    line-height: 1.1em;
    margin-bottom: 10px;
    font-style: italic;
  }

  .ingress {
    font-style: italic;
  }

  .date {
    font-size: $font_size_small;
    font-family: $sans-stack;
    margin-bottom: 10px;
    padding-left: 2px;
    letter-spacing: 0.1em;
  }

  .linked {
    margin-top: $line-height;
    margin-left: $margin;
    margin-right: $margin;

    @include screen-size('small') {
      margin-top: 0;
      margin-left: $phone-margin;
      margin-right: $phone-margin;
    }
  }

  .column {
    padding-top: calc(#{$menu_bar_height} + #{$line-height});
    width: calc(50% - #{$margin});
    float: left;

    border-bottom: 1px solid $grey;

    &.first {
      margin-right: $margin;
    }

    @include screen-size('small') {
      width: calc(100% - #{$phone-margin * 2});
    }
  }
</style>

{#await post then post}
  <div class="medverkande">

    <div class="about">
      <div class="meta">
        <!-- TITLE -->
        <h1 class="title">{post.title}</h1>
      </div>

      <!-- MAIN CONTENT -->
      {#if post.content}
        <div class="bio">
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
      {/if}
    </div>

    <!-- {#await linkedPosts then linkedPosts} -->
  </div>

  <div class="linked" use:links>
    {#each linkedPosts as linked}
      <ListItem post={linked} />
    {/each}
  </div>
  <!-- {/await} -->

  <Footer />

{/await}
