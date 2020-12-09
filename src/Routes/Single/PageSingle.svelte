<script>
  // # # # # # # # # # # # # #
  //
  //  SINGLE: PAGE
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { loadData, renderBlockText } from "../../sanity.js"
  import get from "lodash/get"
  import flatMap from "lodash/flatMap"
  import { links } from "svelte-routing"
  import { fade } from "svelte/transition"

  // *** PROPS
  export let slug = ""

  // STORES
  import { currentPost } from "../../stores.js"

  // *** COMPONENTS
  import Footer from "../../Components/Footer.svelte"
  import Authors from "../../Components/Authors.svelte"
  import MailingListForm from "../../Components/MailingListForm.svelte"
  import ImageBlock from "../../Components/Blocks/ImageBlock.svelte"
  import VideoBlock from "../../Components/Blocks/VideoBlock.svelte"
  import AudioBlock from "../../Components/Blocks/AudioBlock.svelte"
  import EmbedBlock from "../../Components/Blocks/EmbedBlock.svelte"

  // *** CONSTANTS
  const query = "*[_id == $slug][0]"
  const medverkandeQuery =
    "*[_type == 'medverkande']{..., 'connectedPosts': *[_type=='post' && references(^._id)]{ title }} | order(title asc)"

  // *** VARIABLES
  let params = { slug: slug }
  let footnotePosts = []
  let oldSlug = slug
  let post = loadData(query, params)
  let medverkande = loadData(medverkandeQuery)
  let mArray = []

  post.then(post => {
    currentPost.set(post)
    let a = flatMap(
      post.content.content.filter(c => c._type == "block").map(x => x.markDefs)
    )
    footnotePosts = a.filter(x => x._type === "footnote")
  })

  medverkande.then(medverkande => {
    console.dir(medverkande)
    mArray = medverkande
  })

  $: {
    if (slug !== oldSlug) {
      oldSlug = slug
      params = { slug: slug }
      post = loadData(query, params)
      post.then(post => {
        currentPost.set(post)
        let a = flatMap(
          post.content.content
            .filter(c => c._type == "block")
            .map(x => x.markDefs)
        )
        footnotePosts = a.filter(x => x._type === "footnote")
      })
    }
  }
</script>

<style lang="scss">
  @import "../../variables.scss";

  .page {
    font-size: $font_size_normal;
    font-family: $serif-stack;
    padding-bottom: $line-height * 2;
    width: calc(100% - #{$margin * 2});
    // width: 100%;
    overflow-x: hidden;
    margin-left: $margin;
    margin-right: $margin;
    min-height: calc(100vh - #{$menu_bar_height});

    @include screen-size("small") {
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

      .title {
        font-size: $font_size_normal;
        line-height: $line-height;
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

      @include screen-size("small") {
        width: calc(100% - #{$phone-margin * 2});

        &.second {
          padding-top: $line-height;
        }
      }
    }
  }

  .subscribe-button {
    line-height: $line_height;
    height: $line_height;
    text-transform: uppercase;
    font-weight: bold;
    margin-bottom: $line_height;

    letter-spacing: 0.2em;
    font-size: 0.7em;
    border: 1px solid $grey;
    padding: 20px;
  }

  .medverkande {
    column-count: 2;

    @include screen-size("small") {
      column-count: 1;
    }

    a {
      text-decoration: none;
    }
  }

  .post-counter {
    font-size: $font_size_small;
    font-family: $sans-stack;
    letter-spacing: 0.1em;
    // position: relative;
    // top: -1px;
  }
</style>

{#await post then post}
  <div class="page" use:links>
    <div class="column first" in:fade>
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
          <!-- {#if slug == 'prenumerationer'}
            <a
              href="https://www.natverkstan.net/wp-content/plugins/konturiDb/prenumerera.php?id=146"
              target="_blank"
              class="subscribe-button">
              Teckna en prenumeration på Paletten
            </a>
          {/if} -->
        </div>

        {#if footnotePosts && footnotePosts.length > 0}
          <div class="footnotes">
            <ol>
              {#each footnotePosts as footnote}
                <li id={'note-' + footnote._key}>
                  {@html renderBlockText(footnote.content.content)}
                  <a
                    href={'#link-' + footnote._key}
                    class="back-link">(BACK)</a>
                </li>
              {/each}
            </ol>
          </div>
        {/if}
      {/if}
    </div>

    {#if slug == 'om-paletten'}
      <div class="column second" in:fade={{ delay: 300 }}>
        <div class="meta">
          <h1 class="title">Medverkande</h1>
        </div>

        <div class="content medverkande">
          {#each mArray as m, i}
            <div>
              <a href={'/medverkande/' + get(m, 'slug.current', '')}>
                {m.title}
                {#if m.connectedPosts.length > 0}
                  <span class="post-counter">({m.connectedPosts.length})</span>
                {/if}
              </a>
              <!-- {#if i < mArray.length - 1},&nbsp;{/if} -->
            </div>
          {/each}
        </div>
      </div>
    {/if}

    {#if slug == 'kontakt'}
      <div class="column second" in:fade={{ delay: 300 }}>
        <div class="meta">
          <h1 class="title">Mailinglista</h1>
        </div>

        <div class="content">
          <MailingListForm />
        </div>
      </div>
    {/if}
  </div>

  <Footer />
{/await}
