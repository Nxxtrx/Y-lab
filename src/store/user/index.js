import StoreModule from "../module";

class User extends StoreModule {
  initState() {
    return {
      user: {},
      waiting: false
    }
  }

  async load(id) {
    this.setState({
      user: {},
      waiting: true,
    })
    try {
      const response = await fetch(`/api/v1/users/${id}?fields=*`, {
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
          user: {
            id: json.result._id,
            userName: json.result.profile.name,
            phone: json.result.profile.phone,
            email: json.result.email
          },
          waiting: false,
        })
      }
    } catch (error) {
      this.setState({
        user: {},
        waiting: false,
      })
    }

  }
}

export default User
