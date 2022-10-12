import ScoreCard from '../../components/ScoreCard'
import Layout from '../../components/Layout'
import useUserScores from '../../lib/useUserScores'
import { useEffect, useState } from 'react'
import { getUsername } from '../../lib/userAuth'

const Golfers = () => {
  const [ username, setUsername ] = useState('')
  useEffect(() => setUsername(getUsername()), [])

  const { scores, error } = useUserScores()

  return (
    <Layout>
      <div className="text-xl">Hi, {username}!</div>
      <>
        {error ? (
          error
        ) : (
          <>
            {scores &&
              (scores.length === 0
                ? ('You have no scores.')
                : scores.map(score => (
                  <ScoreCard
                    key={score.id}
                    id={score.id}
                    totalScore={score.total_score}
                    playedAt={score.played_at}
                    userId={score.user_id}
                    userName={score.user_name}
                  />
                )))
            }
          </>
        )}
      </>
    </Layout>
  )
}

export default Golfers
