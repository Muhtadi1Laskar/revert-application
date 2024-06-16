import { Stack } from "./redoStack.js";

const textAreaTag = document.getElementById('textarea');
const btn = document.getElementById('revertButton');
const timeStampTag = document.getElementById('timeStamp');
const valueTag = document.getElementById('value');
const idTag = document.getElementById('index');
const modalTimeStamp = document.getElementById('modal-timeStamp');
const modalValue = document.getElementById('modal-value');
const modalIndex = document.getElementById('modal-index');

console.log(textAreaTag);

const debounce = 1000;

const stack = new Stack();

const addItem = (e, stack) => {
    const inputValue = e.target.value;

    if (inputValue === null || inputValue.trim() === "") {
        addDataToUI(null);
    }
    stack.preAppend(inputValue);

    const data = stack.getData();
    addDataToUI(data);
}

const addDataToUI = (value) => {
    if (!value) {
        timeStampTag.innerText = '';
        valueTag.innerText = '';
        idTag.innerText = '';
        return;
    }
    timeStampTag.innerText = value.timeStamp;
    valueTag.innerText = value.value;
    idTag.innerText = value.index;
}

const renderPoppedItem = (value) => {
    console.log(value);
    if (!value) {
        modalTimeStamp.innerText = '';
        modalValue.innerText = '';
        idTag.innerText = '';
        return;
    }

    modalTimeStamp.innerText = value.timeStamp;
    modalValue.innerText = value.value;
    idTag.innerText = value.index;
}

const revert = (stack) => {
    const poppedItem = stack.pop();

    renderPoppedItem(poppedItem);

    const data = stack.getData();

    addDataToUI(data);

    if (!data) {
        textAreaTag.value = '';
    } else {
        textAreaTag.value = data.value;
    }
}

textAreaTag.addEventListener('keyup', (e) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => addItem(e, stack), debounce);
});

btn.addEventListener('click', () => revert(stack));

let timeoutId = null;