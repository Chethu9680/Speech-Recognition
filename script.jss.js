// Initialize SpeechRecognition
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

// Set recognition language
recognition.lang = 'en-US';

// Select DOM elements
const startRecognitionButton = document.getElementById('startRecognition');
const stopRecognitionButton = document.getElementById('stopRecognition');
const clearTextButton = document.getElementById('clearText');
const recognizedSpeechField = document.getElementById('recognizedSpeech');

// Add event listeners
startRecognitionButton.addEventListener('click', startRecognition);
stopRecognitionButton.addEventListener('click', stopRecognition);
clearTextButton.addEventListener('click', clearText);

// Function to start recognition
function startRecognition() {
    recognition.start();
    recognizedSpeechField.placeholder = "Listening...";
}

// Function to stop recognition
function stopRecognition() {
    recognition.stop();
}

// Function to clear text
function clearText() {
    recognizedSpeechField.value = '';
}

// Event listener for speech recognition result
recognition.onresult = function(event) {
    const last = event.results.length - 1;
    const recognizedText = event.results[last][0].transcript;
    recognizedSpeechField.value = recognizedText;
    recognizedSpeechField.placeholder = "Recognized Speech";
}

// Event listener for speech recognition error
recognition.onerror = function(event) {
    console.error('Speech recognition error:', event.error);
}

// Set timeout to automatically stop recognition after 5 seconds
recognition.onstart = function() {
    setTimeout(function() {
        stopRecognition();
    }, 5000);
}
