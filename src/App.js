import Breadcrumb from './components/Breadcrumb.js'
import Nodes from './components/Nodes.js'

export default class App {
  constructor ($app) {
    this.state = {
      nodes: [{
        name: '고양이'
      }]
    }

    const breadcrumb = new Breadcrumb({
      $app
    })
    const nodes = new Nodes({
      $app
    //   initialState: {
    //     nodes: this.state.nodes
    //   }
    })
  }
}
