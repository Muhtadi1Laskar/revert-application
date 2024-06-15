import { Stack } from "./redoStack.js";

const textAreaTag = document.getElementById('input');
const btn = document.getElementById('btn');
const outputTag = document.getElementById('output');

const debounce = 500;

const stack = new Stack();

const addItem = (e, stack) => {
    const inputValue = e.target.value;
    stack.preAppend(inputValue);

    console.log(stack.print());

    textAreaTag.value = '';
}

// btn.addEventListener("click", () => addItem(stack));
textAreaTag.addEventListener('keyup', (e) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => addItem(e, stack), debounce);
});

let timeoutId = null;