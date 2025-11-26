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
        { src: './images/mapRiddle/france.png', left: '60%', top: '20%', scale: 1,},
        { src: './images/mapRiddle/norway.png', left: '43%', top: '5%', scale: 1,},
        { src: './images/mapRiddle/poland.png', left: '20%', top: '50%', scale: 1,},
        { src: './images/mapRiddle/sweden.png', left: '60%', top: '40%', scale: 0.73,},
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

const ElvesRiddle = (lang) => {
    const riddleText = "The elves are sitting around a campfire discussing magic, plants, films and tea. They cannot agree on which symbols belong to which categories. Can you help? There are three symbols for each category. Connect them to form a triangle. (You will have four triangles.) Count how many individual lines can be found from other triangles in each triangle. The numbers correspond to letters. Can you find the correct solution word?"



    const photoPos = [
        { file: "camera", X: -46.8, Y: 84.3 },
        { file: "potion", X: -25.4, Y: 10.1 },
        { file: "ring", X: -42.4, Y: 15.3 },
        { file: "daisies", X: -71.7, Y: 20.7 },
        { file: "rabbit", X: -8.0, Y: 31.6 },
        { file: "strangPlant", X: -59.9, Y: 43.9 },
        { file: "sunflower", X: -91.6, Y: 45.8 },
        { file: "wizard", X: -30.2, Y: 48.5 },
        { file: "mint", X: -78.7, Y: 60.8 },
        { file: "chaplin", X: -8.6, Y: 66.9 },
        { file: "dot", X: -35.3, Y: 66.9 },
        { file: "orchid", X: -64.4, Y: 84.1 },
    ];
}

const MatchRiddle = (lang) => {

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
    if (lang == "EN"){riddleText = document.createTextNode("Santa’s elves have been busy building magical math puzzles in the North Pole workshop! You have a matchstick equation that looks a bit off — but don’t worry, you can fix it! Move exactly one matchstick to make the equation true again. \nImportant: You cannot turn the equal sign into an inequality (no changing it to ≠, <, or >). \nCan you help Santa’s elves solve this festive brain teaser and save Christmas math magic?");}
    else {riddleText = document.createTextNode("Die Elfen des Weihnachtsmanns waren in ihrer Werkstatt am Nordpol fleißig damit beschäftigt, magische Mathe-Rätsel zu basteln! Du hast eine Streichholzgleichung, die etwas seltsam aussieht – aber keine Sorge, du kannst das beheben! Verschiebe genau ein Streichholz, damit die Gleichung wieder stimmt. \nWichtig: Du darfst das Gleichheitszeichen nicht in ein Ungleichheitszeichen verwandeln (also nicht in ≠, < oder > ändern). \nKannst du den Weihnachtselfen helfen, dieses festliche Rätsel zu lösen und die mathematische Magie von Weihnachten zu retten?");}
    riddleTextDiv.style.whiteSpace = 'pre-line';
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
    // mapImg.src = './images/matchRiddle/background.png';
    Object.assign(mapImg.style, {
        width: '100%',
        height: '300px',
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
        height: '100%',
        zIndex: 2,
    });

    const Vcolumns = [-7, 3, 19, 31, 41, 56, 71, 80, 16, 26, 33, 43, 48, 58]
    const Vrows = [10, 24, 68, 81]

    const Hcolumns = [-1, 14, 24, 36, 52, 61, 76, 40, 21, 39, 54]
    const Hrows = [3, 19, 32, 44, 49, 61, 74, 87]
    const matches = [
        {left: `${Hcolumns[0]}%`, top: `${Hrows[0]}%`, vert: false,},
        {left: `${Hcolumns[0]}%`, top: `${Hrows[1]}%`, vert: false,},
        {left: `${Hcolumns[0]}%`, top: `${Hrows[2]}%`, vert: false,},
        {left: `${Hcolumns[1]}%`, top: `${Hrows[1]}%`, vert: false,},
        {left: `${Hcolumns[2]}%`, top: `${Hrows[1]}%`, vert: false,},
        {left: `${Hcolumns[3]}%`, top: `${Hrows[0]}%`, vert: false,},
        {left: `${Hcolumns[3]}%`, top: `${Hrows[1]}%`, vert: false,},
        {left: `${Hcolumns[3]}%`, top: `${Hrows[2]}%`, vert: false,},
        {left: `${Hcolumns[4]}%`, top: `${Hrows[1]}%`, vert: false,},
        {left: `${Hcolumns[5]}%`, top: `${Hrows[1]}%`, vert: false,},
        {left: `${Hcolumns[6]}%`, top: `${Hrows[0]}%`, vert: false,},
        {left: `${Hcolumns[6]}%`, top: `${Hrows[1]}%`, vert: false,},
        {left: `${Hcolumns[6]}%`, top: `${Hrows[2]}%`, vert: false,},

        {left: `${Hcolumns[7]}%`, top: `${Hrows[3]}%`, vert: false,},
        {left: `${Hcolumns[7]}%`, top: `${Hrows[4]}%`, vert: false,},

        {left: `${Hcolumns[8]}%`, top: `${Hrows[5]}%`, vert: false,},
        {left: `${Hcolumns[8]}%`, top: `${Hrows[6]}%`, vert: false,},
        {left: `${Hcolumns[8]}%`, top: `${Hrows[7]}%`, vert: false,},
        {left: `${Hcolumns[9]}%`, top: `${Hrows[5]}%`, vert: false,},
        {left: `${Hcolumns[9]}%`, top: `${Hrows[6]}%`, vert: false,},
        {left: `${Hcolumns[9]}%`, top: `${Hrows[7]}%`, vert: false,},
        {left: `${Hcolumns[10]}%`, top: `${Hrows[5]}%`, vert: false,},
        {left: `${Hcolumns[10]}%`, top: `${Hrows[7]}%`, vert: false,},


        {left: `${Vcolumns[0]}%`, top: `${Vrows[0]}%`, vert: true,},
        {left: `${Vcolumns[2]}%`, top: `${Vrows[0]}%`, vert: true,},
        {left: `${Vcolumns[3]}%`, top: `${Vrows[0]}%`, vert: true,},
        {left: `${Vcolumns[5]}%`, top: `${Vrows[0]}%`, vert: true,},
        {left: `${Vcolumns[6]}%`, top: `${Vrows[0]}%`, vert: true,},
        
        {left: `${Vcolumns[1]}%`, top: `${Vrows[1]}%`, vert: true,},
        {left: `${Vcolumns[2]}%`, top: `${Vrows[1]}%`, vert: true,},
        {left: `${Vcolumns[4]}%`, top: `${Vrows[1]}%`, vert: true,},
        {left: `${Vcolumns[5]}%`, top: `${Vrows[1]}%`, vert: true,},
        {left: `${Vcolumns[7]}%`, top: `${Vrows[1]}%`, vert: true,},

        {left: `${Vcolumns[8]}%`, top: `${Vrows[2]}%`, vert: true,},
        {left: `${Vcolumns[9]}%`, top: `${Vrows[2]}%`, vert: true,},
        {left: `${Vcolumns[10]}%`, top: `${Vrows[2]}%`, vert: true,},
        {left: `${Vcolumns[12]}%`, top: `${Vrows[2]}%`, vert: true,},
        {left: `${Vcolumns[13]}%`, top: `${Vrows[2]}%`, vert: true,},
        {left: `${Vcolumns[9]}%`, top: `${Vrows[3]}%`, vert: true,},
        {left: `${Vcolumns[11]}%`, top: `${Vrows[3]}%`, vert: true,},
        {left: `${Vcolumns[12]}%`, top: `${Vrows[3]}%`, vert: true,},
        {left: `${Vcolumns[13]}%`, top: `${Vrows[3]}%`, vert: true,},
    ];
    

    matches.forEach((c, index) => {
        const img = document.createElement('img');
        img.src = './images/matchRiddle/match.png';
        img.classList.add('map-piece');
        img.classList.add(index);

        Object.assign(img.style, {
            position: 'absolute',
            left: c.left,
            top: c.top,
            width: '100px',
            height: 'auto',
            cursor: 'grab',
            userSelect: 'none',
            touchAction: 'none', 
            transform: `rotate(${c.vert ? -90 : 0}deg) scale(0.5)`,
            transformOrigin: '50% 50%',
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
    {title: "Elves Riddle",
    riddle: ElvesRiddle,},
    {title: "Match Riddle",
    riddle: MatchRiddle,},
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