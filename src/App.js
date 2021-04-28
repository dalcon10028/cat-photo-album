import Breadcrumb from './components/Breadcrumb.js'
import Nodes from './components/Nodes.js'
import ImageView from './components/ImageView.js'
import api from './api/index.js'

export default class App {
  constructor ($app) {
    this.state = {
      isRoot: false,
      nodes: [],
      depth: [],
      selectedFilePath: null
    }
    // imageView 생성
    this.imageView = new ImageView({
      $app,
      initialState: this.state.selectedNodeImage
    })

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
      onClick: async (node) => {
        try {
          if (node.type === 'DIRECTORY') {
            // 디렉토리인 경우 처리
            const nextNodes = await api.fetchDirectory(node.id)
            this.setState({
              ...this.state,
              depth: [...this.state.depth, node],
              nodes: nextNodes,
              isRoot: false
            })
          } else if (node.type === 'FILE') {
            // 파일인 경우 이미지 보기 처리
            this.setState({
              ...this.state,
              selectedFilePath: node.filePath
            })
          }
        } catch (error) {
          throw new Error(error.message)
        }
      },
      onBackClick: async () => {
        try {
          // 이전 state를 복사하여 처리
          const nextState = { ...this.state }
          nextState.depth.pop()
          const prevNodeId = nextState.depth.length === 0 ? null : nextState.depth[nextState.depth.length - 1].id

          // root로 온 경우이므로 root 처리
          if (prevNodeId === null) {
            const rootNodes = await api.fetchRoot()
            this.setState({
              ...nextState,
              isRoot: true,
              nodes: rootNodes
            })
          } else {
            const prevNodes = await api.fetchDirectory(prevNodeId)
            this.setState({
              ...nextState,
              isRoot: false,
              nodes: prevNodes
            })
          }
        } catch (error) {
          throw new Error(error.message)
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
    this.imageView.setState(this.state.selectedFilePath)
  }
}
