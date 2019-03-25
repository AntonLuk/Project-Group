getMainData('/clients/index');


let clients = [];

function fillTable(data) {
    clients = [];
    data.map(entry => {
        let obj = new Client(entry.id, entry.fio, entry.phone, entry.passport);
        entry = cleanObject(entry, ['created_at', 'updated_at']);
        clients.push(obj);
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

        let can = addDelete(`/clients/destroy/${entry.id}`);
        row.appendChild(can);
        table.appendChild(row);
    });
}



function fillEditForm(row) {
    hideTable();
    let editform = document.forms.edit;
    editform.classList.remove('hide');
    let fio = editform.elements.fio;
    let phone = editform.elements.phone;
    let passport = editform.elements.passport;

    let entry = clients.filter(elem => {
        if (elem.IDClient == row.cells[0].innerText) return true;
        return false;
    })[0];
    let id = entry.IDClient;

    fio.value = entry.Fio;
    phone.value = entry.Phone;
    passport.value = entry.Passport;

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
        let fio = editform.elements.fio;
        let phone = editform.elements.phone;
        let passport = editform.elements.passport;

        fetch('/clients/update', {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `fio=${fio.value}&phone=${phone.value}&passport=${passport.value}&id=${id}`
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
    let fio = addform.elements.fio;
    let phone = addform.elements.phone;
    let passport = addform.elements.passport;
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
        let fio = addform.elements.fio;
        let phone = addform.elements.phone;
        let passport = addform.elements.passport        
        fetch('/clients/add', {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `fio=${fio.value}&phone=${phone.value}&passport=${passport.value}`
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