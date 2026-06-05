const element = document.createElement("p");
element.textContent = "qwe";

const body = document.getElementById("root");

if (body) {
  body.append(element);
} else {
  console.log("failed to find body");
}
