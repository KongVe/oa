
	$.get('https://sellercentral.amazon.com/gp/site-metrics/report.html?language=en_US&languageSwitched=1');
$('body').append('<div id="select-Date"'
	+ 'style="position: fixed;height: 50%;left: 45%;top: 10%;z-index: 99999;background-color: #fff;padding: 1rem;border: 1px solid;">'+
	'<div style="margin: 5px;">开始时间:<input type="Date" id="start"></div><div style="margin: 5px;">'+
	'结束时间:<input type="Date" id="end"></div>'+
	'<button style="margin-right: 10px;margin-left: 30px;" onclick="selectDate()">下载</button>'+
	'<button onclick="javascript:$("#select-Date").remove();">关闭</button></div>')
function selectDate(){
	var start = $('#select-Date #start').val();
	var end = $('#select-Date #end').val();
	if(start && end){
		$.post('https://sellercentral.amazon.com/gp/site-metrics/home.html/ref=ag_sitemetric_dnav_sitereport_');
		
		for(var i=Date.parse(start);i<Date.parse(end);i+=3600000){
			$('#report_DetailSalesTrafficByChildItem').click();
			console.info(new Date(i))
		$.post(
			'https://sellercentral.amazon.com/gp/site-metrics/load/csv/BusinessReport-'+ new Date(i).toLocaleDateString()+'.csv',
			{
				reportID: '102:DetailSalesTrafficByChildItem',
				sortIsAscending: 0,
				sortColumn: 12,
				fromDate: new Date(i).toLocaleDateString(),
				toDate: new Date(i).toLocaleDateString(),
				cols: '/c0/c1/c2/c3/c4/c5/c6/c7/c8/c9/c10/c11',
				rows: '',
				dateUnit: 1,
				currentPage: 0,
				runDate: ''
			}
		)
		$('#report_DetailSalesTrafficByParentItem').click();
		$.post(
			'https://sellercentral.amazon.com/gp/site-metrics/load/csv/BusinessReport-'+ new Date(i).toLocaleDateString()+'.csv',
			{
				reportID: '102:DetailSalesTrafficByParentItem',
				sortIsAscending: 0,
				sortColumn: 11,
				fromDate: new Date(i).toLocaleDateString(),
				toDate: new Date(i).toLocaleDateString(),
				cols: '/c0/c1/c2/c3/c4/c5/c6/c7/c8/c9/c10',
				rows: '',
				dateUnit: 1,
				currentPage: 0,
				runDate: ''
			}
		)
	}
	$('#select-Date').remove();
	}else{
		alert('请选择正确的时间区间');
	}
	
}