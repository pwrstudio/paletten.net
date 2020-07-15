<script>
  // # # # # # # # # # # # # #
  //
  //  VIDEO BLOCK
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import has from "lodash/has";
  import { urlFor, loadData, renderBlockText } from "../../sanity.js";

  // PROPS
  export let block = {};

  const videoUrl =
    "https://cdn.sanity.io/files/1tpw92x3/production/" +
    block.videoFile.asset._ref.replace("file-", "").replace("-mp4", ".mp4");
</script>

<style lang="scss">
  @import "../../variables.scss";

  .video {
    .caption {
      font-size: $font_size_caption;
    }

    .attribution {
      font-size: $font_size_small;
      font-family: $sans-stack;
    }
  }
</style>

<figure class="video">

  <!-- VIDEO -->
  <video src={videoUrl} controls loop autoplay={block.autoPlay} />

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
