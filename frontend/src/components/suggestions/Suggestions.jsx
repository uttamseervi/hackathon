import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { TypewriterComponent } from "../index";

function Suggestions({ prompt }) {
    const [suggestions, setSuggestions] = useState('');
    const [loading, setLoading] = useState(true);

    const gemini = async () => {
        try {
            setLoading(true);
            const genAi = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);
            const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
            const defaultPrompt = prompt || "Explain how AI works in 100 words.";

            const result = await model.generateContent(defaultPrompt);
            const content = result.response.text();
            setSuggestions(content);
            setLoading(false);
        } catch (error) {
            console.error("Error generating content:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        gemini();
    }, [prompt]);

    return (
        <div className=''>
            <p>
                {loading ? "Loading...." : <TypewriterComponent content={suggestions} />}
            </p>
        </div>
    );
}

export default Suggestions;
