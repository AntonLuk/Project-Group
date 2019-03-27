getMainDataBets(`/bets/getbets/${localStorage.token}`);


let bets = [];

function fillTable(data) {
    bets = [];
    data.races.map(entry => {
        if(entry.horse) entry.name = entry.horse.name;
        else entry.name = null;
        entry.bet = 'Нет';
        entry.summ = 0;
        entry.prize = 0;
        data.bets.forEach(bet => {
            data.horses.forEach(horse => {
                if(bet.list_of_participant.race_id == entry.id 
                    && horse.id == bet.list_of_participant.horse_id) entry.bet = horse.name;
            });
            if(bet.list_of_participant.race_id == entry.id) entry.summ = bet.summ;
            if(bet.list_of_participant.race_id == entry.id && bet.prize) 
            {
                console.log(bet.list_of_participant.race_id, entry.id);
                entry.prize = bet.prize;
            }
       });
        entry = cleanObject(entry, ['created_at', 'updated_at', 'horse', 'horse_id']);
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
            fillAddForm(row);
        });

        table.appendChild(row);
    });
}

function fillAddForm(row) {
    hideTable();
    let editform = document.forms.edit;
    editform.classList.remove('hide');
    let horse = editform.elements.horse;
    let summ = editform.elements.summ;
    let id = row.cells[0].innerText;

    getSelectData(`/list_of_participants/horses/${id}`).then(data => fillHorses(data, horse));

    let editControls = document.querySelector('.edit-control');
    let apply = document.createElement('label');
    let cancel = document.createElement('label');

    apply.innerText = 'Применить';
    cancel.innerText = 'Отмена';
    addAddListeners(row, apply, cancel);
    editControls.appendChild(apply);
    editControls.appendChild(cancel);
}

function addAddListeners(row, apply, cancel) {
    let listener = function (e) {
        let editform = document.forms.edit;
        let horse = editform.elements.horse;
        let summ = editform.elements.summ;
        let id = row.cells[0].innerText;

        fetch('/bets/add', {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `list_id=${horse.value}&summ=${summ.value}&token=${localStorage.token}`
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

function fillHorses(data, horse, entry) {
    data.forEach(elem => {
        console.log(elem);
        let option = document.createElement('option');
        option.value = elem.id;
        option.innerText = elem.horse.name;
        if (entry && option.value == entry.horse_id) option.selected = true;
        horse.appendChild(option);
    });
}