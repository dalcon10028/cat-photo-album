import Component from '../core/Component.js'
import { store } from '../store/index.js'
import { NONE, BLOCK } from '../constants/display.js'

export default class Loading extends Component {
  template () {
    this.target.style.display = store.state.isLoading ? BLOCK : NONE
    return `
      <div class="content">
        <img src="./assets/nyan-cat.gif">
      </div>
    `
  }
}
