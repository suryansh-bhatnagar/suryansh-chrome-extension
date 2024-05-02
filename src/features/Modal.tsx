
import { useState } from "react"
import { AiOutlineSend, AiOutlineStop } from "react-icons/ai"
import { LuRefreshCcw } from "react-icons/lu";
import { FaArrowDown } from "react-icons/fa";
import ResonseCard from "~components/ResonseCard";


const Modal= ({ setShowModal }) => {

  const [input, setInput] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const [ userPrompt, setUserPrompt] = useState(undefined);

  const [responseArray, setResponseArray] = useState([]);     
  
  let iconStyles = { color: "white" };

  const getResult = (input)=>{
  const pr = new Promise(function(resolve, reject){
  if(input){
    setTimeout(() => {
      resolve(`Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.`);
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
  setIsLoading(true);
  setUserPrompt(input)
  getResult(input)
  .then(data => {
    if(data)setResponseArray([...responseArray,data]);
    setIsLoading(false)
  })
  .catch(error =>{
    console.error('Error:', error)
    setIsLoading(false);
    });
  console.log('handle generate')
  }



  return (
    <div className="">
      <div className="backdrop" onClick={()=>setShowModal(false)} />
      <div className="modalWindow">
        {/*Cross-sign*/}
        <span
          onClick={() => setShowModal(false)}
          className="plasmo-absolute plasmo-top-[0.7rem] plasmo-right-[0.7rem] plasmo-text-[16px] plasmo-font-medium plasmo-cursor-pointer hover:plasmo-bg-slate-100 plasmo-h-[30px] plasmo-w-[30px] plasmo-flex plasmo-items-center plasmo-justify-center plasmo-rounded-full">
          X
        </span>
        {/* promt and response  */}
        <div>
          {/* Promts  */}
          <div className="plasmo-flex plasmo-flex-row-reverse">
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
          <button disabled={isLoading || userPrompt !== undefined} type="submit" className="plasmo-bg-blue-600 plasmo-px-3 plasmo-py-2 plasmo-rounded-md plasmo-gap-2 plasmo-w-fit   plasmo-flex plasmo-flex-row plasmo-items-center disabled:plasmo-bg-slate-400">
          {!responseArray.length ?  
            <><AiOutlineSend style={iconStyles} /> <span className="plasmo-text-white">Generate</span></>  : 
            <><LuRefreshCcw  style={iconStyles} /> <span className="plasmo-text-white">Regenerate</span></> 
            }
          </button>

          { !!(responseArray.length) &&  <button className="plasmo-mx-4 plasmo-border plasmo-border-gray-400 plasmo-px-3 plasmo-py-2 plasmo-gap-2 plasmo-rounded-md plasmo-w-fit   plasmo-flex plasmo-flex-row plasmo-items-center ">
              <><FaArrowDown  style={iconStyles} /> <span className="plasmo-text-gray-600">Insert</span></> 
          </button>}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Modal
