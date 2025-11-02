const openModal = (header, text, confirmAct, cancelAct, close_but) => {
    const modalBACK = document.createElement("div");
    modalBACK.classList.add("modalBACK")

    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.addEventListener('click', e => e.stopPropagation())

    const headerElement = document.createElement("div");
    headerElement.append(header);
    headerElement.classList.add("title");
    modal.append(headerElement)

    const textElement = document.createElement("div");
    textElement.append(text);
    modal.append(textElement)

    const buttonCont = document.createElement("div");
    buttonCont.classList.add("buttonCont");
    modal.append(buttonCont)

    if (close_but) {
        const closeButton = document.createElement('div');
        closeButton.append(document.createTextNode("X"))
        closeButton.classList.add("modalClose", "noSelect");
        closeButton.addEventListener("click", (e) => {
            removeSelf([modalBACK])
        });
        modal.append(closeButton)
    }
    
    modalBACK.append(modal)
    modalBACK.addEventListener("click", (e) => {removeSelf([modalBACK])});
    document.body.append(modalBACK)

    if(confirmAct){
        const confirmBut = createButton(document.createTextNode("Confirm"))
        buttonCont.append(confirmBut)

        confirmBut.addEventListener("click", (e) => {
            removeSelf([modalBACK])
            confirmAct()
        });
    }
    if(cancelAct){
        const cancelBut = createButton(document.createTextNode("Cancel"))
        buttonCont.append(cancelBut)

        cancelBut.addEventListener("click", (e) => {
            removeSelf([modalBACK])
            cancelAct()
        });
    }

    
}

const removeSelf = divs => {
    divs.forEach(element => {
        if(element.parentNode){
            element.parentNode.removeChild(element);
        }
    });
}

const createButton = (text) => {
    const buttonElement = document.createElement("button");
    const buttonSpan = document.createElement("span");
    buttonSpan.classList.add("button_top");
    buttonElement.append(buttonSpan);
    buttonSpan.append(text);

    return buttonElement;
}