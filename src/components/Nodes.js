import Node from './Node.js'

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
    this.$target.innerHTML = this.state.nodes.map(node => `<li>${node.name}</li>`)
  }
}
