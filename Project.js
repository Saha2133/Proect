const addButton = document.querySelector('.card1');
let today  = new Date().toLocaleString('en',
{
  minute: 'numeric',
  hour: 'numeric',  
  day: 'numeric',
  month: 'long',
  year: 'numeric'
});
let a = "Title example"
let b = "Text example"



function createCardTitle(title, parent) {
    const conteiner = document.createElement('div');
    conteiner.className = 'card-title';
    const h3 = document.createElement('h3');
    h3.innerText = title;
    conteiner.appendChild(h3);
    

    // const view = document.createElement('button');
    // view.className = 'but';
    // view.innerHTML = '<i class="fa fa-eye" aria-hidden="true"></i>';
    // conteiner.appendChild(view);
    // view.addEventListener('click', (e) => {
    //     e.preventDefault();

        
    // }, false);
    
    const edit = document.createElement('button');
    edit.className = 'but';
    edit.innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>';
    conteiner.appendChild(edit);
    edit.addEventListener('click', (e) => {
        e.preventDefault();

        
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

function createCard(title, text, info) {
    const conteiner = document.createElement('div');
    conteiner.className = 'card';
    conteiner.appendChild(createCardTitle(title, conteiner));

    const summary = document.createElement('div');
    summary.className = 'card-summary';
    summary.innerText = text;
    conteiner.appendChild(summary);

    const meta = document.createElement('div');
    meta.className = 'card-meta';
    meta.innerText = info;
    conteiner.appendChild(meta);
    
    return conteiner;
}

function test() {
    [
        {
            title: 'Simple Note',
            text: 'Сьогодні хороший день і все добре загалом тааааккккі dsadasdasddddddd ddddddd dddddddddddddddd dddddddddddddd saddddddddddddd  dwqwqq віфввввввввввввіфвцй уйц кйцкйцкцквівфівфівфівіфв gergreget e tertert er tretret erterter  wer werwer werwerewrwer wrewerew reewrewr ewrwewrttr retrtrt erytrey ytyі', 
            info: 'PUBLISH: ' + today
        }
        // {
        //     title: 'Simple Note',
        //     text: b, 
        //     info: 'PUBLISH: ' + today
        // }
    ].forEach(({
        title,
        text,
        info
    }) => addButton.before(createCard(title, text, info)));
}
