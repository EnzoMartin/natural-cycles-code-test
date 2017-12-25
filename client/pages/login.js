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
        <form action="/login" method="post">
          <label>
            Username:
            <input name="username" type="text" />
          </label>
          <label>
            Password:
            <input name="password" type="password" />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>

    <style jsx>
      {`
        .hero {
          width: 100%;
          color: #333;
        }
        .title {
          margin: 0;
          width: 100%;
          padding-top: 80px;
          line-height: 1.15;
          font-size: 48px;
        }
        .title,
        .description {
          text-align: center;
        }
        .row {
          max-width: 880px;
          margin: 80px auto 40px;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }
      `}
    </style>
  </div>
)
