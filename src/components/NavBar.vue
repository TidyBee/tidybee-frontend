<template>
  <div class="NavBar">
    <div class="logo">
      <img
        src="@/assets/tidybeelogo.png"
        alt="TidyBeeLogo"
      >
      <h2 class="nav-item">
        TidyBee
      </h2>
    </div>
    <select v-model="locale"
    @change="switchLang">
      LANG :
      <option>
        en
      </option>
      <option>
        fr
      </option>
    </select>
    <div class="menu-items">
      <h3 class="nav-item">
        {{ $t("navbar.configuration")}}
      </h3>
      <h3 class="nav-item">
        {{ $t("navbar.about")}}
      </h3>
    </div>
  </div>
</template>

<script>
import VueCookies from 'vue-cookies'

export default {
    name: 'NavBar',
    setup() {
      if (!VueCookies.get(['locale'])) {
        VueCookies.set('locale', 'en');
      }
      const locale = VueCookies.get(['locale']);
      return {
        locale
      }
    },
    data() {
      return {
        lang: "en"
      }
    },
    methods: {
      switchLang() {
        VueCookies.set('locale', this.locale);
        this.$i18n.locale = this.locale;
      }
    }
}
</script>

<style scoped>
.NavBar {
    width: 60%;
    margin: 0 auto;
    border-radius: 17px;
    background: #ffffff;
    box-shadow: 9px 9px 18px #d9d9d9, -9px -9px 18px #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    display: flex;
    align-items: center;
}

img {
    height: 40px;
    margin-left: 10px;
}

.menu-items {
    display: flex;
    align-items: center;
}

.nav-item {
    margin-left: 10px;
    margin-right: 10px;
    transition: color 0.3s;
}

.nav-item:hover {
    color: #ffee00;
}
</style>
