export class Http {
    static HEADER = { 'Content-Type': 'application/json' }

    static async get(url) {
        try {
            return await request(url)
        } catch (e) {
            console.log(e)
        }
    }
    static async post(url, data = {}) {
        try {
            return await request(url, 'POST', data)
        } catch (e) {
            console.log(e)
        }
    }
    static async put(url, data = {}) {
        try {
            return await request(url, 'PUT', data)
        } catch (e) {
            console.log(e)
        }
    }
    static async delete(url) {
        try {
            return await request(url, 'DELETE')
        } catch (e) {
            console.log(e)
        }
    }
}
async function request(url, method = 'GET', data) {
    const config = {
        method,
        headers: Http.HEADER,
    }
    if (method === 'POST' || method === 'PUT') {
        config.body = JSON.stringify(data)
    }
    const response = await fetch(url, config)
    return await response.json()
}