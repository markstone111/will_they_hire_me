import React from 'react'
import dayjs from 'dayjs'
import Image from 'next/image'
import { dummyInterviews } from '@/constants'
import { getRandomInterviewCover } from '@/lib/utils';
import { Button } from '@/components/ui/button'
import { Link } from 'lucide-react';
import DisplayTechIcons from './DisplayTechIcons';

const InterviewCard = ({interviewId, userId, role, type, techstack, createdAt}:InterviewCardProps) => {
    const feedback = null as Feedback | null;
    const normalisedType = /mix/gi.test(type) ? "Mixed" : type;
    const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format('MMM D, YYYY');
  return (
    <div className='card-border w-[360px] max-sm:w-full min-h-96'>
        <div className='card-interview'>
            <div>
                <div className='absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600'>
                    <p className='badge-text'>{normalisedType}</p>
                </div>
                <Image src={getRandomInterviewCover()} alt="Cover image" width={90} height={90} className='rounded-full object-fit size-[90px]'/>
                <h3 className='mt-5 capitalize'>{role} Interview</h3>
                <div className='flex flex-row gap-5 mt-3'>
                    <div className='flex flex-row gap-2'>
                        <Image src="/calendar.svg" alt="calendar" width={22} height={22} />
                        <p>{formattedDate}</p>
                    </div>
                    <div className='flex flex-row gap-2'>
                        <Image src="/star.svg" alt="star" width={22} height={22} />
                        <p>{feedback?.totalscore || '---'}/100</p>
                    </div>
                </div>
                <p>
                    {feedback?.finalAssesment || "You haven't given this interview yet. Try it out now!"}
                </p>
            </div>
            <div className='flex flex-row justify=between'>
                <DisplayTechIcons techstack={techstack} />
                <Button className='btn-primary'>
                    <Link href={feedback
                            ? `/interview/${interviewId}/feedback`
                            : `/interview/${interviewId}`
                            }>
                        {feedback ? 'Check Feedback' : 'View Interview'}
                    
                    </Link>
                </Button>
            </div>
        </div>
    </div>
  )
}   

export default InterviewCard