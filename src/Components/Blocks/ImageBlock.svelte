<script>
  // # # # # # # # # # # # # #
  //
  //  IMAGE BLOCK
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import has from "lodash/has";
  import { urlFor, loadData, renderBlockText } from "../../sanity.js";

  // PROPS
  export let block = {};
</script>

<style lang="scss">
  @import "../../variables.scss";

  .image {
    .caption {
      font-size: $font_size_caption;
    }

    .attribution {
      font-size: $font_size_small;
      font-family: $sans-stack;
    }
  }
</style>

<figure class="image">

  <!-- IMAGE -->
  <img
    src={urlFor(block.asset)
      .width(800)
      .quality(90)
      .auto('format')
      .url()} />

  <!-- CAPTION -->
  {#if has(block, 'caption.content')}
    <figcaption class="caption">
      {@html renderBlockText(block.caption.content)}
    </figcaption>
  {/if}

  <!-- ATTRIBUTION  -->
  {#if has(block, 'attribution')}
    <figcaption class="attribution">{block.attribution}</figcaption>
  {/if}

</figure>
