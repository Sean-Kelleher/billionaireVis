var width = 200;
var height = 200;
var colCounter = 0;

var industriesValues = {}; //Biggest is Consumer : 1756

var vis = d3.select('#charts')
		.append('svg')
		.attr('width',width * 5)
		.attr('height',height * 2);

var scale = d3.scaleLinear().domain([0, 1800]).range([0,100]);
//industry, its billionaires, who they are, the total
//Each circle has a diameter of 200, (Ring for each billionaire?)
//circle, pie, bar, line, 
d3.json('billionaires.json',function(error, data){
	if(error)
		throw error;
	//Show the list of billionaires
	function viewBils(){
		//append somethin i guess I don't know I'll figure this out later
	}

	data.forEach(function(elem){
		if(!Object.keys(industriesValues).includes(elem.industry))
			industriesValues[elem.industry] = 0;
	})
	data.forEach(function(elem){
		industriesValues[elem.industry] += elem.billions;
	});
	console.log(industriesValues);
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
		});
		colCounter = 0;
	graphs.append('text')
		.text(function(d){return d.key})
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
		.attr('fill','red');
});