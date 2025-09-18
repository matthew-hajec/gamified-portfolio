import { useEffect, useState, useRef } from "react"
import Game from "./Game"
import styles from './GameView.module.css';

export default function GameView() {
    const [scrollX, setScrollX] = useState(0)
    const [keysDown, setKeysDown] = useState<{[key: string]: boolean}>({})

    const containerRef = useRef<HTMLDivElement>(null)
    const gameRef = useRef<HTMLDivElement>(null)
    const minScrollXRef = useRef(0) // Will always be 0
    const maxScrollXRef = useRef(0)

    const updateBounds = () => {
        const containerWidth = containerRef.current ? containerRef.current.offsetWidth : 0
        const gameWidth = gameRef.current ? gameRef.current.offsetWidth : 0
        minScrollXRef.current = 0
        maxScrollXRef.current = gameWidth - containerWidth

        // If the container width is gte game width, set scrollX to the middle of the container
        if (containerWidth >= gameWidth) {
            setScrollX((maxScrollXRef.current - minScrollXRef.current) / 2)
        } else {
            // Ensure scrollX is within bounds after resizing
            setScrollX(scrollX => Math.min(maxScrollXRef.current, Math.max(minScrollXRef.current, scrollX)))
        }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
        setKeysDown(keys => ({...keys, [event.key]: true}))
    }

    const handleKeyUp = (event: KeyboardEvent) => {
         setKeysDown(keys => ({...keys, [event.key]: false}))
    }

    useEffect(() => {
        const containerWidth = containerRef.current ? containerRef.current.offsetWidth : 0
        const gameWidth = gameRef.current ? gameRef.current.offsetWidth : 0

        if (containerWidth >= gameWidth) {
            // No scrolling needed if game fits within container
            return
        }

        if(keysDown["ArrowRight"] || keysDown["d"] || keysDown["D"]) {
            setScrollX(scrollX => Math.min(maxScrollXRef.current, scrollX + 10))
        } else if (keysDown["ArrowLeft"] || keysDown["a"] || keysDown["A"]) {
            setScrollX(scrollX => Math.max(minScrollXRef.current, scrollX - 10))
        }

    }, [keysDown])

    useEffect(() => {
        updateBounds()
        window.addEventListener("resize", updateBounds)
        return () => {
            window.removeEventListener("resize", updateBounds)
        }
    }, [])

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown)
        window.addEventListener("keyup", handleKeyUp)
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            window.removeEventListener("keyup", handleKeyUp)
        }
    }, [])

    return (    
        <div ref={containerRef} className={styles.container}>
            <div ref={gameRef} className={styles.scroller} style={{ transform: `translateX(${-scrollX}px)` }}>
                <Game />
            </div>
        </div>
  )
}