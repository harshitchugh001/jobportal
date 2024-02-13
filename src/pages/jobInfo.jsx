import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';



const jobInfo = () => {
    const [jobData, setJobData] = useState({});

    const { jobId } = useParams(); // Retrieve the jobId from the URL

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://job-portal-yqqs.onrender.com/api/getjob', {
                    params: {
                        jobId: jobId
                    }
                });
                console.log(response.data.job);

                setJobData(response.data.job);
                console.log('Here-->', jobData);
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchData();
    }, [jobId]);

    useEffect(() => {
        console.log('Updated job data:', jobData);
    }, [jobData]);


    return (

        <>
            <div className='h-screen w-full container items-center'>

                <h2>{jobData.companyName}</h2>
            </div>
        </>

    )
}

export default jobInfo
