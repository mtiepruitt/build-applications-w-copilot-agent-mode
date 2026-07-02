import { useEffect, useState } from 'react'
import { extractCollection, useLocalApiFallback } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const leaderboardEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const isLocalApi = useLocalApiFallback()

  useEffect(() => {
    let isMounted = true

    async function loadLeaderboard() {
      try {
        const response = await fetch(leaderboardEndpoint)

        if (!response.ok) {
          throw new Error(`Leaderboard request failed with ${response.status}`)
        }

        const payload = await response.json()

        if (isMounted) {
          setLeaderboard(extractCollection(payload, 'leaderboard'))
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

    loadLeaderboard()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="data-section">
      <SectionHeader title="Leaderboard" endpoint={leaderboardEndpoint} isLocalApi={isLocalApi} />
      {isLoading && <p className="state-text">Loading leaderboard...</p>}
      {error && <p className="alert alert-danger mb-0">{error}</p>}
      {!isLoading && !error && (
        <div className="leaderboard-list">
          {leaderboard.map((entry) => (
            <article className="leaderboard-row" key={entry._id ?? entry.username}>
              <span className="rank">#{entry.rank}</span>
              <div>
                <h3>{entry.username}</h3>
                <p>{entry.streakDays} day streak</p>
              </div>
              <strong>{entry.points.toLocaleString()} pts</strong>
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
        <p className="eyebrow">Competition</p>
        <h2>{title}</h2>
      </div>
      <div className="endpoint-pill">
        <span>{isLocalApi ? 'Local API' : 'Codespaces API'}</span>
        <code>{endpoint}</code>
      </div>
    </div>
  )
}

export default Leaderboard