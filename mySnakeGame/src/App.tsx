import React, { useEffect, useRef, useState } from "react"
import "./App.css"
import AppleLogo from "./applePixels.png"
import Monitor from "./background.jpg"
import useInterval from "./useInterval"

const canvasX = 1000
const canvasY = 1000
const initialSnake = [ [ 4, 10 ], [ 4, 10 ], [ 4, 10 ]]
const initialApple = [ [14, 10]]
const scale = 50
const blockCount = Math.floor(canvasX / scale) 
let timeDelay = 120

function App() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null)
	// const applecanvasRef = useRef<HTMLCanvasElement | null>(null)
	const [ snake, setSnake ] = useState(initialSnake)
	const [ apple, setApple ] = useState(initialApple)
	const [ direction, setDirection ] = useState([ 0, -1 ])
	const [ delay, setDelay ] = useState<number | null>(null)
	const [ gameOver, setGameOver ] = useState(false)
	const [ score, setScore ] = useState(0)

	useInterval(() => runGame(), delay)


	useEffect(
		() => {
			if (canvasRef.current) {
				const canvas = canvasRef.current
				const context = canvas.getContext("2d")

				if (context) {
					context.setTransform(scale, 0, 0, scale, 0, 0)
					context.clearRect(0, 0, window.innerWidth, window.innerHeight)
					context.fillStyle = "#a3d001"
					context.strokeStyle = "black"
					context.lineWidth = 0.05;
					snake.forEach(([ x, y ]) => context.fillRect(x, y, 1, 1))
					snake.forEach(([ x, y ]) => context.strokeRect(x, y, 1, 1));
					

					context.fillStyle = "red"
					apple.forEach(([ x, y ]) => context.fillRect(x, y, 1, 1)) 
				}
			}
		},
		[snake, apple, gameOver]
	)

	function handleSetScore() {
		if (score > Number(localStorage.getItem("snakeScore"))) {
			localStorage.setItem("snakeScore", JSON.stringify(score))
		}
	}

	function play() {
		setSnake(initialSnake)
		setApple(initialApple)
		setDirection([ 1, 0 ])
		setDelay(timeDelay)
		setScore(0)
		setGameOver(false)
	}

	function crossBorders(head: number[]){
		for (let i = 0; i < head.length; i++) {
			if (head[i] < 0 || head[i] * scale >= canvasX) {

			}
		}
	}

	function checkCollision(head: number[]) {
		// for (let i = 0; i < head.length; i++) {
		// 	if (head[i] < 0 || head[i] * scale >= canvasX) return true
		// }
		for (const s of snake) {
			if (head[0] === s[0] && head[1] === s[1]) return true
		}
		return false
	}

	function appleAte(newSnake: number[][]): boolean {
		const newApple: number[][] = [[
            Math.floor(Math.random() * 20),
            Math.floor(Math.random() * 20),
        ]];
		if (newSnake[0][0] === apple[0][0] && newSnake[0][1] === apple[0][1]) {
			setScore(score + 1)
			setApple(newApple)
			setDelay(timeDelay--)
			return true
		}
		return false
	}

	function runGame() {
		const newSnake = [ ...snake ]
		const newSnakeHead = [ (newSnake[0][0] + direction[0] + blockCount) % blockCount, (newSnake[0][1] + direction[1] + blockCount) % blockCount ]
		console.log(newSnakeHead)
		newSnake.unshift(newSnakeHead)
		if (checkCollision(newSnakeHead)) {
			setDelay(null)
			setGameOver(true)
			handleSetScore()
		}
		if (!appleAte(newSnake)) {
			newSnake.pop()
		}
		setSnake(newSnake)
	}

	function changeDirection(e: React.KeyboardEvent<HTMLDivElement>) {
		switch (e.key) {
			case "ArrowLeft":
				setDirection([ -1, 0 ])
				break
			case "ArrowUp":
				setDirection([ 0, -1 ])
				break
			case "ArrowRight":
				setDirection([ 1, 0 ])
				break
			case "ArrowDown":
				setDirection([ 0, 1 ])
				break
		}
	}

	return (
		<div onKeyDown={(e) => changeDirection(e)}>
			{/* <img id="fruit" src={AppleLogo} alt="fruit" width="30" /> */}
			{/* <canvas className="target" ref={applecanvasRef} width={`${canvasX}px`} height={`${canvasY}px`} /> */}
			{/* <img src={Monitor} alt="fruit" width="4000" className="monitor" /> */}
			<canvas className="playArea" ref={canvasRef} width={`${canvasX}px`} height={`${canvasY}px`} />
			{gameOver && <div className="gameOver">Game Over</div>}
			<button onClick={play} className="playButton">
				Play
			</button>
			<div className="scoreBox">
				<h2>Score: {score}</h2>
				<h2>High Score: {localStorage.getItem("snakeScore")}</h2>
			</div>
		</div>
	)
}

export default App
