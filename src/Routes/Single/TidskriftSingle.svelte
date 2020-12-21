<script>
  // # # # # # # # # # # # # #
  //
  //  SINGLE: TIDSKIFT
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { urlFor, loadData, renderBlockText } from "../../sanity.js";
  import { fade } from "svelte/transition";

  // *** PROPS
  export let slug = "";

  // STORES
  import { currentPost } from "../../stores.js";

  // *** COMPONENTS
  import ToCItem from "../../Components/ToCItem.svelte";
  import Footer from "../../Components/Footer.svelte";
  import ImageBlock from "../../Components/Blocks/ImageBlock.svelte";
  import VideoBlock from "../../Components/Blocks/VideoBlock.svelte";
  import AudioBlock from "../../Components/Blocks/AudioBlock.svelte";
  import EmbedBlock from "../../Components/Blocks/EmbedBlock.svelte";

  // *** CONSTANTS
  const query = "*[_type == 'tidskrift' && slug.current == $slug][0]";
  const params = { slug: slug };

  // *** VARIABLES
  let post = loadData(query, params);

  post.then((post) => {
    currentPost.set(post);
  });
</script>

<style lang="scss">
  @import "../../variables.scss";

  .tidskrift {
    font-size: $font_size_normal;
    font-family: $serif-stack;
    margin: 0;
    padding-bottom: $line-height;
    width: calc(100% - #{$margin} * 2);
    overflow-x: hidden;
    min-height: calc(100vh - #{$menu_bar_height});

    margin-left: $margin;
    margin-right: $margin;

    padding-top: calc(#{$menu_bar_height} + #{$line-height});

    @include screen-size("small") {
      width: calc(100% - #{$phone-margin * 2});
      margin-left: $phone-margin;
      margin-right: $phone-margin;
    }
  }

  .ingress {
    font-style: italic;
  }

  .title {
    font-size: $font_size_normal;
    line-height: $line-height;
    // margin-bottom: $line-height;
    font-weight: bold;
    max-width: 45ch;

    @include screen-size("small") {
      font-size: $font_size_large_phone;
    }
  }

  .author {
    font-size: $font_size_normal;
    line-height: $line-height;
    // margin-bottom: $margin / 6;
    font-style: italic;
    pointer-events: none;
  }

  .date {
    font-size: $font_size_small;
    font-family: $sans-stack;
    letter-spacing: 0.1em;
  }

  .column {
    width: calc(50% - #{$margin});
    float: left;

    // padding-top: calc(#{$menu_bar_height} + #{$line-height});
    width: calc(50% - #{$margin});
    float: left;

    @include screen-size("small") {
      width: 100%;
    }
  }

  .cover {
    width: 200px;
    margin-bottom: $line-height;
  }

  .toc {
    .toc-header {
      text-transform: uppercase;
      font-weight: bold;
      margin-bottom: 1em;
      letter-spacing: 0.2em;
      font-size: 0.7em;
    }
  }

  .buy {
    margin-bottom: 1em;
    line-height: $line-height;
    overflow: hidden;
    user-select: none;
    display: inline-block;
    // padding: $line-height / 2;
    font-weight: normal;
    font-size: $font_size_small;
    font-family: $sans-stack;
    letter-spacing: 0.1em;
    padding-left: 10px;
    padding-right: 10px;
    color: black;
    border: 1px solid black;

    &:hover {
      color: $darkgrey;
      border: 1px solid $darkgrey;
    }
  }

  .text {
    max-width: 60ch;
  }
</style>

{#await post then post}
  <div class="tidskrift">
    <div class="column" in:fade>
      <div class="meta">
        {#if post.tidsPeriod}
          <div class="date">{post.tidsPeriod}</div>
        {/if}
        <!-- TITLE -->
        <h1 class="title">{post.title}</h1>
      </div>

      <!-- KÖP ENKELNUMMER -->
      <div class="buy"><a href="/enkelnummer">Köp enkelnummer</a></div>

      <!--ToC-->
      {#if post.posts}
        <div class="toc">
          <div class="toc-header">Innehåll</div>
          {#each post.posts as p}
            <ToCItem post={p} />
          {/each}
        </div>
      {/if}
    </div>

    <div class="column" in:fade={{ delay: 300 }}>
      {#if post.mainImage}
        <img
          alt={post.title}
          class="cover"
          src={urlFor(post.mainImage.asset)
            .width(400)
            .quality(90)
            .auto('format')
            .url()} />
      {/if}

      <div class="text">
        <!-- MAIN CONTENT -->
        {#if post.content}
          <div>
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
    </div>
  </div>

  <Footer />
{/await}
