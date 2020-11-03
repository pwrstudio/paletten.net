<script>
  // # # # # # # # # # # # # #
  //
  //  LANDING
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { fade } from 'svelte/transition'
  import { urlFor, loadData, renderBlockText } from '../sanity.js'
  import { formattedDate } from '../global.js'
  import get from 'lodash/get'

  // COMPONENTS
  import Authors from './Authors.svelte'

  // *** PROPS
  export let post = {}
  export let category = ''

  let link = ''
  let query = "*[_id == '" + post._id + "']{..., author[]->{title, slug}}[0]"

  //   VARIABLES
  let postContent = loadData(query)

  postContent.then((l) => {
    // console.dir(postContent)
    let dir = ''
    if (l._type === 'post') {
      dir = '/artiklar/'
    } else if (l._type === 'tidskrift') {
      dir = '/tidskrift/'
    } else if (l._type === 'projekt') {
      dir = '/projekt/'
    }
    link = dir + l.slug.current
  })
</script>

<style lang="scss">
  @import '../variables.scss';

  .list-item,
  .placeholder {
    display: flex;
    margin-bottom: $line-height * 2;
    text-decoration: none;
    font-size: $font_size_normal;
    border-bottom: 1px solid $grey;
    flex-wrap: wrap;
    width: 100%;

    @include screen-size('small') {
      flex-wrap: wrap;
      margin-bottom: $line-height;
    }

    .inner {
      width: 100%;
      padding-bottom: $line-height;
    }

    .column {
      width: 50%;
      float: left;

      @include screen-size('small') {
        width: 100%;
      }
    }

    .image {
      width: 100%;
      display: flex;
      // justify-content: center;
      // align-items: center;
      padding-bottom: $line-height;

      img {
        // max-width: calc(100% - 40px);
        max-width: 100%;
        height: $line-height * 16;
        object-fit: cover;

        @include screen-size('small') {
          height: $line-height * 8;
        }
      }

      // background: green;

      @include screen-size('small') {
        width: 100%;
      }
    }

    .text {
      width: 100%;
      padding-right: 20px;
      text-decoration: none;
      color: black;
      max-width: 60ch;

      @include screen-size('small') {
        width: 100%;
      }

      .title {
        font-size: $font_size_normal;
        line-height: $line-height;
        margin-bottom: $line-height;
        font-weight: bold;
        max-width: 45ch;

        @include screen-size('small') {
          font-size: $font_size_large_phone;
        }
      }

      .author {
        font-size: $font_size_normal;
        line-height: $line-height;
        font-style: italic;
        pointer-events: none;
      }

      .date {
        font-size: $font_size_small;
        font-family: $sans-stack;
        letter-spacing: 0.1em;
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
      .image {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
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
  <a href={link} class="list-item full" in:fade class:padded={post.totalColor}>
    <div
      class="inner"
      style={'background: ' + get(post, 'color.hex', 'transparent')}>

      <div class="column">
        <div class="text">
          <!-- DATE -->
          {#if postContent.tidsPeriod}
            <div class="date">{postContent.tidsPeriod}</div>
          {:else if postContent.publicationDate}
            <div class="date">{formattedDate(postContent.publicationDate)}</div>
          {/if}
          <!-- AUTHOR -->
          {#if postContent.author}
            <div class="author">
              <Authors authors={postContent.author} />
            </div>
          {/if}
          <!-- TITLE -->
          <div class="title">{postContent.title}</div>
        </div>

        <div class="ingress">
          {#if postContent.ingress}
            {@html renderBlockText(postContent.ingress.content)}
          {/if}
          <!-- {#if category == "tidskrift" && postContent.content.content}
            {@html renderBlockText(postContent.content.content)}
          {/if} -->
        </div>
      </div>

      <div class="column">

        <!-- IMAGE -->
        {#if post.imageLayout != 'noImage' && postContent.mainImage && postContent.mainImage.asset}
          <div
            class="image"
            style={'background: ' + get(post, 'color.hex', 'transparent')}
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
      </div>

    </div>
  </a>
{/await}
