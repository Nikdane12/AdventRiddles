const MapRiddle = (lang) => {
    const container = document.createElement('div');
    container.classList.add('riddleContainer');
    Object.assign(container.style, {
        display: 'flex',
        width: '100%',
        height: '100%',
        boxSizing: 'border-box'
    });

    const riddleTextDiv = document.createElement('div');
    Object.assign(riddleTextDiv.style, {
        width: '50%',
        height: '100%',
        boxSizing: 'border-box',
        padding: '1rem',
        overflowY: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    });
    let riddleText
    if (lang == "EN"){riddleText = document.createTextNode("Yikes, what happened here? Did someone shake up the world map? Only Norway is at the right place. Can you help us put things back in order in straight lines? What do you see?");}
    else {riddleText = document.createTextNode("Huch, was ist denn hier passiert? Irgendjemand hat hier die Weltkarte deutlich durch geschüttelt? Nur Norwegen ist dort wo man es finden soll. Kannst du uns helfen in geraden Linien Ordnung her zu stellen? Was siehst du?");}
    riddleTextDiv.appendChild(riddleText);

    const rightWrapper = document.createElement('div');
    Object.assign(rightWrapper.style, {
        width: '50%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box'
    });

    const riddleImageCont = document.createElement('div');
    Object.assign(riddleImageCont.style, {
        width: '100%',
        height: '100%'
    });

    const mapImg = document.createElement('div');
    // mapImg.src = './images/MapRiddle.png';
    Object.assign(mapImg.style, {
        width: '100%',
        height: '400px',
        objectFit: 'cover',
        display: 'block',
        pointerEvents: 'none',
    });

    riddleImageCont.appendChild(mapImg);
    
    const riddleImageDragCont = document.createElement('div');
    Object.assign(riddleImageDragCont.style, {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',   // same bounds as riddleImageCont
        zIndex: 2,
    });

    const countries = [
        { src: './images/mapRiddle/france_noBG.png', left: '20%', top: '20%', scale: 1,},
        { src: './images/mapRiddle/norway_noBG.png', left: '40%', top: '40%', scale: 1,},
        { src: './images/mapRiddle/poland_noBG.png', left: '60%', top: '30%', scale: 1,},
        { src: './images/mapRiddle/sweden_noBG.png', left: '60%', top: '30%', scale: 0.73,},
    ];

    countries.forEach(c => {
        const img = document.createElement('img');
        img.src = c.src;
        img.classList.add('map-piece');

        Object.assign(img.style, {
            position: 'absolute',
            left: c.left,
            top: c.top,
            width: '100px',
            height: 'auto',
            cursor: 'grab',
            userSelect: 'none',
            touchAction: 'none', 
            transform: `scale(${c.scale})`,
        });

        riddleImageDragCont.appendChild(img);
    });

    rightWrapper.appendChild(riddleImageCont);     
    rightWrapper.appendChild(riddleImageDragCont);

    container.appendChild(riddleTextDiv);
    container.appendChild(rightWrapper);

    enableCountryDragging(riddleImageDragCont);

    return container;
}

const riddleLib = [
    {title: "Map Riddle",
    riddle: MapRiddle,},
]

const openRiddle = (num, lang) => {
    num = (((num - 1) % riddleLib.length) + riddleLib.length) % riddleLib.length + 1;
    const idx = num - 1;
    
    const header = document.createElement('div');
    header.innerText = riddleLib[idx].title;

    const riddleBody = document.createElement('div');
    riddleBody.classList.add("riddlebody");
    
    riddleBody.append(riddleLib[idx].riddle(lang))
    
    openModal(header, riddleBody, null, null, true);
}