import { CustomTable, Question } from '@/app/(components)/dashboardShard/customTable/customTable'
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
    return <p> faild to fetch questions: {res.status}</p>
  }

  const data = await res.json()

  const questions = data.map((item: Question) => ({
    _id: item._id,
    questionTitle: item.questionTitle,
    questionDesc: item.questionDesc,
    questionDifficultyLevel: item.questionDifficultyLevel,
    questionType: item.questionType,
  }))

  return <CustomTable questions={questions} token={token} />
}