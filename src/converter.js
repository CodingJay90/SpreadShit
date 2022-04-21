import { deleteDomElement, showLoadingSpinner } from "./utils";

const downloadBtn = document.getElementById("download-csv");
let headerColumns;
let csvBody;
let csv;

function convertJSONtoCSV(json) {
  let tempCSV = "";

  json.forEach((row) => {
    tempCSV += row.join(",");
    tempCSV += "\r\n";
  });
  return tempCSV;
}

function getFirstRow() {
  const tableRows = document.querySelectorAll("tbody tr[data-row_id]");
  let tempCsv = [];
  let headerRows = [];
  let lastHeaderId = "";
  loopLevel1: for (let row of tableRows) {
    loopLevel2: for (let child of row.children) {
      if (child.textContent.length && child.dataset.cell_id) {
        headerColumns = Array.from(child.parentElement.cells);
        break loopLevel1;
      }
    }
  }
  headerColumns.shift();
  for (let row of headerColumns) {
    if (row.textContent.length) {
      tempCsv.push(row.textContent);
      headerRows.push(row);
    }
  }
  lastHeaderId = headerRows[headerRows.length - 1].dataset.cell_id;
  csv = tempCsv.join(",");
  return { csv, json: tempCsv, lastCellId: lastHeaderId };
}

function getSubsequentColumns() {
  const tableRows = document.querySelectorAll("tbody tr[data-row_id]");
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
      csvBody = tempCsv;
      setTimeout(() => {
        resolve(tempCsv);
      }, 1000);
      console.timeEnd("cells time");
    } catch (error) {
      reject(error);
    }
  });
  return promise;
}

function getSubsequentColumns2() {
  const tableRows = Array.from(
    document.querySelectorAll("tbody tr[data-row_id]")
  );
  let documentRows = [];
  const { lastCellId } = getFirstRow();
  for (let row of tableRows) {
    const rowChildren = Array.from(row.children);
    rowChildren.shift(); //remove the first td
    let temp = [];
    if (rowChildren.some((i) => i.textContent)) {
      for (let child of row.children) {
        if (child.dataset.cell_id) {
          if (lastCellId[0] === child.dataset.cell_id[0]) break; //compare first character on the last cell and break if match
          temp.push(child.textContent);
        }
      }
    }
    documentRows.push(temp);
  }
  // console.log(documentRows);
  return documentRows.filter((i) => i.length);
}

function downloadCSV() {
  let tempCSV = "";

  csvBody.forEach((row) => {
    tempCSV += row.join(",");
    tempCSV += "\n";
  });
  console.log(tempCSV);

  let hiddenElement = document.createElement("a");
  hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(tempCSV);
  hiddenElement.target = "_blank";

  hiddenElement.download = "Unnamed.csv";
  hiddenElement.click();
}
function convertCSVToJSON(csv) {
  const csvRow = csv.split("\n"); //get headers
  const keys = csvRow[0].split(","); //extract json keys from Array(csvRow)
  let json = csvRow.splice(1);
  json = json.map((i) => {
    return i.split(",").reduce((acc, cur, i) => {
      const tempObj = {};
      tempObj[keys[i]] = cur;
      return { ...acc, ...tempObj };
    }, {});
  });
  return json;
}

// downloadBtn.addEventListener("click", async () => {
//   try {
//     showLoadingSpinner();
//     await getSubsequentColumns();
//     downloadCSV();
//     deleteDomElement(".loading");
//   } catch (error) {
//     console.log(error);
//   }
// });

// getFirstRow();
// // getSubsequentColumns();
// getSubsequentColumns().then((data) => console.log(data));
// console.log(getSubsequentColumns2());
// console.log(convertJSONtoCSV(getSubsequentColumns2()));
console.log(
  convertCSVToJSON(`Name,Proffession,Hobbies,Age,Marital status,Finacial status
Bobby Brown,Athlete,Swimming,24,Single,Rich
anotonio Roberto,farmer,,45,married,Average
jay,,,,,
,,,,,ghfgg`)
);
// downloadCSV();
