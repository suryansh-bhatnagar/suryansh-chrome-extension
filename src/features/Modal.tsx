import { useState } from "react";
import ResponseCard from "../components/ResponseCard";
import { ArrowDownIcon, RefreshIcon, SendIcon } from "../../assets";

// Async function to simulate fetching data
async function getResult(input) {
  if (!input) {
    throw new Error('Please enter a prompt');
  }
  return new Promise(resolve =>
    setTimeout(() => {
      resolve(`Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.`);
    }, 2000)
  );
}

// Custom button components
const GenerateButton = ({ isLoading, hasResponses }) => (
  <button
    disabled={isLoading || hasResponses}
    type="submit"
    className={`plasmo-bg-blue-600 plasmo-px-4 plasmo-py-2 plasmo-rounded-md plasmo-w-fit plasmo-flex plasmo-gap-3 plasmo-text-white plasmo-items-center plasmo-text-2xl ${isLoading || hasResponses ? 'disabled:plasmo-bg-slate-400' : ''}`}
  >
    {hasResponses ? (
      <><RefreshIcon /> <span className="plasmo-text-white">Regenerate</span></>
    ) : (
      <><SendIcon /> <span className="plasmo-text-white">Generate</span></>
    )}
  </button>
);

const InsertButton = ({ onClick }) => (
  <button onClick={onClick} type="button" className="plasmo-mx-4 plasmo-border plasmo-border-gray-400 plasmo-px-4 plasmo-py-2 plasmo-rounded-md plasmo-w-fit plasmo-flex plasmo-gap-3  plasmo-items-center plasmo-text-2xl">
    <><ArrowDownIcon /> <span className="plasmo-text-gray-600">Insert</span></>
  </button>
);

const Modal = ({ setShowModal }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userPrompt, setUserPrompt] = useState('');
  const [responseArray, setResponseArray] = useState([]);

  // Handle generation of responses
  const handleGenerate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setUserPrompt(input);
    try {
      const data = await getResult(input);
      setResponseArray(prev => [...prev, data]);
    } catch (error) {
      console.error('Error:', error);
    }
    setIsLoading(false);
  };

  const handleInsert = () => {
       // Access the div with the class 'msg-form__contenteditable'
    const editableDiv = document.querySelector('.msg-form__contenteditable');
    if (editableDiv) {
      const pElement = editableDiv.querySelector('p');

      // Add some text to the content of the <p>
      pElement.textContent = responseArray.slice(-1)[0];
    }
  };

  return (
    <div>
      <div className="backdrop" onClick={() => setShowModal(false)} />
      <div className="modalWindow">
        <div>
        {/* Promts  */}
        <div className="plasmo-flex plasmo-flex-row-reverse plasmo-text-2xl">
            { !!(userPrompt?.length) && <div className="plasmo-bg-gray-300 plasmo-w-1/2 plasmo-p-3 plasmo-rounded-md">
                  {userPrompt}
              </div>
            }
          </div>
          {isLoading && <p className="plasmo-text-xl">Loading...</p> }

          {responseArray.map((response, index) => <ResponseCard key={index} response={response} />)}
        </div>
        <form onSubmit={handleGenerate}>
          <div className="plasmo-rounded-md plasmo-p-2 plasmo-border-2 plasmo-mt-8 plasmo-h-[40px] plasmo-flex plasmo-justify-between plasmo-items-center plasmo-border-gray-200 plasmo-text-2xl">
            <input
              type="text"
              className="plasmo-w-[90%] plasmo-outline-none plasmo-bg-white"
              placeholder="Your Prompt"
              required
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div className="plasmo-flex plasmo-flex-row-reverse plasmo-mt-4">
            <GenerateButton isLoading={isLoading} hasResponses={responseArray.length > 0} />
            {responseArray.length > 0 && <InsertButton onClick={handleInsert} />}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;