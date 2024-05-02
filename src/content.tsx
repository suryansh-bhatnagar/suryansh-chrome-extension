import cssText from "data-text:~style.css"
import React, { useEffect, useState } from "react"
import MagicIcon from '../assets/MagicIcon'
import { createRoot } from 'react-dom/client';

import Modal from "~features/Modal"

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay: React.FC<{}> = () => {
  //showing modal window state
  const [showModal, setShowModal] = useState<boolean>(false)

  useEffect(() => {
    // Listening for messages from the background script
    const handleMessage = (request: { action: String }) => {
      // Toggle modal visibility when receiving the 'toggleModal' action
      if (request.action === "toggleModal") {
        // setShowModal((prev) => !prev)
        // const element = document.getElementsByClassName('msg-form__contenteditable')[0];
        const element = document.getElementsByClassName('msg-form__msg-content-container--scrollable')[0];

        const newContainer = document.createElement('div');
        newContainer.style.display='flex';
        newContainer.style.flexDirection='row-reverse';
        element.appendChild(newContainer);
        const root = createRoot(newContainer);
        root.render(<MagicIcon onClick={()=>setShowModal(true)} />);
        // ReactDOM.render(<MagicIcon onClick={()=>setShowModal(true)} />, newContainer);
      }
    }

    // Adding a listener for messages from the background script
    chrome.runtime.onMessage.addListener(handleMessage)


    //cleaning up
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage)
    }
  }, [])

  return showModal ? <Modal setShowModal={setShowModal} /> : null
}

export default PlasmoOverlay
