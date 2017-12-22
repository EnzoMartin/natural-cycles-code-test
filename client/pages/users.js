import Head from '../components/head'
import Nav from '../components/nav'

const users = [
  {
    id: 'id',
    email: 'a@a.com',
  },
  {
    id: 'id3',
    email: 'a@a.com',
  },
  {
    id: 'id1',
    email: 'a@a.com',
  },
  {
    id: 'id2',
    email: 'a@a.com',
  },
  {
    id: 'id5',
    email: 'a@a.com',
  },
  {
    id: 'id6',
    email: 'a@a.com',
  },
  {
    id: 'id8',
    email: 'a@a.com',
  },
]

export default () => (
  <div>
    <Head title="View Users" />
    <Nav />

    <div className="hero">
      <div className="row">
        <label>
          Email:
          <input name="name" />
        </label>
        <button>Add</button>
      </div>
      <div className="row">
        <table cellPadding="0" cellSpacing="0" border="0">
          <thead>
            <tr>
              <th>Email</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {users.map(item => {
              return (
                <tr key={item.id}>
                  <td>{item.email}</td>
                  <td>
                    <button>Delete</button>
                  </td>
                </tr>
              )
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
