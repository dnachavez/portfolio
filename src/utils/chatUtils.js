export function createDanMessage(message) {
  const danMessageDiv = document.createElement('div');
  danMessageDiv.className = 'flex mb-4';
  
  let formattedMessage = '';
  try {
    if (window.md) {
      formattedMessage = window.md.render(message);
    } else {
      formattedMessage = message;
    }
  } catch (error) {
    console.error('Error rendering markdown:', error);
    formattedMessage = message;
  }
  
  danMessageDiv.innerHTML = `
    <div class="message-left relative max-w-[75%] bg-primary text-white rounded-tr-lg rounded-br-lg rounded-bl-lg py-2 px-3">
      <div class="absolute left-[-8px] top-0 w-0 h-0 border-t-[8px] border-t-transparent border-r-[12px] border-r-primary border-b-[0px] border-b-transparent"></div>
      <div class="markdown-content">${formattedMessage}</div>
    </div>
  `;
  
  const links = danMessageDiv.querySelectorAll('a');
  links.forEach(link => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });
  
  return danMessageDiv;
}

export function createUserMessage(message) {
  const userMessageDiv = document.createElement('div');
  userMessageDiv.className = 'flex justify-end mb-4';
  userMessageDiv.innerHTML = `
    <div class="message-right relative max-w-[75%] bg-gray-100 dark:bg-dark-fondo-secondary rounded-tl-lg rounded-bl-lg rounded-br-lg py-2 px-3 text-light-texto-primary dark:text-dark-texto-primary">
      <div class="absolute right-[-8px] top-0 w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-gray-100 dark:border-l-dark-fondo-secondary border-b-[0px] border-b-transparent"></div>
      <p>${message}</p>
    </div>
  `;
  return userMessageDiv;
}

export function createTypingAnimation() {
  const typingDiv = document.createElement('div');
  typingDiv.className = 'flex mb-4';
  typingDiv.id = 'typing-animation-container';
  
  typingDiv.innerHTML = `
    <div class="message-left relative max-w-[75%] bg-primary text-white rounded-tr-lg rounded-br-lg rounded-bl-lg py-2 px-3">
      <div class="absolute left-[-8px] top-0 w-0 h-0 border-t-[8px] border-t-transparent border-r-[12px] border-r-primary border-b-[0px] border-b-transparent"></div>
      <div style="display:flex; justify-content:center; align-items:center; gap:5px;">
        <div id="dot1" style="width:6px; height:6px; background-color:white; border-radius:50%;"></div>
        <div id="dot2" style="width:6px; height:6px; background-color:white; border-radius:50%;"></div>
        <div id="dot3" style="width:6px; height:6px; background-color:white; border-radius:50%;"></div>
      </div>
    </div>
  `;
  
  setTimeout(() => {
    startDotAnimation(typingDiv);
  }, 100);
  
  return typingDiv;
}

export function startDotAnimation(typingDiv) {
  const dot1 = typingDiv.querySelector('#dot1');
  const dot2 = typingDiv.querySelector('#dot2');
  const dot3 = typingDiv.querySelector('#dot3');
  
  if (!dot1 || !dot2 || !dot3) return;
  
  let step = 0;
  const animationInterval = setInterval(() => {
    if (!document.body.contains(typingDiv)) {
      clearInterval(animationInterval);
      return;
    }
    
    step = (step + 1) % 4;
    
    dot1.style.transform = 'translateY(0px)';
    dot2.style.transform = 'translateY(0px)';
    dot3.style.transform = 'translateY(0px)';
    
    if (step === 1) {
      dot1.style.transform = 'translateY(-5px)';
    } else if (step === 2) {
      dot2.style.transform = 'translateY(-5px)';
    } else if (step === 3) {
      dot3.style.transform = 'translateY(-5px)';
    }
  }, 200);
}

export function removeTypingAnimation() {
  const typingElement = document.getElementById('typing-animation-container');
  if (typingElement) {
    typingElement.remove();
  }
}

export function scrollToBottom(chatMessages, smooth = false) {
  if (chatMessages) {
    chatMessages.scrollTop = chatMessages.scrollHeight;
    if (smooth) {
      chatMessages.scrollTo({
        top: chatMessages.scrollHeight,
        behavior: 'smooth'
      });
    } else {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }
}

export function smoothScrollToMessage(chatMessages, messageElement) {
  if (!chatMessages || !messageElement) return;
  
  // Calculate the message top position relative to the scroll container
  const messageTop = messageElement.offsetTop;
  // Get the current scroll position
  const currentScroll = chatMessages.scrollTop;
  // Get the container height
  const containerHeight = chatMessages.clientHeight;
  
  // If message is already fully visible, no need to scroll
  if (messageTop >= currentScroll && 
      messageTop + messageElement.offsetHeight <= currentScroll + containerHeight) {
    return;
  }
  
  // Scroll to position the message near the top of the visible area
  const offset = containerHeight * 0.2; // 20% from the top
  const targetScroll = Math.max(0, messageTop - offset);
  
  chatMessages.scrollTo({
    top: targetScroll,
    behavior: 'smooth'
  });
}

export async function sendToApi(userMessage, chatHistory, apiUrl, elements, preDelay, postDelay) {
  try {
    removeTypingAnimation();
    
    const typingAnimation = createTypingAnimation();
    elements.chatMessages.appendChild(typingAnimation);
    scrollToBottom(elements.chatMessages);
    
    await new Promise(resolve => setTimeout(resolve, preDelay));
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: userMessage,
        history: chatHistory
      }),
      mode: 'cors'
    });
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    let apiResponse = "Sorry, I couldn't process that request. Please try again.";
    if (data && data.response) {
      apiResponse = data.response;
    }
    
    await new Promise(resolve => setTimeout(resolve, postDelay));
    
    removeTypingAnimation();
    
    const danMessageDiv = createDanMessage(apiResponse);
    elements.chatMessages.appendChild(danMessageDiv);
    
    return {
      messageElement: danMessageDiv,
      content: apiResponse
    };
    
  } catch (error) {
    console.error('Error calling API:', error);
    
    removeTypingAnimation();
    
    const errorMessage = "Sorry, I'm having trouble connecting right now. Please try again later.";
    const errorElement = createDanMessage(errorMessage);
    elements.chatMessages.appendChild(errorElement);
    
    return {
      messageElement: errorElement,
      content: errorMessage
    };
  }
} 