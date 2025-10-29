const openModal = (header, text, confirmAct, cancelAct) => {
    const modalBACK = document.createElement("div");
    modalBACK.classList.add("modalBACK")

    const modal = document.createElement("div");
    modal.classList.add("modal");

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
    
    modalBACK.append(modal)
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