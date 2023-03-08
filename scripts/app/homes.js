$(document).ready(function(){
	// getPublications();
	var baseURL = $('meta[name="base-url"]').attr('content');
	var urlParam = window.location.href, url = $('meta[name="base-url"]').attr('content')+'/datas/publication' ;
	console.log("urlParam: ", urlParam);
	var urlMap = $('meta[name="base-url"]').attr('content')+'/datas/publication/map' ;
	var policyurl = baseURL+'/repository/policy';
	urlParam = urlParam.split('?')[1];
	if (typeof urlParam !== 'undefined'){
		url = url+'?'+urlParam;
		urlMap = urlMap+'?'+urlParam;
		policyurl = policyurl+'?'+urlParam;
	}
	getArticles(url);
	// getNews();
	getPolicy(policyurl);
	idku();
	provincies();
	hazards();
	dmfMain();
	pubYear();
	fetchMapData(urlMap);
});

function numberWithCommas(x) {
  if (x != null){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }else{
    return x;
  }
}

// ========================================================================  Fetch Data =================================================================================== //
function fetchData(url='', method = '', data = '', dataType , auth = ''){
	return $.ajax({
        url: url,
        method: method,
        headers: {
	        'authorization': $('meta[name="auth"]').attr('content')
	    },
        dataType : dataType,
        data: data,
    });
}

async function areaBrief(id){
	// $('body').loadingModal('animation', 'rotatingPlane').loadingModal('backgroundColor', 'red');
	$("a#inspectArea").attr("href", $('meta[name="base-url"]').attr('content')+"/brief/"+id);
	$("#area-brief").css('display', 'block');
	$("#area-brief-default").css('display', 'none');
	$('html, body').animate({
		scrollTop: $("#brief_section").offset().top
	},500);

	$('#area_brief_title').html("Loading Data, Please Wait...");
	

	// window.location.href = '#publications';
	var response = fetchData($('meta[name="base-url"]').attr('content')+"/repository/brief/"+id, "GET", '' , "JSON");
	response.success(function (res) {
		$('#area_brief_title').html("");
		// $('#area_brief_demog').html(res.demografi_txt);
		// $('#area_brief_inarisk').html(res.potensi_bahaya_txt);
		// $('#area_brief_history').html(res.histori_hazard_txt);
		$('#area_brief_title').html(res.name_txt);
		$(".loading-container").css('display', 'none');
		$("#inArea").html("in "+res.name_txt)
		loadGapradar(res.sigmoid);
		// loadDistrickRisk(res.desa_bahaya_arr);
	});
}

async function getArticles(url) {
	// console.log(url)
	// $("#spinner").css('display', 'block');
	if (location.protocol !== 'https:') {
		url.replace("http", "https")
	}
	document.getElementById("publications_list").style.opacity = "0.2";
	var response = fetchData(url, "GET", '' , "html");
	response.success(function (res) {
		$('#publications_list').html(res);  
		document.getElementById("publications_list").style.opacity = "1";
		// $("#pubCount").html($("#pubcount").val());
		$("#pubCount").html(numberWithCommas($("#pubcount").val()));
		$("#mobilepubCount").html(numberWithCommas($("#pubcount").val()));
		// $("#spinner").css('display', 'none');
	});
}

async function getNews() {
	var response = fetchData(baseURL+'/media/news', "GET", '' , "json");
	response.success(function (res) {

		if(res.code == 200){
			var bodyTable = '';
			$.each(res.data.data, function(key, obj){
				bodyTable += '<tr>\
									<td><a href="'+obj.url+'" target="_blank">'+obj.title+'</a></td>\
									<td>'+obj.auhtor+'</td>\
									<td>'+obj.pubDate+'</td>\
								</tr>'
			});
			$("#newsBody").html(bodyTable);
		}
		
	});
}

async function getPolicy(url) {
	if (location.protocol !== 'https:') {
		url.replace("http", "https")
	}
	document.getElementById("policyList").style.opacity = "0.2";
	var response = fetchData(url, "GET", '' , "html");
	response.success(function (res) {
		$("#policyList").html(res);
		document.getElementById("policyList").style.opacity = "1";
		// if(res.code == 200){
		// 	var bodyTable = '';
		// 	$.each(res.data.data, function(key, obj){
		// 		bodyTable += '<tr>\
		// 							<td><a href="'+obj.url+'" target="_blank">'+obj.title+'</a></td>\
		// 							<td>'+obj.type_document+'</td>\
		// 							<td>'+obj.name_adm1+'</td>\
		// 							<td>'+obj.name_adm2+'</td>\
		// 							<td>'+obj.publish_date+'</td>\
		// 						</tr>'
		// 	});
		// 	$("#policyBody").html(bodyTable);
		// }
		
	});
}

function detialPublication(id){
	var response = fetchData(baseURL+'/datas/publication/'+id, "GET", '' , "json");
	response.success(function (res) {
		// console.log(res);
		if(res.code == 200){
			$('#detailPublisher').html(res.data.publisher);
			$('#detailTitle').html(res.data.title);
			$('#detailAbstract').html(res.data.abstract);
			$('#detailAuthor').html(res.data.authors);
			$('#detailYear').html(res.data.year);
			$('#detailDOI').html(res.data.doi);
			$("#detailSourceLink").attr("href", res.data.link);
			$("#detailFeedback").attr("href", res.data.correction);
			$('#detailPub').show(200).fadeIn();
			$('html').css('overflow','hidden');
			// $('#detail-publication').modal('show');
		}else{
			alert('fetch Error!, please try again');
		}
		
	});
	
}




// ========================================================================  Load Chart =================================================================================== //

function loadGapradar(data){
	var _categories = [], cari = [], dibi = [], inarisk = []
	for (var i = 0; i < data.length; i++) {
		_categories.push(data[i][1]);
		cari.push(data[i][2]);
		dibi.push(data[i][3]);
		inarisk.push(data[i][4]);
		// console.log(data[i])
	}
	Highcharts.chart('gap_radar', {

	  chart: {
	      polar: true,
	      type: 'column'
	  },
	  colors: ['#247006','#700606','#706706'],
	  title: {
	      text: 'GAP RADAR',
	      align:'center'
	  },
	  credits: {
			enabled: false
		},
	exporting: {
		enabled: false
	},

	  pane: {
	      size: '80%'
	  },

	  xAxis: {
	      categories: _categories,
	      tickmarkPlacement: 'on',
	      lineWidth: 0
	  },

	  yAxis: {
	      gridLineInterpolation: 'polygon',
	      lineWidth: 0,
	      min: -1,
	      max: 1
	  },

	  tooltip: {
	      shared: true,
	      pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.2f}</b><br/>'
	  },

	  legend: {
	      align: 'right',
	      verticalAlign: 'middle',
	      layout: 'vertical'
	  },

	  series: [{
	      name: 'Knowledge',
	      data: cari
	  },
	  {
	      name: 'Disaster',
	      data: dibi
	  },
	  {
	      name: 'Risk',
	      data: inarisk
	  }
	  ],

	  responsive: {
	      rules: [{
	          condition: {
	              maxWidth: 500
	          },
	          chartOptions: {
	              legend: {
	                  align: 'center',
	                  verticalAlign: 'bottom',
	                  layout: 'horizontal'
	              },
	              pane: {
	                  size: '70%'
	              }
	          }
	      }]
	  }

	});
}

function loadDistrickRisk(data){
	var _categories = [], _yes = [], _no = []
	for (var i = 0; i < data.length; i++) {
		_categories.push(data[i][1]);
		_yes.push(data[i][2]);
		_no.push(data[i][3]);
		// console.log(data[i])
	}
	Highcharts.chart('area_count', {
	  chart: {
	    type: 'bar'
	  },
	  title: {
	      text: 'PRONE AREA/S',
	      align:'center'
	  },
	  credits: {
			enabled: false
		},
	exporting: {
		enabled: false
	},
	  plotOptions: {
	    bar: {
	      stacking: 'percent'
	    }
	  },
	  pane: {
	          size: '90%'
	      },
	  xAxis: {
	          categories: _categories,
	          tickmarkPlacement: 'on',
	          lineWidth: 0
	      },
	  series: [{
	    name: 'YA',
	    data: _yes,
	    color: '#d32f2f'
	  }, {
	    name: 'TIDAK',
	    data: _no,
	    color: '#388e3c'
	  }]
	});
}



async function getPublications(){
	$.ajax({
        url: $('meta[name="base-url"]').attr('content')+'/datas/publication',
        method: 'GET',
        success: function (data) {
        	$('#publications_list').html(data);  
        },
        error: function (error) {
            console.log(error);
        }
    });
}


