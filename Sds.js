"use strict";
const addCard = document.querySelector('.card1');
const manyCard = document.getElementsByClassName('card')
// const card = document.getElementsByClassName('card')


let store = [];
const cards = localStorage.getItem('cards');

try {
    store = JSON.parse(cards);
    if (!Array.isArray(store)) {
        store = []
    }
} catch(e) {}

function saveData() {
    localStorage.setItem('cards', JSON.stringify(store))
}

store.forEach(card => addCard.before(createCard(card)));

// let texts = " ";
// let titles = "Simple Note";
// titles.length = 50;
// sdew.length =2000;

function createCardTitle(card, parent, toggleEdit) {
    const { title } = card;

    const conteiner = document.createElement('div');
    conteiner.className = 'card-title';
    
    let titleElement = document.createElement('h3');
    titleElement.className = "h3asd";
    titleElement.innerText = title;
    conteiner.appendChild(titleElement);

    let input = document.createElement('input');
    // input.elt.value()
    input.setAttribute('placeholder', 'Simple Note')
    input.setAttribute('maxlength', 50);
    input.setAttribute('minlength',1);
    input.value = title;
    input.className = "inpt";
    input.style.display = 'none';
    input.addEventListener('change', (e) => {
        card.title = e.target.value;
        saveData();
    }, false);
    conteiner.appendChild(input);

    const edit = document.createElement('button');
    edit.className = 'but';
    edit.innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>';
    conteiner.appendChild(edit);
    edit.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (input.style.display === 'none') {
            input.style.display = 'block';
            titleElement.style.display = 'none';
            toggleEdit();
        } else {
            input.style.display = 'none';
            titleElement.style.display = 'block';
            titleElement.innerText = input.value;
            toggleEdit();
        }
    }, false);
    
    const drop = document.createElement('button');
    drop.className = 'but';
    drop.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
    conteiner.appendChild(drop);
    drop.addEventListener('click', (e) => {
        e.preventDefault();

        parent.parentNode.removeChild(parent);  
    }, false);

    return conteiner;
}

function createCard(card) {
    const { index, title, text, info } = card;

    const conteiner = document.createElement('div');
    const summary = document.createElement('div');
    const textarea = document.createElement('textarea');
    const meta = document.createElement('div');

    const toggleEdit = () => {
        if (summary.style.display === 'block') {
            summary.style.display = 'none';
            textarea.style.display = 'block';
        } else {
            summary.style.display = 'block';
            textarea.style.display = 'none';
            summary.innerText = textarea.value;
        }
    };

    conteiner.className = 'card';
    conteiner.appendChild(createCardTitle(card, conteiner, toggleEdit));
    // conteiner.addEventListener("click", (e)=> {
    //     e.preventDefault();
    //     // conteiner = document.createElement('input')
    // }, false);

    summary.className = 'card-summary';
    summary.innerText = text;
    summary.style.display = 'block';
    conteiner.appendChild(summary);

    textarea.setAttribute("maxlength", 2000)
    textarea.className = 'textdf';
    textarea.innerText = text;
    textarea.style.display = 'none';
    textarea.addEventListener('change', (e) => {
        card.text = e.target.value;
        saveData();
    }, false);
    conteiner.appendChild(textarea);

    meta.className = 'card-meta';
    meta.innerText = info;
    conteiner.appendChild(meta);
    
    return conteiner;
}

addCard.addEventListener("click", (e) => {
    const card = {
        index: '',
        title: '',
        text: '',
        info: new Date().toLocaleString('en',
        {
          minute: 'numeric',
          hour: 'numeric',  
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
    };
    store.push(card);
    addCard.before(createCard(card));
}, false);
