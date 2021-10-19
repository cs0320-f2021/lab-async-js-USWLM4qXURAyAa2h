// BEGIN REDACT
/**
 * Front end logic for providing real time autocorrect suggestions.
 */

//TODO: select the list where the suggestions should go, the input box where we're typing, and
// the loading text
//HINT: look at the hTML
const suggestionList = document.querySelector("#suggestions");
const input = document.querySelector("#autocorrect-input");
const loading = document.querySelector("#loading");

input.addEventListener("keyup", () => {
  //TODO: empty the suggestionList (you want new suggestions each time someone types something
  // new, hint, use .innerHTML)
  suggestionList.innerHTML = "";

  // TODO: show the loading text (HINT: set value of loading.style.display to "block" or "")
  loading.style.display = "block";

  const postParameters = {
    //TODO: get the text inside the input box (hint: use input.value to get the value of the input field)
    method: 'post',
    body: JSON.stringify({
      text: input.value,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  };

  //TODO: make a post request to the url to handle this request you set in your Main.java
  //HINT: check out the GET, POST, and JSON section of the lab
  fetch('/autocorrect', postParameters)
      .then((response) => response.json())//TODO: Parse the JSON in the response object HINT: remember to get the specific field in the JSON you want to use
      .then((data) => {

        //TODO: for each element in the set of results, append it to the suggestionList
        //HINT: use innerHTML += to append to the suggestions list
        //NOTE: you should use <li> (list item) tags to wrap each element. When you do so,
        // make sure to add the attribute 'tabindex="0"' (for example: <li tabindex="0">{your element}</li>).
        // This makes each element selectable via screen reader.
        for (let i = 0; i < data.suggestions.length; i++) {
          let e = data.suggestions[i];
          suggestionList.innerHTML += `<li id="sugg" tabIndex="0">` + e.toString() + `</li>`;
        }
      });


  //TODO: add an click handler to each of the elements you added to the suggestionList
  // with a function which will replace whatever is in input with the suggestion that
  // was clicked
  function replaceElement() {
    input.value = "fuck";
    // console.log(event.currentTarget);
    // event.currentTarget.
  }

  let suggs = document.querySelectorAll('[id="sugg"]');

  for (let i = 0; i < suggs.length; i++) {
    let item = suggs[i];
    console.log(item);
    item.addEventListener("click", replaceElement);
  }

  // suggs.forEach(function(userItem) {
  //   console.log(userItem);
  //   userItem.addEventListener("click", replaceElement);
  // });

  // for (let s in suggs) {
  //   console.log(s);
  //   s.addEventListener("click", replaceElement);
  // }

  //TODO: hide the loading text
  loading.style.display = "";
});