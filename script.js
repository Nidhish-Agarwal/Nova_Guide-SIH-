import { GoogleGenAI } from "https://cdn.jsdelivr.net/npm/@google/genai@latest/+esm";
// Array of bot responses

const systemPrompt = `
You are NovaGuide, a virtual assistant for a museum ticket booking website. You only answer questions related to:
- Museum exhibits and galleries
- Ticket booking process
- Museum timings, location, accessibility
- Ongoing or upcoming events
- General visitor guidance
- Science education and museum-related facts

If a user asks anything outside this scope, reply:
"I'm here to help with museum-related queries only."
Always stay in character.
`;

const ai = new GoogleGenAI({
  apiKey: "AIzaSyBrEYPQcjCt3w1qZfAzWRHavaR97Bg1SkE",
});

let loading = false;
const chatbotPopup = document.getElementsByClassName("chatbot-popup")[0];
const closeBtn = document.getElementById("closeBtn");
const sendButton = document.getElementById("sendButton");
const chatbotIcon = document.getElementById("chatbot-icon");

// Show chatbot when icon is clicked
document.getElementById("chatbot-icon").addEventListener("click", function () {
  chatbotPopup.style.display = "block";

  // Add the event listener after opening the chatbot
  document.addEventListener("click", outsideClickListener);
});

// Add event listener to close button
closeBtn.addEventListener("click", function () {
  chatbotPopup.style.display = "none";

  // Remove the outside click listener when closing the chatbot
  document.removeEventListener("click", outsideClickListener);
});

// Define the function that will handle clicks outside the chatbot
function outsideClickListener(e) {
  if (
    !chatbotPopup.contains(e.target) &&
    e.target !== document.getElementById("chatbot-icon")
  ) {
    chatbotPopup.style.display = "none";

    // Remove the event listener after hiding the chatbot
    document.removeEventListener("click", outsideClickListener);
  }
}

// Send message when send button is clicked
sendButton.addEventListener("click", function () {
  sendMessage();
});

userInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    sendMessage();
    e.preventDefault(); // Prevents the default action, such as a form submission if inside a form
  }
});

// Function to send user message
async function sendMessage() {
  if (loading) return;
  const userInput = document.getElementById("userInput").value;
  if (userInput === "") return;

  displayMessage(userInput, "user");
  document.getElementById("userInput").value = "";
  showLoadingAnimation();

  // Get bot response
  const botResponse = await getBotResponse(userInput.toLowerCase());
  removeLoadingAnimation();
  displayMessage(botResponse, "bot");
}

// Function to display message in the chat box
function displayMessage(message, sender) {
  const chatBox = document.querySelector(".messages");
  const messageElement = document.createElement("p");
  messageElement.classList.add(
    sender === "bot" ? "bot-message" : "user-message"
  );
  messageElement.innerText = message;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;

  // Scroll to bottom using anchor
  const scrollAnchor = document.getElementById("chat-end");
  scrollAnchor.scrollIntoView({ behavior: "smooth" });
}

function showLoadingAnimation() {
  const chatBox = document.querySelector(".messages");
  const loadingElem = document.createElement("div");
  loadingElem.classList.add("loading-animation");
  loadingElem.setAttribute("id", "loading");

  loadingElem.innerHTML = `
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
    `;

  chatBox.appendChild(loadingElem);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function removeLoadingAnimation() {
  const loadingElem = document.getElementById("loading");
  if (loadingElem) loadingElem.remove();
}

// Function to get bot response
async function getBotResponse(input) {
  loading = true;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: systemPrompt + input,
    });

    return response.text;
  } catch (error) {
    console.error("Error with Gemini:", error.message);
    return "Failed to generate response";
  } finally {
    loading = false;
  }
}
