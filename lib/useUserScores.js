import { getToken } from './userAuth'
import useSWR from 'swr'

export const USER_SCORES_URL = `${process.env.NEXT_PUBLIC_API_URL}/user/scores`

const useUserScores = () => {
  const fetcher = async url => {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })

    if (!res.ok) {
      const error = new Error('An error occurred while fetching your scores.')
      // Attach extra info to the error object.
      error.info = await res.json()
      error.status = res.status
      throw error
    }
    return res.json().then(data => data.scores)
  }

  const { data, error } = useSWR(USER_SCORES_URL, fetcher)

  return {
    scores: data,
    error: error && error.message,
  }
}

export default useUserScores
