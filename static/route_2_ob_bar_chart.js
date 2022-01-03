
// D3 CHART

    // GET DATA FOR THE CHART
    var data;
    data = route_2_outbound_isos;
    console.log("route 2 outbound before filter: ");
    console.log(data);

    // SET DATA VARIABLE TO FEATURES ONLY
    data = data.features;
    console.log("route 2 outbound: ");
    console.log(data);

    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 100, bottom: 200, left: 80},
        width = 1100 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // set the ranges
    var x = d3.scaleBand()
              .range([0, width])
              .padding(0.1);
    var y = d3.scaleLinear()
              .range([height, 0]);

    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("#bar_graph").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

      // Scale the range of the data in the domains
      x.domain(data.map(function(d) { return d.properties.stop_name; }));
      y.domain([0, d3.max(data, function(d) { return d.properties.proportional_pop; })]);

        // append the rectangles for the bar chart
      svg.selectAll(".bar")
          .data(data)
          .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.properties.stop_name); })
          .attr("width", x.bandwidth())
          .attr("y", function(d) { return y(d.properties.proportional_pop); })
          .attr("height", function(d) { return height - y(d.properties.proportional_pop); })
          .style("fill", "#bdbdff")
          .style("stroke", "#7a7aff")
          .style("stroke-width", "1.5");

      // add the x Axis
      svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x))
          .selectAll("text")
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", ".15em")
          .attr("transform", "rotate(-65)");

      // add the y Axis
      svg.append("g")
          .call(d3.axisLeft(y));
