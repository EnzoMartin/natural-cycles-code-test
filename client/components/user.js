import React, { Component } from 'react'
import { string } from 'prop-types'

import polyfillPromise from 'es6-promise'
polyfillPromise.polyfill()
import fetch from 'isomorphic-fetch'

export default class User extends Component {
  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      const error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }

  parseJSON(response) {
    return response.json()
  }

  deleteUser() {
    fetch(`/users/${this.props.id}`, {
      credentials: 'same-origin',
      method: 'DELETE',
    })
      .then(this.checkStatus)
      .then(this.parseJSON)
      .then(data => {
        if (data.success) {
          window.location.reload(true)
        }
      })
      .catch(() => {
        alert(`ERROR: Failed to delete "${this.props.email}"!`)
      })
  }

  confirmDeleteUser() {
    const message = `Are you sure you wish to delete "${this.props.email}"?`
    if (window.confirm(message)) {
      this.deleteUser()
    }
  }

  updateUser(event) {
    event.preventDefault()
    const formData = new FormData(this.refs.form)

    fetch(`/users/${this.props.id}`, {
      method: 'PUT',
      credentials: 'same-origin',
      body: formData,
    })
      .then(this.checkStatus)
      .then(this.parseJSON)
      .then(data => {
        if (data.success) {
          window.location.reload(true)
        }
      })
      .catch(() => {
        alert(
          `ERROR: Failed to update user "${this.props.email}" with new email!`
        )
      })
  }

  render() {
    return (
      <tr>
        <td>
          <form onSubmit={this.updateUser.bind(this)} ref="form">
            <table cellPadding="0" cellSpacing="0" border="0">
              <tbody>
                <tr>
                  <td>
                    <input
                      size="35"
                      name="email"
                      type="email"
                      defaultValue={this.props.email}
                      required
                    />
                  </td>
                  <td>
                    <button type="submit">Update</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </td>
        <td>
          <button onClick={this.confirmDeleteUser.bind(this)}>Delete</button>
        </td>
      </tr>
    )
  }
}

User.propTypes = {
  id: string,
  email: string,
}
