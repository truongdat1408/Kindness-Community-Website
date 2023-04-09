import { useEffect } from 'react'

const UseScript = url => {
    useEffect(() => {
        const script = document.createElement('script');

        script.src = url;
        script.async = false;

        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        }
    }, [url]);
};

export default UseScript;