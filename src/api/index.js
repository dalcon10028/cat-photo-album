import { BASE_URL, GET, POST, PUT, DELETE } from '../constants/api.js'

export default class HTTP {
  async request (url = '', options) {
    try {
      const res = await fetch(`${BASE_URL}${url}`, options)
      if (!res.ok) console.error(res.status)
      return await res.json()
    } catch (error) {
      console.error(error)
    }
  }

  options (method, body) {
    return {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }
  }

  get (url) {
    return this.request(url, this.options(GET))
  }

  post (url, body) {
    return this.request(url, this.options(POST, body))
  }

  put (url, body) {
    return this.request(url, this.options(PUT, body))
  }

  delete (url) {
    return this.request(url, this.options(DELETE))
  }
}
