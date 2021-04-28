import Breadcrumb from './components/Breadcrumb.js'
import Nodes from './components/Nodes.js'
import api from './api/index.js'

export default class App {
  constructor ($app) {
    this.state = {
      isRoot: false,
      nodes: [],
      depth: []
    }
    // breadcrumb 생성
    this.breadcrumb = new Breadcrumb({
      $app,
      initialState: this.state.depth
    })
    // Nodes 생성
    this.nodes = new Nodes({
      $app,
      initialState: {
        isRoot: this.state.isRoot,
        nodes: this.state.nodes
      },
      onClick: (node) => {
        if (node.type === 'DIRECTORY') {
          // 디렉토리인 경우 처리
        } else if (node.type === 'FILE') {
          // 파일인 경우 처리
        }
      }
    })

    const init = async () => {
      try {
        const rootNodes = await api.fetchRoot()
        this.setState({
          ...this.state,
          isRoot: true,
          nodes: rootNodes
        })
      } catch (error) {
        throw new Error(`무언가 잘못 되었습니다! ${error.message}`)
      }
    }

    init()
  }

  setState (nextState) {
    this.state = nextState
    this.breadcrumb.setState(this.state.depth)
    this.nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes
    })
  }
}
