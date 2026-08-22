const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export const api = {
  async request(path, options = {}) {
    const token = localStorage.getItem('finance_token')
    const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) }
    if (token) headers.Authorization = `Bearer ${token}`

    const response = await fetch(`${API_URL}${path}`, { ...options, headers })
    let data = null
    const text = await response.text()
    if (text) {
      try { data = JSON.parse(text) } catch { data = text }
    }

    if (!response.ok) {
      const message = data?.mensaje || data?.message || data?.error || 'Ocurrió un error en la solicitud.'
      if (response.status === 401) {
        localStorage.removeItem('finance_token')
        localStorage.removeItem('finance_user')
      }
      throw new Error(message)
    }
    return data
  },

  login(payload) { return this.request('/api/auth/login', { method: 'POST', body: JSON.stringify(payload) }) },
  register(payload) { return this.request('/api/auth/register', { method: 'POST', body: JSON.stringify(payload) }) },
  transactions() { return this.request('/api/transacciones') },
  createTransaction(payload) { return this.request('/api/transacciones', { method: 'POST', body: JSON.stringify(payload) }) },
  updateTransaction(id, payload) { return this.request(`/api/transacciones/${id}`, { method: 'PUT', body: JSON.stringify(payload) }) },
  deleteTransaction(id) { return this.request(`/api/transacciones/${id}`, { method: 'DELETE' }) },
  profile() { return this.request('/api/perfil-financiero') },
}

export { API_URL }
