const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabets = alpha.map((x) => String.fromCharCode(x));
console.log(alphabets);
function generate_table() {
  const body = document.getElementsByTagName("main")[0];
  const tbl = document.createElement("table");
  const thead = document.createElement("thead");
  const row = document.createElement("tr");

  alphabets.forEach((a) => {
    const cell = document.createElement("th");
    const cellText = document.createTextNode(a);
    cell.appendChild(cellText);
    row.appendChild(cell);
  });
  thead.appendChild(row);
  tbl.appendChild(thead);
  body.appendChild(tbl);
  tbl.setAttribute("border", "2");
}

generate_table();
