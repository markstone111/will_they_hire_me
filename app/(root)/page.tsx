import { Button } from '@/components/ui/button'
import { Link } from 'lucide-react'
import React from 'react'
import Image from 'next/image'
import { dummyInterviews } from '@/constants'
import InterviewCard from '@/components/InterviewCard'

const page = () => {
  return (
    <>
      <section className='card-cta'>
        <div className='flex flex-col gap-6 max-w-lg'>
          <h2>
            Get Ready for your real Interviews with AI-powered pracctice and Feedback.
          </h2>
          <p>
            Practice on real Interview Questions & get instant feedback on your answers.
          </p>
          <Button asChild className='btn-primary max-sm:w-full'>
            <Link href='/interview'> Start Practicing</Link>
          </Button>
        </div>
        <Image src="/robot.png" alt="robo-dude" width={400} height={400} className="max-sm:hidden" />
      </section>
      <section className='flex flex-col gap-6 mt-8'>
        <h2>Your Interviews</h2>
        <div className='interviews-section'>
          {dummyInterviews.map((interview) =>(
            <InterviewCard {...interview} key={interview.id} />
          ))}
          {/* <p>You haven&apost; given any Interview yet.</p> */}
        </div>
      </section>
      <section className='flex flex-col gap-6 mt-8'>
        <h2>
          Give an Interview
        </h2>
        <div className='interviews-section'>
          {dummyInterviews.map((interview) =>(
            <InterviewCard {...interview} key={interview.id} />
          ))}
          {/* <p>There are no interviews available at the moment.</p> */}
        </div>
      </section>
    </>
  )
}

export default page