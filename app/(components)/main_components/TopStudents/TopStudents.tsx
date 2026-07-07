import { API_BASE_URL } from '@/app/api/AxiosClient';
import { Student } from '@/app/types/Student';
import {  cookies } from 'next/headers';
import Image from 'next/image';
import avatar from '@/public/images/avatar.avif';
import { toast } from 'sonner';


// Sample student data extracted from the image
const studentsData = [
  {
    id: 1,
    name: 'Emmanuel James',
    rank: '2nd',
    score: '87%',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    avatarBg: 'bg-[#7BB4CB]',
  },
  {
    id: 2,
    name: 'Alice Jasmine',
    rank: '12th',
    score: '65%',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    avatarBg: 'bg-[#DCAE6F]',
  },
  {
    id: 3,
    name: 'Harrison Menlaye',
    rank: '17th',
    score: '60%',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    avatarBg: 'bg-[#18181B]',
  },
  {
    id: 4,
    name: 'Jones Doherty',
    rank: '5th',
    score: '80%',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    avatarBg: 'bg-[#E29A6E]',
  },
  {
    id: 5,
    name: 'Emmanuel James',
    rank: '2nd',
    score: '87%',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    avatarBg: 'bg-[#7BB4CB]',
  },
];

export default async function TopStudents() {
  const cokies = await cookies()
  const userToken = cokies.get('auth_token')?.value;
  const allStudents: Student[] = await fetch(`${API_BASE_URL}/api/student`, {
    headers: {
      'Authorization': `Bearer ${userToken}`
    }
  
  }).then(res => res.json()).catch(err => toast.error(err?.message || 'Failed to fetch students data'));
  console.log(allStudents);
  
  const topStudents: Student[] = allStudents.slice(0, 5);
  return (
    <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-sm border border-gray-100 font-sans">
      
      {/* Header Section */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-gray-900 tracking-tight">
          Top 5 Students
        </h2>
        <a 
          href="#all-students" 
          className="group flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-gray-800 transition-colors"
        >
          All Students
          <svg 
            className="w-4 h-4 text-[#A3D139] transform group-hover:translate-x-0.5 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </a>
      </div>

      {/* Students List Container */}
      <div className="flex flex-col gap-3">
        {topStudents.map((student, index) => (
          <div 
            key={`${student._id}-${index}`}
            className="flex items-center border border-gray-200 rounded-xl overflow-hidden hover:shadow-sm hover:border-gray-300 transition-all cursor-pointer group"
          >
            {/* Colored Background Avatar Container */}
            <div className={`w-16 h-16 flex-shrink-0  relative overflow-hidden`}>
              <Image 
                width={100} 
                height={100}
                src={avatar.src} 
                alt={student.first_name} 
                className="w-full h-full object-cover "
              />
            </div>

            {/* Student Info Body */}
            <div className="flex-1 min-w-0 px-4 flex items-center justify-between">
              <div className="pr-2">
                <h3 className="text-sm font-bold text-gray-800 truncate leading-snug">
                  {student.first_name} {student.last_name}
                </h3>
                <p className="text-xs font-medium text-gray-400 mt-0.5">
                  Status : <span className="text-gray-600 font-semibold">{student.status}</span>
                </p>
                <p className="text-xs font-medium text-gray-400 mt-0.5">

                  Email: <span className="text-gray-600 font-semibold">{student.email}</span>
                </p>
              </div>

              {/* Action Circle Button Indicator */}
              <div className="shrink-0 w-6 h-6 bg-[#111827] rounded-full flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                <svg 
                  className="w-3.5 h-3.5" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </div>

          </div>
        ))}
      </div>
      
    </div>
  );
}