import React, {useState, useEffect, useRef}from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import useCommandsHash from './dataStructures/commandsHash'
import { deleteMethod } from './voiceMethods/commandFunctions'
import Queue from './dataStructures/queue'

//components
import CreateUserCommands from './components/createUserCommands/CreateUserCommands'
import DisplayCommands from './components/displayuserCommands/DisplayUserCommands'

function App() {
  
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    interimTranscript,
    finalTranscript,
  } = useSpeechRecognition()

  const [hash, {addToCommands, removeCommand, changeCommand, checkForCommand, hashToArray}] = useCommandsHash()


  const queue = new Queue()
  const [text, changeState] = useTranscript(transcript, resetTranscript, finalTranscript, checkForCommand, queue)

  useEffect(() => {
     addToCommands('pop', 'delete last word', deleteMethod, ' ')
     
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
      <CreateUserCommands addToCommands={addToCommands}/>
    </div>
    <div>
      {hashToArray().map((com) => {
        return <DisplayCommands 
          key={com.command}
          command={com.command} 
          commandDescription={com.commandDescription} 
          removeCommand={removeCommand}
          changeCommand={changeCommand}
          />
      })}
    </div> 
    </>
    

  );
}

export default App;

function useTranscript(transcript, resetTranscript, finalTranscript, findCommandAndProcess, queue){
  //refactor this how to add and update command. function to add to hash.
  const [i, setI] = useState(0)

  const [text, setText] = useState('')
  const transcriptLengthRef = useRef(0)

  const queueRef = useRef(new Queue())
  
  const whichState = [setText]

  let callback = whichState[i]
  
  useEffect(() => {

    if(finalTranscript !== ''){

      callback(prev => {
        let toAdd = prev.substring(0, transcriptLengthRef.current) + ' ' + finalTranscript

        // check queue and process any functions
        /*
          queue works on first in first out. will change text on first command need to take last amount 
          of text removed and change index of next element in queue by that amount.
        */
        while(queueRef.current.head !== null){
          
          let lengthBeforeEdit = toAdd.length

          const head = queueRef.current.removeHead()
          toAdd = head.data.callback(head.data.firstLetterIndex, head.data.lastLetterIndex, head.data.argumentsToPass, toAdd)

          let lengthAfterEdit = toAdd.length

          if(queueRef.current.head !== null){
            queueRef.current.changeIndexes(lengthAfterEdit - lengthBeforeEdit)
          }
        }

        transcriptLengthRef.current = toAdd.length+1

        return toAdd
      })
      resetTranscript()
      
    }

    else if(transcript !== ''){
      
      //console.log(findCommandAndProcess(transcript))
      const command = findCommandAndProcess(transcript)

      if(command){
        command.lastLetterIndex += transcriptLengthRef.current
        command.firstLetterIndex += transcriptLengthRef.current
        queueRef.current.addToQueue(command)
      }
      
      callback(prev => {
        if(prev.length){

          /*
            Here some where I need to check the last word added and check it against the command.

            I have a function to retrieve all the information about the command from the hash. 

            And im going to pass the index of first and last letter.
              I will have to check the word is still in the same place. Because punctuation will be added in final transcript. 
          */

          return prev.substring(0, transcriptLengthRef.current) + ` ${transcript}`
        }
        return transcript
      })
    }

  }, [transcript, callback, finalTranscript, resetTranscript])


  //this function is exported from hook and is used to change which state is updated with the transcript.
  function changeState(x){
    setI(x)
  }
  
  return [[text], changeState]
}

