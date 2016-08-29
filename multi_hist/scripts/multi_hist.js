// var data = d3.range(1000).map(d3.randomBates(10));
var num_bins = 20;

var data = d3.range(15000).map(d3.randomNormal(0.5, 0.1));
var num_samples = data.length;

var formatCount = d3.format(",.0f");

var margin = {
        top: 10,
        right: 30,
        bottom: 30,
        left: 30
    },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var get_x = d3.scaleLinear()
    .rangeRound([0, width]);

var threshold_generator = d3.histogram()
    .domain(get_x.domain())
    .thresholds(get_x.ticks(num_bins));

var bins = threshold_generator(data);
console.log("bins", bins);

var get_y = d3.scaleLinear()
    .domain([0, d3.max(bins, function(d) {
        return d.length;
        // return d.length / num_samples;
    })])
    .range([height, 0]);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var bar = svg.selectAll(".bar")
    .data(bins)
    .enter().append("g")
    .attr("class", "bar")
    .attr("transform", function(d) {
        return "translate(" + get_x(d.x0) + "," + get_y(d.length) + ")";
    });

bar.append("rect")
    .attr("x", 1)
    .attr("width", get_x(bins[0].x1) - get_x(bins[0].x0) - 1)
    .attr("height", function(d) {
        return height - get_y(d.length);
    });

bar.append("text")
    .attr("dy", ".75em")
    .attr("y", 6)
    .attr("x", (get_x(bins[0].x1) - get_x(bins[0].x0)) / 2)
    .attr("text-anchor", "middle")
    .text(function(d) {
        return formatCount(d.length);
    });

svg.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(get_x));
