import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';



const jobInfo = () => {
    const [jobData, setJobData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [shareLink, setShareLink] = useState('');
    const { jobId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://job-portal-yqqs.onrender.com/api/getjob', {
                    params: {
                        jobId: jobId
                    }
                });
                // console.log(response.data.job);

                setJobData(response.data.job);
                // console.log('Here-->', jobData); 
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchData();
    }, [jobId]);

    useEffect(() => {
        console.log('Updated job data:', jobData);
    }, [jobData]);

    const generateShareLink = async () => {
        const userId = '12345678'; // This will be the hardcoded user ID


        // Create the object with userId and jobId
        const requestBody = {
            userId: userId,
            jobId: jobId
        };

        try {
            const response = await axios.post('https://job-portal-yqqs.onrender.com/api/generatejoblink', requestBody);

            console.log(response.data);
            setShareLink(response.data.shareLink);
            setShowModal(true);
        } catch (error) {
            console.error('Error generating share link:', error);
        }
    };


    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareLink).then(() => {
            console.log('Link copied to clipboard!');
        }, (err) => {
            console.error('Could not copy link: ', err);
        });
    };
    return (

        <>
            <div className='w-full h-screen bg-gray-100 p-4'>
                <div className='max-w-2xl mx-auto bg-white shadow-lg rounded p-6'>
                    <h1 className='text-2xl font-bold mb-4'>{jobData.jobTitle}</h1>
                    <div className='text-sm mb-4'>
                        <span className='font-medium'>Company:</span> {jobData.companyName}
                    </div>
                    <div className='mb-4'>
                        <span className='font-medium'>Location:</span> {jobData.location}
                    </div>
                    <div className='mb-4'>
                        <span className='font-medium'>Experience:</span> {jobData.experience}
                    </div>
                    <div className='mb-4'>
                        <span className='font-medium'>Salary:</span> {jobData.salary}
                    </div>
                    <div className='mb-4'>
                        <span className='font-medium'>Job Description:</span>
                        <p>{jobData.description}</p>
                    </div>
                    <div className='mb-4'>
                        <span className='font-medium'>Responsibilities:</span>
                        <p>{jobData.responsibilities}</p>
                    </div>
                    <div>
                        <div >
                            <div className='flex justify-between mt-4'>
                                <button
                                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                                    type='button'
                                >
                                    Apply for this job
                                </button>


                                <button
                                    className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                                    type='button'

                                    onClick={generateShareLink}
                                >
                                    <i className='fas fa-share mr-2'></i>
                                    Share this job
                                </button>
                                {showModal && (
                                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
                                        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                                            <div className="mt-3 text-center">
                                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                                                    {/* Icon or image for modal */}
                                                </div>
                                                <h3 className="text-lg leading-6 font-medium text-gray-900">Share Link</h3>
                                                <div className="mt-2 px-7 py-3">
                                                    <p className="text-sm text-gray-500">
                                                        Click the copy button to share the job link.
                                                    </p>
                                                    <input type="text" readOnly value={shareLink} className="w-full text-center" />
                                                </div>
                                                <div className="items-center px-4 py-3">
                                                    <button
                                                        id="ok-btn"
                                                        className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                                                        onClick={copyToClipboard}
                                                    >
                                                        Copy
                                                    </button>
                                                </div>
                                                <div className="items-center px-4 py-3">
                                                    <button
                                                        id="close-btn"
                                                        className="px-4 py-2 bg-gray-200 text-gray-900 text-base font-medium rounded-md w-full shadow-sm focus:outline-none"
                                                        onClick={() => setShowModal(false)}
                                                    >
                                                        Close
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default jobInfo
