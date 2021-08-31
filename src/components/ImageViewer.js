import Component from "../core/Component.js";

export default class ImageViewer extends Component {
  template() {
    return `
      <div class="content">
      <img src="./assets/sample_image.jpg">
    `
  }
}