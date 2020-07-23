<script>
  // # # # # # # # # # # # # #
  //
  //  SINGLE: MEDVERKANDE
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { onMount } from "svelte";
  import { fade, slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { urlFor, loadData, renderBlockText } from "../../sanity.js";
  import { formattedDate } from "../../global.js";
  import get from "lodash/get";
  import flatMap from "lodash/flatMap";
  import { links } from "svelte-routing";

  // *** PROPS
  export let slug = "";

  // COMPONENTS
  import Footer from "../../Components/Footer.svelte";
  import Authors from "../../Components/Authors.svelte";
  import ImageBlock from "../../Components/Blocks/ImageBlock.svelte";
  import VideoBlock from "../../Components/Blocks/VideoBlock.svelte";
  import AudioBlock from "../../Components/Blocks/AudioBlock.svelte";
  import EmbedBlock from "../../Components/Blocks/EmbedBlock.svelte";
  import LandingItem from "../../Components/LandingItem.svelte";

  // STORES
  import { location, menuBarText } from "../../stores.js";
  location.set("single");

  // ** CONSTANTS
  const query = "*[_type == 'medverkande' && slug.current == $slug][0]";
  const params = { slug: slug };

  let post = loadData(query, params);
  let footnotePosts = [];

  let linkedPosts = [];

  post.then(post => {
    let fetchLinked = loadData("*[_type == 'post' && author[]._ref == $id]", {
      id: post._id
    });

    fetchLinked.then(f => {
      linkedPosts = f;
    });

    // let a = flatMap(
    //   post.content.content.filter(c => c._type == "block").map(x => x.markDefs)
    // );

    // footnotePosts = a.filter(x => x._type === "footnote");

    // console.dir(footnotePosts);
  });
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
    min-height: 60vh;

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
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 2rem;
    width: $text_width;
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
</style>

{#await post then post}
  <div class="single">

    <div class="meta">
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
    {/if}

  </div>
  <!-- {#await linkedPosts then linkedPosts} -->
  <div class="linked" use:links>
    {#each linkedPosts as linked}
      <LandingItem post={linked} />
    {/each}
  </div>

  <!-- {/await} -->

  <Footer />

{/await}
