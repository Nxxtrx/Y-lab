import StoreModule from "../module";

class AuthState extends StoreModule {
  initState() {
    return {
      data: {},
      waiting: false,
      access: false,
      isLoading: true
    }
  }

  async signIn(login, password) {
    this.setState({
      data: {...this.data},
      waiting: true,
      access: false
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
        console.log(error.error.data.issues)
        throw new Error(error.error.data.issues[0].message)
      }
      const json = await response.json()
      const token = json.result.token
      localStorage.setItem('token', token)
      this.setState({
        data: {
          id: json.result.user._id,
          userName: json.result.user.profile.name,
        },
        waiting: true,
        access: true
      })

    } catch (error) {
      this.setState({
        data: {...this.data, error: error.message},
        waiting: false,
        access: false,
      })
    }
  }

  async tokenCheck() {
    this.setState({
      data: {},
      waiting: true,
      access: false,
      isLoading: true,
    })
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
            id: json.result._id,
            userName: json.result.profile.name,
          },
          waiting: false,
          isLoading: false,
          access: true,
        })
      }
    } catch (error) {
      this.setState({
        data: {},
        waiting: false,
        access: false
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
          data: {},
          waiting: false,
          access: false,
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