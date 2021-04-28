export default class Nodes {
  constructor ({ $app, initialState, onClick, onBackClick }) {
    this.state = initialState
    this.$target = document.createElement('div')
    this.$target.className = 'Nodes'
    $app.appendChild(this.$target)
    this.onClick = onClick
    this.onBackClick = onBackClick

    this.render()
  }

  setState (nextState) {
    this.state = nextState
    this.render()
  }

  render () {
    // this.$target.innerHTML = this.state.nodes.map(node => `<li>${node.name}</li>`)

    if (this.state.nodes) {
      const nodesTemplate = this.state.nodes.map(node => {
        const iconPath = node.type === 'FILE' ? './assets/file.png' : './assets/directory.png'

        return `
          <div class="Node" data-node-id="${node.id}">
            <img src="${iconPath}" />
            <div>${node.name}</div>
          </div>
        `
      }).join('')

      // root directory 렌더링이 아닌 경우 뒤로가기를 렌더링
      // 뒤로가기의 경우 data-node-id attribute를 렌더링하지 않음
      this.$target.innerHTML = !this.state.isRoot ? `<div class="Node"><img src="./assets/prev.png"></div>${nodesTemplate}` : nodesTemplate
    }

    this.$target.querySelectorAll('.Node').forEach($node => {
      $node.addEventListener('click', (e) => {
        // dataset을 통해 data-로 시작하는 attribute를 꺼내올 수 있음
        const { nodeId } = e.target.dataset
        // nodeId가 없는 경우 뒤로가기를 누른 케이스
        if (!nodeId) {
          this.onBackClick()
        }
        const selectedNode = this.state.nodes.find(node => node.id === nodeId)

        if (selectedNode) {
          this.onClick(selectedNode)
        }
      })
    })
  }
}
