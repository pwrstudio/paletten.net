<script>
  // # # # # # # # # # # # # #
  //
  //  SINGLE: ARTIKEL
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { loadData, renderBlockText } from "../../sanity.js"
  import { formattedDate } from "../../global.js"
  import get from "lodash/get"
  import isArray from "lodash/isArray"
  import flatMap from "lodash/flatMap"
  import { fade } from "svelte/transition"

  // *** PROPS
  export let slug = ""

  // COMPONENTS
  import Footer from "../../Components/Footer.svelte"
  import Authors from "../../Components/Authors.svelte"
  import ImageBlock from "../../Components/Blocks/ImageBlock.svelte"
  import VideoBlock from "../../Components/Blocks/VideoBlock.svelte"
  import AudioBlock from "../../Components/Blocks/AudioBlock.svelte"
  import EmbedBlock from "../../Components/Blocks/EmbedBlock.svelte"

  // STORES
  import { currentPost } from "../../stores.js"

  // ** CONSTANTS
  const query =
    "*[slug.current == $slug]{..., 'projektContext': *[_type=='projekt' && references(^._id)]{ ... }, 'tidskriftContext': *[_type=='tidskrift' && references(^._id)]{ ... }, 'pdfUrl': pdfFile.asset->url, author[]->{title, slug}}[0]"
  const params = { slug: slug }

  let post = loadData(query, params)
  let footnotePosts = []

  post.then(post => {
    currentPost.set(post)
    let a = flatMap(
      post.content.content.filter(c => c._type == "block").map(x => x.markDefs)
    )
    footnotePosts = a.filter(x => x._type === "footnote")
  })
</script>

{#await post then post}
  <div class="single">
    <!-- TOPBAR -->
    <div class="top-bar">
      <!-- TIDSKRIFT -->
      {#if post.tidskriftContext && post.tidskriftContext.length > 0}
        <div>
          <a
            href={"/tidskrift/" + post.tidskriftContext[0].slug.current}
            class="publication-context"
            ><svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fill-rule="evenodd"
              clip-rule="evenodd"
              ><path
                d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z"
              /></svg
            >Publicerad i
            {post.tidskriftContext[0].title}</a
          >
        </div>
      {/if}
      <!-- PROJEKT -->
      {#if post.projektContext && post.projektContext.length > 0}
        <div>
          <a
            href={"/projekt/" + post.projektContext[0].slug.current}
            class="publication-context"
            ><svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fill-rule="evenodd"
              clip-rule="evenodd"
              ><path
                d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z"
              /></svg
            >Publicerad i
            {post.projektContext[0].title}</a
          >
        </div>
      {/if}
      <!-- PDF -->
      {#if post.pdfUrl}
        <div>
          <a href={post.pdfUrl} class="pdf-download" download target="_blank"
            ><svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fill-rule="evenodd"
              clip-rule="evenodd"
              ><path
                d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z"
              /></svg
            >{post.pdfLinkText ? post.pdfLinkText : "PDF"}</a
          >
        </div>
      {/if}
    </div>
    <!-- META -->
    <div class="meta {post.textTyp}" in:fade>
      {#if post.publicationDate}
        <div class="date">{formattedDate(post.publicationDate)}</div>
      {/if}
      <!-- TITLE -->
      <h1 class="title">{post.title}</h1>
      <!-- AUTHOR -->
      {#if post.author}
        <div class="authors">
          <Authors authors={post.author} />
        </div>
      {/if}
      <!-- PDF DOWNLOAD -->
    </div>

    <!-- MAIN CONTENT -->
    {#if post.content && post.content.content && isArray(post.content.content)}
      <div class="content {post.textTyp}" in:fade={{ delay: 300 }}>
        {#each post.content.content as block}
          {#if block._type === "block"}
            {@html renderBlockText(block)}
          {/if}
          {#if block._type === "image"}
            <ImageBlock {block} />
          {/if}
          {#if block._type === "videoBlock"}
            <VideoBlock {block} />
          {/if}
          {#if block._type === "audioBlock"}
            <AudioBlock {block} />
          {/if}
          {#if block._type === "embedBlock"}
            <EmbedBlock {block} />
          {/if}
        {/each}
      </div>
      <!-- FOOTNOTES -->
      <div class="footnotes">
        <ol>
          {#each footnotePosts as footnote}
            <li id={"note-" + footnote._key}>
              {#if isArray(get(footnote, "content.content", false))}
                {@html renderBlockText(footnote.content.content)}
              {/if}
              <span
                on:click={e => {
                  const targetEl = document.querySelector(
                    "#link-" + footnote._key
                  )
                  if (targetEl) {
                    window.scrollTo({
                      top: targetEl.offsetTop - 100,
                      left: 0,
                      behavior: "smooth",
                    })
                  }
                }}
                class="back-link">(BACK)</span
              >
            </li>
          {/each}
        </ol>
      </div>

      <!-- TAGS -->
      {#if post.tags}
        <div class="tags">
          {#each post.tags as tag}
            <a href={"/taxonomy/" + tag}>
              <!-- <a
              href={'/taxonomy/' + slugify(tag, {
                  replacement: '-',
                  lower: true,
                  strict: true
                })}> -->
              {tag}
            </a>
          {/each}
        </div>
      {/if}
    {/if}
  </div>

  <Footer />
{/await}

<style lang="scss">
  @import "../../variables.scss";

  .single {
    font-size: $font_size_normal;
    font-family: $serif-stack;
    margin: 0;
    padding-bottom: $line-height * 2;
    width: 100vw;
    overflow-x: hidden;
    padding-top: calc(#{$menu_bar_height} + #{$line-height / 2});
    min-height: calc(100vh - #{$menu_bar_height});

    @include screen-size("small") {
      width: calc(100% - #{$phone-margin * 2});
      margin-left: $phone-margin;
      margin-right: $phone-margin;
    }

    h1 {
      font-size: $font_size_normal;
      line-height: $line-height;
      margin: 0;
      padding: 0;

      @include screen-size("small") {
        font-size: $font_size_large_phone;
      }
    }
  }

  .meta {
    margin-bottom: $line-height * 2;
    margin-left: auto;
    margin-right: auto;
    width: $text_width;
    max-width: 100%;

    .date {
      font-size: $font_size_small;
      font-family: $sans-stack;
      margin-bottom: $line-height / 2;
      padding-left: 2px;
      letter-spacing: 0.1em;
    }

    .authors {
      font-size: $font_size_normal;
      line-height: $line-height;
      // font-style: italic;
    }

    &.intervju {
      width: $text_width_wider;
      padding-bottom: $line-height_large;
      margin-bottom: $line-height_large * 2;
      border-bottom: 1px solid $grey;
      line-height: $line-height_large;

      .authors {
        font-size: $font_size_large;
        margin-bottom: $line-height_large / 2;
      }

      .title {
        font-size: $font_size_large;
        line-height: $line-height_large;
      }
    }

    &.manifest {
      width: $text_width_wider;
      padding-bottom: $line-height_large;
      margin-bottom: $line-height_large * 2;
      border-bottom: 1px solid $grey;
      line-height: $line-height_large;

      .authors {
        font-size: $font_size_larger;
        margin-bottom: $line-height_large / 2;
      }

      .title {
        font-size: $font_size_larger;
        font-family: $sans-stack;
        font-weight: 900;
        line-height: $line-height_large;
      }
    }
  }

  .ingress {
    font-style: italic;
  }

  .pdf-download {
    border-bottom: 1px solid $grey;
    line-height: $line-height;
    overflow: hidden;
    user-select: none;
    // display: block;
    // padding: $line-height / 2;
    font-weight: normal;
    // margin-top: $line-height;
    display: inline-block;
    font-size: $font_size_small;
    font-family: $sans-stack;
    letter-spacing: 0.1em;
    color: $darkgrey;
    // margin-top: 11px;

    svg {
      transform-origin: center;
      transform: scale(0.9) translateY(9px);
      margin-right: 5px;
      path {
        // fill: red;
        fill: $darkgrey;
      }
    }

    &:hover {
      color: $black;
      border-bottom: 1px solid $darkgrey;
      svg {
        path {
          fill: $black;
        }
      }
    }
  }

  .publication-context {
    border-bottom: 1px solid $grey;
    line-height: $line-height;
    user-select: none;
    overflow: visible;
    font-weight: normal;
    color: $darkgrey;
    display: inline-block;
    font-size: $font_size_small;
    font-family: $sans-stack;
    letter-spacing: 0.1em;

    svg {
      transform: scale(0.9) translateY(9px);
      margin-right: 5px;
      path {
        fill: $darkgrey;
      }
    }

    &:hover {
      color: $black;
      border-bottom: 1px solid $darkgrey;
      svg {
        path {
          fill: $black;
        }
      }
    }
  }

  .top-bar {
    margin-bottom: $line-height * 1.5;
    margin-left: $margin;
    margin-right: $margin;
    overflow: visible;
    // background: red;
    display: flex;
    flex-direction: column;
    // justify-content: space-between;
  }
</style>
