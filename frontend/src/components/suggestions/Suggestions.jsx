import React, { useState } from 'react'

function Suggestions({ prompt }) {
    const [suggestions, setSuggestions] = useState('');



    gemini()
    return (
        <div>
            <p>{suggestions}</p>
        </div>
    )
}

export default Suggestions
