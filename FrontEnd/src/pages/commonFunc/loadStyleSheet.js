import { useEffect } from 'react'

const LoadStyleSheet = (stylePath, rel, type) => {
    useEffect(() => {
        var head = document.head;
        var link = document.createElement('link');

        if(type != null){
            link.type = type
        }

        if(rel != null){
            link.rel = rel
        }

        link.href = stylePath;
        head.appendChild(link);

        return () => {
            head.removeChild(link);
        }
    }, [stylePath, type, rel]);
};

export default LoadStyleSheet;
