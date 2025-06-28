const startBtn = document.getElementById('start-btn');
const taskList = document.getElementById('task-list');

// Check for browser compatibility
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  alert('Web Speech API not supported in this browser. Try using Google Chrome.');
}

const recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.continuous = false;

startBtn.addEventListener('click', () => {
  recognition.start();
});

// When speech is recognized
recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  addTask(transcript);
};

// Handle errors
recognition.onerror = (event) => {
  console.error('Speech recognition error:', event.error);
};

// Add task to the list
function addTask(taskText) {
  const li = document.createElement('li');
  li.textContent = taskText;

  // Toggle complete on click
  li.addEventListener('click', () => {
    li.classList.toggle('completed');
  });

  taskList.appendChild(li);
}
