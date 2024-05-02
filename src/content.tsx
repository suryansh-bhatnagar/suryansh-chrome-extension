import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import cssText from "data-text:~style.css";
import MagicIcon from "../assets/MagicIcon";
import Modal from "./features/Modal";

export const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssText;
  return style;
};

const PlasmoOverlay: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const observerRef = useRef<MutationObserver | null>(null);

  useEffect(() => {

     // Function to check if the target element exists and setup the MutationObserver
    const checkAndSetupObserver = () => {
      const targetElement = document.getElementsByClassName('msg-form__contenteditable')[0];
      if (!targetElement) {
        console.log("Target element not found, retrying...");
        
        // Retry finding the target after 1 second if not found
        setTimeout(checkAndSetupObserver, 1000); 
        return;
      }

      // Define a MutationObserver to react to changes in the specified attribute
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'data-artdeco-is-focused') {
            const isFocused = mutation.target.getAttribute('data-artdeco-is-focused') === 'true';
            if (isFocused) {
              // const element = document.getElementsByClassName('msg-form__msg-content-container--scrollable')[0];
              const element = document.getElementsByClassName('msg-form__contenteditable')[0];

              // Exit if no element found
              if (!element) return;
              const newContainer = document.createElement('div');
              newContainer.id = 'magic-btn';
              newContainer.style.display = 'flex';
              newContainer.style.flexDirection = 'row-reverse';
              element.appendChild(newContainer);
              const root = createRoot(newContainer);
              // Render MagicIcon inside the new container
              root.render(<MagicIcon onClick={() => setShowModal(true)} />);
            } else {
              const magicBtn = document.getElementById('magic-btn');
              // Remove the MagicIcon container when not focused
              if (magicBtn) magicBtn.remove();
            }
          }
        });
      });

      // Start observing the target element for attribute changes
      observer.observe(targetElement, {
        attributes: true,
        attributeFilter: ['data-artdeco-is-focused']
      });

      observerRef.current = observer;
    };

    checkAndSetupObserver();

    return () => {
      observerRef.current?.disconnect();
      console.log('Observer disconnected');
    };
  }, []);

  return showModal ? <Modal setShowModal={setShowModal} /> : null;
};

export default PlasmoOverlay;