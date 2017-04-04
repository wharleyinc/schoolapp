function copyTo(source,destination){
	var destinations = destination.split(",");
	for(var count=0;count<destinations.length;count++){
		document.getElementById(destinations[count]).value = document.getElementById(source).value;
	}
}

function changeDD(source,destination){
	var element = document.getElementById(source);
	var sourceSelectedId = element.options[element.selectedIndex].id;
	if(element.selectedIndex !=-1){
		var destinationElement = document.getElementById(destination);
		for(var count=0;count<destinationElement.options.length;count++){
				if(destinationElement.options[count].id == sourceSelectedId){
						destinationElement.selectedIndex = count;
				}
			}
			$("#" + destination).trigger('chosen:updated');
		}
}

function getListByFilter(page){
	var filters = "";
	var url = getCurrentLocation();
	for(var count=1;count<8;count++){
		var filterValue = document.getElementById("filter_" + count).value;
		if(filterValue!=null && filterValue!="" && filters!=""){
 			filters += "&" + document.getElementById("filter_" + count).name + "=" + filterValue;
		}
		if(filterValue!=null && filterValue!="" && filters==""){
 			filters += "?" + document.getElementById("filter_" + count).name + "=" + filterValue;
		}
	}
	if(page!=null && filters!="")
		location.replace(url+ filters +"&page="+page);
	if(page!=null && filters=="")
		location.replace(url+ filters +"?page="+page);
	if(page==null)
		location.replace(url+filters);
}

function getCurrentLocation() {
	var url = document.location.href;
	var n = url.indexOf('?');
	url = url.substring(0, n != -1 ? n : url.length);
	return url;
}

function getStudents(){
	var classAndDivision = document.getElementById("classguid").value;
	var table = document.getElementById("tbl_student");
	$.get("showstudents.htm?class="+classAndDivision ,
		function(data) {
		$("table#tbl_student").find("tr:not(:has(th))").remove();
			data = JSON.parse(data);
			for(var count=0;count<data.length;count++){
				var checkboxElement = document.createElement("input");
				checkboxElement.setAttribute("data-no-uniform","true");
				checkboxElement.style.property = "iphone-toggle";
				var row = table.insertRow(count + 1);
				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				var cell3 = row.insertCell(2);
				cell1.innerHTML = data[count].roll;
				cell2.innerHTML = data[count].name;
				cell3.innerHTML = "<input data-no-uniform=\"true\" type=\"checkbox\" id=" + data[count].guid +" "
					+"onclick=\"javascript:updateAbsentStudent("+ data[count].guid + ")\" checked=\"true\">";
			}
	});
}


function getStudentsForAlumni(){
	var classAndDivision = document.getElementById("classguid").value;
	var table = document.getElementById("tbl_student");
	$.get("showstudentstomarkalumnis.htm?class="+classAndDivision ,
		function(data) {
		$("table#tbl_student").find("tr:not(:has(th))").remove();
			data = JSON.parse(data);
			for(var count=0;count<data.length;count++){
				var checkboxElement = document.createElement("input");
				checkboxElement.setAttribute("data-no-uniform","true");
				checkboxElement.style.property = "iphone-toggle";
				var row = table.insertRow(count + 1);
				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				var cell3 = row.insertCell(2);
				cell1.innerHTML = data[count].roll;
				cell2.innerHTML = data[count].name;
				cell3.innerHTML = "<input data-no-uniform=\"true\" type=\"checkbox\" id=" + data[count].guid +" "
					+"onclick=\"javascript:updateAbsentStudent("+ data[count].guid + ")\" checked=\"true\">";
			}
	});
}