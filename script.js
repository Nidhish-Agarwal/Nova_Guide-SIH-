// Array of bot responses
const botResponses = {
    "hello": "Hello! How can I help you today?",
    "hi": "Hi there! How can I assist you?",
    "how are you": "I'm just a bot, but I'm here to help you!",
    "help": "Sure! What do you need help with?",
    "fitness tips": "Stay hydrated, exercise regularly, and get enough sleep!",
    "bye": "Goodbye! Have a great day!",
    "how can i book a ticket?": "You can book a ticket by selecting the ‘Book Tickets’ option on our homepage. Just choose the date, time, and type of ticket, and proceed to payment.",
    "what are the ticket prices?": "Our ticket prices are as follows: Adults - ₹50, Children (3-12 years) - ₹30, Students with ID - ₹20.",
    "can i book tickets for multiple shows?": "Yes, you can book tickets for multiple shows in one transaction. Just select the shows you want to attend and proceed to checkout.",
    "is there a discount for group bookings?": "Yes, we offer a 10% discount for groups of 10 or more. Please contact our support team for more details.",
    "what events are happening today?": "Today's events include: 1) Space Exploration Show at 11:00 AM, 2) Robotics Workshop at 2:00 PM, 3) Science Quiz at 4:00 PM.",
    "how can i participate in the science quiz?": "You can participate in the Science Quiz by registering online or at the venue before the event starts. It's open to all visitors.",
    "are there any special exhibitions this month?": "Yes, we have a special exhibition on 'The Wonders of Space' running all month. It includes interactive displays and expert talks.",
    "what are the museum's opening hours?": "The museum is open from 10:00 AM to 6:00 PM every day, except on public holidays.",
    "where is the museum located?": "The museum is located at Kasturba Road, Bengaluru, Karnataka, India.",
    "is there parking available at the museum?": "Yes, we have parking facilities available for visitors. The parking fee is ₹20 per hour.",
    "is the museum accessible for people with disabilities?": "Yes, our museum is fully accessible with ramps, elevators, and wheelchair services available.",
    "what payment methods are accepted?": "We accept credit/debit cards, UPI, and net banking. Cash payments are not accepted for online bookings.",
    "can i get a refund if i cancel my ticket?": "Yes, you can cancel your ticket up to 24 hours before the event for a full refund. Cancellations within 24 hours are non-refundable.",
    "how can i participate in the post-show quiz?": "After attending a show, you'll receive a link to the quiz via email or SMS. Complete the quiz for a chance to win a discount on your next visit!",
    "what rewards can I earn through the website?": "You can earn discounts, badges, and even free tickets by participating in quizzes, attending events, and completing challenges on our website.",
    "does levi like ain":"Yes He wants her badly and he calls her MOMMY in his dreams"
};

const chatbotPopup = document.getElementsByClassName('chatbot-popup')[0];
const closeBtn = document.getElementById('closeBtn');
const sendButton = document.getElementById('sendButton');
const chatbotIcon = document.getElementById('chatbot-icon');

// Show chatbot when icon is clicked
document.getElementById('chatbot-icon').addEventListener('click', function() {
    chatbotPopup.style.display = 'block';

    // Add the event listener after opening the chatbot
    document.addEventListener('click', outsideClickListener);
});

// Add event listener to close button
closeBtn.addEventListener('click', function() {
    chatbotPopup.style.display = 'none';

    // Remove the outside click listener when closing the chatbot
    document.removeEventListener('click', outsideClickListener);
});

// Define the function that will handle clicks outside the chatbot
function outsideClickListener(e) {
    if (!chatbotPopup.contains(e.target) && e.target !== document.getElementById('chatbot-icon')) {
        chatbotPopup.style.display = 'none';

        // Remove the event listener after hiding the chatbot
        document.removeEventListener('click', outsideClickListener);
    }
}

// Send message when send button is clicked
sendButton.addEventListener('click', function() {
    sendMessage();
});

userInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
        e.preventDefault(); // Prevents the default action, such as a form submission if inside a form
    }
});

// Function to send user message
function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    displayMessage(userInput, 'user');
    
    // Get bot response
    const botResponse = getBotResponse(userInput.toLowerCase());
    setTimeout(() => {
        displayMessage(botResponse, 'bot');
    }, 500);
    
    // Clear the input field
    document.getElementById('userInput').value = '';
}

// Function to display message in the chat box
function displayMessage(message, sender) {
    const chatBox = document.querySelector('.messages');
    const messageElement = document.createElement('p');
    messageElement.classList.add(sender === 'bot' ? 'bot-message' : 'user-message');
    messageElement.innerText = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the bottom
}

// Function to get bot response
function getBotResponse(input) {
    return botResponses[input] || "Sorry, I don't understand that.";
}
