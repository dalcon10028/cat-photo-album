const IMAGE_PATH_PREFIX = 'https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public'

export default class ImageView {
  constructor ({ $app, initialState }) {
    this.state = initialState
    this.$target = document.createElement('div')
    this.$target.className = 'Modal ImageView'

    $app.appendChild(this.$target)
    this.setEvent()
    this.render()
  }

  setState (nextState) {
    this.state = nextState
    this.render()
  }

  render () {
    this.$target.innerHTML = `<div class="content">${this.state ? `<img src="${IMAGE_PATH_PREFIX}${this.state}">` : ''}</div>`

    this.$target.style.display = this.state ? 'block' : 'none'
  }

  setEvent () {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 27 || e.keyCode === 27) {
        this.setState(false)
      }
    })
    this.$target.addEventListener('click', (e) => {
      if (e.target !== e.currentTarget) { return }
      this.setState(false)
    })
  }
}
