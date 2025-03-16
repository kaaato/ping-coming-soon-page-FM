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

  let validatedEmail = classifyEmail(email);
  updateError(validatedEmail);
}

function handleInput() {
  let validatedEmail = classifyEmail(this.value);
  if (validatedEmail === 0 || validatedEmail) {
    errorDiv.dataset.validationState = "valid";
    errorDiv.textContent = "";
  } else if (!validatedEmail) {
    errorDiv.dataset.validationState = "invalid";
    errorDiv.textContent = "Please provide a valid email address";
  } 
}

function classifyEmail(email) {
  let emailRegExp = /^\S+@\S+$/g;
  if (email.length === 0) return 0;
  return emailRegExp.test(email)
}

function setDatasetAttribute(isValid) {
  errorDiv.dataset.validationState = (isValid) ? "valid" : "invalid";
}

function updateError(isValid) {
  setDatasetAttribute(isValid);
  if (isValid === 0) {
    errorDiv.textContent = "Whoops! It looks like you forgot to add your email";
  } else if (!isValid) {
    errorDiv.textContent = "Please provide a valid email address";
  } else {
    errorDiv.textContent = "";
    emailInput.value = "";
    form.submit();
  }
}


