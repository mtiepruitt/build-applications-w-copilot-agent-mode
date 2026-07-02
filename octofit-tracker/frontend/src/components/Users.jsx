import { useEffect, useState } from 'react'
import { extractCollection, useLocalApiFallback } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const usersEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

function Users() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const isLocalApi = useLocalApiFallback()

  useEffect(() => {
    let isMounted = true

    async function loadUsers() {
      try {
        const response = await fetch(usersEndpoint)

        if (!response.ok) {
          throw new Error(`Users request failed with ${response.status}`)
        }

        const payload = await response.json()

        if (isMounted) {
          setUsers(extractCollection(payload, 'users'))
          setError('')
        }
      } catch (requestError) {
        if (isMounted) {
          setError(requestError.message)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadUsers()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="data-section">
      <SectionHeader title="Users" endpoint={usersEndpoint} isLocalApi={isLocalApi} />
      {isLoading && <p className="state-text">Loading users...</p>}
      {error && <p className="alert alert-danger mb-0">{error}</p>}
      {!isLoading && !error && (
        <div className="table-responsive">
          <table className="table align-middle data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Team</th>
                <th>Goal</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id ?? user.username}>
                  <td>{user.displayName}</td>
                  <td>{user.username}</td>
                  <td>{user.team}</td>
                  <td>{user.fitnessGoal}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

function SectionHeader({ title, endpoint, isLocalApi }) {
  return (
    <div className="section-header">
      <div>
        <p className="eyebrow">Directory</p>
        <h2>{title}</h2>
      </div>
      <div className="endpoint-pill">
        <span>{isLocalApi ? 'Local API' : 'Codespaces API'}</span>
        <code>{endpoint}</code>
      </div>
    </div>
  )
}

export default Users