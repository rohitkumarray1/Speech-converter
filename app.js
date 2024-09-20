const textInput = document.querySelector('textarea');
const voiceSelect = document.querySelector('select');
const speakButton = document.querySelector('button');

let voices = [];

function populateVoiceList() {
    voices = speechSynthesis.getVoices();
    voiceSelect.innerHTML = '';
    voices.forEach(voice => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });
}

let sound = "pause";

function speak() {
    const text = textInput.value;
    const selectedVoiceName = voiceSelect.value;
    const utterance = new SpeechSynthesisUtterance(text);

    const selectedVoice = voices.find(voice => voice.name === selectedVoiceName);
    if (selectedVoice) {
        utterance.voice = selectedVoice;
    }

    speechSynthesis.speak(utterance);

    utterance.onstart = () =>{
        speakButton.innerHTML = `<img src="images/pause.png"> Sound is Playing...`;
    };
    utterance.onend = () => {
        speakButton.innerHTML = `<img src="images/play.png"> Play Converted Sound`;
    };
}

// Populate the voice list when voices are loaded
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}

// Add event listeners
speakButton.addEventListener("click", speak);