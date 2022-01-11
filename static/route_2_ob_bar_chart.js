
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
   var margin = {top: 60, right: 20, bottom: 200, left: 100},
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
    var svg = d3.select("#bar_graph_area").append("svg")
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
          .style("stroke-width", "1.5")
               //Our new hover effects
         .on('mouseover', function (event, d) {
            d3.select(this)
               .style('fill', '#ff401f')
               .style('stroke', '#ff401f')
            div.transition()
                .duration(10)
                .style("opacity", .9);
                div.html(d.properties.proportional_pop_comma)
                     .style("left", (event.pageX - 80) + "px")
                     .style("top", (event.pageY - 350) + "px")
                     console.log(event.x, event.y)
                     console.log(d.properties)
                     })
            .on('mouseout', function (d, i) {
            d3.select(this)
                .style("fill", "#bdbdff")
                .style("stroke", "#7a7aff")
               div.transition()
               .duration('10')
               .style("opacity", 0);
              })


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

                  svg.append('text')
            .attr('x',  -125)
            .attr('y', -80)
            .attr('transform', 'rotate(-90)')
            .attr('text-anchor', 'middle')
            .text('Number of Residents')
            svg.append('text')
            .attr('x', -125)
            .attr('y',-60)
            .attr('transform', 'rotate(-90)')
            .attr('text-anchor', 'middle')
            .text('Living in Coverage Area')


        svg.append('text')
            .attr('x', margin.left + 15 )
            .attr('y', -30)
            .attr('text-anchor', 'middle')
            .text('Residential Coverage by Stop')

