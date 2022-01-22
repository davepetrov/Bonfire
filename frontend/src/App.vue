<template>
  <div id="app">
    <v-app id="inspire">
      <v-content class="white">
        <!-- Navbar -->
        <div class="nav topbar">
          <v-app-bar
            v-if="$route.meta.noAuthRequired"
            app
            color="#FBE7D3"
            height="90"
            flat
          >
            <v-container class="py-0 fill-height">
              <v-col cols="2">
                <v-img
                  src="../src/assets/img/logo.png"
                  :contain="true"
                  height="65"
                  width="65"
                />
              </v-col>
              <v-card-title class="py-0">
                BonFire
              </v-card-title>
              <v-btn
                v-for="link in links"
                :key="link.name"
                :to="link.to"
                text
              >
                {{ link.name }}
              </v-btn>
              <v-btn  
                href="https://github.com/davepetrov/Bonfire" target="_blank"
                icon
                >
                <v-icon
                  icon>fab fa-github
                </v-icon>
              </v-btn>
              

              <v-spacer />
            </v-container>
          </v-app-bar>
          <v-sidenav
            v-if="user.id"
            :user="user"
            @sign-out="signOut"
          />
        </div>

        <!-- Main -->
        <div class="content">
          <router-view
            v-if="$route.meta.noAuthRequired || user.id"
            class="router-view"
            :user="user"
          />
          <notifications position="bottom" />
        </div>
      </v-content>
    </v-app>
  </div>
</template>
<script>
import SideNav from "./components/SideNav";
import Vue from 'vue'

export default {
  components: {
    "v-sidenav": SideNav,
  },
  data() {
    return {
      user: {},
      links: [
        { name: "Welcome", to: "/" },
        { name: "Register", to: "/register" },
        { name: "Sign In", to: "/signin" },
      ],
    };
  },
  mounted: function() {
    if (localStorage.getItem("token")) {
      this.fetchUser();
    }
  },
  methods: {
    signOut: function() {
      localStorage.removeItem('token');
      Vue.prototype.$currentUser = null;
      this.user = {};
      this.$router.push("/");
    },
    fetchUser() {
      this.$http.get('/auth/user')
      .then(res => {
        this.user = res.data;
        Vue.prototype.$currentUser = this.user;
      })
      .catch(err => {
        this.$notify({
          type: "error",
          title: "Failed to authenticate",
        });
        this.$router.push({ name: 'SignIn' });
        console.error(err);
      });
    },
  },
};
</script>
<style>
#app {
  font-family: Poppins, "Helvetica Neue", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.topbar {
  font-family: Poppins;
  z-index: 999999;
  position: absolute;
}

.content {
  height: 100%;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.router-view {
  min-height: 100%;
}
</style>
