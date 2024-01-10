console.log('Client-side code running');

var auto_refresh = setInterval(
    function(){
        //update state
        $.ajax({
            method: "POST",
            url: "../dbHandler/state.php",
            dataType: "json"
          })
            .done(function( response ) {
                response.forEach(function(currentValue,index){
                    if(currentValue==0){
                        document.getElementById(index.toString()).className = "table-danger";
                        $('#state'+(index+1).toString()).html("Down");
                        $('#ts1').html("");
                        $('#ts2').html("");
                        $('#asdu1').html("");
                        $('#asdu2').html("");
                    }
                    else if(currentValue==1){
                        document.getElementById(index.toString()).className = "table-success";
                        $('#state'+(index+1).toString()).html("Up");

                         // update Timestamp
                        $.ajax({
                            method: "POST",
                            url: "../dbHandler/timestamp.php",
                            dataType: "json"
                        })
                            .done(function( response ) {
                                $('#ts1').html(response[0]);
                                $('#ts2').html(response[1]);
                            });
                        //update asdu
                        $.ajax({
                            method: "POST",
                            url: "../dbHandler/asdu.php",
                            dataType: "json"
                            })
                            .done(function( response ) {
                                $('#asdu1').html(response[0]);
                                $('#asdu2').html(response[1]);
                            });

                    }
                    else{
                        document.getElementById(index.toString()).className = "table-secondary";
                        $('#state'+(index+1).toString()).html("No communication");
                        $('#ts1').html("");
                        $('#ts2').html("");
                        $('#asdu1').html("");
                        $('#asdu2').html("");
                    }
                })
            });

       
    
    },1000
)
