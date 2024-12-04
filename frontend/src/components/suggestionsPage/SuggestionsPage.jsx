import React from 'react'
import Suggestions from '../suggestions/Suggestions'
import { useSelector } from 'react-redux'
const SuggestionsPage = () => {
        const latitude = useSelector((state)=> state.location.latitude);
        const longitude = useSelector((state)=> state.location.longitude);
        

    return (
        <div className='h-screen mt-2 flex justify-center gap-5 flex-col items-center'>
            <div id='cropsSuggestion' className='bg-base-200 w-2/4 rounded-md h-80 p-3 overflow-auto'>
                <div className='font-bold text-white mb-2'>
                <h1>Ideal Crops Based on Your Location 🌍</h1>
                </div>
                <p className='text-white'><Suggestions prompt={`Based on the coordinates (latitude: ${latitude}, longitude: ${longitude}), identify the region or place name and list the top 5 suitable crops for cultivation. Provide the response in 100 words, following this format:
                Place Name:
                Crop: Reason
                Crop: Reason
                (Highlight climate, soil, and practice relevance.)`} /></p>
            </div>
            <div id='latestPracticesSuggestions' className='bg-base-200 w-2/4 rounded-md h-80 p-3 overflow-auto'>
                <div className='font-bold text-white mb-2'>
                <h1>🌾 Eco-Friendly Agricultural Practices for the Future 🌿</h1>
                </div>
                <p className='text-white'><Suggestions prompt={`Based on the coordinates (latitude: ${latitude}, longitude: ${longitude}), identify the region or place name and suggest the latest sustainable agricultural practices for better yield. Provide the response in 100 words, following this format:
                Place Name:
                - Practice: Brief description of the practice and its benefit (e.g., water conservation, soil health, etc.)
                - Practice: Brief description of the practice and its benefit
                - Practice: Brief description of the practice and its benefit
                - Focus on the use of natural resources efficiently, climate compatibility, and improved agricultural yield.
`} /></p>
            </div>

        </div>
    )
}

export default SuggestionsPage
