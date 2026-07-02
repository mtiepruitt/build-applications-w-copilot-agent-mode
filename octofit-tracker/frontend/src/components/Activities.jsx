import { useEffect, useState } from 'react'
import { extractCollection, formatDate, useLocalApiFallback } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const activitiesEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function Activities() {
  const [activities, setActivities] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const isLocalApi = useLocalApiFallback()

  useEffect(() => {
    let isMounted = true

    async function loadActivities() {
      try {
        const response = await fetch(activitiesEndpoint)

        if (!response.ok) {
          throw new Error(`Activities request failed with ${response.status}`)
        }

        const payload = await response.json()

        if (isMounted) {
          setActivities(extractCollection(payload, 'activities'))
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

    loadActivities()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="data-section">
      <SectionHeader title="Activities" endpoint={activitiesEndpoint} isLocalApi={isLocalApi} />
      {isLoading && <p className="state-text">Loading activities...</p>}
      {error && <p className="alert alert-danger mb-0">{error}</p>}
      {!isLoading && !error && (
        <div className="record-grid">
          {activities.map((activity) => (
            <article className="record-card" key={activity._id ?? `${activity.username}-${activity.completedAt}`}>
              <p className="eyebrow">{formatDate(activity.completedAt)}</p>
              <h3>{activity.activityType}</h3>
              <dl>
                <div>
                  <dt>Member</dt>
                  <dd>{activity.username}</dd>
                </div>
                <div>
                  <dt>Duration</dt>
                  <dd>{activity.durationMinutes} min</dd>
                </div>
                <div>
                  <dt>Calories</dt>
                  <dd>{activity.caloriesBurned}</dd>
                </div>
              </dl>
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
        <p className="eyebrow">Training log</p>
        <h2>{title}</h2>
      </div>
      <div className="endpoint-pill">
        <span>{isLocalApi ? 'Local API' : 'Codespaces API'}</span>
        <code>{endpoint}</code>
      </div>
    </div>
  )
}

export default Activities