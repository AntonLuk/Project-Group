getMainData('/list_of_participants/index');


let lists = [];

function fillTable(data) {
    lists = [];
    data.map(entry => {
        let obj = new List(entry.id, entry.race.id, entry.horse.name, entry.horse_id);
        entry.raceid = entry.race.id;
        entry.name = entry.horse.name;
        entry = cleanObject(entry, ['created_at', 'updated_at', 'horse', 'horse_id', 'race', 'race_id']);
        lists.push(obj);
        console.log(lists);
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

        let can = addDelete(`/list_of_participants/destroy/${entry.id}`);
        row.appendChild(can);
        table.appendChild(row);
    });
}

function fillEditForm(row) {
    hideTable();
    let editform = document.forms.edit;
    editform.classList.remove('hide');
    let race = editform.elements.race;
    let horse = editform.elements.horse;

    let entry = lists.filter(elem => {
        if (elem.IDList == row.cells[0].innerText) return true;
        return false;
    })[0];
    let id = entry.IDList;
    getSelectData('/horses/index').then(data => fillHorses(data, horse, entry));
    getSelectData('/races/index').then(data => fillRaces(data, race, entry));
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
        let race = editform.elements.race;
        let horse = editform.elements.horse;

        fetch('/list_of_participants/update', {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `race_id=${race.value}&horse_id=${horse.value}&id=${id}`
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

let add = document.getElementById('add');
add.addEventListener('click', (e) => {
    hideTable();
    let addform = document.forms.add;
    addform.classList.remove('hide');
    let race = addform.elements.race;
    let horse = addform.elements.horse;

    getSelectData('/races/index').then(data => fillRaces(data, race));
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
        let race = addform.elements.race;
        let horse = addform.elements.horse;
        fetch('/list_of_participants/add', {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `race_id=${race.value}&horse_id=${horse.value}`
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
        if (entry && option.value == entry.HorseID) option.selected = true;
        horse.appendChild(option);
    });
}

function fillRaces(data, race, entry) {
    data.forEach(elem => {
        console.log(elem);
        let option = document.createElement('option');
        option.value = elem.id;
        option.innerText = elem.id;
        if (entry && option.value == entry.RaceID) option.selected = true;
        race.appendChild(option);
    });
}