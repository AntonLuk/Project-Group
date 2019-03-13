
let links = document.querySelectorAll('.menu li');
links.forEach(link => {
	link.addEventListener('click', getData);
});

function getData(e) {
	let connectionString = '';
	if(this.innerText == 'Кони') connectionString = '/horses/index';
	else if(this.innerText == 'Люди') connectionString = '/clients/index';
	else if(this.innerText == 'Ставки') connectionString = '/bets/index';

	axios.get(connectionString)
  	.then(function (response) {
  		console.log(response.data);
  	})
  	.catch(function (error) {
    	console.log(error);
  	});
}

