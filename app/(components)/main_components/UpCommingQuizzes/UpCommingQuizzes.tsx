import React from 'react';

// Data for the quizzes, matching the image. This makes the component easy to reuse and update.
const quizData = [
  {
    id: 1,
    title: 'Introduction to computer programming',
    date: '12/03/2023',
    time: '09:00 AM',
    studentsEnrolled: 32,
    iconColor: 'bg-orange-100', // Color of the square behind the icon
    // Simple placeholder icon. In a real project, you'd use a better icon or image.
    icon: (
      <svg className="w-16 h-16 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Psychology 101',
    date: '27/03/2023',
    time: '12:00 PM',
    studentsEnrolled: 17,
    iconColor: 'bg-orange-100',
    icon: (
      <svg className="w-16 h-16 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  // Adding the repeated quizzes to match the image exactly
  {
    id: 3,
    title: 'Introduction to computer programming',
    date: '12/03/2023',
    time: '09:00 AM',
    studentsEnrolled: 32,
    iconColor: 'bg-orange-100',
    icon: (
      <svg className="w-16 h-16 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Psychology 101',
    date: '27/03/2023',
    time: '12:00 PM',
    studentsEnrolled: 17,
    iconColor: 'bg-orange-100',
    icon: (
      <svg className="w-16 h-16 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
];

const UpcomingQuizzes = () => {
  return (
    // Outer card container with shadows and rounded corners
    <div className="bg-white p-6 rounded-3xl shadow-lg w-full max-w-xl mx-auto border border-neutral-100">
      
      {/* Header section with title and "Quiz directory" link */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-extrabold text-neutral-900">Upcoming 5 quizzes</h2>
        <a href="#" className="flex items-center text-sm font-medium text-neutral-500 hover:text-neutral-800 transition-colors">
          Quiz directory
          <svg className="w-4 h-4 ml-1 text-lime-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      {/* List of quiz items */}
      <div className="space-y-4">
        {quizData.map((quiz) => (
          // Individual quiz list item card
          <div key={quiz.id} className="flex border border-neutral-200 rounded-2xl overflow-hidden hover:border-neutral-300 hover:shadow-md transition-all duration-200">
            
            {/* The colored icon square on the left */}
            <div className={`flex-shrink-0 w-28 h-28 ${quiz.iconColor} p-2 flex items-center justify-center`}>
              <div className="p-2 border-2 border-dashed border-orange-200 rounded-xl">
                 {quiz.icon}
              </div>
            </div>
            
            {/* Quiz details text area */}
            <div className="grow p-4 pl-6 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-neutral-800 leading-snug">{quiz.title}</h3>
                <p className="text-sm font-medium text-neutral-500 mt-1">
                  {quiz.date} <span className="mx-1">|</span> {quiz.time}
                </p>
                <p className="text-sm font-medium text-neutral-500 mt-2">
                  No. of students enrolled: <span className="font-semibold text-neutral-800">{quiz.studentsEnrolled}</span>
                </p>
              </div>
              
              {/* "Open" action link with arrow */}
              <div className="self-end mt-1">
                <a href="#" className="flex items-center text-sm font-semibold text-neutral-800 hover:text-neutral-950 transition-colors">
                  Open
                  <div className="w-6 h-6 ml-1.5 flex items-center justify-center bg-lime-100 rounded-full border border-lime-200 group">
                    <svg className="w-4 h-4 text-lime-600 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingQuizzes;