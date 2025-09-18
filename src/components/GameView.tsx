import { useEffect, useState, useRef } from "react"
import Game from "./Game"
import styles from './GameView.module.css';

export default function GameView() {
    const [scrollX, setScrollX] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)
    const gameRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const containerWidth = containerRef.current ? containerRef.current.offsetWidth : 0
            const gameWidth = gameRef.current ? gameRef.current.offsetWidth : 0
            const minScrollX = 0
            const maxScrollX = gameWidth - containerWidth

            if (["ArrowRight", "d", "D"].includes(event.key)) {
                setScrollX(scrollX => Math.min(maxScrollX, scrollX + 1))
            } else if (["ArrowLeft", "a", "A"].includes(event.key)) {
                setScrollX(scrollX => Math.max(minScrollX, scrollX - 1))
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
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