<template>
  <v-app id="inspire">
    <v-main id="ove">

      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <md-card class="md-card-profile">
              <div class="md-card-avatar">
                <img class="img" :src="cardUserImage" />
              </div>

              <md-card-content>
                <h6 class="category text-gray">ASUTON</h6>
                <h4 class="card-title">ASUTON LOGIN FORM</h4>
                <v-form>
                                    <v-text-field
                                      label="email"
                                      name="email"
                                      prepend-icon="mdi-account"
                                      type="email"
                                      class="input-group--focused"
                                      v-model="email"
                                    ></v-text-field>
                                    <v-text-field
                                      v-model="password"
                                      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                      :type="show2 ? 'text' : 'password'"
                                      name="input-10-2"
                                      label="Password"
                                      class="input-group--focused"
                                      prepend-icon="mdi-lock"
                                      @click:append="show2 = !show2"
                                    ></v-text-field>
                                  </v-form>
                <md-button class="md-round md-success" @click="login">Login</md-button>
              </md-card-content>
            </md-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  props: {
    cardUserImage: {
      type: String,
      default: require("@/assets/img/faces/marc.jpg")
    }
  },
  data() {
    return {
      show2: false,
      email: "",
      password: ""
    };
  },
  methods: {
    login: function() {
      this.$store
              .dispatch("performLoginAction", {
                email: this.email,
                password: this.password
              })
              .then(res => {
                this.$router.push("/dashboard");
              })
              .catch(err => {
                console.log(err.message);
              });
    }
  },
  beforeCreate() {
    this.$store.state.loggedIn ? this.$router.push('/dashboard') : false ;
  }
};
</script>

<style>
  #inspire{
    background-image: url("../../assets/img/sidebar-2.jpg");
  }
  #ove{
    background-color: black;
    opacity: 0.8;
  }
  .md-card-profile{
    position: relative;
  }
</style>
