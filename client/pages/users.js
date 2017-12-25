import React, { Component } from 'react'

import Head from '../components/head'
import Nav from '../components/nav'
import User from '../components/user'

export default class extends Component {
  static getInitialProps({ query, req }) {
    const { error, email } = (req && req.query) || {}
    return { users: query, error, email }
  }

  render() {
    return (
      <div>
        <Head title="Users" />
        <Nav />

        <div id="users">
          <div className="row">
            <h1 className="title">Users</h1>
          </div>
          <div className="row">
            <form
              action="/users"
              method="post"
              id="create"
              className={this.props.error ? 'has-error' : ''}
            >
              <table width="100%" cellPadding="0" cellSpacing="0" border="0">
                <tbody>
                  <tr>
                    <td colSpan="2">Add a new user:</td>
                  </tr>
                  <tr>
                    <td>
                      <label>
                        <input
                          name="email"
                          type="email"
                          placeholder="Email (me@email.com)"
                          defaultValue={this.props.email}
                        />
                      </label>
                    </td>
                    <td>
                      <button type="submit">Add</button>
                    </td>
                  </tr>
                  <tr className="error">
                    <td colSpan="2">
                      <div className="error">
                        Failed to create user, email is likely invalid
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
          <hr />
          <div className="row">
            <table width="100%" cellPadding="0" cellSpacing="0" border="0">
              <thead>
                <tr>
                  <th>Email</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {this.props.users.map(item => {
                  return <User key={item.id} id={item.id} email={item.email} />
                })}
              </tbody>
            </table>
          </div>
        </div>

        <style jsx>
          {`
            hr {
              border-bottom: 1px solid rgb(128, 55, 155);
              border-top: none;
              max-width: 880px;
            }
            h1 {
              margin: 0;
              text-align: left;
              width: 100%;
            }
            #users {
              color: #333;
              text-align: left;
              background-color: #fff;
              border-radius: 3px;
              padding: 14px 24px;
              color: rgba(0, 0, 0, 0.87);
              min-width: 400px;
              margin: 0 8px;
              box-shadow: 0px 2px 2px 3px rgba(0, 0, 0, 0.2);
            }
            table td,
            table th {
              text-align: left;
            }
            #create.has-error .error {
              display: block;
            }
            .error {
              display: none;
              font-size: 13px;
              color: red;
              margin-top: 4px;
            }
            .row {
              max-width: 880px;
              margin: 40px auto;
              display: flex;
              flex-direction: row;
              justify-content: space-around;
            }
            #create {
              width: 450px;
            }
            #create td {
              padding: 0 4px;
            }
            #create input {
              margin-top: 4px;
              display: block;
              border: none;
              padding: 3px;
              width: 100%;
              border-bottom: 1px solid rgba(0, 0, 0, 0.12);
            }
            #create input:focus {
              margin-top: 2px;
              border-bottom: 3px solid #5abc5a;
            }
            #create button {
              margin-left: 12px;
              border: none;
              max-width: 70px;
              padding: 6px 8px;
              background-color: #5abc5a;
              transition: all 0.1s ease;
              width: 100%;
              border-radius: 14px;
              color: #fff;
              display: block;
              cursor: pointer;
            }
            #create button:hover {
              background-color: #42a142;
              color: rgba(255, 255, 255, 0.8);
              border-color: #a2a2a2;
            }
            #create button:active {
              background-color: #42a142;
              color: rgba(255, 255, 255, 0.8);
            }
          `}
        </style>
      </div>
    )
  }
}
