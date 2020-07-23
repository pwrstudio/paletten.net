<script>
  // # # # # # # # # # # # # #
  //
  //  SINGLE: PROJEKT
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { onMount } from "svelte";
  import { urlFor, loadData, renderBlockText } from "../../sanity.js";
  import { formattedDate } from "../../global.js";
  import get from "lodash/get";

  // *** PROPS
  export let slug = "";

  // COMPONENTS
  import ToCItem from "../../Components/ToCItem.svelte";
  import Footer from "../../Components/Footer.svelte";
  import ImageBlock from "../../Components/Blocks/ImageBlock.svelte";
  import VideoBlock from "../../Components/Blocks/VideoBlock.svelte";
  import AudioBlock from "../../Components/Blocks/AudioBlock.svelte";
  import EmbedBlock from "../../Components/Blocks/EmbedBlock.svelte";

  // STORES
  import { location, menuBarText } from "../../stores.js";
  location.set("single");

  // ** CONSTANTS
  const query = "*[_type == 'projekt' && slug.current == $slug][0]";
  const params = { slug: slug };

  let post = loadData(query, params);

  // post.then(post => {
  //   console.dir(post);
  // });
</script>

<style lang="scss">
  @import "../../variables.scss";

  .single {
    font-size: $font_size_normal;
    font-family: $serif-stack;
    margin: 0;
    padding-top: 20px;
    padding-bottom: 20px;
    width: 100vw;
    overflow-x: hidden;

    padding-top: calc(#{$menu_bar_height} + 20px);

    @include screen-size("small") {
      padding: 10px;
      padding-top: calc(#{$menu_bar_height} + 20px);
    }

    h1 {
      font-size: $font_size_large;
      line-height: 1.1em;
      font-weight: normal;
      margin: 0;
      padding: 0;
      // text-transform: uppercase;

      @include screen-size("small") {
        font-size: $font_size_large_phone;
      }
    }
  }

  .meta {
    margin-left: 20px;
    margin-right: auto;
    margin-bottom: 2rem;
    // width: $text_width;
    max-width: calc(100% - 20px);
  }

  .author {
    font-size: $font_size_normal;
    // font-size: $font_size_large;
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
    // text-decoration: underline;
    letter-spacing: 0.1em;
  }

  .column-left {
    width: 50vw;
    float: left;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 60px;

    @include screen-size("small") {
      width: 100vw;
    }
  }

  .column-right {
    width: 50vw;
    float: right;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 60px;

    @include screen-size("small") {
      width: 100vw;
    }
  }

  .cover {
    width: 200px;
  }

  .toc {
    .toc-header {
      text-transform: uppercase;
      font-weight: bold;
      margin-bottom: 1em;
      letter-spacing: 0.05em;
      font-size: 0.6em;
    }
  }
</style>

{#await post then post}
  <div class="single">

    <div class="meta">
      <div class="date">{formattedDate(post.publicationDate)}</div>
      <!-- TITLE -->
      <h1 class="title">{post.title}</h1>
    </div>

    <div class="column-left">

      <!-- {#if post.mainImage}
        <img
          alt={post.title}
          class="cover"
          src={urlFor(post.mainImage.asset)
            .width(400)
            .quality(90)
            .auto('format')
            .url()} />
      {/if} -->

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

    <div class="column-right">

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

  <Footer />

{/await}
