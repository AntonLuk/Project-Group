getMainData('/horses/index');


let horses = [];

function fillTable(data) {
    horses = [];
    console.log(data);
    data.map(entry => {
        let obj = new Horse(entry.id, entry.name);
        entry = cleanObject(entry, ['created_at', 'updated_at']);
        horses.push(obj);
        let table = document.querySelector('table');
        let row = document.createElement('tr');
        for (key in entry) {
            let cell = document.createElement('td');
            cell.innerText = entry[key];
            row.appendChild(cell);
        }

        row.addEventListener('click', function (e) {
            if (e.target.classList.contains('can')) return;
            let row = e.target.parentElement;
            fillEditForm(row);
        });

        let can = addDelete(`/horses/destroy/${entry.id}`);
        row.appendChild(can);
        table.appendChild(row);
    });
}



function fillEditForm(row) {
    hideTable();
    let editform = document.forms.edit;
    editform.classList.remove('hide');
    let name = editform.elements.name;
    let entry = horses.filter(elem => {
        if (elem.IDHorse == row.cells[0].innerText) return true;
        return false;
    })[0];
    let id = entry.IDHorse;
    name.value = entry.Name;
    let editControls = document.querySelector('.edit-control');
    let apply = document.createElement('label');
    let cancel = document.createElement('label');

    apply.innerText = 'Применить';
    cancel.innerText = 'Отмена';
    addEditListeners(id, apply, cancel);
    editControls.appendChild(apply);
    editControls.appendChild(cancel);
}

function addEditListeners(id, apply, cancel) {
    let listener = function (e) {
        let editform = document.forms.edit;
        let name = editform.elements.name;

        fetch('/horses/update', {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `name=${name.value}&id=${id}`
        })
            .then(res => {
                update();
                console.log(res);
                apply.parentElement.removeChild(apply);
                cancel.parentElement.removeChild(cancel);
            });
    }
    apply.addEventListener('click', listener, false);
    listener = (e) => {
        update();
        apply.parentElement.removeChild(apply);
        cancel.parentElement.removeChild(cancel);
    }
    cancel.addEventListener('click', listener, false);
}

let add = document.getElementById('add');
add.addEventListener('click', (e) => {
    hideTable();
    let addform = document.forms.add;
    addform.classList.remove('hide');
    let name = addform.elements.name;
    let addControls = document.querySelector('.add-control');
    let apply = document.createElement('label');
    let cancel = document.createElement('label');
    apply.innerText = 'Применить';
    cancel.innerText = 'Отмена';
    addAddListeners(apply, cancel);
    addControls.appendChild(apply);
    addControls.appendChild(cancel);
});

function addAddListeners(apply, cancel) {
    let listener = function (e) {
        let addform = document.forms.add;
        let name = addform.elements.name;
        fetch('/horses/add', {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `name=${name.value}`
        })
            .then(res => {
                update();
                apply.parentElement.removeChild(apply);
                cancel.parentElement.removeChild(cancel);
            });
    }
    apply.addEventListener('click', listener, false);
    listener = (e) => {
        update();
        apply.parentElement.removeChild(apply);
        cancel.parentElement.removeChild(cancel);
    }
    cancel.addEventListener('click', listener, false);
}