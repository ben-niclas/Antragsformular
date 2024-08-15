fetch("tel-prefixes.csv")
  .then((response) => response.text())
  .then((data) => {
    const rows = data.split("\n");

    const selectElement = document.getElementById("regions");

    rows.forEach((row) => {
      const [country, prefix] = row.split(",");

      if (country && prefix) {
        const option = document.createElement("option");
        option.value = `+${prefix.trim()}`;
        option.textContent = `+${prefix.trim()} - ${country.trim()}`;

        selectElement.appendChild(option);
      }
    });
  })
  .catch((error) => console.error("Fehler beim Laden der CSV-Datei:", error));
