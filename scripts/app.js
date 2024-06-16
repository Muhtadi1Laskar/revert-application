import { Stack } from "./redoStack.js";

const textAreaTag = document.getElementById('textarea');
const btn = document.getElementById('revertButton');
const timeStampTag = document.getElementById('timeStamp');
const valueTag = document.getElementById('value');
const idTag = document.getElementById('index');
const modalTimeStamp = document.getElementById('modal-timeStamp');
const modalValue = document.getElementById('modal-value');
const draftCardTag = document.getElementById('output-div');
const outputHeadingTag = document.querySelector('.output-heading');

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

    outputHeadingTag.style.display = "block";
    renderAllNotes(stack);
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

const renderAllNotes = (chain) => {
    const allData = chain.getList();
    if(allData) {
        const html = allData.map((elem) => {
            return `
                <div class="draft-card">
                    <p><strong>Time:</strong> ${elem.time}</p>
                    <p><strong>Value:</strong> ${elem.value}</p>
                    <p><strong>Index:</strong> ${elem.index}</p>
                </div>
            `;
        }).join('');
        draftCardTag.innerHTML = html;
        return;
    }
    outputHeadingTag.style.display = "none";
    draftCardTag.innerHTML = '';
};

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

    renderAllNotes(stack);
}

textAreaTag.addEventListener('keyup', (e) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => addItem(e, stack), debounce);
});

btn.addEventListener('click', () => revert(stack));

let timeoutId = null;