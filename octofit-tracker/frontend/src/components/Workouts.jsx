import { useEffect, useState } from 'react'
import { extractCollection, useLocalApiFallback } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const workoutsEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const isLocalApi = useLocalApiFallback()

  useEffect(() => {
    let isMounted = true

    async function loadWorkouts() {
      try {
        const response = await fetch(workoutsEndpoint)

        if (!response.ok) {
          throw new Error(`Workouts request failed with ${response.status}`)
        }

        const payload = await response.json()

        if (isMounted) {
          setWorkouts(extractCollection(payload, 'workouts'))
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

    loadWorkouts()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="data-section">
      <SectionHeader title="Workouts" endpoint={workoutsEndpoint} isLocalApi={isLocalApi} />
      {isLoading && <p className="state-text">Loading workouts...</p>}
      {error && <p className="alert alert-danger mb-0">{error}</p>}
      {!isLoading && !error && (
        <div className="record-grid">
          {workouts.map((workout) => (
            <article className="record-card" key={workout._id ?? workout.title}>
              <p className="eyebrow">{workout.difficulty}</p>
              <h3>{workout.title}</h3>
              <dl>
                <div>
                  <dt>Focus</dt>
                  <dd>{workout.focusArea}</dd>
                </div>
                <div>
                  <dt>Duration</dt>
                  <dd>{workout.durationMinutes} min</dd>
                </div>
                <div>
                  <dt>Goal</dt>
                  <dd>{workout.suggestedForGoal}</dd>
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
        <p className="eyebrow">Suggestions</p>
        <h2>{title}</h2>
      </div>
      <div className="endpoint-pill">
        <span>{isLocalApi ? 'Local API' : 'Codespaces API'}</span>
        <code>{endpoint}</code>
      </div>
    </div>
  )
}

export default Workouts