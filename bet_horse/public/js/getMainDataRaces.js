getMainData('/races/index');


let races = [];

function fillTable(data) {
    races = [];
    data.map(entry => {
      //  let obj = new Race(entry.id, entry.horse.name, entry.horse_id);
        if(entry.horse) entry.name = entry.horse.name;
        else entry.name = null;
        entry = cleanObject(entry, ['created_at', 'updated_at', 'horse', 'horse_id']);
      //  races.push(obj);
        let table = document.querySelector('table');
        let row = document.createElement('tr');
        for (key in entry) {
            let cell = document.createElement('td');
            cell.innerText = entry[key];
            row.appendChild(cell);
        }

        let random = addRandom(entry.id);
        let can = addDelete(`/races/destroy/${entry.id}`);
        row.appendChild(random);
        row.appendChild(can);
        table.appendChild(row);
    });
}

let add = document.getElementById('add');
add.addEventListener('click', (e) => {
    fetch('/races/add')
        .then(res => {
            update();
        });
});

function fillHorses(data, horse, entry) {
    let option = document.createElement('option');
    option.value = null;
    option.innerText = 'Нет';
    horse.appendChild(option);

    data.forEach(elem => {
        let option = document.createElement('option');
        option.value = elem.id;
        option.innerText = elem.name;
        if (entry && option.value == entry.horse_id) option.selected = true;
        horse.appendChild(option);
    });
}