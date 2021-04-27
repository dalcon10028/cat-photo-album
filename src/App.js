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
    const breadcrumb = new Breadcrumb({
      $app,
      initialState: root
    })
    // Nodes 생성
    const nodes = new Nodes({
      $app,
      initialState: root
    })
  }
}
