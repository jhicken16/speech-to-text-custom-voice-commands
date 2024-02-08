import React, {useState, useEffect, useRef}from 'react'

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

function App() {

  //const [text, setText] = useState('')
  
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    interimTranscript,
    finalTranscript,
  } = useSpeechRecognition()

  const [text, changeState] = useTranscript(transcript, resetTranscript, finalTranscript)

  

  if(!browserSupportsSpeechRecognition){
    return <h1>sorry browser does not support.</h1>
  }
  return (
    <>
    <div>
      <h3>Mic: {listening ? 'on' : 'off'}</h3>
      <button onClick={() => {
        changeState(0)
        SpeechRecognition.startListening({continuous: true})
      }}>on</button>
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

function useTranscript(transcript, resetTranscript, finalTranscript){
 
  const [i, setI] = useState(0)

  const [text, setText] = useState('')
  const [deleteLastWord, setDeleteLastWord] = useState('pop')
  const transcriptLengthRef = useRef(0)
  
  const commands = (transcript) => {
    console.log(transcript + 'delete')
    return 'null'
  }
  

  const whichState = [setText, setDeleteLastWord]

  let callback = whichState[i]
  
  useEffect(() => {

//transcript = checkTrans(transcript, commands)

    if(finalTranscript !== ''){

      callback(prev => {
        const toAdd = prev.substring(0, transcriptLengthRef.current) + ' ' + finalTranscript

        transcriptLengthRef.current += finalTranscript.length+1

        return toAdd
      })
      resetTranscript()
      
    }

    else if(transcript !== ''){
      callback(prev => {
        if(prev.length){

          return prev.substring(0, transcriptLengthRef.current) + ` ${transcript}`
        }

        return transcript
      })
    }

  }, [transcript, callback, finalTranscript,resetTranscript])


  //this function is exported from hook and is used to change which state is updated with the transcript.
  function changeState(x){
    setI(x)
  }
  
  return [[text, deleteLastWord], changeState]
}


function checkTrans(transcript, commands){
  if (typeof transcript === 'undefined') {
    // Handle the case when transcript is undefined
    return;
  }
  console.log(transcript)
  const lastPosition = transcript.lastIndexOf(' ')
  const lastWord = transcript.substring(lastPosition + 1)
  console.log(lastWord)
  if(lastWord !== ''){
    var regex = /[A-Z]*pop[A-Z]*\W*/i;
    if(regex.test(lastWord)){
      return commands(transcript)
    }
    else {
      return transcript
    }
  }
  
}