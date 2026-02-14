const tableBody = document.getElementById("tableBody");

let savedData = JSON.parse(localStorage.getItem("progress")) || [];

for (let i = 1; i <= 30; i++) {

    const row = document.createElement("tr");

    const dayCell = document.createElement("td");
    dayCell.textContent = "Day " + i;
    row.appendChild(dayCell);

    if (!savedData[i - 1]) {
        savedData[i - 1] = ["", "", "", ""];
    }

    for (let j = 0; j < 4; j++) {

        const cell = document.createElement("td");

        const select = document.createElement("select");

        const options = ["", "Done", "Wrong"];

        options.forEach(optionText => {
            const option = document.createElement("option");
            option.value = optionText;
            option.textContent = optionText === "" ? "Select" : optionText;
            select.appendChild(option);
        });

        select.value = savedData[i - 1][j];

        function updateColor() {
            cell.classList.remove("done", "wrong");
            if (select.value === "Done") {
                cell.classList.add("done");
            } else if (select.value === "Wrong") {
                cell.classList.add("wrong");
            }
        }

        updateColor();

        select.addEventListener("change", function () {
            savedData[i - 1][j] = select.value;
            localStorage.setItem("progress", JSON.stringify(savedData));
            updateColor();
        });

        cell.appendChild(select);
        row.appendChild(cell);
    }

    tableBody.appendChild(row);
}
