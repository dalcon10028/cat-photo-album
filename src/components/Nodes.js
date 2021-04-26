export default class Nodes {
  constructor ({ $app, initialState, onClick }) {
    this.state = initialState
    this.$target = document.createElement('div')
    this.$target.className = 'Nodes'
    $app.appendChild(this.$target)
    this.onClick = onClick

    this.render()
  }

  setState (nextState) {
    this.state = nextState
    this.render()
  }

  render () {
    this.$target.innerHTML = `<div class="node"><img src="./assets/prev.png"></div>
      <div class="Node">
          <img src="./assets/directory.png">
          <div>2021/04</div>
        </div>
        <div class="Node">
          <img src="./assets/file.png">
          <div>하품하는 사진</div>
        </div>`
    // this.$target.innerHTML = this.state.nodes.map(node => `<li>${node.name}</li>`)
  }
}
