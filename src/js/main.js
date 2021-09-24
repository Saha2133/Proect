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
    localStorage.setItem('cards', JSON.stringify(store.map(card => {
        return {...card, checkLists: card.checkLists.map(checkList => checkList.getDataForSave())}
    })))
}
store = store.filter(data => data.title.trim() !== '' || data.text.trim() !== '' || data.checkLists.length);
store.forEach(card => {
    card._checkLists = card.checkLists;
    card.checkLists = [];
});
saveData();
store.forEach(card => addCard.before(createCard(card)));

function createCardTitle(card, parent, toggleEdit, createCheckList) {
    const { title, index } = card;

    const container = document.createElement('div');
    container.className = 'card-title';
    
    let titleElement = document.createElement('h3');
    titleElement.className = "h3asd";
    titleElement.innerText = title;
    titleElement.style.display = "block";
    container.appendChild(titleElement);

    let input = document.createElement('input');
    // input.elt.value()
    input.setAttribute('placeholder', 'Simple Note')
    input.setAttribute("maxlength", 50);
    // input.setAttribute('value', 'Simple Note')
    // input.setAttribute('minlength',1);
    input.value = title;
    input.className = "inputh";
    input.style.display = 'none';
    input.addEventListener('change', (e) => {
        card.title = e.target.value;
        card.info = new Date().toLocaleString('en',
        {
          minute: 'numeric',
          hour: 'numeric',  
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
            saveData();
    }, false);
    container.appendChild(input);

    const edit = document.createElement('button');
    edit.className = 'but';
    edit.innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>';
    container.appendChild(edit);
    edit.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (input.style.display === 'none') {
            input.style.display = 'block';
            titleElement.style.display = 'none';
            toggleEdit();
            input.addEventListener('change', (e) => {
                card.title = e.target.value;
                card.info = new Date().toLocaleString('en',
                {
                  minute: 'numeric',
                  hour: 'numeric',  
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })
                    saveData();
            }, false);
        } else {
            input.style.display = 'none';
            titleElement.style.display = 'block';
            titleElement.innerText = input.value;
            toggleEdit();
        }
    }, false);

    /* checklist */
    const createCheckListButton = document.createElement('button');
    createCheckListButton.className = 'but create-checklist-button';
    createCheckListButton.innerHTML = '<i class="fa fa-tasks"></i>';
	container.appendChild(createCheckListButton);
	createCheckListButton.addEventListener('click', e => {
		e.preventDefault();
		createCheckList();
        saveData();
	});
    /* checklist */
    
    const drop = document.createElement('button');
    drop.className = 'but';
    drop.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
    container.appendChild(drop);
    
    drop.addEventListener('click', (e) => {
        e.preventDefault();
        const result = confirm('You want to delete the note?');
        if (result) {
            parent.remove();
            store = store.filter(data => data.index !== index);
            saveData();
        } else {

        }

    }, false);

    return container;
}

function removeCheckListFromCardData(checkList) {
    store.forEach(card => {
        const index = card.checkLists.indexOf(checkList);
        if (index === -1) return;
        card.checkLists.splice(index, 1);
    });
}

class CheckList {
	constructor(container, data) {
		this.container = container;
		this.title = "Чек-лист";
		this.list = [];

        if (data) {
            this.title = data.title;
            this.list = data.list;
        }

		container.className = "checkbox-container";

		const titleElement = document.createElement('h4');
		titleElement.className = "title";
		titleElement.innerText = this.title;
		container.appendChild(titleElement);
		titleElement.addEventListener("click", this.clickOnTitle.bind(this));

		const checkBoxesList = document.createElement('ul');
		checkBoxesList.className = "list";
		container.appendChild(checkBoxesList);

        this.list.forEach(elementData => this.addElement(elementData));

		const button = document.createElement('button');
		button.innerText = "Добавить элемент";
		container.appendChild(button);
		button.addEventListener("click", this.addElement.bind(this));

		const deleteCheckListButton = document.createElement('button');
		deleteCheckListButton.innerText = "Удалить чек-лист";
		container.appendChild(deleteCheckListButton);
		deleteCheckListButton.addEventListener("click", this.delete.bind(this));

        saveData();
	}

	delete() {
		this.container.remove();
        removeCheckListFromCardData(this);
	}

	getElementInfoById(id) {
		const elementData = this.list.find(elem => elem.id === id);
		if (!elementData) throw "getElementInfoById #1";
		const element = [...[...this.container.children].find(elem => elem.classList.contains("list")).children].find(elem => elem.getAttribute("id") == id);
		if (!element) throw "getElementInfoById #2";
		return {elementData, element};
	}

	clickOnTitle(e) {
		const titleElement = [...this.container.children].find(element => element.classList.contains("title"));
		if (!e.target.classList.contains("title")) return;

		titleElement.innerHTML = `
			<div>
				<input type="text" value="${this.title}">
				<i class="fa fa-check"></i>
			</div>
		`;
		titleElement.children[0].children[1].addEventListener("click", () => {
			this.title = titleElement.children[0].children[0].value;
			titleElement.innerText = this.title;
		});
	}

	addElement(data) {
		let id, label, checkbox;
        if (data && data.label) {
            id = data.id;
            label = data.label;
            checkbox = data.checkbox;
        } else {
            id = Date.now();
            label = "Новый элемент";
            checkbox = false;
            this.list.push({ id, label, checkbox });
        }
        console.log(this.list);
		const element = document.createElement('li');
		element.setAttribute("id", id);
		element.style.display = "flex";
		element.style.justifyContent = "flex-start";
		element.innerHTML = `
			<i class="fa fa-times"></i>
			<input type="checkbox" id="${id}">
			<label for="${id}">Новый элемент</label>
		`;
		[...this.container.children].find(elem => elem.classList.contains("list")).appendChild(element);
		element.children[0].setAttribute("action", "deleteElement");
		element.children[1].setAttribute("action", "editCheckState");
		element.children[2].setAttribute("action", "editLabel");
		element.addEventListener("click", e => {
			const action = e.target.getAttribute("action");
			if (!action) return;
			this[action](id);
		});
        saveData();
	}

	deleteElement(id) {
		const {elementData, element} = this.getElementInfoById(id);
		element.remove();
		this.list.splice(this.list.findIndex(elem => elem.id === id), 1);
	}

	editCheckState(id) {
		console.log(id);
		const {elementData, element} = this.getElementInfoById(id);
		console.log(element.children[1].checked, element.children[2].style.textDecoration);
		element.children[2].style.textDecoration = element.children[1].checked ? "line-through" : "none";
	}

	editLabel(id) {
		console.log(id);
		const {elementData, element} = this.getElementInfoById(id);

		element.children[2].style.display = "none";
		element.innerHTML += `
			<div>
				<input type="text" value="${elementData.label}">
				<i class="fa fa-check"></i>
			</div>
		`;

		element.children[3].children[1].addEventListener("click", () => {
			elementData.label = element.children[3].children[0].value;
			element.children[3].remove();
			element.children[2].innerText = elementData.label;
			element.children[2].style.display = "inline";
			element.children[2].addEventListener("click", this.editLabel.bind(this, id));
		});
	}
    
    getDataForSave() {
        return {
            title: this.title,
            list: this.list
        }
    }
}


function createCard(card) {
    const { index, title, text, btn, info } = card;

    const conteiner = document.createElement('div');
    const summary = document.createElement('div');
    const textarea = document.createElement('textarea');
    const meta = document.createElement('div');
    // const btn = document.createElement('button');
    const checkListsContainer = document.createElement('div');

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

    const createCheckList = (data) => {
    	const checkListContainer = document.createElement('div');
    	checkListsContainer.appendChild(checkListContainer);
    	card.checkLists.push(new CheckList(checkListContainer, data));
    }


    conteiner.className = 'card';
    conteiner.appendChild(createCardTitle(card, conteiner, toggleEdit, createCheckList));
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

//    const checkBox = document.createElement('div');
//    checkBox.className = 'card-summary';
//    checkBox.innerText = text;
//    checkBox.style.display = 'block';
//    conteiner.appendChild(checkBox);
    // btn.className = 'but';
    // btn.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
    // conteiner.appendChild(btn);
    textarea.addEventListener('change', (e) => {
        card.text = e.target.value;
        card.info = new Date().toLocaleString('en',
        {
          minute: 'numeric',
          hour: 'numeric',  
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
        saveData();
    }, false);
    conteiner.appendChild(textarea);

    conteiner.appendChild(checkListsContainer);

    meta.className = 'card-meta';
    meta.innerText = info;
    conteiner.appendChild(meta);

    setTimeout(() => {
        if (card._checkLists) {
            card._checkLists.forEach(cL => createCheckList(cL));
            delete card._checkLists;
        }
        saveData();
    }, 0);
    
    return conteiner;
}

addCard.addEventListener("click", (e) => {
    const card = {
        index: Date.now(),
        title: '',
        text: '',
        checkLists: [],
        info: new Date().toLocaleString('en', {
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
