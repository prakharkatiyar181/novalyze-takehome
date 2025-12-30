import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
    text: string;
    shouldAnimate?: boolean;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, shouldAnimate }) => {
    const [displayedText, setDisplayedText] = useState(shouldAnimate ? "" : text);

    useEffect(() => {
        if (!shouldAnimate) {
            setDisplayedText(text);
            return;
        }

        let index = 0;
        const intervalId = setInterval(() => {
            index++;
            setDisplayedText(text.slice(0, index));
            if (index >= text.length) {
                clearInterval(intervalId);
            }
        }, 20);

        return () => clearInterval(intervalId);
    }, [text, shouldAnimate]);

    return <p>{displayedText}</p>;
};

export default TypewriterText;
