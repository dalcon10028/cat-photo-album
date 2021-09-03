import { observable } from "./Observer.js";

export default class Vuex {
  #state;
  #mutations;
  #actions;
  state = {};
  constructor({ state, mutations, actions }) {
    this.#state = observable(state);
    this.#mutations = mutations;
    this.#actions = actions;

    Object.keys(state).forEach(key => {
      Object.defineProperty(
        this.state,
        key,
        { get: () => this.#state[key] }
      )
    });
  }

  commit(action, payload) {
    this.#mutations[action](this.#state, payload);
  }

  dispatch(action, payload) {
    return this.#actions[action]({
      state: this.#state,
      commit: this.commit.bind(this),
      dispatch: this.dispatch.bind(this)
    }, payload);
  }
}