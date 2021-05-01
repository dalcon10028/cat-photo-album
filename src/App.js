import Breadcrumb from './components/Breadcrumb.js'
import Nodes from './components/Nodes.js'
import ImageView from './components/ImageView.js'
import Loading from './components/Loading.js'
import api from './api/index.js'

// nodeId: nodes 형태로 데이터를 불러올 때마다 이곳에 데이터를 쌓는다.
const cache = {}

export default class App {
  constructor ($app) {
    this.state = {
      isRoot: true,
      nodes: [],
      depth: [],
      selectedFilePath: null
    }
    // Loading 생성
    this.loading = new Loading({
      $app,
      initialState: this.state.isLoading
    })

    // imageView 생성
    this.imageView = new ImageView({
      $app,
      initialState: this.state.selectedNodeImage,
      onClick: () => {
        this.setState({
          ...this.state,
          selectedFilePath: null
        })
      },
      onKeyDown: () => {
        this.setState({
          ...this.state,
          selectedFilePath: null
        })
      }
    })

    // breadcrumb 생성
    this.breadcrumb = new Breadcrumb({
      $app,
      initialState: [],
      onClick: (index) => {
        if (index === null) {
          this.setState({
            ...this.state,
            depth: [],
            nodes: cache.root,
            isRoot: true
          })
          return
        }

        // breadcrumb에서 현재 위치를 누른 경우는 무시함
        if (index === this.state.depth.length - 1) {
          return
        }

        const nextDepth = this.state.depth.splice(0, index + 1)
        this.setState({
          ...this.state,
          depth: nextDepth,
          nodes: cache[nextDepth[nextDepth.length - 1].id]
        })
      }
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
          this.setState({
            ...this.state,
            isLoading: true
          })
          if (node.type === 'DIRECTORY') {
            // 디렉토리인 경우 처리
            if (cache[node.id]) {
              this.setState({
                ...this.state,
                depth: [...this.state.depth, node],
                nodes: cache[node.id],
                isRoot: false
              })
            } else {
              const nextNodes = await api.fetchDirectory(node.id)
              this.setState({
                ...this.state,
                depth: [...this.state.depth, node],
                nodes: nextNodes,
                isRoot: false
              })
              cache[node.id] = nextNodes
            }
          } else if (node.type === 'FILE') {
            // 파일인 경우 이미지 보기 처리
            this.setState({
              ...this.state,
              selectedFilePath: node.filePath
            })
          }
        } catch (error) {
          throw new Error(error.message)
        } finally {
          this.setState({
            ...this.state,
            isLoading: false
          })
        }
      },
      onBackClick: () => {
        // 로딩처리
        this.setState({
          ...this.state,
          isLoading: true
        })

        // 이전 state를 복사하여 처리
        const nextState = { ...this.state }
        nextState.depth.pop()
        const prevNodeId = nextState.depth.length === 0 ? null : nextState.depth[nextState.depth.length - 1].id

        // root로 온 경우이므로 root 처리
        if (prevNodeId === null) {
          this.setState({
            ...nextState,
            isRoot: true,
            nodes: cache.root
          })
        } else {
          this.setState({
            ...nextState,
            isRoot: false,
            nodes: cache[prevNodeId]
          })
        }
        this.setState({
          ...this.state,
          isLoading: false
        })
      }
    })

    const init = async () => {
      try {
        this.setState({
          ...this.state,
          isLoading: true
        })
        const rootNodes = await api.fetchRoot()
        this.setState({
          ...this.state,
          isRoot: true,
          nodes: rootNodes
        })

        cache.root = rootNodes
      } catch (error) {
        throw new Error(`무언가 잘못 되었습니다! ${error.message}`)
      } finally {
        this.setState({
          ...this.state,
          isLoading: false
        })
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
    this.loading.setState(this.state.isLoading)
  }
}
