import StoreModule from "../module";

class AuthState extends StoreModule {
  initState() {
    return {
      data: {},
      waiting: false
    }
  }

  async signIn(login, password) {
    this.setState({
      data: {...this.data},
      waiting: true
    });

    try {
      const response = await fetch('/api/v1/users/sign', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({login: login, password: password})
      })

      if(!response.ok) {
        const error = await response.json()
        throw new Error(error.error.message)
      }
      const json = await response.json()
      const token = json.result.token
      localStorage.setItem('token', token)
      this.setState({
        data: {
          userName: json.result.user.profile.name,
          phone: json.result.user.profile.phone,
          email: json.result.user.email
        },
        waiting: false
      })

    } catch (error) {
      this.setState({
        data: {...this.data, error: error.message},
        waiting: false
      })
    }
  }

  async tokenCheck() {
    this.setState({
      data: {...this.data},
      waiting: true
    });

    try {
      const response = await fetch('/api/v1/users/self?fields=*', {
        method: "GET",
        headers: {
          "X-token": localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      })
      const json = await response.json()

      if(!response.ok) {
        const error = await response.json()
        throw new Error(error.error.message)
      } else {
        this.setState({
          data: {
            userName: json.result.profile.name,
            phone: json.result.profile.phone,
            email: json.result.email
          },
          waiting: true
        })
      }
    } catch (error) {
      this.setState({
        data: {},
        waiting: false
      })
    }

  }

  async signOut() {
    this.setState(({
      data: {...this.data},
      waiting: true
    }))

    try {
      const response = await fetch('/api/v1/users/sign', {
        method: "DELETE",
        headers: {
          'X-token': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      })
      const json = await response.json()
      if(!response.ok) {
        this.setState({
          data: {...this.data},
          waiting: false
        })
        const error = await response.json()
        throw new Error(error.error.message)
      } else {
        localStorage.removeItem('token')
        this.setState({
          data: {}
        })
      }
    } catch (error) {
      this.setState({
        data: {...this.data, error: error.message},
        waiting: false
      })
    }
  }
}

export default AuthState;