# Microphone Recorder to Mp3/Wav

Record your microphone audio input and get an ``audio/mp3`` or ``audio/wav`` file in the end.

Written in TypeScript

# Install

## npm

```bash
npm install mic-recorder
```

# Development

# How to use

```js
const MicRecorder = require('mic-recorder').default;

// or
// import MicRecorder from 'mic-recorder';

// New instance
const recorder = new MicRecorder({
  bitRate: 128,
  encoder: 'mp3', // default is mp3, can be wav as well
  sampleRate: 44100, // default is 44100, it can also be set to 16000 and 8000.
});

// Start recording
recorder.start().then(() => {
}).catch((e) => {
  console.error(e);
});

recorder
  .stop()
  .getAudio()
  .then(([buffer, blob]) => {
    const file = new File(buffer, 'me-at-thevoice.mp3', {
      type: blob.type,
      lastModified: Date.now()
    });

    const player = new Audio(URL.createObjectURL(file));
    player.play();

  }).catch((e) => {
    alert('We could not retrieve your message');
    console.log(e);
  });
```
# Reference 
MIT
