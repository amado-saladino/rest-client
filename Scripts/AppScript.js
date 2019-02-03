$(document).ready(function () {


    $("#btnSend").click(function () {

        var sentData = {};
        var out = "";

        if ($("#ComboMethods").val() != "GET" && $("#ComboMethods").val() != "HEAD" && $("#ComboMethods").val()!="OPTIONS" ) {
            try {
                sentData = JSON.parse($("#txtBody").val());
                                
                console.log(sentData);

            }
            catch (e) {

                console.log("Error parsing the string!!");
                return;
            }
        }


        $("#progressBar").show();

        $.ajax({

            url: removeNonPrintable( ' ', $("#txtURL").val()  ),            
            method: $("#ComboMethods").val(),            
            data:sentData,                    
            success: function (response, status,xmlHTTP) {

               
                if (xmlHTTP.status == 204) {

                    $("#txtResponse").val("OK: No Content to display");
                    return;
                }

                if ($("#ComboMethods").val() == "HEAD") {
                    console.log(xmlHTTP.getAllResponseHeaders());
                    $("#txtResponse").val(xmlHTTP.getAllResponseHeaders());
                    return;
                }

                if ($("#ComboMethods").val() == "OPTIONS")
                {
                    $("#txtResponse").val(xmlHTTP.status);
                    console.log(xmlHTTP.status);
                }


                if (JSON.stringify(response).indexOf("\\") >= 0) {
                    out = response.replace(/\\/g, "");                    
                    $("#txtResponse").val(JSON.stringify(eval('(' + out + ')'), null, 2));

                }
                else if (JSON.stringify(response).indexOf("\\") == -1 && xmlHTTP.responseText.indexOf(">") ==-1  ) {
                    $("#txtResponse").val(JSON.stringify(response, null, 2));                    
                } else if (xmlHTTP.responseText.indexOf(">") >0 )
                {
                    $("#txtResponse").val(xmlHTTP.responseText);
                } else 
                {
                    console.log("Unsupported format");
                } 
            },            
            error: function (error) {

                console.log(error);
                $("#txtResponse").val( JSON.stringify(error,null,2) );
            },
            complete: function () {
                                
                $("#progressBar").hide();
            }
        });

        
       

    });
    
    removeNonPrintable= (_,value)=> {
        return value.replace(/[^ -~]/g, '');        
    }

});
