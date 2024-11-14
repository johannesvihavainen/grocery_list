let list = document.querySelector('.list');
let input = document.getElementById('input');
let inputValue;
let addItemButton = document.querySelector('.add-item');
let clearItems = document.querySelector('.clear-item');

// load saved list from localStorage
window.onload = function () {
    loadListFromLocalStorage();
}

clearItems.addEventListener('click', function () {
    ClearItems();
    localStorage.removeItem('groceryList');
})

function ClearItems() {
    let allListItems = document.querySelectorAll('.list-item');
    allListItems.forEach(function (item) {
        item.remove();
    })
}

input.addEventListener('input', (event) => {
    inputValue = event.target.value;
})

// let inputFocused = false;

// input.addEventListener('focus', () => {
//     inputFocused = true;
// })

// document.addEventListener('keydown', function (event) {
//     if (event.key === 'Enter' && inputFocused) {
//         addItemButton.click();
//     }
// })

addItemButton.addEventListener('click', function () {
    handleList(inputValue);
})

function handleList(value) {
    if (value == null) {
        alert('you need to add an item into the input field.');
    }
    else {
        createListItem(value);
        saveListToLocalStorage();
    }
}

function createListItem(value) {
    // adds a list item to the ul
    let listItem = document.createElement('li');
    listItem.classList.add('list-item');
    list.appendChild(listItem);
    // adds a paragraph into the list item
    let newItem = document.createElement('p');
    newItem.classList.add('new-item');
    newItem.textContent = value;
    listItem.appendChild(newItem);
    // creates a div for an edit and remove button
    let optionWrapper = document.createElement('div');
    optionWrapper.classList.add('option-buttons');
    listItem.appendChild(optionWrapper);
    // adds an edit button inside the div
    let editOption = document.createElement('img');
    editOption.src = 'photos/edit.png';
    editOption.classList.add('edit-item')
    optionWrapper.appendChild(editOption);
    // adds a remove button inside the div
    let removeOption = document.createElement('img');
    removeOption.src = 'photos/remove.png';
    removeOption.classList.add('remove-item')
    optionWrapper.appendChild(removeOption);

    editOption.addEventListener('click', function () {
        newItem.contentEditable = "true";
        newItem.focus();

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                newItem.contentEditable = "false";
                saveListToLocalStorage();
            }
        })
    })

    removeOption.addEventListener('click', function () {
        newItem.parentNode.remove();
        saveListToLocalStorage();
    })
}

// save the list to localStorage
function saveListToLocalStorage() {
    const items = Array.from(document.querySelectorAll('.new-item')).map(item => item.textContent);
    localStorage.setItem('groceryList', JSON.stringify(items));
}

// load the list from LocalStorage
function loadListFromLocalStorage() {
    const items = JSON.parse(localStorage.getItem('groceryList'));
    if (items) {
        items.forEach(item => createListItem(item));
    }
}