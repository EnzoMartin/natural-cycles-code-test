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
        <Head title="View Users" />
        <Nav />

        <div className="hero">
          <div className="row">
            <form action="/users" method="post">
              <div>Add a new user:</div>
              <div>
                <label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email (me@email.com)"
                    defaultValue={this.props.email}
                  />
                </label>
                <button type="submit">Add</button>
              </div>
              {this.props.error ? (
                <div className="error">
                  Failed to create user, email is likely invalid
                </div>
              ) : null}
            </form>
          </div>
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
            .hero {
              width: 100%;
              color: #333;
              text-align: left;
            }
            .title {
              margin: 0;
              width: 100%;
              padding-top: 80px;
              line-height: 1.15;
              font-size: 48px;
            }
            table td,
            table th {
              text-align: left;
            }
            .title,
            .description {
              text-align: center;
            }
            .error {
              color: red;
            }
            .row {
              max-width: 880px;
              margin: 80px auto 40px;
              display: flex;
              flex-direction: row;
              justify-content: space-around;
            }
            .card {
              padding: 18px 18px 24px;
              width: 220px;
              text-align: left;
              text-decoration: none;
              color: #434343;
              border: 1px solid #9b9b9b;
            }
            .card:hover {
              border-color: #067df7;
            }
            .card h3 {
              margin: 0;
              color: #067df7;
              font-size: 18px;
            }
            .card p {
              margin: 0;
              padding: 12px 0 0;
              font-size: 13px;
              color: #333;
            }
          `}
        </style>
      </div>
    )
  }
}
