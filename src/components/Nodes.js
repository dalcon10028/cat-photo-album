export default class Nodes {
  constructor ({ $app, initialState, onClick, onBackClick }) {
    this.state = initialState
    this.$target = document.createElement('div')
    this.$target.className = 'Nodes'
    $app.appendChild(this.$target)
    this.onClick = onClick
    this.onBackClick = onBackClick

    this.render()
    this.setEvent()
  }

  setState (nextState) {
    this.state = nextState
    this.render()
  }

  render () {
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
  }

  setEvent () {
    this.$target.addEventListener('click', (e) => {
      // $target 하위에 있는 HTML 요소 클릭시 이벤트가 상위로 계속 전파 되면서
      // $target까지 오게 됨. 이 특성을 이용한 기법.
      // closest를 이용하면 현재 클릭한 요소와 제일 인접한 요소를 가져올 수 있음.
      const $node = e.target.closest('.Node')
      if ($node) {
        const { nodeId } = $node.dataset
        if (!nodeId) {
          this.onBackClick()
          return
        }

        const selectedNode = this.state.nodes.find(node => node.id === nodeId)

        if (selectedNode) {
          this.onClick(selectedNode)
        }
      }
    })
  }
}
