function startProcessing() {
  let img = document.querySelector('#ocr-img');
  Tesseract.recognize(
    img,
    'eng',
    { logger: m => scanningProgress(m) }
  ).then((res) => {
    return res;
  }).then(({ data }) => {
    const resultDiv = document.querySelector('#result');
    resultDiv.innerHTML = `
      <span>Result of Scanned Image:</span>
      <div style="background: #eeeeee; color: #393e46; padding: 10px;" contenteditable=true>
        ${data.text}
      </div>
    `;
  })
}

function scanningProgress(m) {
  document.querySelector('#progress').innerText = 'Scanning...'
  if (m.status === 'recognizing text') {
    const progress = Math.round(m.progress * 100);
    document.querySelector('#progress').innerText = `Scanning... ${progress}%`;
    animateProgressBar(progress);
  }
}

// For image uploader visit https://stackoverflow.com/questions/12368910/html-display-image-after-selecting-filename
function readURL(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const uploadedImg = document.querySelector('#ocr-img');
      const selectedFileName = document.querySelector('.file-name');

      console.log(input.files[0]);
      uploadedImg.src = e.target.result;
      uploadedImg.style.display = 'block';
      selectedFileName.innerText = input.files[0].name;
    };

    reader.readAsDataURL(input.files[0]);
  }
}

function animateProgressBar(progress) {
  // let i = 0;
  // if (i == 0) {
  //   i = 1;
    const progressBar = document.querySelector('#myBar');
    // let width = progress;
    // const id = setInterval(frame, 50);
    // function frame() {
      if (progress >= 100) {
        // clearInterval(id);
        console.log(progress);
        progress = 0;
        console.log(progress);
      } else {
        // width++;
        progressBar.style.width = progress + "%";
        progressBar.innerHTML = progress  + "%";
      }
    // }
  // }
}