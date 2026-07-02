import { useEffect, useState } from 'react'
import { extractCollection, useLocalApiFallback } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const teamsEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const isLocalApi = useLocalApiFallback()

  useEffect(() => {
    let isMounted = true

    async function loadTeams() {
      try {
        const response = await fetch(teamsEndpoint)

        if (!response.ok) {
          throw new Error(`Teams request failed with ${response.status}`)
        }

        const payload = await response.json()

        if (isMounted) {
          setTeams(extractCollection(payload, 'teams'))
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

    loadTeams()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="data-section">
      <SectionHeader title="Teams" endpoint={teamsEndpoint} isLocalApi={isLocalApi} />
      {isLoading && <p className="state-text">Loading teams...</p>}
      {error && <p className="alert alert-danger mb-0">{error}</p>}
      {!isLoading && !error && (
        <div className="record-grid">
          {teams.map((team) => (
            <article className="record-card" key={team._id ?? team.name}>
              <p className="eyebrow">{team.memberCount} members</p>
              <h3>{team.name}</h3>
              <p>{team.motto}</p>
              <div className="metric-strip">
                <span>Weekly goal</span>
                <strong>{team.weeklyGoalMinutes} min</strong>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

function SectionHeader({ title, endpoint, isLocalApi }) {
  return (
    <div className="section-header">
      <div>
        <p className="eyebrow">Groups</p>
        <h2>{title}</h2>
      </div>
      <div className="endpoint-pill">
        <span>{isLocalApi ? 'Local API' : 'Codespaces API'}</span>
        <code>{endpoint}</code>
      </div>
    </div>
  )
}

export default Teams