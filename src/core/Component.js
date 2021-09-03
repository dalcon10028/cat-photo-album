import { observable, observe } from "./Observer.js";

export default class Component {
  constructor(target, props = {}) {
    this.target = target;
    this.props = props;
    this.state = observable({});

    this.setEvents();
    observe(() => {
      this.created();
      this.render();
      this.mounted();
    });
  }

  created() {}

  mounted() {}

  setEvents() {}

  template() {
    return '';
  }

  render() {
    this.target.innerHTML = this.template();
  }
}