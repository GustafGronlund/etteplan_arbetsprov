const createFileBtn = document.querySelector(".btn-hover");
const userResultMessage = document.querySelector(".result-text");

createFileBtn.addEventListener("click", async () => {
  try {
    const response = await fetch("/create-file/create-file");
    const result = await response.json();

    if (result.message === "File created successfully.") {
      userResultMessage.textContent = "Filen är nu skapad";
    } else if (result.message.includes("already exists")) {
      userResultMessage.textContent = "Filen existerar redan";
    } else {
      userResultMessage.textContent = "Filen kunde ej skapas";
    }
  } catch (error) {
    console.error("Error:", error);
    userResultMessage.textContent = "Filen kunde ej skapas";
  }
});
