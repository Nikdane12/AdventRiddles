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

const removeAll = div => {
    while(div.firstChild){div.removeChild(div.firstChild)};
}

const createButton = (text) => {
    const buttonElement = document.createElement("button");
    const buttonSpan = document.createElement("span");
    buttonSpan.classList.add("button_top");
    buttonElement.append(buttonSpan);
    buttonSpan.append(text);

    return buttonElement;
}

const enableCountryDragging = (containerEl) => {
    let activeEl = null;
    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let startTop = 0;

    const onPointerMove = (e) => {
        if (!activeEl) return;

        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        const parentRect = containerEl.getBoundingClientRect();

        let newLeft = startLeft + dx;
        let newTop = startTop + dy;

        // optional: keep pieces inside container bounds
        const elRect = activeEl.getBoundingClientRect();
        const width = elRect.width;
        const height = elRect.height;

        const minLeft = 0;
        const minTop = 0;
        const maxLeft = parentRect.width - width;
        const maxTop = parentRect.height - height;

        newLeft = Math.max(minLeft, Math.min(maxLeft, newLeft));
        newTop = Math.max(minTop, Math.min(maxTop, newTop));

        activeEl.style.left = newLeft + 'px';
        activeEl.style.top = newTop + 'px';
    };

    const onPointerUp = () => {
        if (activeEl) {
            activeEl.style.cursor = 'grab';
        }
        activeEl = null;
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
    };

    containerEl.querySelectorAll('.map-piece').forEach(piece => {
        piece.addEventListener('pointerdown', (e) => {
            e.preventDefault();

            activeEl = piece;
            activeEl.style.cursor = 'grabbing';

            const rect = activeEl.getBoundingClientRect();
            const parentRect = containerEl.getBoundingClientRect();

            // store initial positions (relative to parent)
            startX = e.clientX;
            startY = e.clientY;
            startLeft = rect.left - parentRect.left;
            startTop = rect.top - parentRect.top;

            window.addEventListener('pointermove', onPointerMove);
            window.addEventListener('pointerup', onPointerUp);
        });
    });
}