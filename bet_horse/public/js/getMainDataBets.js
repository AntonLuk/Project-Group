getMainData('/bets/index');


let bets = [];

function fillTable(data) {
    bets = [];
    console.log(data);
    data.map(entry => {
        let obj = new Bet(entry.id, entry.horse.name, entry.horse_id);
        entry.name = entry.horse.name;
        entry = cleanObject(entry, ['created_at', 'updated_at', 'horse', 'horse_id']);
        bets.push(obj);
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

        let can = addDelete(`/bets/destroy/${entry.id}`);
        row.appendChild(can);
        table.appendChild(row);
    });
}



function fillEditForm(row) {
    hideTable();
    let editform = document.forms.edit;
    editform.classList.remove('hide');
    let horse = editform.elements.horse;
    let entry = bets.filter(elem => {
        if (elem.IDRace == row.cells[0].innerText) return true;
        return false;
    })[0];
    let id = entry.IDRace;
    getSelectData('/horses/index').then(data => fillHorses(data, horse, entry));
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
        let horse = editform.elements.horse;

        fetch('/bets/update', {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `horse_id=${horse.value}&id=${id}`
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
    let horse = addform.elements.horse;
    getSelectData('/horses/index').then(data => fillHorses(data, horse));
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
        let horse = addform.elements.horse;
        console.log(horse.value);
        fetch('/bets/add', {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `horse_id=${horse.value}`
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

function fillHorses(data, horse, entry) {
    data.forEach(elem => {
        let option = document.createElement('option');
        option.value = elem.id;
        option.innerText = elem.name;
        if (entry && option.value == entry.horse_id) option.selected = true;
        horse.appendChild(option);
    });
}