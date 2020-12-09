<script>
  // # # # # # # # # # # # # # # #
  //
  //   MAILING LIST FORM
  //
  // # # # # # # # # # # # # # # #
</script>

<style lang="scss">
  @import "../variables.scss";

  .mailing-list-form {
    .email {
      padding: 5px;
      border-radius: 0;
      border: 1px solid $grey;
      width: 35ch;
      max-width: 100%;
      margin-bottom: $line-height / 2;
      outline: none;

      &:focus {
        border: 1px solid $black;
      }
    }

    .button {
      background: transparent;
      padding: 5px $line-height * 1.5;
      border-radius: 0;
      border: 1px solid $grey;
      cursor: pointer;
      &:hover {
        border: 1px solid $black;
      }
    }
  }
</style>

<div class="mailing-list-form" id="form-container">
  <!-- Begin Mailchimp Signup Form -->
  <div id="mc_embed_signup">
    <form
      action="https://paletten.us7.list-manage.com/subscribe/post?u=1f5c74208d1931e5426e4f2ee&amp;id=c6c0b58d4f"
      method="post"
      id="mc-embedded-subscribe-form"
      name="mc-embedded-subscribe-form"
      class="validate"
      target="_blank"
      novalidate>
      <div id="mc_embed_signup_scroll">
        <div class="mc-field-group">
          <!-- <label for="mce-EMAIL">Emailadress </label> -->
          <input
            type="email"
            placeholder="Emailadress"
            value=""
            name="EMAIL"
            class="required email"
            id="mce-EMAIL" />
        </div>
        <div id="mce-responses" class="clear">
          <div class="response" id="mce-error-response" style="display:none" />
          <div
            class="response"
            id="mce-success-response"
            style="display:none" />
        </div>
        <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
        <div style="position: absolute; left: -5000px;" aria-hidden="true">
          <input
            type="text"
            name="b_1f5c74208d1931e5426e4f2ee_c6c0b58d4f"
            tabindex="-1"
            value="" />
        </div>
        <div class="clear">
          <input
            type="submit"
            value="Skicka in"
            name="subscribe"
            id="mc-embedded-subscribe"
            class="button" />
        </div>
      </div>
    </form>
  </div>
  <!--End mc_embed_signup-->
</div>
