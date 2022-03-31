const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabets = alpha.map((x) => String.fromCharCode(x));
const initialCellBlocks = [..."x".repeat(100).split("").keys()].map(
  (x) => x + 1
);
let excelLetters = [];

function generate_table() {
  const body = document.getElementsByTagName("main")[0];
  const tbl = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");
  const row = document.createElement("tr");

  alphabets.forEach((a) => {
    const cell = document.createElement("th");
    const cellText = document.createTextNode(a);
    cell.appendChild(cellText);
    row.appendChild(cell);
    cell.setAttribute("data-cell_Id", a);
  });
  initialCellBlocks.forEach((i) => {
    const tr = document.createElement("tr");
    alphabets.forEach((al) => {
      const tableDocument = document.createElement("td");
      tr.appendChild(tableDocument);
    });

    tbody.appendChild(tr);
  });
  thead.appendChild(row);
  tbl.appendChild(thead);
  tbl.appendChild(tbody);
  body.appendChild(tbl);
  tbl.setAttribute("border", "2");
}

function generateTableRows() {}

function excelLogic() {
  alphabets.forEach((item, index) => {
    let currentIndex = alphabets.indexOf(item);
    let nextArrayIndex = (currentIndex + 1) % alphabets.length;
    alphabets.forEach((curr, nextIndex) => {
      let character = alphabets[currentIndex] + alphabets[nextIndex];
      excelLetters.push(character);
    });
  });
}

generate_table();
excelLogic();
