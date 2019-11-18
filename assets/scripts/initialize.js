import { process } from './process.js';

const imageProcess = new process();

export const initialize = () => {
    const inputFile = document.querySelector('#file-uploader');
    const startScanBtn =  document.querySelector('#start-scan');

    inputFile.addEventListener('change', imageProcess.readURL);
    startScanBtn.addEventListener('click', imageProcess.startProcessing.bind(imageProcess))
}
