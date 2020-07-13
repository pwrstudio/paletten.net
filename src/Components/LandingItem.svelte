<script>
  // # # # # # # # # # # # # #
  //
  //  LANDING
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { onMount } from "svelte";
  import { fade, slide } from "svelte/transition";
  import { urlFor, loadData, renderBlockText } from "../sanity.js";
  import { formattedDate } from "../global.js";
  import _ from "lodash";

  // STORES
  //   import { location, filterTerm } from "../stores.js";
  //   location.set("index");

  // *** PROPS
  export let post = {};

  // console.dir(post);

  let query = "";

  if (post.postLink) {
    query = "*[_id == '" + post.postLink._ref + "']{..., author[]->{title}}[0]";
  } else {
    query = "*[_id == '" + post._id + "']{..., author[]->{title}}[0]";
  }

  if (!post.layout) {
    post.layout = "full";
  }

  if (!post.imageLayout) {
    post.imageLayout = "proportional";
  }

  //   VARIABLES
  let postContent = loadData(query);
  //   // let filteredPosts = [];

  postContent.then(l => {
    console.dir(l);
  });

  // $: {
  //   posts.then(posts => {
  //     filterTerm.set(term);
  //     filteredPosts = [];
  //     window.scrollTo({ top: 0 });
  //     setTimeout(() => {
  //       filteredPosts = term ? posts.filter(p => post.category === term) : posts;
  //     }, 200);
  //   });
  // }
</script>

<style lang="scss">
  @import "../variables.scss";

  .list-item,
  .placeholder {
    // background: red;
    display: flex;
    margin-bottom: 20px;
    text-decoration: none;
    font-size: $font_size_normal;
    margin-left: 20px;

    @include screen-size("small") {
      flex-wrap: wrap;
      margin-left: 10px;
    }

    .image {
      width: 50%;

      &.fullbleed {
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      &.proportional {
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          max-width: calc(100% - 40px);
          max-height: calc(100% - 40px);
        }
      }

      // background: green;

      @include screen-size("small") {
        width: 100%;
      }
    }

    .text {
      width: 50%;
      padding-right: 20px;
      text-decoration: none;
      color: black;

      @include screen-size("small") {
        width: 100%;
      }

      .title {
        font-size: $font_size_normal;
        line-height: 0.9em;
        margin-bottom: 10px;
        font-weight: bold;

        @include screen-size("small") {
          font-size: $font_size_large_phone;
        }
      }

      .author {
        font-size: $font_size_normal;
        line-height: 0.9em;
        margin-bottom: 10px;
        font-style: italic;
      }

      .date {
        font-size: $font_size_small;
        font-family: Helvetica, Arial, sans-serif;
        margin-bottom: 10px;
        padding-left: 2px;
        // text-decoration: underline;
        letter-spacing: 0.1em;
      }
    }

    &.full {
      width: 100%;
      width: calc(100% - 20px);
      height: 300px;

      @include screen-size("small") {
        width: 100%;
        height: auto;
      }
    }

    &.half {
      width: 50%;
      // width: calc(50% - 20px);
      //       width: calc(100% - 20px);

      // height: 300px;
      width: calc(100% - 20px);
      height: 300px;

      @include screen-size("small") {
        width: 100%;
        height: auto;
      }
    }

    &.third {
      // width: calc(33.3333% - 20px);
      // height: 400px;
      width: calc(100% - 20px);
      height: 300px;

      flex-wrap: wrap;
      overflow: hidden;
      display: block;

      @include screen-size("small") {
        width: 100%;
        height: auto;
      }

      .text {
        width: 100%;
        height: 140px;
        .title {
          font-size: $font_size_normal;
        }
      }

      .image {
        width: 100%;
        height: 260px;
      }
    }

    &.padded {
      .text {
        padding: 10px;
      }
    }
  }

  .placeholder {
    background: rgba(240, 240, 240, 1);
  }
</style>

{#await postContent}
  <div
    class="placeholder"
    class:full={post.layout == 'full'}
    class:half={post.layout == 'half'}
    class:third={post.layout == 'third'} />
{:then postContent}
  <a
    href={'/artikel/' + postContent.slug.current}
    class="list-item"
    in:fade
    style={'background: ' + (post.totalColor ? _.get(post, 'color.hex', 'transparent') : 'transparent')}
    class:full={post.layout == 'full'}
    class:half={post.layout == 'half'}
    class:third={post.layout == 'third'}
    class:padded={post.totalColor}>
    <div class="text">
      <!-- DATE -->
      {#if postContent.publicationDate}
        <div class="date">{formattedDate(postContent.publicationDate)}</div>
      {/if}
      <!-- AUTHOR -->
      {#if postContent.author && postContent.author[0]}
        <div class="author">{postContent.author[0].title}</div>
      {/if}
      <!-- TITLE -->
      <div class="title">{postContent.title}</div>
    </div>
    <!-- IMAGE -->
    {#if post.imageLayout != 'noImage' && postContent.mainImage && postContent.mainImage.asset}
      <div
        class="image"
        style={'background: ' + _.get(post, 'color.hex', 'transparent')}
        class:fullbleed={post.imageLayout == 'fullBleed'}
        class:proportional={post.imageLayout == 'proportional'}>
        <img
          alt={postContent.title}
          src={urlFor(postContent.mainImage.asset)
            .width(800)
            .quality(90)
            .auto('format')
            .url()} />
      </div>
    {/if}
  </a>
{/await}
