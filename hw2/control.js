var openUrl =
    "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6";
var xhr = new XMLHttpRequest();
xhr.open('GET', openUrl, true);
xhr.send();
var total_pages = 0;
var dataset_filter = [];
xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        dataset = JSON.parse(this.responseText);
        total_pages = Math.ceil(dataset.length / 10);
        console.log(dataset.length);
        addNewData(dataset);
    }
};

var cur_pages = 1;
function addNewData(data) {
    console.log("add New cur_pages: " + cur_pages);
    var myTable = document.getElementById("csie");
    var data_slice = data.slice(((cur_pages) - 1) * 10, cur_pages * 10);
    data_slice.forEach(function (data) {
        var row = myTable.insertRow(-1);
        row.insertCell(0).innerHTML = data["title"];
        row.insertCell(1).innerHTML = data['showInfo'][0]["locationName"];
        row.insertCell(2).innerHTML = data['showInfo'][0]['price'];
    });
    show_page();
};



//cur_pages = 1, return the function
// cur_pages = last page, return the function
function Del_ALL_Row () {
    var myTable = document.getElementById("csie");
    while (myTable.rows.length > 1) {
        myTable.deleteRow(1);
    }
};
function prev_page() {
    if (cur_pages == 1) {
        return;
    }
    Del_ALL_Row();
    cur_pages--;
    addNewData(dataset_filter);
};

function next_page() {
    if (cur_pages == total_pages) {
        return;
    }
    console.log("cur_pages: " + cur_pages);
    Del_ALL_Row();
    cur_pages++;
    console.log("after cur_pages: " + cur_pages);
    addNewData(dataset_filter);
};
function show_page() {
    var page = document.getElementById("page");
    page.innerHTML = cur_pages + "/" + total_pages + " 頁";
};
// ----------------------search----------------------
document.getElementById("filter").addEventListener("input", (e) => filterData(e.target.value));
function filterData(search) {   
    Del_ALL_Row();
    var regex = new RegExp(search, 'i');
    dataset_filter = dataset.filter(function (data) {
        return regex.test(data["title"]) ||
                regex.test(data["showInfo"][0]["locationName"]) ||
                regex.test(data["descriptionFilterHtml"]);
    });
    console.log(dataset_filter.length);
    total_pages = Math.ceil(dataset_filter.length / 10);
    cur_pages = 1;
    addNewData(dataset_filter);
}
// ----------------------search----------------------