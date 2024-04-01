var openUrl =
    "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6";
var xhr = new XMLHttpRequest();
xhr.open('GET', openUrl, true);
xhr.send();
var total_pages = 0;
xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        dataset = JSON.parse(this.responseText);
        total_pages = Math.ceil(dataset.length / 10);
        console.log(dataset.length);
        addNewData(dataset);
    }
};

var cur_pages = 1;
function addNewData(dataset) {
    var myTable = document.getElementById("csie");
    var dataset_slice = dataset.slice(((cur_pages) - 1) * 10, cur_pages * 10);
    dataset_slice.forEach(function (dataset) {
        var row = myTable.insertRow(-1);
        row.insertCell(0).innerHTML = dataset["title"];
        row.insertCell(1).innerHTML = dataset['showInfo'][0]["locationName"];
        row.insertCell(2).innerHTML = dataset['showInfo'][0]['price'];
    });
    show_page();
};



//cur_pages = 1, return the function
// cur_pages = last page, return the function
function prev_page() {
    if (cur_pages == 1) {
        return;
    }
    var myTable = document.getElementById("csie");
    while (myTable.rows.length > 1) {
        myTable.deleteRow(1);
    }
    cur_pages--;
    addNewData(dataset);
};

function next_page() {
    if (cur_pages == total_pages) {
        return;
    }
    var myTable = document.getElementById("csie");
    while (myTable.rows.length > 1) {
        myTable.deleteRow(1);
    }
    cur_pages++;
    addNewData(dataset);
};
function show_page() {
    var page = document.getElementById("page");
    page.innerHTML = cur_pages + "/" + total_pages + " 頁";
};