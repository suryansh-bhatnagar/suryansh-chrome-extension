
import { useState } from "react"
import { AiOutlineSend, AiOutlineStop } from "react-icons/ai"
import { LuRefreshCcw } from "react-icons/lu";
import { FaArrowDown } from "react-icons/fa";


const Modal= ({ setShowModal }) => {
  // useCompletion hook to receive the streamed data from API (inbuilt hook)

  const [input, setInput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [ userPrompt, setUserPrompt] = useState(null);

  const [responseArray, setResponseArray] = useState([]);     
  
  let iconStyles = { color: "white" };

  const getResult = (input)=>{
  const pr = new Promise(function(resolve, reject){
  if(input){
    setTimeout(() => {
      resolve(`Your response for your prompt ${input}`);
    }, 2000);
  }else{
    const err = new Error('Please enter prompt')
    reject(err);
  }
})
return pr;
  }

  const handleGenerate =(e)=>{
  e.preventDefault();
  getResult(input)
  .then(data => {
    setResponseArray([...responseArray,data]);
  })
  .catch(error => console.error('Error:', error));
  console.log('handle generate')
  }

  console.log('Response array', responseArray);


  return (
    <div className="">
      <div className="backdrop" onClick={close} />
      <div className="modalWindow">
        {/*Cross-sign*/}
        <span
          onClick={() => setShowModal(false)}
          className="plasmo-absolute plasmo-top-[0.7rem] plasmo-right-[0.7rem] plasmo-text-[16px] plasmo-font-medium plasmo-cursor-pointer hover:plasmo-bg-slate-100 plasmo-h-[30px] plasmo-w-[30px] plasmo-flex plasmo-items-center plasmo-justify-center plasmo-rounded-full">
          X
        </span>
     
        {/* Input Field */}
        <form action="submit" onSubmit={handleGenerate}>
          <div className="plasmo-rounded-md plasmo-p-2 plasmo-border-2 plasmo-mt-8 plasmo-h-[40px] plasmo-flex plasmo-justify-between plasmo-items-center plasmo-border-gray-200">
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
          <button type="submit" className="plasmo-bg-blue-600 plasmo-px-3 plasmo-py-2 plasmo-rounded-md plasmo-gap-2 plasmo-w-fit   plasmo-flex plasmo-flex-row plasmo-items-center ">
          {!responseArray.length ?  
            <><AiOutlineSend style={iconStyles} /> <span className="plasmo-text-white">Generate</span></>  : 
            <><LuRefreshCcw  style={iconStyles} /> <span className="plasmo-text-white">Regenerate</span></> 
            }
          </button>

       { ++(responseArray.length) &&  <button className="plasmo-mx-4 plasmo-border plasmo-border-gray-400 plasmo-px-3 plasmo-py-2 plasmo-gap-2 plasmo-rounded-md plasmo-w-fit   plasmo-flex plasmo-flex-row plasmo-items-center ">
            <><FaArrowDown  style={iconStyles} /> <span className="plasmo-text-gray-600">Insert</span></> 
          </button>}
          </div>
            {/* showing different buttons based on receiving Response */}

            {/* {isLoading ? (
              <button type="button" onClick={stop}>
                <AiOutlineStop />
              </button>
            ) : (
              <button type="submit">
                <AiOutlineSend />
              </button>
            )} */}
        </form>
      </div>
    </div>
  )
}

export default Modal
