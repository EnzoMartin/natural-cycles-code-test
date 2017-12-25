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
            {!this.props.hideRightNav ? <a href="/logout">Logout</a> : null}
          </ul>
        </ul>

        <style jsx>{`
          :global(body) {
            margin: 0;
            padding: 0;
            background: #999;
            font-family: Roboto, Helvetica, sans-serif;
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
            color: #067df7;
            text-decoration: none;
            font-size: 13px;
          }
        `}</style>
      </nav>
    )
  }
}

Nav.propTypes = {
  hideRightNav: bool,
}
