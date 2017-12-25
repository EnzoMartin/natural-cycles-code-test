import React from 'react'

import Head from '../components/head'
import Nav from '../components/nav'

export default () => (
  <div>
    <Head title="Login" />
    <Nav hideRightNav />

    <div className="hero">
      <h1 className="title">Welcome!</h1>
      <p className="description">Please sign in</p>

      <div className="row">
        <form action="/login" method="post" id="login">
          <label>
            <span>Username:</span>
            <input name="username" type="text" />
          </label>
          <label>
            <span>Password:</span>
            <input name="password" type="password" />
          </label>
          <button type="submit">LOGIN</button>
        </form>
      </div>
    </div>

    <style jsx>
      {`
        .hero {
          width: 100%;
        }
        .title {
          margin: 0;
          width: 100%;
          padding-top: 20px;
          line-height: 1.15;
          font-size: 48px;
        }
        .description {
          margin: 8px 0;
        }
        .title,
        .description {
          text-align: center;
        }
        #login {
          background-color: #fff;
          border-radius: 3px;
          padding: 14px 24px;
          color: rgba(0, 0, 0, 0.87);
          min-width: 400px;
          box-shadow: 0px 2px 2px 3px rgba(0, 0, 0, 0.2);
        }
        #login label {
          margin: 16px 0;
          display: block;
          width: 100%;
        }
        #login label + label {
          margin-top: 24px;
          margin-bottom: 32px;
        }
        #login input {
          margin-top: 4px;
          display: block;
          border: none;
          padding: 3px;
          width: 100%;
          border-bottom: 1px solid rgba(0, 0, 0, 0.12);
        }
        #login input:focus {
          padding-bottom: 1px;
          border-bottom: 3px solid #5abc5a;
        }
        #login button {
          border: none;
          padding: 12px 0;
          background-color: #5abc5a;
          transition: all 0.1s ease;
          width: 100%;
          border-radius: 28px;
          font-size: 16px;
          color: #fff;
          display: block;
          cursor: pointer;
          margin-top: 16px;
        }
        #login button:hover {
          background-color: #42a142;
          color: rgba(255, 255, 255, 0.8);
          border-color: #a2a2a2;
        }
        #login button:active {
          background-color: #42a142;
          color: rgba(255, 255, 255, 0.8);
        }
        .row {
          max-width: 880px;
          margin: 40px auto;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }
      `}
    </style>
  </div>
)
