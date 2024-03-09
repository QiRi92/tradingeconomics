
fetch("mexico_gdp.json")
.then(function(response){
	return response.json();
})
.then(function(products){
	const dataTableMx = [];
	const yearData = [];
	const mexData = [];
	let i=0;
	for(let product of products){
		dataTableMx[i] = `<td>${product.DateTime.slice(0,4)}</td><td>${product.Value}</td>`;
		yearData.push(parseInt(product.DateTime.slice(0,4)));
		mexData.push(parseFloat(product.Value));
		i+=1;
	}

	fetch("thailand_gdp.json")
	.then(function(response){
		return response.json();
	})
	.then(function(products){
		let placeholder = document.querySelector("#data-output");
		let out = "";
		const dataTableTh = [];
		const thaData = [];
		let i=0;
		for(let product of products){
			dataTableTh[i] = `<td>${product.Value}</td>`;
			thaData.push(parseFloat(product.Value));
			i+=1;
		}
		i=0;
		for (let i = 0; i < dataTableTh.length; i++) {
			out += `
				<tr>
					${dataTableMx[i]}${dataTableTh[i]}
				</tr>
			`;
		}
		placeholder.innerHTML = out;

		new Chart("myChart", {
			type: "line",
			data: {
			  labels: yearData,
			  datasets: [{
				label: 'Mexico', 
				data: mexData,
				borderColor: "red",
				fill: false
			  }, {
				label: 'Thailand',  
				data: thaData,
				borderColor: "green",
				fill: false
			  }]
			},
			options: {
			  legend: {display: true}
			},	
		  });
	});
});
