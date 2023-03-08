var baseURL = $('meta[name="base-url"]').attr('content');

function fetchData(url='', method = '', data = '', dataType , auth = ''){
	return $.ajax({
        url: url,
        method: method,
        dataType : dataType,
        data: data,
    });
}

async function idku(){
	var response = fetchData(baseURL+'/options/idku?category=idku', "GET", '' , "json");
	response.success(function (res) {
		// console.log(res);
		// $('#provincy').empty();
		var option,selected ='';
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const idku = urlParams.get('idku');
		$('#idku').append('<option value=""></option>');
		$.each(res.data, function(key, obj) {
			if(idku == obj.id){
				selected = ' selected';
			} else{
				selected = '';
			}
			$('#idku').append("<option value='" + obj.id +  "'"+selected+">"+obj.title+"</option>");
		});
		$('#idku').trigger("chosen:updated");
	});
}

async function provincies(){
	var response = fetchData(baseURL+'/options/province/IDN', "GET", '' , "json");
	response.success(function (res) {
		// console.log(res);
		// $('#provincy').empty();
		var option,selected ='';
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const provincy = urlParams.getAll('provincy[]');
		$('#provincy').append('<option value=""></option>');
		$.each(res.data, function(key, obj) {
			if(provincy.includes(String(obj.code))){
				selected = ' selected';
			} else{
				selected = '';
			}
			$('#provincy').append("<option value='" + obj.code +  "'"+selected+">"+obj.name+"</option>");
		});
		$('#provincy').trigger("chosen:updated");
	});
}

function getCities(val) {
	var opts = [],opt;
	try {
	  var len = val.options.length;
		for (var i = 0; i < len; i++) {
			opt = val.options[i];
			if (opt.selected) {
				opts.push(opt.value);
			}
		}
	}
	catch(err) {
	  opts = val;
	}
	
	var province = opts.toString();
	var response = fetchData(baseURL+'/options/cities/'+province, "GET", '' , "json");
	response.success(function (res) {
		$('#cities').empty();
		var option,selected ='';
		$.each(res.data, function(key, obj) {
			$('#cities').append("<option value='" + obj.code +  "'"+selected+">"+obj.name+"</option>");
		});
		$('#cities').trigger("chosen:updated");
	});

	response.error(function (xhr, textStatus, error) {
		$('#cities').empty();
		$('#cities').trigger("chosen:updated");
	});
}

async function hazards(){
	var response = fetchData(baseURL+'/options/hazard', "GET", '' , "json");
	response.success(function (res) {
		// console.log(res);
		// $('#provincy').empty();
		var option,selected ='';
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const hazards = urlParams.getAll('hazards[]')
		$.each(res.data, function(key, obj) {
			if(hazards.includes(String(obj.code_idn))){
				selected = ' selected';
			} else{
				selected = '';
			}
			$('#hazards').append("<option value='" + obj.code_idn +  "'"+selected+">"+obj.name_en+"</option>");
		});
		$('#hazards').trigger("chosen:updated");
	});
}

async function dmfMain(){
	var response = fetchData(baseURL+'/options/dmf', "GET", '' , "json");
	response.success(function (res) {
		var html = '';
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const dmf = urlParams.getAll('disaster_phase[]')
		$.each(res.data, function(key, obj) {
			if(dmf.includes(String(obj.id))){
				selected = ' checked';
			} else{
				selected = '';
			}
			html += '<input id="check-'+obj.id+'" type="checkbox" name="disaster_phase[]" value="'+obj.id+'" '+selected+'>\
					 <label for="check-'+obj.id+'">'+obj.name+'</label>'
		});
		$('#mainDMF').html(html);
	});
}

async function pubYear(){
	var response = fetchData(baseURL+'/statistics/pubyear', "GET", {'year':'minmax'} , "json");
	response.success(function (res) {
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const years = urlParams.get('years');
		
		try {
		  const yearSplit = years.split(";");
		  var from = yearSplit[0];
		  var to = yearSplit[1];
		}
		catch(err) {
		  var from = res.data.min;
			var to = res.data.max;
		}
		
		$(".js-range-slider").ionRangeSlider({
			type: "double",
			min: res.data.min,
			max: res.data.max,
			from: from,
			to: to,
			grid: true
		});
	});
}