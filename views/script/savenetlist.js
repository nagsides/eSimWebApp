jQuery(document).ready(function(){

	/*------------------------------------------------------------------------------------------------------------------------------------------------
	For Simulation of Netlist and Removal of netlist Window
	------------------------------------------------------------------------------------------------------------------------------------------------*/

	jQuery("#webtronics_netlist_simulate").click(function(){
		socket.emit('netlist', jQuery("#webtronics_netlist_text_area").val());
    	//console.log("simulation button clicked");
     	jQuery('#webtronics_netlist_text_div').hide(); 
     	jQuery('#webtronics_netlist_buttons').hide();
     	jQuery('#webtronics_netlist_text').hide();       
     	jQuery('#webtronics_disable').hide();
    });

    /*------------------------------------------------------------------------------------------------------------------------------------------------
    For Download of netlist
    ------------------------------------------------------------------------------------------------------------------------------------------------*/

    jQuery("#webtronics_netlist_text_download").click(function(){
    	var netlist = jQuery("#webtronics_netlist_text_area").val();
    	//  create a new Blob (html5 magic) that conatins the data from your form feild
		var textFileAsBlob = new Blob([netlist], {type:'text/plain'});
    	
    	var netListFileName = prompt('Enter name of netlist file to be saved');
    	if(!netListFileName){
    		alert("Please give the proper name");
    	} 

    	// create a link for our script to 'click'
		var downloadLink = document.createElement("a");

    	downloadLink.download = netListFileName+'.cir';

    	// Link Name
		downloadLink.innerHTML = "Netlist Download Link";

		// allow our code to work in webkit & Gecko based browsers
		// without the need for a if / else block.
		window.URL = window.URL || window.webkitURL;

		// Create the link Object.
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		// when link is clicked call a function to remove it from
		// the DOM in case user wants to save a second file.
		downloadLink.onclick = destroyClickedElement;
		// make sure the link is hidden.
		downloadLink.style.display = "none";
		// add the link to the DOM
		document.body.appendChild(downloadLink);

		// click the new link
		downloadLink.click();

        function destroyClickedElement(event)
		{
			// remove the link from the DOM
    		document.body.removeChild(event.target);
		}

	
	});

    /*------------------------------------------------------------------------------------------------------------------------------------------------
	DC FUNCTIONALITY IS WRITTEN HERE 
	---------------------------------------------------------------------------------------------------------------------------------------------------*/
	
	jQuery(function(){
		jQuery("#select").show();
    	jQuery("#dc_menu").hide();
    	jQuery("#ac_menu").hide();
    	jQuery("#transient_menu").show();
    	jQuery("#dc_sweep_menu").hide();
    	jQuery("#analysis_selectbox").change(function(){
	    
	    if (jQuery(this).val() == "5"){
	    	jQuery("#select").show();	
		    jQuery("#transient_menu").hide();
		    jQuery("#dc_menu").hide();
		    jQuery("#ac_menu").hide();
		    jQuery("#dc_sweep_menu").hide();
	    }
    	else if (jQuery(this).val() == "1"){
		    jQuery("#select").hide();	
		    jQuery("#dc_menu").show();
		    jQuery("#ac_menu").hide();
		    jQuery("#transient_menu").hide();
		    jQuery("#dc_sweep_menu").hide();
	    }
	    else if (jQuery(this).val() == "2"){
		    jQuery("#select").hide();	
		    jQuery("#ac_menu").show();
		    jQuery("#dc_menu").hide();
		    jQuery("#transient_menu").hide();
		    jQuery("#dc_sweep_menu").hide();
	    }
    	else if (jQuery(this).val() == "3"){
    		jQuery("#select").hide();	
		    jQuery("#transient_menu").show();
		    jQuery("#dc_menu").hide();
		    jQuery("#ac_menu").hide();
		    jQuery("#dc_sweep_menu").hide();
    	}
    	else if (jQuery(this).val() == "4"){
		    jQuery("#select").hide();	
		    jQuery("#transient_menu").hide();
		    jQuery("#dc_menu").hide();
		    jQuery("#ac_menu").hide();
		    jQuery("#dc_sweep_menu").show();
    	}
     
   		//$("#preview").change(function(){
    	//jQuery"#analysis_selectbox".val();
        //$("#div1, #div2").toggle();
    });
});


var savedacval3="";
var savedacval2="";
var savedacval1="";

var saveddcval1="";
var saveddcval2="";
var saveddcval3="";

var savedtransval1="";
var savedtransval2="";
var savedtransval3="";

var savedsweepval1="";
var savedsweepval2="";
var savedsweepval3="";
var savedsweepval4="";
var savedsweepval5="";
var savedsweepval6="";


/*------------------------------------------------------------------------------------------------------------------------------------------------
Ac netlist variable for ac
------------------------------------------------------------------------------------------------------------------------------------------------*/

jQuery("#saveac").click(function(){
	startfreq = jQuery("#startfreqval").val();
	stopfreq = jQuery("#stopfreqval").val();
	noofpoint = jQuery("#noofpointsval").val();
	//console.log(startfreq,stopfreq,noofpoint);
	//console.log(startfreq);
	if (startfreq == ""){
		alert("Please enter Start Frequency");
	}
	else if (stopfreq == ""){
		alert("Please enter Stop Frequency value");
	}
	else if (noofpoint == ""){
		alert("Please Enter No Of Points");
	}
	else{
		jQuery("#webtronics_netlist_analysis").hide();
        jQuery("#webtronics_disable").hide();
	}

	scale_val=savedacval1;
	if(scale_val==""){
		scale_val="lin";
	}

	start_ac_unit=savedacval2;
	if(start_ac_unit==""){
		start_ac_unit="Hz";
	}

	stop_ac_unit=savedacval3;
	if(stop_ac_unit==""){
		stop_ac_unit="Hz";
	}
});


jQuery("#frequency_selectbox").change(function(){

	freq = jQuery(this).val();
	// console.log(freq);
});

jQuery("#scale_selectbox").change(function(){
	scale = jQuery(this).val();
	
	if (scale == "1"){
		scale_val = "lin";
	}
	else if (scale == "2"){
		scale_val = "dec";
	}
	else if (scale == "3"){
		scale_val = "octal";
	}
	savedacval1=scale_val;
});

jQuery("#start_frequency_selectbox").change(function(){
	ac_start_freq = jQuery(this).val();

	if (ac_start_freq == "1"){
		start_ac_unit = "Hz";
	}
	else if (ac_start_freq == "2"){
		start_ac_unit = "THz";
	}
	else if (ac_start_freq == "3"){
		start_ac_unit = "GHz";
	}
	else if (ac_start_freq == "4"){
		start_ac_unit = "Meg";
	}
	else if (ac_start_freq == "5")
	{
		start_ac_unit = "KHz";
	}
	savedacval2=start_ac_unit;
});

jQuery("#stop_frequency_selectbox").change(function(){
	ac_stop_freq = jQuery(this).val();

	if (ac_stop_freq == "1"){
		stop_ac_unit = "Hz";
	}
	else if (ac_stop_freq == "2"){
		stop_ac_unit = "THz";
	}
	else if (ac_stop_freq == "3"){
		stop_ac_unit = "GHz";
	}
	else if (ac_stop_freq == "4"){
		stop_ac_unit = "Meg";
	}
	else if (ac_stop_freq == "5"){
		stop_ac_unit = "KHz";
	}
	
	savedacval3=stop_ac_unit;

});

/*------------------------------------------------------------------------------------------------------------------------------------------------
Dc netlist variable for dc
------------------------------------------------------------------------------------------------------------------------------------------------*/
jQuery("#savedc").click(function(){
	source = jQuery("#sourceval").val();
    start = jQuery("#startval").val();
    increment = jQuery("#Incrementval").val();
    stop = jQuery("#stopval").val();
    // console.log(source,start,increment,stop);
    // console.log(start);
    if (source == ""){
    	alert("Please enter Source Name");
    }
    else if (start == ""){
    	alert("Please enter Start Time");
    }
    else if (increment == ""){
    	alert("Please enter the increment value");
    }
    else if (stop == ""){
    	alert("Please enter the Stop Time");
    }

	else{

		jQuery("#webtronics_netlist_analysis").hide();
        jQuery("#webtronics_disable").hide();
	}

	start_dc_unit=saveddcval1;
	if(start_dc_unit==""){
		start_dc_unit="00";
	}
	increment_dc_unit=saveddcval2;
	if(increment_dc_unit==""){
		increment_dc_unit="00";
	}
	stop_dc_unit=saveddcval3;
	if(stop_dc_unit==""){
		stop_dc_unit="00";
	}
           
});
	
jQuery("#start_volt_selectbox").change(function(){
	dc_start_time = jQuery(this).val();
	
	if (dc_start_time == "1"){
	 	start_dc_unit = "00";
	}
	else if (dc_start_time == "2"){
		start_dc_unit = "03";
	}
	else if (dc_start_time == "3"){
	 	start_dc_unit = "06";
	}
	else if (dc_start_time == "4"){
	 	start_dc_unit = "09";
	}
	else if (dc_start_time == "5"){
	 	start_dc_unit = "12";
	}
	saveddcval1=start_dc_unit;
	console.log(start_dc_unit);
});	

jQuery("#inc_volt_selectbox").change(function(){

	dc_increment_time = jQuery(this).val();
	
	if (dc_increment_time == "1"){
		increment_dc_unit = "00";
	}
	else if (dc_increment_time == "2"){
		increment_dc_unit = "03";
	}
	else if (dc_increment_time == "3"){
		increment_dc_unit = "06";
	}
	else if (dc_increment_time == "4")
	{
	 	increment_dc_unit = "09";
	}
	else if (dc_increment_time == "5")
	{
	 	increment_dc_unit = "12";
	}
	saveddcval2=increment_dc_unit;
	console.log(increment_dc_unit);
});	

jQuery("#stop_volt_selectbox").change(function(){
	
	dc_stop_time = jQuery(this).val();
	
	if (dc_stop_time == "1"){
		stop_dc_unit = "00";
	}
	else if (dc_stop_time == "2"){
		stop_dc_unit = "03";
	}
	else if (dc_stop_time == "3"){
	 	stop_dc_unit = "06";
	}
	else if (dc_stop_time == "4"){
	 	stop_dc_unit = "09";
	}
	else if (dc_stop_time == "5"){
	 	stop_dc_unit = "12";
	}
	saveddcval3=stop_dc_unit;
	console.log(stop_dc_unit);
});	



/*------------------------------------------------------------------------------------------------------------------------------------------------
DC netlist variable for dc sweep
------------------------------------------------------------------------------------------------------------------------------------------------*/
jQuery("#savedcs").click(function(){
	source1 = jQuery("#sourceval1").val();
    start1 = jQuery("#startval1").val();
    increment1 = jQuery("#Incrementval1").val();
    stop1 = jQuery("#stopval1").val();
    source2 = jQuery("#sourceval2").val();
    start2 = jQuery("#startval2").val();
    increment2 = jQuery("#Incrementval2").val();
    stop2 = jQuery("#stopval2").val();
    //console.log(source1,start1,increment1,stop1);
    //console.log(start1);
    if (source1 == ""){
    	alert("Please enter Source Name");
    }
    else if (start1 == ""){
    	alert("Please enter Start Time");
    }
    else if (increment1 == ""){
    	alert("Please enter the increment value");
    }
    else if (stop1 == ""){
    	alert("Please enter the Stop Time");
    }
    else if (source2 == ""){
    	alert("Please enter Source Name");
    }
    else if (start2 == ""){
    	alert("Please enter Start Time");
    }
    else if (increment2 == ""){
    	alert("Please enter the increment value");
    }
    else if (stop2 == ""){
    	alert("Please enter the Stop Time");
    }

	else{
		jQuery("#webtronics_netlist_analysis").hide();
	    jQuery("#webtronics_disable").hide();
	}

	start_dc_unit1=savedsweepval1;
	if(start_dc_unit1==""){
		start_dc_unit1="00";
	}
	increment_dc_unit1=savedsweepval2;
	if(increment_dc_unit1==""){
		increment_dc_unit1="00";
	}
	stop_dc_unit1=savedsweepval3;
	if(stop_dc_unit1==""){
		stop_dc_unit1="00";
	}

	start_dc_unit2=savedsweepval4;
	if(start_dc_unit2==""){
		start_dc_unit2="00";
	}
	increment_dc_unit2=savedsweepval5;
	if(increment_dc_unit2==""){
		increment_dc_unit2="00";
	}
	stop_dc_unit2=savedsweepval6;
	if(stop_dc_unit2==""){
		stop_dc_unit2="00";
	}
           
});
	
jQuery("#start_volt_selectbox1").change(function(){
	
	dc_start_time1 = jQuery(this).val();
	
	if (dc_start_time1 == "1"){
		start_dc_unit1 = "00";
	}
	else if (dc_start_time1 == "2"){
		start_dc_unit1 = "03";
	}
	else if (dc_start_time1 == "3"){
	 	start_dc_unit1 = "06";
	}
	else if (dc_start_time1 == "4"){
	 	start_dc_unit1 = "09";
	}
	else if (dc_start_time1 == "5"){
	 	start_dc_unit1 = "12";
	}
	savedsweepval1=start_dc_unit1;
	console.log(start_dc_unit1);
});	

jQuery("#inc_volt_selectbox1").change(function(){
	dc_increment_time1 = jQuery(this).val();
	
	if (dc_increment_time1 == "1"){
	 	increment_dc_unit1 = "00";
	}
	else if (dc_increment_time1 == "2"){
	 	increment_dc_unit1 = "03";
	}
	else if (dc_increment_time1 == "3"){
	 	increment_dc_unit1 = "06";
	}
	else if (dc_increment_time1 == "4"){
	 	increment_dc_unit1 = "09";
	}
	else if (dc_increment_time1 == "5"){
	 	increment_dc_unit1 = "12";
	}
	savedsweepval2=increment_dc_unit1;
	console.log(increment_dc_unit1);
});	

jQuery("#stop_volt_selectbox1").change(function(){

	dc_stop_time1 = jQuery(this).val();
	
	if (dc_stop_time1 == "1"){
		stop_dc_unit1 = "00";
	}
	else if (dc_stop_time1 == "2"){
	 	stop_dc_unit1 = "03";
	}
	else if (dc_stop_time1 == "3"){
		stop_dc_unit1 = "06";
	}
	else if (dc_stop_time1 == "4"){
		stop_dc_unit1 = "09";
	}
	else if (dc_stop_time1 == "5")
	{
		stop_dc_unit1 = "12";
	}
	savedsweepval3=stop_dc_unit1;
	console.log(stop_dc_unit1);
});	


jQuery("#start_volt_selectbox2").change(function(){
	
	dc_start_time2 = jQuery(this).val();
	
	if (dc_start_time2 == "1"){
		start_dc_unit2 = "00";
	}
	else if (dc_start_time2 == "2"){
	 	start_dc_unit2 = "03";
	}
	else if (dc_start_time2 == "3"){
	 	start_dc_unit2 = "06";
	}
	else if (dc_start_time2 == "4")
	{
	 	start_dc_unit2 = "09";
	}
	else if (dc_start_time2 == "5")
	{
	 	start_dc_unit2 = "12";
	}
	savedsweepval4=start_dc_unit2;
	console.log(start_dc_unit2);
});	

jQuery("#inc_volt_selectbox2").change(function(){
	dc_increment_time2 = jQuery(this).val();
	
	if (dc_increment_time2 == "1"){
		increment_dc_unit2 = "00";
	}
	else if (dc_increment_time2 == "2"){
	 	increment_dc_unit2 = "03";
	}
	else if (dc_increment_time2 == "3"){
	 	increment_dc_unit2 = "06";
	}
	else if (dc_increment_time2 == "4")
	{
	 	increment_dc_unit2 = "09";
	}
	else if (dc_increment_time2 == "5")
	{
	 	increment_dc_unit2 = "12";
	}
	savedsweepval5=increment_dc_unit2;
	console.log(increment_dc_unit2);
});	

jQuery("#stop_volt_selectbox2").change(function(){

	dc_stop_time2 = jQuery(this).val();
	
	if (dc_stop_time2 == "1"){
		stop_dc_unit2 = "00";
	}
	else if (dc_stop_time2 == "2"){
		stop_dc_unit2 = "03";
	}
	else if (dc_stop_time2 == "3"){
		stop_dc_unit2 = "06";
	}
	else if (dc_stop_time2 == "4"){
		stop_dc_unit2 = "09";
	}
	else if (dc_stop_time2 == "5"){
	 	stop_dc_unit2 = "12";
	}
	savedsweepval6=stop_dc_unit2;
	console.log(stop_dc_unit2);
});	


       

/*------------------------------------------------------------------------------------------------------------------------------------------------
netlist variable for transient
------------------------------------------------------------------------------------------------------------------------------------------------*/
jQuery("#savetransient").click(function(){
	
	start_trans = jQuery("#start_time").val();
	step_trans  = jQuery("#step_time").val();
	stop_trans  = jQuery("#stop_time").val();
	//console.log(start_trans, step_trans, stop_trans);
	
	if (start_trans == ""){
		alert("Please enter Start Time")
	}
	else if (step_trans == ""){
		alert("Please enter Step Time");
	}
	else if (stop_trans == ""){
		alert("Please enter the Stop Time");  
	}
	else{
		jQuery("#webtronics_netlist_analysis").hide();
        jQuery("#webtronics_disable").hide();
	}

	start_trans_unit=savedtransval1;
	if(start_trans_unit==""){
		start_trans_unit="03";
	}
	step_trans_unit=savedtransval2;
	if(step_trans_unit==""){
		step_trans_unit="03";
	}
	stop_trans_unit=savedtransval3;
	if(stop_trans_unit==""){
		stop_trans_unit="03";
	}
});

jQuery("#start_time_selectbox").change(function(){

	trans_start_time = jQuery(this).val();
	
	if (trans_start_time == "1"){
		start_trans_unit = "03";
	}
	else if (trans_start_time == "2"){
	 	start_trans_unit = "06";
	}
	else if (trans_start_time == "3"){
	 	start_trans_unit = "09";
	}
	else if (trans_start_time == "4"){
	 	start_trans_unit = "12";
	}
	savedtransval1=start_trans_unit;
	console.log(start_trans_unit);
});	

jQuery("#step_time_selectbox").change(function(){

	trans_step_time = jQuery(this).val();
	
	if (trans_step_time == "1"){
		step_trans_unit = "03";
	}
	else if (trans_step_time == "2"){
	 	step_trans_unit = "06";
	}
	else if (trans_step_time == "3"){
	 	step_trans_unit = "09";
	}
	else if (trans_step_time == "4"){
	 	step_trans_unit = "12";
	}
	savedtransval2=step_trans_unit;
	console.log(step_trans_unit);
});	

jQuery("#stop_time_selectbox").change(function(){

	trans_stop_time = jQuery(this).val();
	
	if (trans_stop_time == "1"){
	 	stop_trans_unit = "03";
	}
	else if (trans_stop_time == "2"){
		stop_trans_unit = "06";
	}
	else if (trans_stop_time == "3"){
	 	stop_trans_unit = "09";
	}
	else if (trans_stop_time == "4"){
	 	stop_trans_unit = "12";
	}
	savedtransval3=stop_trans_unit;
	console.log(stop_trans_unit);
});	





});



