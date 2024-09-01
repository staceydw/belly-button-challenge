// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadata_field = data.metadata;
    console.log(metadata_field)

    // Filter the metadata for the object with the desired sample number
    let md_info = metadata_field.filter(x => x.id == sample)[0]; 
    console.log(md_info)

    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select("#sample-metadata");
    console.log(panel)

    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    for (const [key, value] of Object.entries(md_info)) {
      panel.append("h6").text(`${key}: ${value}`);
    }
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let sample_field = data.samples;
    console.log(sample_field)

    // Filter the samples for the object with the desired sample number
    let s_info = sample_field.filter(x => x.id === sample)[0];
    console.log(s_info)

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = s_info.otu_ids;
    let otu_labels = s_info.otu_labels;
    let sample_values = s_info.sample_values;

    console.log(otu_ids);
    console.log(otu_labels);
    console.log(sample_values);

    // Build a Bubble Chart
    let trace1 = {
      x: otu_ids,
      y:sample_values,
      mode: 'markers',
      marker: {
        color: otu_ids,
        colorscale: 'Jet',
        size: sample_values
      },
      text: otu_labels
    };
    console.log(trace1)
    let bubble_chart = [trace1];
 
    // Render the Bubble Chart
    let layout1 = {
      title: 'Bacteria Cultures per Sample',
      xaxis: {
        title: 'OTU ID'
      },
      yaxis: {
        title: 'Number of Bacteria'
      }
    };

    Plotly.newPlot('bubble', bubble_chart, layout1);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let bar_y = otu_ids.map(x => `OTU: ${x}`);
    console.log(bar_y);

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let trace2 = {
      x: sample_values.slice(0, 10).reverse(),
      y: bar_y.slice(0, 10).reverse(),
      type: 'bar',
      orientation: 'h',
      marker: {
        colorscale: 'Jet'
      },
      text: otu_labels.slice(0, 10).reverse()
      
    };
    console.log(trace2);

    // Render the Bar Chart
    let bar_chart = [trace2];

     // Apply a title to the layout
     let layout2 = {
      title: 'Top 10 Bacteria Cultures Found',
      xaxis: {
        title: 'Number of Bacteria'
      }
    };

// Render the plot to the div tag with id "plot"
  Plotly.newPlot('bar', bar_chart, layout2);

  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let names = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdown = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    for (let i = 0; i < names.length; i++){
      let name = names[i];
      dropdown.append("option").text(name);
    }

    // Get the first sample from the list
    let sample_name = names[0];
    console.log(sample_name);

    // Build charts and metadata panel with the first sample
    buildCharts(sample_name);
    buildMetadata(sample_name);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
