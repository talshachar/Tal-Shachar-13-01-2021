<template>
  <div class="home">
    <transition name="slide-up-fade">
      <section class="hero-container" v-if="heroIntersected">
        <div class="hero-content">
          <h1>Telescopes<span> Simply Connecting With People.</span></h1>
          <p>Stay connected effortlessly, real-time traffic.</p>
          <div class="cta-btns">
            <vs-button class="get-started-btn" to="/mail/inbox" floating circle>
              Get Started
            </vs-button>

            <vs-tooltip right>
              <vs-button class="github-repo-link" href="https://github.com/talshachar/Tal-Shachar-13-01-2021" blank color="#ddd" border icon>
                <box-icon color="#2c3e50" type="logo" name="github"></box-icon>
              </vs-button>

              <template #tooltip>
                Code on GitHub
              </template>
            </vs-tooltip>

          </div>
        </div>
        <div class="hero-img">
          <img src="../assets/teamwork-hero.gif" alt="">
        </div>
      </section>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      heroIntersected: false
    }
  },
  mounted() {
    this.heroIntersected = true;
  }
}
</script>

<style lang="scss">
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #2c3e50;

  .hero-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }

  .hero-content {
    padding: 0 1em;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    h1 {
      font-size: rem(36px);
      max-width: 555px;

      span {
        font-weight: initial;
      }
    }

    p {
      margin-top: 0;
      font-size: rem(18px);
      color: #898d91;
    }

    .cta-btns {
      display: flex;
      height: 50px;

      .get-started-btn {
        margin-left: 0;
        padding: 0 1em;
      }
      .github-repo-link {
        transform: translateY(-3px);
      }
    }
  }
  .hero-img {
    width: 640px;
    padding: 0 8px;

    img {
      max-width: 100%;
    }
  }
}
</style>
