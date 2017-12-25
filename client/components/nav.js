import React, { Component } from 'react'
import { bool } from 'prop-types'

export default class Nav extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li>
            <a
              href="https://github.com/EnzoMartin/natural-cycles-code-test"
              target="_blank"
            >
              GitHub
            </a>
          </li>
          <ul>
            <li>
              {!this.props.hideRightNav ? <a href="/logout">Logout</a> : null}
            </li>
          </ul>
        </ul>

        <style jsx>{`
          :global(body) {
            margin: 0;
            padding: 0;
            background: rgba(0, 0, 0, 0)
              linear-gradient(to right, rgb(128, 55, 155), rgb(163, 26, 126))
              repeat scroll 0% 0%;
            font-family: Roboto, Helvetica, sans-serif;
            color: #fff;
          }
          nav {
            text-align: center;
          }
          ul {
            display: flex;
            justify-content: space-between;
          }
          nav > ul {
            padding: 4px 16px;
          }
          li {
            display: flex;
            padding: 6px 8px;
          }
          a {
            color: #fff;
            text-decoration: none;
            font-size: 16px;
            transition: opacity 0.1s ease-out;
          }
          a:hover {
            opacity: 0.5;
          }
        `}</style>
      </nav>
    )
  }
}

Nav.propTypes = {
  hideRightNav: bool,
}
