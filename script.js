var width = 200;
var height = 200;
var colCounter = 0;
var bilView;
var industriesValues = {}; //Biggest is Consumer : 1257
var billionaires = [];
var vis = d3.select('#charts')
		.append('svg')
		.attr('width',width * 5)
		.attr('height',height * 2);

var scale = d3.scaleLinear().domain([0, 1300]).range([0,100]);

d3.json('billionaires.json',function(error, data){
	if(error)
		throw error;

	//Show the list of billionaires
	function viewBils(d){
		var industry = d.key;
		var people = billionaires.filter(function(elem){return elem.industry == industry});
		var rowCounter = 0;
		var colCount = 0;
		bilView = d3.select("#viewBil")
			.append('svg')
			.attr('width','1000')
			.attr('height','250')
			.attr('id','richpeople');
		bilView.selectAll('text').data(people)
			.enter()
			.append('text')
			.append('tspan')
			.text(function(d){return d.name + " " + d.wealth.toFixed(2);})
			.attr('font-size','11')
			.attr('textLength', '200')
			.attr('y', function(d,i){
				var ret = 8 + rowCounter * 11
				if(i % 20 == 0 && i != 0)
				{
					rowCounter = 0
				}
				else
					rowCounter++
				return ret})
			.attr('x',function(d,i){
				var ret = colCount * 200;
				if(i % 20 == 0  && i != 0)
					colCount++;
				return ret;
			})
	}
	function removeBils(){
		bilView.remove();
	}
	
	data.forEach(function(elem){
		billionaires.push({industry: elem.industry, name: elem.name, wealth: elem.billions});
	})
	
	data.forEach(function(elem){
		if(!Object.keys(industriesValues).includes(elem.industry))
			industriesValues[elem.industry] = 0;
	})

	data.forEach(function(elem){
		industriesValues[elem.industry] += elem.billions;
	});
	
	var sorted = d3.entries(industriesValues).sort(function(a,b){return b.value - a.value})
	//Reduce to top 10
	sorted = sorted.slice(0,10);
	
	var graphs = vis.selectAll('g').data(sorted)
		.enter()
		.append('g');

	graphs.append('circle')
		.attr('r', function(d){return scale(d.value)})
		.attr('cx', function(d,i){
			var ret = 0;
			if(i > 4)
			{
				ret = colCounter * width + width/2;
				colCounter++;
			}
			else
				ret = i * width + width/2;
			return ret;
		})
		.attr('cy', function(d, i){
			var ret = 0;
			if(i > 4)
				ret = height + height/2;
			else
				ret = height/2;
			return ret;
		})
		.attr('class','circleGraphs');
		
	colCounter = 0;
	graphs.append('text')
		.text(function(d){
			return d.key;
		})
		.attr('x', function(d,i){
			var ret = 0;
			if(i > 4)
			{
				ret = colCounter * width + width/2;
				colCounter++;
			}
			else
				ret = i * width + width/2;			
			return ret;
		})
		.attr('y', function(d, i){
			var ret = 0;
			if(i > 4)
				ret = height + height/2;
			else
				ret = height/2;
			return ret;
		})
		.attr('text-anchor','middle')
		.attr('class','circleGraphs')
		.attr('fill','red');

	colCounter = 0;
	graphs.append('text')
		.text(function(d){
			var wealth = Math.round(d.value);
			if(wealth > 1000)
			{
				wealth = (wealth / 1000).toFixed(2);
				wealth = wealth + " Trillion"
			}
			else
				wealth = wealth + " Billion";
			return wealth
		})
		.attr('font-size',11)
		.attr('x', function(d,i){
			var ret = 0;
			if(i > 4)
			{
				ret = colCounter * width + width/2;
				colCounter++;
			}
			else
				ret = i * width + width/2;
			return ret;
		})
		.attr('y', function(d, i){
			var ret = 0;
			if(i > 4)
				ret = 13 + height + height/2;
			else
				ret = 13 + height/2;
			return ret;
		})
		.attr('text-anchor','middle')
		.attr('class','circleGraphs')
		.attr('fill','red');

	d3.selectAll('.circleGraphs')
		.on('mouseenter', viewBils)
		.on('mouseout',removeBils)
});