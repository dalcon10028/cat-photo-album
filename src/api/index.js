const API_END_POINT = 'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev'

const request = async (url) => {
  try {
    const res = await fetch(`${API_END_POINT}/${url || ''}`)
    if (!res.ok) {
      throw new Error('서버의 상태가 이상합니다!')
    }
    return await res.json()
  } catch (error) {
    throw new Error(`무언가 잘못 되었습니다! ${error.message}`)
  }
}

const api = {
  fetchRoot () {
    return request()
  },
  fetchDirectory (id) {
    return request(id)
  }
}

export default api
