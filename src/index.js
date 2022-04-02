import "./styles/styles.scss";
const alpha = Array.from(Array(26)).map((_, i) => i + 65);
const alphabets = alpha.map((x) => String.fromCharCode(x));
const initialCellBlocks = [..."x".repeat(100).split("").keys()].map(
  (x) => x + 1
);
let excelLetters = [];
let selectedBlock;
let jsonObject = JSON.parse(localStorage.getItem("excel_data")) || {};

function generate_table() {
  const body = document.getElementsByTagName("main")[0];
  const tbl = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");
  const row = document.createElement("tr");
  const initialCell = document.createElement("th");
  row.appendChild(initialCell);
  alphabets.forEach((a) => {
    const cell = document.createElement("th");
    const cellText = document.createTextNode(a);
    cell.appendChild(cellText);
    row.appendChild(cell);
    cell.setAttribute("data-cell_Id", a);
  });
  initialCellBlocks.forEach((i) => {
    const tr = document.createElement("tr");
    const initialTableDocument = document.createElement("td");
    const text = document.createTextNode(i);
    initialTableDocument.appendChild(text);
    tr.appendChild(initialTableDocument);
    tr.setAttribute("data-row_id", i);
    alphabets.forEach((al) => {
      const tableDocument = document.createElement("td");
      const textNode = document.createTextNode(
        jsonObject[al + i]?.cellValue || ""
      );
      tr.appendChild(tableDocument);
      tableDocument.appendChild(textNode);
      tableDocument.setAttribute("data-cell_Id", al + i);
      Object.assign(tableDocument, {
        className: "table__document",
        onclick: (event) => selectCell(event, { cellId: al + i, rowId: i }),
      });
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

function selectCell(event, params) {
  selectedBlock = event.target;
  console.log(event.target.textContent);
  const modalContainer = document.querySelector(".modal__input");
  const modalTemplate = `<div class="modal__input-container">
            <div>
                <input type="text" onkeypress='watchKeyPress(event, ${JSON.stringify(
                  params
                )})' />
                <div></div>
                <button onclick="closeInputModal()">cancel</cancel>
            </div>
        </div>`;
  modalContainer.innerHTML = modalTemplate;
  const inputEl = document.querySelector("input");
  inputEl.focus();
  inputEl.defaultValue = event.target.textContent;
}

window.watchKeyPress = function watchKeyPress(event, { cellId, rowId }) {
  if (event.key === "Enter") enterValueToBlock(cellId, rowId);
};

function enterValueToBlock(cellId, rowId) {
  selectedBlock.textContent = "";
  const textNode = document.createTextNode(
    document.querySelector("input").value
  );
  selectedBlock.appendChild(textNode);
  jsonObject = {
    ...jsonObject,
    [cellId]: { cellValue: textNode.textContent, rowId },
  };
  localStorage.setItem("excel_data", JSON.stringify(jsonObject));
  console.log(jsonObject);
  closeInputModal();
}

window.closeInputModal = function closeInputModal() {
  selectedBlock = null;
  document.querySelector(".modal__input-container").remove();
};

generate_table();
excelLogic();
