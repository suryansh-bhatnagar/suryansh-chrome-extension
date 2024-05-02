import { useState } from "react"
import { AiOutlineSend, AiOutlineStop } from "react-icons/ai"

const Modal= ({ setShowModal }) => {
  // useCompletion hook to receive the streamed data from API (inbuilt hook)

  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  



  return (
    <div className="modalWindow">
      {/*Cross-sign*/}
      <span
        onClick={() => setShowModal(false)}
        className="plasmo-absolute plasmo-top-[0.7rem] plasmo-right-[0.7rem] plasmo-text-[16px] plasmo-font-medium plasmo-cursor-pointer hover:plasmo-bg-slate-100 plasmo-h-[30px] plasmo-w-[30px] plasmo-flex plasmo-items-center plasmo-justify-center plasmo-rounded-full">
        X
      </span>


      {/* Input Field */}
      <form action="submit" onSubmit={()=>console.log('Submitted')}>
        <div className="plasmo-rounded-full plasmo-p-2 plasmo-border-2 plasmo-mt-8 plasmo-h-[50px] plasmo-flex plasmo-justify-between plasmo-items-center plasmo-border-gray-200">
          <input
            type="text"
            className="plasmo-w-[90%] plasmo-outline-none plasmo-bg-white"
            placeholder="Enter Your Text... (Below 400 Characters)"
            value={input}
            onChange={(e)=>setInput(e.target.value)}
          />

          {/* showing different buttons based on receiving Response */}
          {isLoading ? (
            <button type="button" onClick={stop}>
              <AiOutlineStop />
            </button>
          ) : (
            <button type="submit">
              <AiOutlineSend />
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default Modal
