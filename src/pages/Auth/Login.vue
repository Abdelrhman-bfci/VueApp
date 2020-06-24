<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="green darken-1" dark flat>
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
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
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="login" color="green darken-1">
                  <md-icon>login</md-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
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
                console.log(res);
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
