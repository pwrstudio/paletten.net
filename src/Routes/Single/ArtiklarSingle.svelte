<script>
  // # # # # # # # # # # # # #
  //
  //  SINGLE: ARTIKEL
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { onMount } from "svelte";
  import { fade, slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { urlFor, loadData, renderBlockText } from "../../sanity.js";
  import { formattedDate } from "../../global.js";
  import get from "lodash/get";
  import isArray from "lodash/isArray";
  import flatMap from "lodash/flatMap";
  import slugify from "slugify";

  // *** PROPS
  export let slug = "";

  // COMPONENTS
  import Footer from "../../Components/Footer.svelte";
  import Authors from "../../Components/Authors.svelte";
  import ImageBlock from "../../Components/Blocks/ImageBlock.svelte";
  import VideoBlock from "../../Components/Blocks/VideoBlock.svelte";
  import AudioBlock from "../../Components/Blocks/AudioBlock.svelte";
  import EmbedBlock from "../../Components/Blocks/EmbedBlock.svelte";

  // STORES
  import { location, menuBarText } from "../../stores.js";
  location.set("single");

  // ** CONSTANTS
  const query = "*[slug.current == $slug]{..., author[]->{title, slug}}[0]";
  const params = { slug: slug };

  let post = loadData(query, params);
  let footnotePosts = [];

  post.then(post => {
    let a = flatMap(
      post.content.content.filter(c => c._type == "block").map(x => x.markDefs)
    );

    footnotePosts = a.filter(x => x._type === "footnote");
  });
</script>

<style lang="scss">
  @import "../../variables.scss";

  .single {
    font-size: $font_size_normal;
    font-family: $serif-stack;
    margin: 0;
    padding-bottom: 20px;
    width: 100vw;
    overflow-x: hidden;
    margin-left: $margin;
    margin-right: $margin;

    padding-top: calc(#{$menu_bar_height} + 10px);

    @include screen-size("small") {
      padding: 10px;
      padding-top: calc(#{$menu_bar_height} + 10px);
    }

    h1 {
      font-size: $font_size_large;
      line-height: 1.1em;
      font-weight: normal;
      margin: 0;
      padding: 0;
      font-weight: bold;
      // text-transform: uppercase;

      @include screen-size("small") {
        font-size: $font_size_large_phone;
      }
    }
  }

  .meta {
    margin-bottom: $margin;
    // width: $text_width;
    max-width: calc(100% - 20px);
  }

  .authors {
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
    margin-bottom: 6px;
    padding-left: 2px;
    letter-spacing: 0.1em;
  }
</style>

{#await post then post}
  <div class="single">

    <div class="meta">
      {#if post.publicationDate}
        <div class="date">– {formattedDate(post.publicationDate)}</div>
      {/if}
      <!-- AUTHOR -->
      {#if post.author}
        <div class="authors">
          <Authors authors={post.author} />
        </div>
      {/if}
      <!-- TITLE -->
      <h1 class="title">{post.title}</h1>
    </div>

    <!-- MAIN CONTENT -->
    {#if post.content && post.content.content && isArray(post.content.content)}
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
      <!-- FOOTNOTES -->
      <div class="footnotes">
        <ol>
          {#each footnotePosts as footnote}
            <li id={'note-' + footnote._key}>
              {#if isArray(get(footnote, 'content.content', false))}
                {@html renderBlockText(footnote.content.content)}
              {/if}
              <a href={'#link-' + footnote._key} class="back-link">↳</a>
            </li>
          {/each}
        </ol>
      </div>

      <!-- TAGS -->
      {#if post.tags}
        <div class="tags">
          {#each post.tags as tag}
            <div>
              <a
                href={'/taxonomy/' + slugify(tag, {
                    replacement: '-',
                    lower: true,
                    strict: true
                  })}>
                {tag}
              </a>
            </div>
          {/each}
        </div>
      {/if}
    {/if}

  </div>

  <Footer />

{/await}
