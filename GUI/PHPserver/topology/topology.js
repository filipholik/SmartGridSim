function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

anychart.onDocumentReady(function () {

	var btnConnect1 = document.getElementById("btn-connect-1");
	var btnDisconnect1 = document.getElementById("btn-disconnect-1");
	
	var btnConnect2 = document.getElementById("btn-connect-2");
	var btnDisconnect2 = document.getElementById("btn-disconnect-2");

	$.ajax({
            method: "POST",
            url: "../dbHandler/portConnected.php",
            dataType: "json"
        })
        .done(function( response ) {
		 response.forEach(function(currentValue,index){
                
                if(currentValue==0){
                    if(index==0){
			btnDisconnect1.hidden = "hidden";
		    }
		    else{
			btnDisconnect2.hidden = "hidden";
		    }
		}
		else{
			if(index==0){
			btnConnect1.hidden = "hidden";
		    }
		    else{
			btnConnect2.hidden = "hidden";
		    }
		}	
		})
	})

	

    anychart.data.loadJsonFile("data.json", function (data) {
        var chart = anychart.graph(data);

        // set the title
        chart.title("SCADA Simulation - Topology Overview");
        
        var nodes = chart.nodes();
        var edges = chart.edges();

        var DSS1GW = chart.group("DSS1 GW");
        var DSS2GW = chart.group("DSS2 GW");

        var DSS1_RTU = chart.group("DSS1 RTU");
        var DSS2_RTU = chart.group("DSS2 RTU");

        // declaration of all sensor
        var DSS1_15 = chart.group("DSS1 15");
        var DSS1_16 = chart.group("DSS1 16");
        var DSS1_19 = chart.group("DSS1 19");
        var DSS1_23 = chart.group("DSS1 23");
        var DSS1_24 = chart.group("DSS1 24");

        var DSS2_15 = chart.group("DSS2 15");
        var DSS2_16 = chart.group("DSS2 16");
        var DSS2_19 = chart.group("DSS2 19");
        var DSS2_23 = chart.group("DSS2 23");
        var DSS2_24 = chart.group("DSS2 24");
	
	var IED1 = chart.group("IED1");
        var IED2 = chart.group("IED2");
	var IED3 = chart.group("IED3");
	var IED4 = chart.group("IED4");

	var CB1 = chart.group("CB1");
	var CB2 = chart.group("CB2");
        
        nodes.normal().height(45);
        nodes.hovered().height(60);
        nodes.selected().height(60);
        nodes.normal().stroke(null);
        nodes.hovered().stroke(null);
        nodes.selected().stroke(null);
        chart.interactivity().nodes(false);
        chart.layout().type("fixed");
        chart.nodes().labels().enabled(true);
        edges.normal().height(10);
        chart.interactivity().scrollOnMouseWheel(false);
        chart.interactivity().zoomOnMouseWheel(false);
        chart.interactivity().enabled(false);
        chart.fit();

    // configure labels of nodes
        chart.nodes().labels().format("{%id}");
        chart.nodes().labels().fontSize(10);
        chart.nodes().labels().fontWeight(600);

        DSS1_15.normal().labels().format("{%id}");
        DSS1_16.normal().labels().format("{%id}");
        DSS1_19.normal().labels().format("{%id}");
        DSS1_23.normal().labels().format("{%id}");
        DSS1_24.normal().labels().format("{%id}");

        DSS2_15.normal().labels().format("{%id}");
        DSS2_16.normal().labels().format("{%id}");
        DSS2_19.normal().labels().format("{%id}");
        DSS2_23.normal().labels().format("{%id}");
        DSS2_24.normal().labels().format("{%id}");

	CB1.normal().labels().format("{%id}");
	CB2.normal().labels().format("{%id}");
        
        var DSS1value15;
        var DSS1value16;
        var DSS1value19;
        var DSS1value23;
        var DSS1value24;
        var DSS1timestamp15;
        var DSS1timestamp16;
        var DSS1timestamp19;
        var DSS1timestamp23;
        var DSS1timestamp24;

        var DSS2value15;
        var DSS2value16;
        var DSS2value19;
        var DSS2value23;
        var DSS2value24;
        var DSS2timestamp15;
        var DSS2timestamp16;
        var DSS2timestamp19;
        var DSS2timestamp23;
        var DSS2timestamp24;

        var DDOS1 = 0;
        var DDOS2 = 0;
        
        nodes.normal().shape("square");

        // draw the chart
        chart.container("container").draw();
        var auto_refresh = setInterval(function(){
            $.ajax({
            method: "POST",
            url: "../dbHandler/state.php",
            dataType: "json"
        })
        .done(function( response ) {
            response.forEach(function(currentValue,index){
                
                if(currentValue==0){
                    if(index==0){
                        DSS1GW.normal().stroke(null);
                        DSS1_15.normal().stroke("red",3);
                        DSS1_16.normal().stroke("red",3);
                        DSS1_19.normal().stroke("red",3);
                        DSS1_23.normal().stroke("red",3);
                        DSS1_24.normal().stroke("red",3);
                        
                        DSS1value15 = "";
                        DSS1value16 = "";
                        DSS1value19 = "";
                        DSS1value23 = "";
                        DSS1value24 = "";

                        DSS1timestamp15 = "";
                        DSS1timestamp16 = "";
                        DSS1timestamp19 = "";
                        DSS1timestamp23 = "";
                        DSS1timestamp24 = "";
                        
                    }
                    else{
                        DSS2GW.normal().stroke(null);
                        DSS2_15.normal().stroke("red",3);
                        DSS2_16.normal().stroke("red",3);
                        DSS2_19.normal().stroke("red",3);
                        DSS2_23.normal().stroke("red",3);
                        DSS2_24.normal().stroke("red",3);

                        DSS2value15 = "";
                        DSS2value16 = "";
                        DSS2value19 = "";
                        DSS2value23 = "";
                        DSS2value24 = "";

                        DSS2timestamp15 = "";
                        DSS2timestamp16 = "";
                        DSS2timestamp19 = "";
                        DSS2timestamp23 = "";
                        DSS2timestamp24 = "";
                    }
                    
                    
                }
                else if(currentValue==2){
                    if(index==0){
			if(DDOS1==0){
				DSS1GW.normal().stroke("red",3);
		                DSS1_15.normal().stroke(null);
		                DSS1_16.normal().stroke(null);
		                DSS1_19.normal().stroke(null);
		                DSS1_23.normal().stroke(null);
		                DSS1_24.normal().stroke(null);
			}
                        
                        DSS1value15 = "";
                        DSS1value16 = "";
                        DSS1value19 = "";
                        DSS1value23 = "";
                        DSS1value24 = "";

                        DSS1timestamp15 = "";
                        DSS1timestamp16 = "";
                        DSS1timestamp19 = "";
                        DSS1timestamp23 = "";
                        DSS1timestamp24 = "";

                    }
                    else{
			if(DDOS2==0){
				DSS2GW.normal().stroke("red",3);
		                DSS2_15.normal().stroke(null);
		                DSS2_16.normal().stroke(null);
		                DSS2_19.normal().stroke(null);
		                DSS2_23.normal().stroke(null);
		                DSS2_24.normal().stroke(null);
			}

                        DSS2value15 = "";
                        DSS2value16 = "";
                        DSS2value19 = "";
                        DSS2value23 = "";
                        DSS2value24 = "";

                        DSS2timestamp15 = "";
                        DSS2timestamp16 = "";
                        DSS2timestamp19 = "";
                        DSS2timestamp23 = "";
                        DSS2timestamp24 = "";
                    }
                }
                else{
                    if(index==0){
                        if(DDOS1==0){
                            DSS1GW.normal().stroke(null);
                            DSS1_15.normal().stroke("green",3);
                            DSS1_16.normal().stroke("green",3);
                            DSS1_19.normal().stroke("green",3);
                            DSS1_23.normal().stroke("green",3);
                            DSS1_24.normal().stroke("green",3);
                        }

                        $.ajax({
                            method: "POST",
                            url: "../dbHandler/DSS1sensorValue.php",
                            dataType: "json"
                        })
                        .done(function(response) {

                            DSS1value15 = "Value:\n"+response[0];
                            DSS1value16 = "Value:\n"+response[1];
                            DSS1value19 = "Value:\n"+response[2];
                            DSS1value23 = "Value:\n"+response[3];
                            DSS1value24 = "Value:\n"+response[4];
                        })
                        $.ajax({
                            method: "POST",
                            url: "../dbHandler/DSS1sensorTimestamp.php",
                            dataType: "json"
                        })
                        .done(function(response) {

                            DSS1timestamp15 = "\nTimestamp:\n"+response[0];
                            DSS1timestamp16 = "\nTimestamp:\n"+response[1];
                            DSS1timestamp19 = "\nTimestamp:\n"+response[2];
                            DSS1timestamp23 = "\nTimestamp:\n"+response[3];
                            DSS1timestamp24 = "\nTimestamp:\n"+response[4];
                        })
                    }
                    else{
                        if(DDOS2==0){
                            DSS2GW.normal().stroke(null);
                            DSS2_15.normal().stroke("green",3);
                            DSS2_16.normal().stroke("green",3);
                            DSS2_19.normal().stroke("green",3);
                            DSS2_23.normal().stroke("green",3);
                            DSS2_24.normal().stroke("green",3);
                        }
                        $.ajax({
                            method: "POST",
                            url: "../dbHandler/DSS2sensorValue.php",
                            dataType: "json"
                        })
                        .done(function(response) {
                
                            DSS2value15 = "Value:\n"+response[0];
                            DSS2value16 = "Value:\n"+response[1];
                            DSS2value19 = "Value:\n"+response[2];
                            DSS2value23 = "Value:\n"+response[3];
                            DSS2value24 = "Value:\n"+response[4];
                
                        })
                        $.ajax({
                            method: "POST",
                            url: "../dbHandler/DSS2sensorTimestamp.php",
                            dataType: "json"
                        })
                        .done(function(response) {

                            DSS2timestamp15 = "\nTimestamp:\n"+response[0];
                            DSS2timestamp16 = "\nTimestamp:\n"+response[1];
                            DSS2timestamp19 = "\nTimestamp:\n"+response[2];
                            DSS2timestamp23 = "\nTimestamp:\n"+response[3];
                            DSS2timestamp24 = "\nTimestamp:\n"+response[4];
                        })
                    }
                }
                DSS1_15.hovered().labels().format(DSS1value15+DSS1timestamp15);
                DSS1_15.selected().labels().format(DSS1value15+DSS1timestamp15);
                DSS1_16.hovered().labels().format(DSS1value16+DSS1timestamp16);
                DSS1_16.selected().labels().format(DSS1value16+DSS1timestamp16);
                DSS1_19.hovered().labels().format(DSS1value19+DSS1timestamp19);
                DSS1_19.selected().labels().format(DSS1value19+DSS1timestamp19);
                DSS1_23.hovered().labels().format(DSS1value23+DSS1timestamp23);
                DSS1_23.selected().labels().format(DSS1value23+DSS1timestamp23);
                DSS1_24.hovered().labels().format(DSS1value24+DSS1timestamp24);
                DSS1_24.selected().labels().format(DSS1value24+DSS1timestamp24);

                DSS2_15.hovered().labels().format(DSS2value15+DSS2timestamp15);
                DSS2_15.selected().labels().format(DSS2value15+DSS2timestamp15);
                DSS2_16.hovered().labels().format(DSS2value16+DSS2timestamp16);
                DSS2_16.selected().labels().format(DSS2value16+DSS2timestamp16);
                DSS2_19.hovered().labels().format(DSS2value19+DSS2timestamp19);
                DSS2_19.selected().labels().format(DSS2value19+DSS2timestamp19);
                DSS2_23.hovered().labels().format(DSS2value23+DSS2timestamp23);
                DSS2_23.selected().labels().format(DSS2value23+DSS2timestamp23);
                DSS2_24.hovered().labels().format(DSS2value24+DSS2timestamp24);
                DSS2_24.selected().labels().format(DSS2value24+DSS2timestamp24);
                
            })
        })
        $.ajax({
            method: "POST",
            url: "../dbHandler/DDOS.php",
            dataType: "json"

        }).done(function(response){
            if(response[0]==1 && DDOS1==0){
                DSS1GW.normal().stroke("orange",3);
                DSS1_RTU.normal().stroke("orange",3);
                DSS1_15.normal().stroke("orange",3);
                DSS1_16.normal().stroke("orange",3);
                DSS1_19.normal().stroke("orange",3);
                DSS1_23.normal().stroke("orange",3);
                DSS1_24.normal().stroke("orange",3);
                DDOS1=1;
		DSS1GW.hovered().labels().format("Denial of Service attack detected!");
            }
            else if(response[0]==0 && DDOS1==1){
                DSS1_RTU.normal().stroke(null);
                DDOS1=0;
		DSS1GW.hovered().labels().format("{%id}");
            }
            if(response[1]==1 && DDOS2==0){
                DSS2GW.normal().stroke("orange",3);
                DSS2_RTU.normal().stroke("orange",3);
                DSS2_15.normal().stroke("orange",3);
                DSS2_16.normal().stroke("orange",3);
                DSS2_19.normal().stroke("orange",3);
                DSS2_23.normal().stroke("orange",3);
                DSS2_24.normal().stroke("orange",3);
                DDOS2=1;
		DSS2GW.hovered().labels().format("Denial of Service attack detected!");
            }
            else if(response[1]==0 && DDOS2==1){
                DSS2_RTU.normal().stroke(null);
                DDOS2=0;
		DSS2GW.hovered().labels().format("{%id}");
            }


        })

	$.ajax({
            method: "POST",
            url: "../dbHandler/IED2svValue.php",
            dataType: "json"
        })
        .done(function(response){
	    var data0 = response[1];
	    var data1 = response[2];
	    
            if(response[3]==1){
                IED2.normal().stroke("green",3);
                IED2.selected().labels().format("DATA[0]:\n"+data0+"\nDATA[1]:\n"+data1);
                IED2.hovered().labels().format("DATA[0]:\n"+data0+"\nDATA[1]:\n"+data1);
            }
            else{
                IED2.normal().stroke("red",3);
                IED2.selected().labels().format("");
                IED2.hovered().labels().format("");
            }
        })

	$.ajax({
            method: "POST",
            url: "../dbHandler/IED3svValue.php",
            dataType: "json"
        })
        .done(function(response){
	    var data0 = response[1];
	    var data1 = response[2];
	    
            if(response[3]==1){
                IED3.normal().stroke("green",3);
                IED3.selected().labels().format("DATA[0]:\n"+data0+"\nDATA[1]:\n"+data1);
                IED3.hovered().labels().format("DATA[0]:\n"+data0+"\nDATA[1]:\n"+data1);
            }
            else{
                IED3.normal().stroke("red",3);
                IED3.selected().labels().format("");
                IED3.hovered().labels().format("");
            }
        })

	$.ajax({
            method: "POST",
            url: "../dbHandler/IED1gooseValue.php",
            dataType: "json"
        })
        .done(function(response){
	    var state = response[1];
	    var value = response[2];
	   var timestamp = response[3];
	    
            if(state==1){
                IED1.normal().stroke("green",3);
                IED1.selected().labels().format("Value: " + value + "\nTimestamp: " + timestamp);
                IED1.hovered().labels().format("Value: " + value + "\nTimestamp: " + timestamp);
		if(value < 10.0){
					CB1.normal().stroke("green",3);
					CB1.hovered().labels().format("Circuit breaker closed\nElectricity flowing normally");
				}else{
					CB1.normal().stroke("red",3);
					CB1.hovered().labels().format("Circuit breaker open!\nReason: oil temperature too high!");
				}		
            }
            else{
                IED1.normal().stroke("red",3);
                IED1.selected().labels().format("");
                IED1.hovered().labels().format("");
		CB1.normal().stroke("red",3);
		CB1.hovered().labels().format("Circuit breaker open!\nReason: no data from the IED!");
            }
        })

	$.ajax({
            method: "POST",
            url: "../dbHandler/IED4gooseValue.php",
            dataType: "json"
        })
        .done(function(response){
	    var state = response[1];
	    var value = response[2];
	   var timestamp = response[3];
	    
            if(state==1){
                IED4.normal().stroke("green",3);
                IED4.selected().labels().format("Value: " + value + "\nTimestamp: " + timestamp);
                IED4.hovered().labels().format("Value: " + value + "\nTimestamp: " + timestamp);
		if(value < 10.0){
					CB2.normal().stroke("green",3);
					CB2.hovered().labels().format("Circuit breaker closed\nElectricity flowing normally");
				}else{
					CB2.normal().stroke("red",3);
					CB2.hovered().labels().format("Circuit breaker open!\nReason: oil temperature too high!");
				}		
            }
            else{
                IED4.normal().stroke("red",3);
                IED4.selected().labels().format("");
                IED4.hovered().labels().format("");
		CB2.normal().stroke("red",3);
		CB2.hovered().labels().format("Circuit breaker open!\nReason: no data from the IED!");
            }
        })
              
    
    },1000)
        
    
    })
})