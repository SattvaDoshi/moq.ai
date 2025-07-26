import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Clock, Copy, List, Mail, PlusIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

function InterviewLink({ interview_id, formData }) {
    // State to track if the URL can be considered valid (i.e., if an ID was provided)
    const [isUrlValid, setIsUrlValid] = useState(true);

    const getProductionUrl = (id) => {
        // ALWAYS use the hardcoded production URL to ensure consistency across all environments.
        if (!id) return ''; // Return an empty string if the id is not yet available.
        return `http://localhost:3000/interview/${id}`;
    };

    // This effect hook now primarily validates the presence of the interview_id prop.
    useEffect(() => {
        if (!interview_id) {
            console.error('Interview ID is missing. The generated link will be invalid.');
            setIsUrlValid(false);
        } else {
            setIsUrlValid(true);
            // For debugging purposes, you can log the URL that will be used.
            console.log('InterviewLink component will use URL:', getProductionUrl(interview_id));
        }
        // This effect depends on interview_id and will re-run if it changes.
    }, [interview_id]);

    /**
     * Handles the copy-to-clipboard functionality for the interview link.
     */
    const onCopyLink = async () => {
        if (!isUrlValid || !interview_id) {
            toast.error('Cannot copy link: Interview ID is missing.');
            return;
        }

        try {
            // Always copy the definitive production URL.
            const productionUrl = getProductionUrl(interview_id);
            await navigator.clipboard.writeText(productionUrl);
            toast.success('Link copied to clipboard!');
        } catch (error) {
            console.error('Failed to copy link to clipboard:', error);
            toast.error('Failed to copy link. Please check browser permissions.');
        }
    };

    return (
        <div className='flex flex-col items-center w-full justify-center mt-10 max-w-2xl mx-auto p-4'>
            <Image src={'/check.png'} alt='check' width={50} height={50} />
            <h2 className='font-bold text-2xl mt-4 text-center'>Your AI Interview is Ready!</h2>
            <p className='mt-2 text-gray-600 text-center'>Share this link with candidates to begin the interview process.</p>
            
            <div className='w-full p-6 mt-6 rounded-xl bg-white shadow-md border'>
                <div className='flex justify-between items-center'>
                    <h2 className='font-bold text-gray-800'>Interview Link</h2>
                    <h2 className='p-1 px-2 text-sm text-blue-600 bg-blue-100 rounded-lg'>Valid for 30 Days</h2>
                </div>

                <div className='mt-4 flex gap-3 items-center'>
                    {/* Using readOnly is more appropriate here as the value is not meant to be changed by the user. */}
                    <Input value={getProductionUrl(interview_id)} readOnly={true} className="bg-gray-50" />
                    <Button onClick={onCopyLink} className='text-blue-600 bg-blue-100 hover:bg-blue-200 flex-shrink-0'><Copy className='mr-2 h-4 w-4'/> Copy Link</Button>
                </div>
                
                {/* Show a helpful error message if the URL is considered invalid. */}
                {!isUrlValid && (
                    <div className="mt-2 text-red-600 text-sm font-semibold">
                        Warning: Interview ID is missing. The link is invalid. Please go back and try creating it again.
                    </div>
                )}
                
                <hr className='my-5' />
                
                <div className='flex gap-6'>
                    <h2 className='text-gray-600 text-sm flex gap-2 items-center'><Clock className='h-4 w-4'/> {formData?.duration || 'N/A'} min</h2>
                    <h2 className='text-gray-600 text-sm flex gap-2 items-center'><List className='h-4 w-4'/> {formData?.questionList?.length || 'N/A'} Questions</h2>
                </div>
            </div>

            {/* Placeholder for sharing functionality */}
            <div className='mt-7 bg-white p-5 rounded-lg shadow-md w-full border'>
                <h2 className='font-bold text-gray-800'>Share Via</h2>
                <div className='gap-3 flex mt-3'>
                    <Button variant={'outline'}><Mail className='mr-2 h-4 w-4' />Email</Button>
                    <Button variant={'outline'}><svg className="mr-2 h-4 w-4" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Slack</title><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.527 2.527 0 0 1 8.834 24a2.527 2.527 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1 2.521-2.52A2.528 2.528 0 0 1 13.876 5.042a2.527 2.527 0 0 1-2.521 2.52H8.834V5.042zm0 1.27h2.521a2.527 2.527 0 0 1 2.521 2.521 2.527 2.527 0 0 1-2.521 2.521H2.522A2.527 2.527 0 0 1 0 8.834a2.527 2.527 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.527 2.527 0 0 1-2.522 2.521h-2.522V8.834zm-1.27 0h-2.522a2.527 2.527 0 0 1-2.521-2.521A2.527 2.527 0 0 1 15.165 0a2.527 2.527 0 0 1 2.521 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1-2.521 2.522A2.528 2.528 0 0 1 10.124 18.956a2.527 2.527 0 0 1 2.521-2.52h2.52v2.52zm0-1.27H12.644a2.527 2.527 0 0 1-2.521-2.521 2.527 2.527 0 0 1 2.521-2.521h6.312a2.527 2.527 0 0 1 2.522 2.521 2.527 2.527 0 0 1-2.522 2.521h-6.313z"/></svg>Slack</Button>
                    <Button variant={'outline'}><svg className="mr-2 h-4 w-4" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>LinkedIn</Button>
                </div>
            </div>

            <div className='flex w-full gap-5 justify-between mt-6'>
                <Link href={'/dashboard'}>
                    <Button variant={'outline'}><ArrowLeft className='mr-2 h-4 w-4' />Back to Dashboard</Button>
                </Link>
                <Link href={'/create-interview'}>
                    <Button className='text-blue-600 bg-blue-100 hover:bg-blue-200'><PlusIcon className='mr-2 h-4 w-4' />Create New Interview</Button>
                </Link>
            </div>
        </div>
    );
}

export default InterviewLink;
