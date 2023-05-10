const image = document.getElementById('muteImage');

image.addEventListener('click', function() {
  if (image.src.endsWith('speaker_on.png')) {
    image.src = '../speaker_off.png';
    image.alt = 'Muted';
  } else {
    image.src = '../speaker_on.png';
    image.alt = 'Unmuted';
  }
});