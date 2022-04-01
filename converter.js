const downloadBtn = document.getElementById("download-csv");
const tableRows = document.querySelectorAll("tbody tr[data-row_id]");
const cells = document.querySelectorAll("td");
let headerColumns;
let csvBody;
let csv;

function getFirstRow() {
  let tempCsv = [];
  loopLevel1: for (row of tableRows) {
    loopLevel2: for (child of row.children) {
      if (child.textContent.length && child.dataset.cell_id) {
        headerColumns = Array.from(child.parentElement.cells);
        break loopLevel1;
      }
    }
  }
  headerColumns.shift();
  for (row of headerColumns) {
    row.textContent.length && tempCsv.push(row.textContent);
  }
  csv = tempCsv.join(",");
}

function getSubsequentColumns() {
  const promise = new Promise((resolve, reject) => {
    try {
      let tempCsv = [];
      console.time("cells time");
      tableRows.forEach((row) => {
        let rowData = [];
        Array.from(row.cells).forEach((cell) => {
          if (cell.textContent.length && cell.dataset.cell_id) {
            rowData.push(cell.textContent);
          }
        });
        rowData.length && tempCsv.push(rowData);
      });
      //   csvBody = tempCsv;
      resolve(tempCsv);
      console.timeEnd("cells time");
    } catch (error) {
      reject(error);
    }
  });
  return promise;
}

function downloadCSV() {
  let tempCSV = "";

  csvBody.forEach(function (row) {
    tempCSV += row.join(",");
    tempCSV += "\n";
  });
  console.log(tempCSV);

  let hiddenElement = document.createElement("a");
  hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(tempCSV);
  hiddenElement.target = "_blank";

  hiddenElement.download = "Unnamed.csv";
}

downloadBtn.addEventListener("click", () => {
  console.log("downloadBtn clicked");
});

// getFirstRow();
// getSubsequentColumns();
// downloadCSV();
