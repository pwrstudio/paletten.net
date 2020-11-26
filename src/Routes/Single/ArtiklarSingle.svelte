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

  // ** CONSTANTS
  const query =
    "*[slug.current == $slug]{..., 'pdfUrl': pdfFile.asset->url, author[]->{title, slug}}[0]"
  const params = { slug: slug }

  let post = loadData(query, params)
  let footnotePosts = []

  post.then(post => {
    console.log("post", post)
    let a = flatMap(
      post.content.content.filter(c => c._type == "block").map(x => x.markDefs)
    )

    footnotePosts = a.filter(x => x._type === "footnote")
  })
</script>

<style lang="scss">
  @import "../../variables.scss";

  .single {
    font-size: $font_size_normal;
    font-family: $serif-stack;
    margin: 0;
    padding-bottom: $line-height * 2;
    width: 100vw;
    overflow-x: hidden;
    padding-top: calc(#{$menu_bar_height} + #{$line-height});
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
  }

  .authors {
    font-size: $font_size_normal;
    line-height: $line-height;
    font-style: italic;
  }

  .ingress {
    font-style: italic;
  }

  .date {
    font-size: $font_size_small;
    font-family: $sans-stack;
    margin-bottom: $line-height / 2;
    padding-left: 2px;
    letter-spacing: 0.1em;
  }

  .pdf-download {
    border: 1px solid $grey;
    line-height: $line-height;
    overflow: hidden;
    user-select: none;
    padding: $line-height / 2;
    font-weight: normal;
    margin-top: $line-height;
    display: inline-block;
    font-size: $font_size_small;
    font-family: $sans-stack;
    letter-spacing: 0.1em;

    &:hover {
      background: $grey;
    }
  }
</style>

{#await post then post}
  <div class="single">
    <div class="meta" in:fade>
      {#if post.publicationDate}
        <div class="date">{formattedDate(post.publicationDate)}</div>
      {/if}
      <!-- AUTHOR -->
      {#if post.author}
        <div class="authors">
          <Authors authors={post.author} />
        </div>
      {/if}
      <!-- TITLE -->
      <h1 class="title">{post.title}</h1>
      <!-- PDF DOWNLOAD -->
      {#if post.pdfUrl}
        <a
          href={post.pdfUrl}
          class="pdf-download"
          download
          target="_blank">Ladda ner pdf</a>
      {/if}
    </div>

    <!-- MAIN CONTENT -->
    {#if post.content && post.content.content && isArray(post.content.content)}
      <div class="content" in:fade={{ delay: 300 }}>
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
            <a href={'/taxonomy/' + tag}>
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
