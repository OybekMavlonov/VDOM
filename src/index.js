/** @jsx h */

function h(type, props, ...children) {
  return { type, props, children };
}

function createElement(node) {
  if (typeof node === "string") {
    return document.createTextNode(node);
  }
  const $el = document.createElement(node.type);
  node.children.map(createElement).forEach($el.appendChild.bind($el));
  return $el;
}


function updateElement(rootElement, newNode ,_) {
  // TODO: implement
    const newDOM = createElement(newNode)
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const oldElements = Array.from(rootElement.firstChild.querySelectorAll('*'));


    if(newElements.length < oldElements.length) {
        oldElements.forEach((el, i) => {
            const curEl = newElements[i];

            // Updates changed ATTRIBUTES
            if (!el.isEqualNode(curEl)) {
                rootElement.firstChild.removeChild(el);
            }
        });
    }

    newElements.forEach((newEl, i) => {
        const curEl = oldElements[i];

        // Updates changed TEXT
        if (
            !newEl.isEqualNode(curEl) &&
            newEl.firstChild?.nodeValue?.trim() !== '' && curEl !== undefined
        ) {
            curEl.textContent = newEl.textContent;
        }

        // Updates changed ATTRIBUTES
        if (!newEl.isEqualNode(curEl)) {
            Array.from(newEl.attributes).forEach(attr =>
                curEl.setAttribute(attr.name, attr.value)
            );
            const node = document.createElement(newEl.localName)
            node.innerText = newEl.innerText;
            rootElement.firstChild.append(node);
        }
    });

}

const initDOM = (
  <div>
    <p>Hello!</p>
    <ul>
      <li>How is it going?</li>
    </ul>
  </div>
);

const addNode = (
  <div>
    <p>Hello!</p>
    <ul>
      <li>How is it going?</li>
    </ul>
    <p>Good</p>
  </div>
);

const removeNode = (
  <div>
    <p>Hello!</p>
    <ul>
      <li>How is it going?</li>
    </ul>
  </div>
);

const changeNode = (
  <div>
    <p>Hi!</p>
    <ul>
      <li>How is it going?</li>
    </ul>
  </div>
);

const rootElement = document.getElementById("root");
rootElement.appendChild(createElement(initDOM));

const initNodeButton = document.createElement("button");
initNodeButton.innerText = "Init";
rootElement.appendChild(initNodeButton);
initNodeButton.addEventListener("click", () => {
  updateElement(rootElement, initDOM, initDOM);
});

const addNodeButton = document.createElement("button");
addNodeButton.innerText = "Add";
rootElement.appendChild(addNodeButton);
addNodeButton.addEventListener("click", () => {
  updateElement(rootElement, addNode, initDOM);
});

const removeNodeButton = document.createElement("button");
removeNodeButton.innerText = "Remove";
rootElement.appendChild(removeNodeButton);

removeNodeButton.addEventListener("click", () => {
  updateElement(rootElement, removeNode, addNode);
});

const changeNodeButton = document.createElement("button");
changeNodeButton.innerText = "Change";
rootElement.appendChild(changeNodeButton);

changeNodeButton.addEventListener("click", () => {
  updateElement(rootElement, changeNode, removeNode);
});

