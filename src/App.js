import Crossword from '@jaredreisinger/react-crossword';
import { useState, useRef } from 'react'
import { Modal } from 'react-bootstrap'
import useSound from 'use-sound';
import sfx from './sound/sfx.mp3';

const App = () => {

    const [modalWrongAnswer, setModalWrongAnswer] = useState(false)
    const [modalCorrectAnswer, setModalCorrectAnswer] = useState(false)
    const [correctAnswer, setCorrectAnswer] = useState("")
    const [direction, setDirection] = useState("")
    const [play, { stop }] = useSound(sfx, {
        sprite: {
            wrong: [0, 1800],
            correct: [2000, 6000],
        }
    }); 

    const crossWordRef = useRef()

    const reset = () => {
        if (crossWordRef.current) {
            crossWordRef.current.reset()
        }
    }

    const fillAllAnswer = () => {
        if (crossWordRef.current) {
            crossWordRef.current.fillAllAnswers()
        }
    }

    const onCorrect = (direction, number, answer) => {
        play({ id: "correct" })
        if(direction == "across") {
            setDirection("Mendatar")
        } else if (direction == "down") {
            setDirection("Menurun")
        }

        setModalCorrectAnswer(true)
        setCorrectAnswer(answer)
    }

    console.log("new direction: ", direction)

    const data = {
        across: {
            1: { clue: 'Buah yang dipotong-potong, diuleg campur gula jawa dan cabai, jadinya? Lorem ipsum dolor sit amet', answer: 'rusa', row: 0, col: 0 },
            4: { clue: 'is', answer: 'XXX', row: 0, col: 4 },
            7: { clue: 'not', answer: 'XXX', row: 1, col: 0 },
            8: { clue: 'a', answer: 'XXXX', row: 1, col: 4 },
            10: { clue: 'real', answer: 'XX', row: 2, col: 0 },
            11: { clue: 'crossword,', answer: 'XX', row: 2, col: 3 },
            12: { clue: 'it', answer: 'XX', row: 2, col: 6 },
            13: { clue: 'is', answer: 'XXXXXX', row: 3, col: 0 },
            16: { clue: 'only', answer: 'XXXXXX', row: 4, col: 2 },
            19: { clue: 'showing', answer: 'XX', row: 5, col: 0 },
            21: { clue: 'the', answer: 'XX', row: 5, col: 3 },
            22: { clue: 'kind', answer: 'XX', row: 5, col: 6 },
            23: { clue: 'of', answer: 'XXXX', row: 6, col: 0 },
            25: { clue: 'thing', answer: 'XXX', row: 6, col: 5 },
            26: { clue: 'you', answer: 'XXX', row: 7, col: 1 },
            27: { clue: 'can', answer: 'XXX', row: 7, col: 5 },
          },
        down: {
            1: { clue: 'Buah yang dipotong-potong, diuleg campur gula jawa dan cabai, jadinya? Lorem ipsum dolor sit amet.', answer: 'XXXX', row: 0, col: 0 },
            2: { clue: 'All', answer: 'XXXX', row: 0, col: 1 },
            3: { clue: 'of', answer: 'XX', row: 0, col: 2 },
            4: { clue: 'the', answer: 'XXXXXX', row: 0, col: 4 },
            5: { clue: 'answers', answer: 'XX', row: 0, col: 5 },
            6: { clue: 'are', answer: 'XXX', row: 0, col: 6 },
            9: { clue: '"X"', answer: 'XX', row: 1, col: 7 },
            11: { clue: "test", answer: 'XXXXXX', row: 2, col: 3 },
            14: { clue: "test", answer: 'XX', row: 3, col: 2 },
            15: { clue: "test", answer: 'XX', row: 3, col: 5 },
            17: { clue: "test", answer: 'XXXX', row: 4, col: 6 },
            18: { clue: "test", answer: 'XXXX', row: 4, col: 7 },
            19: { clue: "test", answer: 'XX', row: 5, col: 0 },
            20: { clue: "test", answer: 'XXX', row: 5, col: 1 },
            24: { clue: "test", answer: 'XX', row: 6, col: 2 },
            25: { clue: "test", answer: 'XX', row: 6, col: 5 },
        },
    };

    return (
        <>
            <Crossword 
                ref={crossWordRef}
                data={data}
                onCorrect={onCorrect}
            />

            <div className="pe-5" style={{
                opacity: 1,
                marginTop: -100
            }}>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-danger me-5 px-4" onClick={() => {
                        play({ id: "wrong" })
                        setModalWrongAnswer(true)
                    }}>Salah</button>
                    <button className="btn btn-secondary me-5 px-4" onClick={reset}>Reset</button>
                    <button className="btn btn-success me-5 px-4" onClick={fillAllAnswer}>Fill</button>
                </div>
            </div>

            <Modal size="lg" centered show={modalWrongAnswer} onHide={() => {
                play({ id: "wrong" })
                setModalWrongAnswer(false)
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Salah!!!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={() => {
                        stop()
                        setModalWrongAnswer(false)
                    }}>Tutup</button>
                </Modal.Footer>
            </Modal>

            <Modal size="lg" centered show={modalCorrectAnswer} onHide={() => {
                stop()
                setModalCorrectAnswer(false)
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>BENAR!!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h1>{correctAnswer}</h1>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={() => {
                        stop()
                        setModalCorrectAnswer(false)
                    }}>Tutup</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default App;
