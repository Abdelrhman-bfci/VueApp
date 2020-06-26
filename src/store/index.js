import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);
import axios from "axios";

export default new Vuex.Store({
  state: {
    loggedIn: false,
    user: null,
    token: null
  },
  plugins: [new VuexPersistence().plugin],
  mutations: {
    SET_user(state, payload) {
      state.user = payload;
    },
    SET_token(state, payload) {
      state.token = payload;
    },
    SET_loggedIn(state, payload) {
      state.loggedIn = payload;
    }
  },
  actions: {
    performLoginAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
            .post("https://auston.fekracomputers.net/api/login", {
              email: payload.email,
              password: payload.password
            })
            .then(res => {
              commit("SET_token",res.data.success.token);
              commit("SET_user", res.data.success.user);
              commit("SET_loggedIn", true);
              resolve(res);
            })
            .catch(err => {
              reject(err);
            });
      });
    },
    getAllUser({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
            .post("https://auston.fekracomputers.net/api/users", null, {
              headers:{
                Authorization:"Bearer "+ payload.token
              }
            })
            .then(res => {
              resolve(res);
            })
            .catch(err => {
              reject(err);
            });
      });
    },
    addUser({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
            .put("https://auston.fekracomputers.net/api/user/add", {
              email:payload.user.email,
              password:payload.user.password,
              confirm_password:payload.user.confirm_password,
              first_name:payload.user.first_name,
              last_name:payload.user.last_name,
              mobile:payload.user.mobile,
            }, {
              headers:{
                Authorization:"Bearer "+ payload.token
              }
            })
            .then(res => {
              resolve(res);
            })
            .catch(err => {
              reject(err);
            });
      });
    },
    Logout ({ commit } , payload) {
      return new Promise((resolve, reject) => {
        axios
            .post("https://auston.fekracomputers.net/api/logout", null,
                {
                    headers:{
                        Authorization:"Bearer "+ payload.token
                    }
                })
            .then(res => {
              commit("SET_token", null);

              commit("SET_loggedIn", false);
              commit("SET_user", null);
              resolve(res);
            })
            .catch(err => {
              reject(err);
            });
      });
    },
    // updateUserProfileAction({ commit, state }, payload) {
    //   return new Promise((resolve, reject) => {
    //     axios
    //         .patch("http://localhost:8000/api/auth/update", {
    //           name: payload.name,
    //           email: payload.email,
    //           token: state.token
    //         })
    //         .then(res => {
    //           commit("SET_user", res.data.user);
    //
    //           resolve(res);
    //         })
    //         .catch(err => {
    //           reject(err);
    //         });
    //   });
    // }
  },
  getters: {
    get_loggedIn(state) {
      return state.loggedIn;
    },
    get_user(state) {
      return state.user;
    }
  }
});