import React from 'react';
import Typewriter from 'typewriter-effect';

function TypewriterComponent({ content }) {
    // // Function to split the content based on bullet points and bold sections
    // const splitContent = (content) => {
    //     // Split by bullet points (starting with '- '), and '**' for bold sections
    //     return content.split(/(\*\*.*?\*\*|- .*)/).filter(Boolean);
    // };

    // const lines = splitContent(content);

    return (
        <div id="typewriter-container">
            <Typewriter
                options={{
                    strings: [content],  // Pass the lines to Typewriter
                    autoStart: true,
                    loop: false,
                    pauseFor: 1000000,
                    delay: 10,  // Add a slight delay between characters
                }}
            />
        </div>
    );
}

export default TypewriterComponent;
