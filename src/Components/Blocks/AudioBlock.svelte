<script>
  // # # # # # # # # # # # # #
  //
  //  ADUIO BLOCK
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import has from "lodash/has";
  import { urlFor, loadData, renderBlockText } from "../../sanity.js";

  // PROPS
  export let block = {};

  const audioUrl =
    "https://cdn.sanity.io/files/1tpw92x3/production/" +
    block.audioFile.asset._ref.replace("file-", "").replace("-mp3", ".mp3");
</script>

<style lang="scss">
  @import "../../variables.scss";

  .audio {
    .caption {
      font-size: $font_size_caption;
    }

    .attribution {
      font-size: $font_size_small;
      font-family: $sans-stack;
    }
  }
</style>

<figure class="audio">

  <!-- VIDEO -->
  <audio src={audioUrl} controls />

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
