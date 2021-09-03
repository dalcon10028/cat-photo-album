import Vuex from "../core/Vuex.js";
import { fetchRootContents, fetchDirectoryContents } from "../api/directory.js";

export const store = new Vuex({
  state: {
    breadcrumb: [
      { id: '0', name: 'root' }
    ],
    contents: [],
    isLoading: true,
    imageViewer: {
      on: false,
      filePath: ''
    },
    cache: {},
  },

  mutations: {
    SET_CONTENTS(state, contents) {
      state.contents = contents;
    },

    SET_BREADCRUMB(state, breadcrumb) {
      state.breadcrumb = breadcrumb;
    },

    ADD_BREADCRUMB(state, nav) {
      state.breadcrumb = state.breadcrumb.concat(nav);
    },

    HIDE_IMAGE_VIEWER(state) {
      state.imageViewer = { on: false, filePath: '' };
    },

    ON_LOADING(state) {
      state.isLoading = true;
    },

    OFF_LOADING(state) {
      state.isLoading = false;
    },

    SET_IMAGE(state, filePath) {
      state.imageViewer = { 
        on: true,
        filePath
      };
    },
    
    ADD_CACHE(state, {id, name, contents}) {
      state.cache[id] = { name, contents };
    },

    GO_PREV(state) {
      state.breadcrumb = state.breadcrumb.slice(0, state.breadcrumb.length - 1);
      console.log(state.breadcrumb[state.breadcrumb.length - 1])
      state.contents = state.cache[state.breadcrumb[state.breadcrumb.length - 1].id].contents;
    }
  },

  actions: {
    async fetchHomeDirectory({ commit }) {
      commit('ON_LOADING');
      const contents = await fetchRootContents();
      commit('OFF_LOADING');
      commit('SET_CONTENTS', contents);
      commit('ADD_CACHE', { id: '0', name: 'root', contents });
    },

    async fetchDirectory({ commit }, { id, name }) {
      commit('ON_LOADING');
      const contents = await fetchDirectoryContents(id);
      commit('OFF_LOADING');
      commit('ADD_BREADCRUMB', { id, name });
      commit('SET_CONTENTS', contents);
      commit('ADD_CACHE', { id, name, contents });
    },

    async fetchImage({ commit }, filePath) {
      commit('ON_LOADING');
      const url = await getImage(filePath);
      commit('OFF_LOADING');
      commit('SHOW_IMAGE_VIEWER');
      commit('SET_IMAGE', url);
    }
  }
});