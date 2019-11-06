function startProcessing() {
    let img = document.getElementById('ocr-img');
    Tesseract.recognize(
        img,
        'eng',
        { logger: m => scanningProgress(m) }
      ).then((res) => {
        return res;
      }).then(({data}) => {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `<span>Result of Scanned Image:</span><div contenteditable=true>${data.text}</div>`;
        // console.log(data.text, typeof(data.text)); // returns type as string
        // console.log(Number(data.text), parseInt(data.text)); // converting string to number

        // let convertedNumber = [...data.text].map((num) => Number(num));
        // let sum = convertedNumber.reduce((acc, curr) => acc + curr);

        // console.log(':::SUM:::',sum);
      })
}

function scanningProgress(m) {
  document.getElementById('progress').innerText = 'Scanning...'
  if (m.status === 'recognizing text') {
    document.getElementById('progress').innerText = `Scanning... ${Math.round(m.progress * 100)}%`;
  }
}

// For image uploader visit https://stackoverflow.com/questions/12368910/html-display-image-after-selecting-filename
function readURL(input) {
  if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const uploadedImg = document.getElementById('ocr-img');
        uploadedImg.src = e.target.result;
      };

      reader.readAsDataURL(input.files[0]);
  }
}