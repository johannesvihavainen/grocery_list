let list = document.querySelector('.list');
let input = document.getElementById('input');
let inputValue;
let addItemButton = document.querySelector('.add-item');
let clearItems = document.querySelector('.clear-item');

clearItems.addEventListener('click', function () {
    ClearItems();
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
                }
            })
        })

        removeOption.addEventListener('click', function () {
            newItem.parentNode.remove();
        })
    }
}