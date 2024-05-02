
import { useState } from "react"
import ResonseCard from "~components/ResonseCard";
import { ArrowDownIcon,RefreshIcon,SendIcon } from "../../assets";


const Modal= ({ setShowModal }) => {

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [ userPrompt, setUserPrompt] = useState('');

  const [responseArray, setResponseArray] = useState([]);     
  

  const getResult = (input:string)=>{
    // Create a new promise to manage asynchronous operation.
    const pr = new Promise(function(resolve, reject){
    if(input){
      // Use setTimeout to simulate an asynchronous operation, such as a server request.
      setTimeout(() => {
        // If input is valid, resolve the promise with a success message after 2 seconds.
        resolve(`Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.`);
      }, 2000);
    }else{
        // If no input is provided, reject the promise with an error message.
      const err = new Error('Please enter prompt')
      reject(err);
    }
    })
    return pr;
  }

  // handleGenerate function to process input and fetch results
  const handleGenerate =(e)=>{

    // Prevent the default form submit action
    e.preventDefault(); 

    // Set loading state to true to show a disable button
    setIsLoading(true);  

    // Save the current input to state for later use
    setUserPrompt(input)

     // Call getResult passing the current input value
    getResult(input)
    .then(data => {

      // Update the response array to include the new data
      if(data)setResponseArray([...responseArray,data]);
      setIsLoading(false)
    })
    .catch(error =>{
      console.error('Error:', error)
      setIsLoading(false);
      });
  }

  const handleInsert = ()=>{
    // Access the div with the class 'msg-form__contenteditable'
    const editableDiv = document.querySelector('.msg-form__contenteditable');

    // Assuming there is only one <p> element inside this div, get the <p>
    const pElement = editableDiv.querySelector('p');

    // Add some text to the content of the <p>
    pElement.textContent = responseArray.slice(-1)[0];
    console.log('handle insert');
  }


  return (
    <div className="">
      <div className="backdrop" onClick={()=>setShowModal(false)} />
      <div className="modalWindow">
        {/* promt and response  */}
        <div>
          {/* Promts  */}
          <div className="plasmo-flex plasmo-flex-row-reverse plasmo-text-2xl">
           { !!(userPrompt?.length) && <div className="plasmo-bg-gray-300 plasmo-w-1/2 plasmo-p-3 plasmo-rounded-md">
          {userPrompt}
            </div>}
          </div>

          {/* Responses  */}
          {
            responseArray.map((response,index)=> <ResonseCard key={index} response={response}/>)
          }
  
        </div>

        {/* Input Field */}
        <form action="submit" onSubmit={handleGenerate}>
          <div className="plasmo-rounded-md plasmo-p-2 plasmo-border-2 plasmo-mt-8 plasmo-h-[40px] plasmo-flex plasmo-justify-between plasmo-items-center plasmo-border-gray-200 plasmo-text-2xl">
            <input
              type="text"
              className="plasmo-w-[90%] plasmo-outline-none plasmo-bg-white"
              placeholder="Your Prompt"
              required={true}
              value={input}
              onChange={(e)=>setInput(e.target.value)}
            />

          </div>
          <div className="plasmo-flex plasmo-flex-row-reverse plasmo-mt-4">
          <button disabled={isLoading || userPrompt !== ''} type="submit" className="plasmo-bg-blue-600 plasmo-px-4 plasmo-py-2 plasmo-rounded-md plasmo-gap-3 plasmo-w-fit   plasmo-flex plasmo-flex-row plasmo-items-center disabled:plasmo-bg-slate-400 plasmo-text-2xl">
          {!responseArray.length ?  
            <><SendIcon /> <span className="plasmo-text-white ">Generate</span></>  : 
            <><RefreshIcon /> <span className="plasmo-text-white">Regenerate</span></> 
            }
          </button>

          { !!(responseArray.length) &&  <button onClick={handleInsert} type="button" className="plasmo-mx-4 plasmo-border plasmo-border-gray-400 plasmo-px-4 plasmo-py-2 plasmo-gap-3 plasmo-rounded-md plasmo-w-fit   plasmo-flex plasmo-flex-row plasmo-items-center plasmo-text-2xl ">
              <><ArrowDownIcon /> <span className="plasmo-text-gray-600">Insert</span></> 
          </button>}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Modal
