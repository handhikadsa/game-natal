import Crossword from '@jaredreisinger/react-crossword';
import { useState, useRef, useEffect } from 'react'
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
    
    const handleWrong = () => {
        play({ id: "wrong" })
        setModalWrongAnswer(true)
    }

    useEffect(() => {
        window.addEventListener("keydown", function(event) {
            // play({ id: "wrong" })            
            if(event.code === "Backslash") {
                handleWrong()
            }
            // Consume the event so it doesn't get handled twice
            event.preventDefault();
          }, true);
    }, []);

    // 19 Column
    // 22 Row

    const data = {
        across: {
            2: { clue: 'Burung terbang dengan?', answer: 'SEMAUNYA', row: 17, col: 3 },
            3: { clue: 'Api dipegang terasa?', answer: 'SUSAH', row: 18, col: 10 },
            6: { clue: 'Di rumah makan Padang, selain pakai sendok kita makan pakai?', answer: 'TENAGA', row: 4, col: 7 },
            8: { clue: 'Seseorang yang memimpin sebuah desa, biasanya dipanggil pak?', answer: 'NOLEH', row: 2, col: 9 },
            9: { clue: 'Makan duit rakyat disebut?', answer: 'DEBUS', row: 16, col: 0 },
            11: { clue: 'Di dalam perpustakaan tidak boleh?', answer: 'BERAKSI', row: 21, col: 2 },
            12: { clue: 'Pantai tempat orang?', answer: 'RAMAI', row: 6, col: 11 },
            15: { clue: 'Rizky febian lahir di...', answer: 'GENDONG', row: 8, col: 13 },
          },
        down: {
            4: { clue: 'Yang sering mendapat nilai 100 saat ulangan yaitu?', answer: 'KERTAS', row: 13, col: 6 },
            5: { clue: 'Selain mobil, bus, pesawat, orang pergi dari Jakarta ke Surabaya biasanya menggunakan?', answer: 'CELANA', row: 0, col: 12 },
            12: { clue: 'Saat syukuran biasanya kita menyediakan?', answer: 'RUANGAN', row: 6, col: 11 },
            13: { clue: 'Jauh di mata, tapi dekat di hati, apakah itu?', answer: 'USUS', row: 18, col: 11 },
            14: { clue: 'Gajah naik motor kelihatan apanya?', answer: 'BOHONGNYA', row: 4, col: 18 },
            16: { clue: 'Apa yang tidak boleh di bawa ke pesawat?', answer: 'SENDIRI', row: 16, col: 4 },
            17: { clue: 'Hewan yang melolong dimalam hari…', answer: 'TERINJAK', row: 12, col: 13 },
            18: { clue: 'Tidak masuk kerja karena hari...', answer: 'DIPHK', row: 8, col: 16 },
            19: { clue: 'Ada guling ada…', answer: 'BENANG', row: 0, col: 9 },
            20: { clue: 'Hewan pemakan segala?', answer: 'RAKUS', row: 13, col: 3 },
            21: { clue: 'Minum menggunakan apa?', answer: 'GELAS', row: 14, col: 10 },
            22: { clue: 'Ngecharge pakai apa?', answer: 'KABEL', row: 5, col: 14 },
        },
    };

    return (
        <>
            <Crossword 
                ref={crossWordRef}
                data={data}
                onCorrect={onCorrect}
                theme={{
                    numberColor: 'black'
                }}
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
                stop()
                setModalWrongAnswer(false)
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Salah!!!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
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
            </Modal>
        </>
    )
}

export default App;
