export default class Component {
  constructor(target, props = {}) {
    this.target = target;
    this.props = props;

    this.created();
    this.render();
    this.mounted();
  }

  created() {}

  mounted() {}

  events() {}

  template() {
    return '';
  }

  render() {
    this.target.innerHTML = this.template();
  }
}