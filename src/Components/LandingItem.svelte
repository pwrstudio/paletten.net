<script>
  // # # # # # # # # # # # # #
  //
  //  LANDING
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { fade } from "svelte/transition";
  import { urlFor, loadData, renderBlockText } from "../sanity.js";
  import { formattedDate } from "../global.js";
  import _ from "lodash";

  // COMPONENTS
  import Authors from "./Authors.svelte";

  // STORES
  //   import { location, filterTerm } from "../stores.js";
  //   location.set("index");

  // *** PROPS
  export let post = {};

  console.log("first page post");
  console.dir(post);

  let query = "";
  let link = "";

  if (post.postLink) {
    query =
      "*[_id == '" + post.postLink._ref + "']{..., author[]->{title, slug}}[0]";
  } else {
    query = "*[_id == '" + post._id + "']{..., author[]->{title, slug}}[0]";
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

  postContent.then((l) => {
    let dir = "";
    if (l._type === "post") {
      dir = "/artiklar/";
    } else if (l._type === "tidskrift") {
      dir = "/tidskrift/";
    } else if (l._type === "projekt") {
      dir = "/projekt/";
    }
    link = dir + l.slug.current;
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
    display: flex;
    margin-bottom: $line-height;
    text-decoration: none;
    font-size: $font_size_normal;
    border-bottom: 1px solid $grey;
    flex-wrap: wrap;
    user-select: none;

    @include screen-size("small") {
      flex-wrap: wrap;
      // margin-left: 10px;
    }

    .inner {
      width: 100%;
    }

    .image {
      width: 100%;
      display: flex;
      // justify-content: center;
      // align-items: center;
      padding-bottom: $line-height;
      transition: opacity 0.3s ease-out;

      img {
        // max-width: calc(100% - 40px);
        max-width: 100%;
        height: $line-height * 12;
        object-fit: cover;
      }

      // background: green;

      @include screen-size("small") {
        width: 100%;
      }
    }

    .text {
      width: 100%;
      padding-right: 20px;
      text-decoration: none;
      color: black;

      @include screen-size("small") {
        width: 100%;
      }

      .title {
        font-size: $font_size_normal;
        line-height: $line-height;
        font-weight: bold;
        max-width: 45ch;

        @include screen-size("small") {
          font-size: $font_size_large_phone;
        }

        &.spaced {
          margin-bottom: $line-height;
        }
      }

      .author {
        font-size: $font_size_normal;
        line-height: $line-height;
        margin-bottom: $line-height;
        // margin-bottom: $margin / 6;
        // font-style: italic;
        pointer-events: none;
      }

      .date {
        font-size: $font_size_small;
        font-family: $sans-stack;
        // margin-bottom: $margin / 6;
        // padding-left: 2px;
        // text-decoration: underline;
        letter-spacing: 0.1em;
        // text-align: right;
      }
    }

    &:hover {
      .text {
        .title {
          text-decoration: underline;
        }
      }
    }

    &.padded {
      .inner {
        padding-bottom: $line-height;
        margin-bottom: $line-height;
      }
      .text {
        padding-left: $line-height;
        padding-top: $line-height;
      }
      .ingress {
        padding-left: $line-height;
        padding-right: $line-height;
        padding-top: $line-height;
      }
      .image {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          // max-width: calc(100% - 40px);
          max-width: 100%;
          height: $line-height * 16;
          object-fit: cover;
        }
      }
    }
  }

  .placeholder {
    background: rgba(240, 240, 240, 1);
  }

  .ingress {
    width: 100%;
  }
</style>

{#await postContent then postContent}
  <a
    href={link}
    class="list-item full"
    in:fade
    class:padded={_.has(post, 'color')}>
    <div
      class="inner"
      style={'background: ' + _.get(post, 'color.hex', 'transparent')}>
      <div class="text">
        <!-- DATE -->
        {#if postContent.tidsPeriod}
          <div class="date">{postContent.tidsPeriod}</div>
        {:else if postContent.publicationDate}
          <div class="date">{formattedDate(postContent.publicationDate)}</div>
        {/if}
        <!-- TITLE -->
        <div class="title" class:spaced={!postContent.author}>{postContent.title}</div>
        <!-- AUTHOR -->
        {#if postContent.author}
          <div class="author">
            <Authors authors={postContent.author} />
          </div>
        {/if}

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

      <div class="ingress">
        {#if postContent.ingress && postContent.ingress.content && Array.isArray(postContent.ingress.content)}
          {@html renderBlockText(postContent.ingress.content)}
        {/if}
      </div>
    </div>
  </a>
{/await}
