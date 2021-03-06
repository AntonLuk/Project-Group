let conData;
function getMainData(conString) {
    conData = conString;
    fetch(conData)
        .then(responce => responce.json())
        .then((data) => {
            fillTable(data);
        });
}

function getMainDataBets(conString) {
    conData = conString;
    fetch(conData)
        .then(responce => responce.json())
        .then((data) => {
            fillTable(data);
        });
}

function cleanObject(obj, props) {
    props.forEach(prop => {
        delete obj[prop];
    });
    return obj;
}

function getSelectData(connectionString) {
    return fetch(connectionString).then(responce => {
        return responce.json();
    });
}

function hideTable() {
    let table = document.querySelector('table');
    let clientsContainer = document.querySelector('.search-container');
    let add = document.getElementById('add');
    clientsContainer.classList.add('hide');
    table.classList.add('hide');
    add.classList.add('hide');
}

function update() {
    clearTable();
    clearOptions();
    getMainData(conData);
    showTable();
}

function clearTable() {
    let table = document.querySelector('table');
    let rows = document.querySelectorAll('tr');
    for (let i = 1; i < rows.length; i++) {
        table.removeChild(rows[i]);
    }
}

function clearOptions() {
    let options = document.querySelectorAll('option');
    console.log(options);
    if (!options) return;
    for (let i = 1; i < options.length; i++) {
        options[i].parentElement.removeChild(options[i]);
    }
}

function showTable() {
    let table = document.querySelector('table');
    let clientsContainer = document.querySelector('.search-container');
    let add = document.getElementById('add');
    clientsContainer.classList.remove('hide');
    table.classList.remove('hide');
    add.classList.remove('hide');
    let addform = document.forms.add;
    addform.classList.add('hide');
    let editform = document.forms.edit;
    editform.classList.add('hide');
}

function addDelete(conString) {
    let can = document.createElement('td');
    can.classList.add('can');
    can.classList.add('button');
    can.innerText = 'Удалить';
    can.addEventListener('click', function (e) {
        fetch(conString).then(res => {
                if (res.status == 500) showError();
                else update();
            });
    });
    return can;
}

function addRandom(id) {
    let random = document.createElement('td');
    random.classList.add('can');
    random.classList.add('button');
    random.innerText = 'Определить победителя';
    random.addEventListener('click', function (e) {
        fetch(`/races/generate/${id}`).then(res => {
                console.log(res.json())
                if (res.status == 500) showError();
                else update();
            });
    });
    return random;
}


let search = document.getElementById('search');
if (search) {
    search.addEventListener('input', function (e) {
        let rows = document.querySelectorAll('tr');
        rows.forEach(row => {
            if (row.cells[0].nodeName != 'TH') {
                if (!searchInRow(this.value, row))
                    row.style.display = 'none';
                else
                    row.style.display = 'table-row';
            }
        });
    });
}

function searchInRow(str, row) {
    if (row.cells[0].nodeName != 'TH')
        if ((str && row.innerText.toLowerCase().includes(str.toLowerCase())) || !str)
            return true;
    return false;
}

function validateText(fields) {
    isBreak = false;
    fields.forEach(elem => {
        if (!elem.value) {
            if (!elem.classList.contains('error')) elem.classList.add('error');
            isBreak = true;
        }
        else if (elem.classList.contains('error')) elem.classList.remove('error');
    });
    if (isBreak) return false;
    return true;
}

function validateNumber(fields) {
    isBreak = false;
    fields.forEach(elem => {
        if (!elem.value || isNaN(elem.value)) {
            if (!elem.classList.contains('error')) elem.classList.add('error');
            isBreak = true;
        }
        else if (elem.classList.contains('error')) elem.classList.remove('error');
    });
    if (isBreak) return false;
    return true;
}

function showError() {
    let error = document.createElement('div');
    error.classList.add('popupError');
    let errorText = document.createElement('div');
    errorText.innerText = 'Ошибка!';
    let body = document.querySelector('body');
    error.appendChild(errorText);
    body.appendChild(error);
    setTimeout(() => {
        body.removeChild(error);
    }, 2000);
}

class Horse {
    constructor(IDHorse, Name) {
        this.IDHorse = IDHorse;
        this.Name = Name;
    }

    edit(Name) {
        this.Name = Name;
    }
}

class Client {
    constructor(IDClient, Fio, Phone, Passport) {
        this.IDClient = IDClient;
        this.Fio = Fio;
        this.Phone = Phone;
        this.Passport = Passport;
    }

    edit(Fio, Phone, Passport) {
        this.Fio = Fio;
        this.Phone = Phone;
        this.Passport = Passport;
    }
}

class Race {
    constructor(IDRace, Name, HorseID) {
        this.IDRace = IDRace;
        this.Name = Name;
        this.HorseID = HorseID;
    }

    edit(Name, HorseID) {
        this.Name = Name;
        this.HorseID = HorseID;
    }
}

class Bet {
    constructor(IDBet, Summ, Prize, Fio, ClientID, Name, HorseID) {
        this.IDBet = IDBet;
        this.Summ = Summ;
        this.Prize = Prize;
        this.Fio = Fio;
        this.ClientID = ClientID;
        this.Name = Name;
        this.HorseID = HorseID;
    }

    edit(Name, HorseID) {
        this.Summ = Summ;
        this.Prize = Prize;
        this.Fio = Fio;
        this.ClientID = ClientID;
        this.Name = Name;
        this.HorseID = HorseID;
    }
}


class List {
    constructor(IDList, RaceID, Name, HorseID) {
        this.IDList = IDList;
        this.RaceID = RaceID;
        this.Name = Name;
        this.HorseID = HorseID;
    }

    edit(RaceID, Name, HorseID) {
        this.RaceID = RaceID;
        this.Name = Name;
        this.HorseID = HorseID;
    }
}

