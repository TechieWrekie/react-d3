import { useCallback, useState } from "react"

const useCenterTree = () => {

    const [translate, setTranslate] = useState({ x: 0, y: 0 })
    const containerRef = useCallback((containerEle) => {
        if (containerEle !== null) {
            const { width, height } = containerEle.getBoundingClientRect();
            setTranslate({ x: width / 2, y: height/4 })
        }
    },[])
    return [translate, containerRef]
}

export default useCenterTree;