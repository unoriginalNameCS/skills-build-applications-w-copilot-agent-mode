import { useEffect, useState } from 'react'

function normalizeItems(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  if (Array.isArray(payload.items)) {
    return payload.items
  }

  if (Array.isArray(payload.results)) {
    return payload.results
  }

  if (Array.isArray(payload.data)) {
    return payload.data
  }

  return []
}

function Activities({ endpoint }) {
  const [items, setItems] = useState([])
  const [meta, setMeta] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function fetchActivities() {
      setIsLoading(true)
      setError('')

      try {
        const response = await fetch(endpoint, { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        setItems(normalizeItems(payload))
        setMeta(
          payload && typeof payload === 'object' && !Array.isArray(payload)
            ? payload
            : null,
        )
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message || 'Unable to load activities.')
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchActivities()

    return () => controller.abort()
  }, [endpoint])

  return (
    <section>
      <h2 className="mb-3">Activities</h2>
      <p className="text-body-secondary">Endpoint: {endpoint}</p>

      {isLoading && <p>Loading activities...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!isLoading && !error && (
        <>
          <div className="alert alert-light border">
            Loaded <strong>{items.length}</strong> activity records.
          </div>

          {items.length > 0 ? (
            <ul className="list-group mb-3">
              {items.map((item, index) => (
                <li
                  key={item?.id ?? item?._id ?? item?.name ?? index}
                  className="list-group-item"
                >
                  <pre className="mb-0">{JSON.stringify(item, null, 2)}</pre>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mb-3">No activities were returned.</p>
          )}

          {meta && (
            <details>
              <summary>Response metadata</summary>
              <pre className="mt-2">{JSON.stringify(meta, null, 2)}</pre>
            </details>
          )}
        </>
      )}
    </section>
  )
}

export default Activities
