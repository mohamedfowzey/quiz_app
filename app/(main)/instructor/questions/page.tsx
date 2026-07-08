import { QuestionsClient } from '@/app/(components)/dashboardShard/questionsClient/QuestionsClient'
import { Question } from '@/app/(components)/dashboardShard/customTable/customTable'
import { cookies } from 'next/headers'

export default async function Questions() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth_token')?.value

  const res = await fetch('https://upskilling-egypt.com:3005/api/question', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    return <p>failed to fetch questions: {res.status}</p>
  }

  const data = await res.json()

  const questions: Question[] = data.map((item: Question) => ({
    _id: item._id,
    title: item.title,
    description: item.description,
    difficulty: item.difficulty,
    type: item.type,
  }))

  return <QuestionsClient initialQuestions={questions} token={token} />
}