import React, {useState, useEffect}from 'react'

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

function App() {

  //const [text, setText] = useState('')
  
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    interimTranscript,
  } = useSpeechRecognition()

  const [text, changeState] = useTranscript(transcript, resetTranscript, interimTranscript)

  

  if(!browserSupportsSpeechRecognition){
    return <h1>sorry browser does not support.</h1>
  }
  return (
    <>
    <div>
      <h3>Mic: {listening ? 'on' : 'off'}</h3>
      <button onClick={SpeechRecognition.startListening}>on</button>
      <button onClick={SpeechRecognition.stopListening}>off</button>
      <p>{text[0]}</p>
    </div>
     <div>
        <h3>Mic: {listening ? 'on' : 'off'}</h3>
        <button onClick={() => {
          changeState(1)
          SpeechRecognition.startListening()
        }}>on/off</button>
        <h1>{text[1]}</h1>
      
    </div> 
    </>
    

  );
}

export default App;

function useTranscript(transcript, resetTranscript){
  
  const [i, setI] = useState(0)

  const [text, setText] = useState('')
  const [deleteLastWord, setDeleteLastWord] = useState('pop')

  const whichState = [setText, setDeleteLastWord]

  let callback = whichState[i]

  useEffect(() => {
    checkTrans(transcript)
    callback(transcript)
  }, [transcript, callback])

  function changeState(x){
    setI(x)
  }

  return [[text, deleteLastWord], changeState]
}

function checkTrans(transcript){
  const lastPosition = transcript.lastIndexOf(' ')
  //console.log(transcript.substring(lastPosition + 1))
}