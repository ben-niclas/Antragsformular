const eMailInput = document.getElementById("e-mail");
const telInput = document.getElementById("tel");
const telSelector = document.getElementById("regions");
const firstNameInput = document.getElementById("first_name");
const lastNameInput = document.getElementById("last_name");
const submitFormButton = document.getElementById("submitForm");

const eMailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const telRegexp = /^[0-9]+$/;
const forbiddenCharsRegexp = /['"#*\$§´`:,;!=]/;

eMailInput.addEventListener("input", checkInputValidity);
telInput.addEventListener("input", checkInputValidity);
firstNameInput.addEventListener("input", checkInputValidity);
lastNameInput.addEventListener("input", checkInputValidity);

telInput.addEventListener("keypress", restrictTelCharacters);
eMailInput.addEventListener("keypress", restrictMailCharacters);
firstNameInput.addEventListener("keypress", restrictTextFieldCharacters);
lastNameInput.addEventListener("keypress", restrictTextFieldCharacters);

function checkFormValidity() {
  return (
    checkValidMail() &&
    checkValidTel() &&
    firstNameInput.value &&
    lastNameInput.value
  );
}

function checkValidMail() {
  return eMailRegexp.test(eMailInput.value);
}

function checkValidTel() {
  return telRegexp.test(telInput.value);
}

function checkInputValidity(e) {
  submitFormButton.disabled = !checkFormValidity();
}

function restrictCharactersExcept(e, allowedChars) {
  const chr = String.fromCharCode(e.which);
  const allowedSpecialChars = allowedChars;
  if (!allowedSpecialChars.test(chr)) {
    e.preventDefault();
  }
}

function restrictMailCharacters(e) {
  const chr = String.fromCharCode(e.which);
  if (chr === "@" && eMailInput.value.includes("@")) {
    e.preventDefault();
  }
  const allowedSpecialChars = /[a-zA-Z0-9._%+-]/;
  if (!allowedSpecialChars.test(chr) && e.which !== 64 && e.which !== 46) {
    e.preventDefault();
  }
}

function restrictTelCharacters(e) {
  restrictCharactersExcept(e, /[0-9\ ]/);
}

function restrictTextFieldCharacters(e) {
  restrictCharactersExcept(e, /[a-zA-Z0-9._%+-äöüß]/);
}

function retainInputValues() {
  eMailInput.value.replaceAll(forbiddenCharsRegexp, "");
  telInput.value.replaceAll(forbiddenCharsRegexp, "");
  firstNameInput.value.replaceAll(forbiddenCharsRegexp, "");
  lastNameInput.value.replaceAll(forbiddenCharsRegexp, "");
}

function getTelNum() {
  if (telSelector.value != "") {
    return "+".concat(telSelector.value.concat(" ", telInput.value));
  } else {
    return telSelector.value.concat(telInput.value);
  }
}

function getEMail() {
  return eMailInput.value;
}

function getFirstName() {
  return firstNameInput.value;
}

function getLastName() {
  return lastNameInput.value;
}

function displayInputs() {
  document.writeln("<style>* {font-family: sans-serif;}</style>");
  document.writeln("<b>Vorname: </b>" + getFirstName() + "<p></p>");
  document.writeln("<b>Nachname: </b>" + getLastName() + "<p></p>");
  document.writeln("<b>E-Mail: </b>" + getEMail() + "<p></p>");
  document.writeln("<b>Tel.: </b>" + getTelNum() + "<p></p>");
}
