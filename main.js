"use strict"

let form = document.querySelector(".form");
let emailInput = document.querySelector(".email");
let errorDiv = document.querySelector(".text--error");

form.addEventListener("submit", handleEmailSubmit);
emailInput.addEventListener("input", handleInput);

function handleEmailSubmit(event) {
  event.preventDefault();

  let formDataEntries = new FormData(this);
  let { email } = Object.fromEntries(formDataEntries);

  let isValidEmail = validateEmail(email);
  updateError(isValidEmail);
}

function handleInput(event) {
  let isValidEmail = validateEmail(event.currentTarget.value);
  setDatasetAttribute(isValidEmail);
  if (isValidEmail) {
    errorDiv.textContent = "";
  } else {
    errorDiv.textContent = "Please provide a valid email address";    
  }
}

function validateEmail(email) {
  let emailRegExp = /^\S+@\S+$/g;
  return !!email && emailRegExp.test(email);
}

function setDatasetAttribute(isValid) {
  errorDiv.dataset.validationState = (isValid) ? "valid" : "invalid";
}

function updateError(isValid) {
  setDatasetAttribute(isValid);
  if (isValid) {
    errorDiv.textContent = "";
    emailInput.value = "";
    form.submit();
  } else {
    errorDiv.textContent = "Please provide a valid email address";
  }
}


