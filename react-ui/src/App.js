import React, {useState, useEffect, useRef}from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import useCommandsHash from './dataStructures/commandsHash'

function App() {
  
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    interimTranscript,
    finalTranscript,
  } = useSpeechRecognition()

  const [hash, {addToCommands, removeCommand, changeCommand, checkForCommand}] = useCommandsHash()

  const [text, changeState] = useTranscript(transcript, resetTranscript, finalTranscript, checkForCommand)

  function notImportant(){
    console.log('command triggered')
  }
  useEffect(() => {
     addToCommands('pop', 'delete last word', notImportant, {key: 1, name: 'not important'})
     
  }, [])
  
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

function useTranscript(transcript, resetTranscript, finalTranscript, findCommandAndProcess){
  //refactor this how to add and update command. function to add to hash.
  const [i, setI] = useState(0)

  const [text, setText] = useState('')
  const transcriptLengthRef = useRef(0)
  

  const whichState = [setText]

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

          /*
            Here some where I need to check the last word added and check it against the command.

            I have a function to retrieve all the information about the command from the hash. 

            And im going to pass the index of first and last letter.
              I will have to check the word is still in the same place. Because punctuation will be added in final transcript. 
          */

         console.log(findCommandAndProcess(transcript))

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
  
  return [[text], changeState]
}

