import Component from "../core/Component.js";

export default class Loading extends Component {
  created() {
    this.loadingOff();
  }

  template() {
    return `
      <div class="content">
        <img src="./assets/nyan-cat.gif">
      </div>
    `
  }

  loadingOn() {
    this.target.style.display = 'block';
  }

  loadingOff() {
    this.target.style.display = 'none';
  }
}