import Component from "../core/Component.js";

export default class Nodes extends Component {
  template() {
    return `
      <div class="Node">
        <img src="./assets/prev.png">
      </div>
      <div class="Node">
        <img src="./assets/directory.png">
        <div>2021/04</div>
      </div>
      <div class="Node">
        <img src="./assets/file.png">
        <div>하품하는 사진</div>
      </div>
    `;
  }
}