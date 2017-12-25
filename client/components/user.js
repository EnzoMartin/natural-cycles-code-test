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
      <tr className="user-row">
        <td>
          <form onSubmit={this.updateUser.bind(this)} ref="form">
            <table width="100%" cellPadding="0" cellSpacing="0" border="0">
              <tbody>
                <tr>
                  <td>
                    <input
                      name="email"
                      type="email"
                      defaultValue={this.props.email}
                      required
                    />
                  </td>
                  <td className="update">
                    <button type="submit">Update</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </td>
        <td className="delete">
          <button onClick={this.confirmDeleteUser.bind(this)}>Delete</button>
        </td>
        <style jsx>
          {`
            .user-row {
              position: relative;
              z-index: 1;
            }
            .user-row td {
              padding: 4px 6px;
              z-index: 2;
            }
            .user-row td:first-of-type {
              padding-left: 0;
            }
            .user-row input {
              margin-top: 4px;
              display: block;
              border: none;
              padding: 3px;
              background: transparent none;
              width: 100%;
              border-bottom: 1px solid rgba(0, 0, 0, 0.12);
            }
            .user-row input:focus {
              padding-bottom: 1px;
              border-bottom: 3px solid #5abc5a;
            }
            .user-row button {
              margin-left: 12px;
              border: none;
              padding: 6px 8px;
              background-color: #5abc5a;
              transition: all 0.1s ease;
              width: 70px;
              border-radius: 14px;
              color: #fff;
              display: block;
              cursor: pointer;
            }
            .user-row button:hover {
              background-color: #42a142;
              color: rgba(255, 255, 255, 0.8);
              border-color: #a2a2a2;
            }
            .user-row button:active {
              background-color: #42a142;
              color: rgba(255, 255, 255, 0.8);
            }
            .user-row .delete,
            .user-row .update {
              width: 80px;
            }
            .user-row .delete button {
              background-color: #d51919;
            }
            .user-row .delete button:hover {
              background-color: #900e0e;
              color: rgba(255, 255, 255, 0.8);
              border-color: #a2a2a2;
            }
            .user-row .delete button:active {
              background-color: #b61313;
              color: rgba(255, 255, 255, 0.8);
            }
            .user-row:after {
              content: '';
              background-color: #efefef;
              position: absolute;
              display: block;
              top: 0;
              bottom: 0;
              width: 99999px;
              left: -999px;
              transition: opacity 0.2s ease-in;
              z-index: -1;
              opacity: 0;
            }
            .user-row:hover:after {
              opacity: 1;
            }
          `}
        </style>
      </tr>
    )
  }
}

User.propTypes = {
  id: string,
  email: string,
}
