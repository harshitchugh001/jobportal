import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const JobOpenings = () => {
    // State to store the fetched jobs
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://job-portal-yqqs.onrender.com/api/getalljob', {
                    params: {
                        page: 1,
                        limit: 10
                    }
                });
                console.log(response.data.jobs);

                setJobs(response.data.jobs);
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchData();
    }, []);


    return (
        <>
            <div className='flex  justify-center items-center h-screen w-full'>
                <div className="w-full max-w-4xl p-4"> 
                    <h1 className="text-2xl font-bold text-center mb-4">Job Openings</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {jobs.map((job, index) => (
                            <Link to={`/job/${job.jobId}`} key={index} className="no-underline">
                                <div className="p-4 border rounded-lg shadow-lg cursor-pointer hover:bg-gray-100">
                                    <h2 className="font-bold text-xl">{job.jobTitle}</h2>
                                    <p className="text-gray-800">{job.companyName}</p>
                                    <p className="text-gray-600">{job.location}</p>
                                    <p className="mt-2 text-gray-700">{job.jobId}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default JobOpenings;
