let playerName = localStorage.getItem('playerName') ?? 'Sonja'

const mapRiddle = (lang) => {
    const container = document.createElement('div');
    container.classList.add('riddleContainer');

    const riddleTextDiv = document.createElement('div');
    riddleTextDiv.classList.add('riddleText');

    let riddleText;
    if (lang == "EN") {
        riddleText = document.createTextNode(
            "Yikes, what happened here? Did someone shake up the world map? Only Norway is at the right place. Can you help us put things back in order in straight lines? What do you see?"
        );
    } else {
        riddleText = document.createTextNode(
            "Huch, was ist denn hier passiert? Irgendjemand hat hier die Weltkarte deutlich durch geschüttelt? Nur Norwegen ist dort wo man es finden soll. Kannst du uns helfen in geraden Linien Ordnung her zu stellen? Was siehst du?"
        );
    }
    riddleTextDiv.appendChild(riddleText);

    const Wrapper = document.createElement('div');
    
    Wrapper.classList.add('riddleRightWrapper'); 

    const riddleImageCont = document.createElement('div');
    riddleImageCont.classList.add('riddleImageContainer');

    const mapImg = document.createElement('div');
    // mapImg.src = './images/MapRiddle.png';
    mapImg.classList.add('mapBaseImage');

    riddleImageCont.appendChild(mapImg);

    const riddleImageDragCont = document.createElement('div');
    riddleImageDragCont.classList.add('riddleImageDragContainer');

    const countries = [
        { src: './images/mapRiddle/france.png', left: '60%', top: '20%', scale: 1 },
        { src: './images/mapRiddle/norway.png', left: '43%', top: '5%', scale: 1 },
        { src: './images/mapRiddle/poland.png', left: '15%', top: '50%', scale: 1 },
        { src: './images/mapRiddle/sweden.png', left: '70%', top: '50%', scale: 0.73 },
    ];

    countries.forEach(c => {
        const img = document.createElement('img');
        img.src = c.src;
        img.classList.add('map-piece', 'draggable-piece');

        img.style.left = c.left;
        img.style.top = c.top;
        img.style.transform = `scale(${c.scale})`;

        riddleImageDragCont.appendChild(img);
    });

    Wrapper.appendChild(riddleImageCont);
    Wrapper.appendChild(riddleImageDragCont);

    container.appendChild(riddleTextDiv);
    container.appendChild(Wrapper);

    enableCountryDragging(riddleImageDragCont);

    return container;
};

const elvesRiddle = (lang) => {
    const riddleBody = document.createElement('div')

    let text;
    if (lang == "EN") {
        text = document.createTextNode(
            "The elves are sitting around a campfire discussing magic, plants, films and tea. They cannot agree on which symbols belong to which categories. Can you help? There are three symbols for each category. Connect them to form a triangle. (You will have four triangles.) Count how many individual lines can be found from other triangles in each triangle. The numbers correspond to letters. Can you find the correct solution word? \n On PC you can draw on the image, on mobile you should screenshot."
        );
    } else {
        text = document.createTextNode(
            "Die Wichteln sitzen um ein Lagerfeuer und diskutieren über Magie, Pflanzen, Film, Tee. Sie sind sich uneinig, welche Symbole zur welche Kategorien gehören. Kannst du helfen? Für jede Kategorie sind drei Symbole gegeben. Verbinde diese zu einem Dreieck. (Du wist also vier Dreiecke haben.) Zähle in jedem Dreieck, wie viele einzelne Linien von anderen Dreiecken zu finden sind. Die Zahlen entsprechen Buchstaben. Kannst du das richtige Lösungswort finden? \n Am PC kannst du auf dem Bild zeichnen, auf dem Handy solltest du einen Screenshot machen."
        );
    }
    const textElement = document.createElement('p');
    textElement.appendChild(text)
    textElement.classList.add('riddleText', 'hori')
    textElement.style.padding = '0'

    riddleBody.appendChild(textElement)

    const data = [
        ["1","2","3","4","5","6","7"],
        ["B","A","E","L","S","T","F"],
    ];
    const table = document.createElement("table");
    const tbody = document.createElement("tbody");

    for (const row of data) {
    const tr = document.createElement("tr");
    for (const cell of row) {
        const td = document.createElement("td");
        td.textContent = cell;
        tr.appendChild(td);
    }
    tbody.appendChild(tr);
    }

    table.appendChild(tbody);
    table.style.margin = '0 auto'

    riddleBody.appendChild(table)

    // const image = document.createElement('img');
    // image.src = `./images/elvesRiddle/image.png`;
    // image.classList.add('wreath-image', 'egypt-riddle');

    // riddleBody.appendChild(image)

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    

    // canvas.width = 480;
    // canvas.height = 480;

    let isDrawing = false;
    let lineWidth = 10;

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    let startpointX, startpointY, savedCanvasState = null;

    let unset = true;

    const setStartPoint = (e) => {
        // resizeCanvas()
        isDrawing = true;

        const realPosX = e.clientX - canvas.getBoundingClientRect().left
        const realPosY = e.clientY - canvas.getBoundingClientRect().top
        
        ctx.beginPath();
        ctx.stroke();

        startpointX = realPosX;
        startpointY = realPosY;

        savedCanvasState = ctx.getImageData(0, 0, canvas.width, canvas.height);
    };

    const draw = (e) => {
        if (!isDrawing) return
        ctx.putImageData(savedCanvasState, 0, 0);
        ctx.beginPath();
        ctx.moveTo(startpointX, startpointY);
        ctx.lineTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
        ctx.stroke(); 
        ctx.closePath();
    } 

    canvas.addEventListener('mousedown', setStartPoint);

    canvas.addEventListener('mousemove', draw)

    canvas.addEventListener('mouseup', () => {
        isDrawing = false;
        ctx.closePath();
    });

    const resizeCanvas = () => {
        const rect = canvas.getBoundingClientRect();

        // If the element isn't laid out yet, don't resize to 0x0
        if (rect.width === 0 || rect.height === 0) return;

        const dpr = window.devicePixelRatio || 1;

        canvas.width = Math.round(rect.width * dpr);
        canvas.height = Math.round(rect.height * dpr);

        // Draw using CSS pixels but with a higher-res backing store
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        // Re-apply drawing settings because resizing resets the context state
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';

        savedCanvasState = null;
    }

    // resizeCanvas();
    // window.addEventListener('resize', resizeCanvas);

    requestAnimationFrame(resizeCanvas);
    window.addEventListener('resize', () => requestAnimationFrame(resizeCanvas));

    canvas.style.display = 'block'
    canvas.style.height = '100%'
    canvas.style.width = '100%'


    const removeBut = document.createElement('div');
    removeBut.classList.add('small-btn', 'mobile-hideButton')
    removeBut.style.width = 'min-content';
    removeBut.style.height = 'min-content';
    removeBut.style.margin = 'auto';
    removeBut.appendChild(document.createTextNode(lang === 'DE' ? 'Löschen' : 'CLEAR'))

    removeBut.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    riddleBody.appendChild(removeBut)

    const canvasWrapper = document.createElement('div')
    canvasWrapper.classList.add("wreath-image")
    canvasWrapper.style.backgroundImage = "url('./images/elvesRiddle/image.png')"
    canvasWrapper.style.backgroundSize = "cover";
    canvasWrapper.style.aspectRatio = '948 / 485'
    canvasWrapper.appendChild(canvas)

    riddleBody.appendChild(canvasWrapper)

    return riddleBody
};

const matchRiddle = (lang) => {
    const container = document.createElement('div');
    container.classList.add('riddleContainer');
    // Removed: if (orientation == 'P'){ container.classList.add('vert') }

    let text;
    if (lang == "EN") {
        text = document.createTextNode(
            "Santa’s elves have been busy building magical math puzzles in the North Pole workshop! You have a matchstick equation that looks a bit off — but don’t worry, you can fix it! Move exactly one matchstick to make the equation true again. \nImportant: You cannot turn the equal sign into an inequality (no changing it to ≠, <, or >). \nCan you help Santa’s elves solve this festive brain teaser and save Christmas math magic?"
        );
    } else {
        text = document.createTextNode(
            "Die Elfen des Weihnachtsmanns waren in ihrer Werkstatt am Nordpol fleißig damit beschäftigt, magische Mathe-Rätsel zu basteln! Du hast eine Streichholzgleichung, die etwas seltsam aussieht – aber keine Sorge, du kannst das beheben! Verschiebe genau ein Streichholz, damit die Gleichung wieder stimmt. \nWichtig: Du darfst das Gleichheitszeichen nicht in ein Ungleichheitszeichen verwandeln (also nicht in ≠, < oder > ändern). \nKannst du den Weihnachtselfen helfen, dieses festliche Rätsel zu lösen und die mathematische Magie von Weihnachten zu retten?"
        );
    }

    const textElement = document.createElement('p');
    textElement.appendChild(text)

    textElement.classList.add('riddleText')
    // Removed: if (orientation === 'L') { textElement.classList.add('vert'); }

    container.appendChild(textElement)

    const Wrapper = document.createElement('div');
    // The match riddle uses the simple riddleWrapper class for its image side
    Wrapper.classList.add('riddleWrapper');
    // Removed orientation check for wrapper class


    const riddleImageCont = document.createElement('div');
    riddleImageCont.classList.add('riddleImageContainer');

    const mapImg = document.createElement('div');
    // mapImg.src = './images/matchRiddle/background.png';
    mapImg.classList.add('matchBaseImage');

    riddleImageCont.appendChild(mapImg);

    const riddleImageDragCont = document.createElement('div');
    riddleImageDragCont.classList.add('riddleImageDragContainer');

    const Vcolumns = [-7, 3, 19, 31, 41, 56, 71, 80, 16, 26, 33, 43, 48, 58];
    const Vrows = [10, 24, 68, 81];

    const Hcolumns = [-1, 14, 24, 36, 52, 61, 76, 40, 21, 39, 54];
    const Hrows = [3, 19, 32, 44, 49, 61, 74, 87];

    const matches = [
        { left: `${Hcolumns[0]}%`, top: `${Hrows[0]}%`, vert: false },
        { left: `${Hcolumns[0]}%`, top: `${Hrows[1]}%`, vert: false },
        { left: `${Hcolumns[0]}%`, top: `${Hrows[2]}%`, vert: false },
        { left: `${Hcolumns[1]}%`, top: `${Hrows[1]}%`, vert: false },
        { left: `${Hcolumns[2]}%`, top: `${Hrows[1]}%`, vert: false },
        { left: `${Hcolumns[3]}%`, top: `${Hrows[0]}%`, vert: false },
        { left: `${Hcolumns[3]}%`, top: `${Hrows[1]}%`, vert: false },
        { left: `${Hcolumns[3]}%`, top: `${Hrows[2]}%`, vert: false },
        { left: `${Hcolumns[4]}%`, top: `${Hrows[1]}%`, vert: false },
        { left: `${Hcolumns[5]}%`, top: `${Hrows[1]}%`, vert: false },
        { left: `${Hcolumns[6]}%`, top: `${Hrows[0]}%`, vert: false },
        { left: `${Hcolumns[6]}%`, top: `${Hrows[1]}%`, vert: false },
        { left: `${Hcolumns[6]}%`, top: `${Hrows[2]}%`, vert: false },

        { left: `${Hcolumns[7]}%`, top: `${Hrows[3]}%`, vert: false },
        { left: `${Hcolumns[7]}%`, top: `${Hrows[4]}%`, vert: false },

        { left: `${Hcolumns[8]}%`, top: `${Hrows[5]}%`, vert: false },
        { left: `${Hcolumns[8]}%`, top: `${Hrows[6]}%`, vert: false },
        { left: `${Hcolumns[8]}%`, top: `${Hrows[7]}%`, vert: false },
        { left: `${Hcolumns[9]}%`, top: `${Hrows[5]}%`, vert: false },
        { left: `${Hcolumns[9]}%`, top: `${Hrows[6]}%`, vert: false },
        { left: `${Hcolumns[9]}%`, top: `${Hrows[7]}%`, vert: false },
        { left: `${Hcolumns[10]}%`, top: `${Hrows[5]}%`, vert: false },
        { left: `${Hcolumns[10]}%`, top: `${Hrows[7]}%`, vert: false },

        { left: `${Vcolumns[0]}%`, top: `${Vrows[0]}%`, vert: true },
        { left: `${Vcolumns[2]}%`, top: `${Vrows[0]}%`, vert: true },
        { left: `${Vcolumns[3]}%`, top: `${Vrows[0]}%`, vert: true },
        { left: `${Vcolumns[5]}%`, top: `${Vrows[0]}%`, vert: true },
        { left: `${Vcolumns[6]}%`, top: `${Vrows[0]}%`, vert: true },

        { left: `${Vcolumns[1]}%`, top: `${Vrows[1]}%`, vert: true },
        { left: `${Vcolumns[2]}%`, top: `${Vrows[1]}%`, vert: true },
        { left: `${Vcolumns[4]}%`, top: `${Vrows[1]}%`, vert: true },
        { left: `${Vcolumns[5]}%`, top: `${Vrows[1]}%`, vert: true },
        { left: `${Vcolumns[7]}%`, top: `${Vrows[1]}%`, vert: true },

        { left: `${Vcolumns[8]}%`, top: `${Vrows[2]}%`, vert: true },
        { left: `${Vcolumns[9]}%`, top: `${Vrows[2]}%`, vert: true },
        { left: `${Vcolumns[10]}%`, top: `${Vrows[2]}%`, vert: true },
        { left: `${Vcolumns[12]}%`, top: `${Vrows[2]}%`, vert: true },
        { left: `${Vcolumns[13]}%`, top: `${Vrows[2]}%`, vert: true },
        { left: `${Vcolumns[9]}%`, top: `${Vrows[3]}%`, vert: true },
        { left: `${Vcolumns[11]}%`, top: `${Vrows[3]}%`, vert: true },
        { left: `${Vcolumns[12]}%`, top: `${Vrows[3]}%`, vert: true },
        { left: `${Vcolumns[13]}%`, top: `${Vrows[3]}%`, vert: true },
    ];

    matches.forEach((c, index) => {
        const img = document.createElement('img');
        img.src = './images/matchRiddle/match.png';
        img.classList.add('map-piece', 'match-piece', 'draggable-piece');
        img.classList.add(index);

        // puzzle positions & rotation
        img.style.left = c.left;
        img.style.top = c.top;
        img.style.transform = `rotate(${c.vert ? -90 : 0}deg) scale(0.5)`;

        riddleImageDragCont.appendChild(img);
    });

    Wrapper.appendChild(riddleImageCont);
    Wrapper.appendChild(riddleImageDragCont);

    container.appendChild(Wrapper);

    enableCountryDragging(riddleImageDragCont);

    return container;
};

const sudokuRiddle = (lang) => {

    const riddleCont = document.createElement('div');

    riddleCont.classList.add('sudoku-riddle');


    const sudokuleftCont = document.createElement('div')
    sudokuleftCont.classList.add('sudokuLeftCont')
    riddleCont.appendChild(sudokuleftCont)

    let text;
    if (lang == "EN") {
        text = document.createTextNode(
            "Santa Claus also secretly loves to take part in the Christmas Sudoku Championship. However, he just can't seem to make any progress. Can you help him? Name the three symbols in the three black circles."
        );
    } else {
        text = document.createTextNode(
            "Der Weihnachtsmann liebt auch im Geheimen an der Weihnachtssudoku Meisterschaft teilzunehmen. Allerdings kommt er einfach nicht weiter. Kannst du ihm helfen? Nenne die drei Symbole, in den drei schwarzen Kreise."
        );
    }
    const textElement = document.createElement('p');
    textElement.appendChild(text)
    textElement.style.margin = 'unset'

    sudokuleftCont.appendChild(textElement);

    const imageLib = {
        1: "star",
        2: "tree",
        3: "wreath",
        4: "gift",
        5: "bauble",
        6: "candle",
        7: "people",
        8: "calendar",
        9: "heart",
    };

    const puzzle = [
        [[0, 6, 0], [7, 0, 0], [1, 0, 0]],
        [[0, 0, 0], [0, 6, 0], [0, 5, 0]],
        [[7, 0, 5], [0, 0, 0], [9, 0, 0]],
        [[5, 0, 0], [0, 0, 7], [8, 0, 0]],
        [[2, 0, 0], [0, 0, 9], [0, 0, 4]],
        [[4, 1, 0], [3, 0, 5], [0, 7, 0]],
        [[0, 4, 8], [0, 0, 3], [0, 0, 7]],
        [[0, 0, 0], [0, 2, 0], [0, 0, 0]],
        [[6, 0, 0], [0, 0, 1], [3, 0, 0]],
    ];

    const initialGrid = puzzle.map(rowBlocks => rowBlocks.flat());
    const currentGrid = initialGrid.map(row => [...row]);

    const circleCells = [
        [0, 0],
        [7, 0],
        [5, 4],
    ];

    const hasCircle = (row, col) =>
        circleCells.some(([r, c]) => r === row && c === col);

    const renderCell = (value) => {
        if (value === 0) return null;
        const img = document.createElement('img');
        img.src = `./images/sudokuRiddle/${imageLib[value]}.png`;
        img.classList.add('sudoku-cell__icon');
        return img;
    };

    let selectedValue = null;
    let lastSelectedBtn = null;

    const toolbar = document.createElement('div');
    toolbar.classList.add('sudoku-toolbar');

    const label = document.createElement('span');
    label.textContent = lang === "EN" ? "Select symbol:" : "Symbol auswählen:";
    toolbar.appendChild(label);

    const selectButton = (btn, value) => {
        selectedValue = value;
        if (lastSelectedBtn) {
            lastSelectedBtn.classList.remove('sudoku-toolbar__button--selected');
        }
        lastSelectedBtn = btn;
        if (btn) {
            btn.classList.add('sudoku-toolbar__button--selected');
        }
    };

    const clearBtn = document.createElement('button');
    clearBtn.textContent = lang === "EN" ? "Clear" : "Löschen";
    clearBtn.classList.add('sudoku-toolbar__button', 'sudoku-toolbar__button--clear');
    clearBtn.addEventListener('click', () => selectButton(clearBtn, 0));
    toolbar.appendChild(clearBtn);

    Object.entries(imageLib).forEach(([valueStr, name]) => {
        const value = Number(valueStr);
        const btn = document.createElement('button');
        btn.classList.add('sudoku-toolbar__button', 'sudoku-toolbar__button--symbol');

        const img = document.createElement('img');
        img.src = `./images/sudokuRiddle/${name}.png`;
        img.alt = name;
        img.classList.add('sudoku-toolbar__icon');

        btn.appendChild(img);
        btn.addEventListener('click', () => selectButton(btn, value));
        toolbar.appendChild(btn);
    });

    sudokuleftCont.appendChild(toolbar);

    const sudokuCont = document.createElement('div');
    sudokuCont.classList.add('sudoku-grid');

    initialGrid.forEach((row, rowIndex) => {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('sudoku-row');

        row.forEach((value, colIndex) => {
            const cell = document.createElement('div');
            const isFixed = value !== 0;

            cell.classList.add('sudoku-cell');
            if (isFixed) {
                cell.classList.add('sudoku-cell--fixed');
            } else {
                cell.classList.add('sudoku-cell--editable');
            }

            if (rowIndex % 3 === 0) {
                cell.classList.add('sudoku-cell--border-top');
            }
            if (colIndex % 3 === 0) {
                cell.classList.add('sudoku-cell--border-left');
            }
            if (rowIndex === 8) {
                cell.classList.add('sudoku-cell--border-bottom');
            }
            if (colIndex === 8) {
                cell.classList.add('sudoku-cell--border-right');
            }

            cell.dataset.row = String(rowIndex);
            cell.dataset.col = String(colIndex);
            cell.dataset.fixed = String(isFixed);

            const imgEl = renderCell(value);
            if (imgEl) cell.appendChild(imgEl);

            if (hasCircle(rowIndex, colIndex)) {
                const circle = document.createElement('div');
                circle.classList.add('sudoku-circle');
                cell.appendChild(circle);
            }

            rowDiv.appendChild(cell);
        });

        sudokuCont.appendChild(rowDiv);
    });

    sudokuCont.addEventListener('click', (e) => {
        const cell = e.target.closest('.sudoku-cell');
        if (!cell) return;
        if (selectedValue === null) return;

        const row = Number(cell.dataset.row);
        const col = Number(cell.dataset.col);
        const isFixed = cell.dataset.fixed === 'true';
        if (isFixed) return; // don't change givens

        currentGrid[row][col] = selectedValue;

        const oldImg = cell.querySelector('img');
        if (oldImg) oldImg.remove();

        if (selectedValue !== 0) {
            const newImg = renderCell(selectedValue);
            if (newImg) cell.appendChild(newImg);
        }
    });

    riddleCont.appendChild(sudokuCont);
    return riddleCont;
};

const wreathRiddle = (lang) => {
    let text;
    if (lang == "EN") {
        text = document.createTextNode(
            "This is the top-secret Advent wreath, which is used to share top-secret messages. Can you decipher what the Advent wreath is trying to tell us? Note that the candles are different sizes."
        );
    } else {
        text = document.createTextNode(
            "Das ist der super streng geheime Adventskranz, der dafür dient super streng geheime Nachrichten zu teilen. Kannst du entschlüsseln, was der Adventskranz uns sagen möchte? Achte darauf, dass die Kerzen unterschiedlich groß sind."
        );
    }
    const textElement = document.createElement('p');
    textElement.appendChild(text)
    textElement.classList.add('riddleText', 'hori')

    const image = document.createElement('img');
    image.src = `./images/wreathRiddle/wreath${lang}.png`;
    image.classList.add('wreath-image');

    const container = document.createElement('div');
    container.classList.add('wreath-riddle');
    container.appendChild(textElement);
    container.appendChild(image);

    return container;
};

const inequalityRiddle = (lang) => {
    let text;
    if (lang == "EN") {
        text = document.createTextNode(`The elf ${playerName} has lost their heart to Japan and now enthusiastically solves Japanese puzzles! In each puzzle, they have to enter the numbers 1 to 5 in each row and column – while paying attention to the small "greater than" and "less than" signs. Can you help ${playerName} solve this puzzle and name the numbers in the boxes marked in red? \nYou can fill in the empty boxes by typing your answer in them.`);
    } else {
        text = document.createTextNode(`Die Elfe ${playerName} hat ihr Herz an Japan verloren und löst jetzt voller Begeisterung japanische Rätsel! In jedem Rätsel müssen in jeder Zeile und Spalte die Zahlen von 1 bis 5 eingetragen werden – dabei sind die kleinen „größer als“- und „kleiner als“-Zeichen zu beachten. Kannst du ${playerName} helfen, dieses Rätsel zu lösen und die Zahlen in den rot markierten Kästchen zu nennen? \nSie können die leeren Felder ausfüllen, indem Sie Ihre Antwort hineintippen.`);
    }


    const grid = [
        [0, 0, 0, 3, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 2],
        [0, 4, 2, 0, 1],
    ];

    const red = [
        {x: 1, y: 1}, 
        {x: 4, y: 3}, 
        {x: 1, y: 4}
    ]

    const ineq = [
        /*Horizontal*/[
            ['>', 0, 0, 0],
            [0, 0, 0, 0],
            ['>', '<', '>', '>'],
            [0, 0, 0, '<'],
            [0, 0, 0, 0],
        ],
        /*Vertical*/[
            ['V', 'A', 'A', 'V', 'A'],
            [0, 0, 0, 'A', 0],
            [0, 0, 0, 0, 0],
            [0, 'V', 0, 0, 0],
        ]
    ];

    const container = document.createElement('div');
    container.classList.add('riddleContainer');

    const textElement = document.createElement('p');
    textElement.appendChild(text)
    textElement.classList.add('riddleText')

    container.appendChild(textElement)

    const gridDiv = document.createElement('div')
    gridDiv.classList.add('ineq-container')
    container.appendChild(gridDiv)

    grid.forEach((rowArray, rowIndex) => {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('ineq-row');

        rowArray.forEach((number, valueIndex) => {
            const cell = document.createElement('div');
            cell.classList.add('ineq-cell');

            const input = document.createElement('input');
            input.type = "number";
            input.classList.add('ineq-input');

            if (number !== 0) {
                input.value = number;
                input.readOnly = true;
            }
            red.forEach(obj => {
                if(obj.y == valueIndex && obj.x == rowIndex){
                    input.classList.add('find')
                }
            });

            cell.appendChild(input);
            rowDiv.appendChild(cell);

            const row = ineq[0][rowIndex];

            if (row && row[valueIndex] !== undefined) {
                const val = row[valueIndex];

                const sign = document.createElement('div');
                sign.classList.add('ineq-sign', 'ineq-sign--horizontal');

                if (val !== 0) {
                    sign.innerText = val;                    
                }
                
                rowDiv.appendChild(sign);
            }
        });

        gridDiv.appendChild(rowDiv);

        if (ineq[1][rowIndex]) {
            const subRow = document.createElement('div');
            subRow.classList.add('ineq-row', 'ineq-row--vertical');

            ineq[1][rowIndex].forEach((e) => {
                const cell = document.createElement('div');
                cell.classList.add('ineq-sign--vertical');

                const sign = document.createElement('div');
                sign.classList.add('ineq-sign');
                if(e == 'A'){
                    sign.classList.add('flip')
                    e = 'V'
                } 
                if (e !== 0) {sign.innerText = e;}
                cell.appendChild(sign)
                subRow.appendChild(cell)
            });

            gridDiv.appendChild(subRow);
        }
    });

    return container;
};

const wordSearchRiddle = (lang) => {
    const myRiddle = document.createElement('div')

    let text;
    if (lang == "EN") {
        text = document.createTextNode(
            "The elf Anette wants to challenge Santa Claus. She has hidden the words heart, angel, advent, winter, tree, decorating in the jumble of letters. You can find them diagonally, vertically, horizontally, and even backwards. All words have ONE thing in common. Connect this commonality from row to row. What do you see? Tip: Take a screenshot and draw on it"
        );
    } else {
        text = document.createTextNode(
            "Die Elfe Anette möchte den Weihnachtsmann herausfordern. Sie hat die Wörter Herz, Familie, Advent, Tanne, Winter und Weihnachtsbaum in dem Buchstabenwirrwarr versteckt. Man kann sie diagonal, vertikal, horizontal und sogar rückwärts finden. Alle Wörter haben EINE Gemeinsamkeit. Verbinde diese Gemeinsamkeit. Was siehst du? Tipp: Mach einen Screenshot und zeichne darauf"
        );
    }
    const textElement = document.createElement('p');
    textElement.appendChild(text)
    textElement.classList.add('riddleText', 'hori')
    textElement.style.padding = '0'

    let grid;
    if (lang == "EN") {
        grid = [   
            ['F','S','A','Q','E','T','Z','H','A','G','T','H','J','V','X',],
            ['I','E','H','T','O','S','G','B','F','L','O','R','D','G','H',],
            ['D','R','E','T','U','J','V','D','U','I','L','L','T','E','W',],
            ['U','J','A','E','R','T','Z','J','K','H','D','E','W','E','T',],
            ['Z','U','R','I','J','F','D','B','N','M','J','G','H','T','S',],
            ['A','W','T','Z','I','O','K','O','D','V','B','N','S','A','E',],
            ['R','T','U','O','P','S','D','G','H','N','M','A','A','E','T',],
            ['G','U','F','G','A','D','V','E','N','T','S','M','Y','N','L',],
            ['R','H','O','L','P','O','S','T','A','W','R','A','Z','I','L',],
            ['D','F','Z','U','K','D','A','S','A','X','B','F','E','R','T',],
            ['M','E','R','E','T','N','I','W','O','T','S','D','R','Z','J',],
            ['A','W','E','R','T','U','N','M','U','P','R','S','G','P','A',],
            ['N','I','P','A','R','R','M','E','Q','U','B','E','P','L','O',],
            ['A','R','T','N','U','D','S','M','K','L','O','S','E','A','M',],
            ['D','E','C','O','R','A','T','I','N','G','B','L','S','A','N',],
        ];
    }
    else {
        grid = [
            ['F','S','A','Q','E','T','Z','H','A','G','T','H','J','V','X'],
            ['I','E','H','T','O','S','G','B','F','L','O','R','D','G','H'],
            ['D','R','E','T','U','J','V','D','U','I','L','P','T','E','W'],
            ['U','J','R','E','R','T','Z','J','K','H','D','E','W','E','T'],
            ['Z','U','Z','I','J','F','D','B','N','M','J','I','H','T','S'],
            ['A','W','R','Z','I','O','K','O','D','V','B','L','S','A','E'],
            ['R','T','U','O','P','S','D','G','H','N','M','I','A','E','T'],
            ['G','U','F','G','A','D','V','E','N','T','S','M','Y','N','L'],
            ['R','H','O','L','P','O','S','T','A','W','R','A','Z','I','L'],
            ['D','F','Z','U','K','D','A','S','A','X','B','F','E','R','T'],
            ['M','E','R','E','T','N','I','W','O','N','S','D','R','Z','J'],
            ['A','W','E','R','T','U','N','M','U','P','N','S','G','P','A'],
            ['N','I','P','A','R','R','M','E','Q','U','B','E','P','L','O'],
            ['A','R','T','N','U','D','S','M','K','L','O','S','T','A','M'],
            ['W','E','I','H','N','A','C','H','T','S','B','A','U','M','N'],
        ];
    }

    const gridElement = document.createElement('div')
    gridElement.classList.add('wordGridElement')
    grid.forEach(row => {
        const rowElement = document.createElement('div')
        rowElement.classList.add('wordRow')
        row.forEach(letter => {
            const letterElement = document.createElement('div')
            letterElement.classList.add('wordLetter')
            letterElement.appendChild(document.createTextNode(letter))
            rowElement.appendChild(letterElement)
        });
        gridElement.appendChild(rowElement)
    });


    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 480;
    canvas.height = 480;

    let isPainting = false;
    let lineWidth = 10;

    const draw = (e) => {
        if (!isPainting) return;

        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'yellow';

        ctx.lineTo(e.clientX - canvas.getBoundingClientRect().left , e.clientY - canvas.getBoundingClientRect().top);
        ctx.stroke();
    };

    canvas.addEventListener('mousedown', (e) => {
        isPainting = true;
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.getBoundingClientRect().left , e.clientY - canvas.getBoundingClientRect().top);      
    });

    canvas.addEventListener('mouseup', () => {
        isPainting = false;
        ctx.closePath();
    });



    canvas.addEventListener('mousemove', draw);

    canvas.style.position = 'absolute';
    canvas.style.height = `${(grid.length + 1) * (30)}px`;
    canvas.style.width  = `${(grid[0].length + 1) * (30)}px`;
    canvas.style.opacity = '0.5';


    const removeBut = document.createElement('div');
    removeBut.classList.add('small-btn')
    removeBut.style.width = 'min-content';
    removeBut.style.height = 'min-content';
    removeBut.style.margin = 'auto';
    removeBut.appendChild(document.createTextNode(lang === 'DE' ? 'Löschen' : 'CLEAR'))

    removeBut.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    myRiddle.appendChild(textElement)
    myRiddle.appendChild(removeBut)
    myRiddle.appendChild(gridElement)
    gridElement.appendChild(canvas)


    return myRiddle
}

const earthRiddle = (lang) => {
    let text;
    if (lang == "EN") {
        text = document.createTextNode(`After Christmas, it's time for a holiday for all the little helpers. Can you help them figure out where to go?`);
    } else {
        text = document.createTextNode(`Nach Weihanchten steht erst mal Urlaub an für die ganzen kleinen Helferlein. Kannst du ihnen helfen herauszufinden, wohin es gehen soll?`);
    } 

    const textElement = document.createElement('p');
    textElement.appendChild(text)
    textElement.classList.add('riddleText', 'hori')

    const image = document.createElement('img');
    image.src = `./images/earthRiddle/image.png`;
    image.classList.add('wreath-image');

    const container = document.createElement('div');
    container.classList.add('wreath-riddle');
    container.appendChild(textElement);
    container.appendChild(image);

    return container;
}

const nikolausRiddle = (lang) => {
    const superWrapper = document.createElement('div')
    const wrapper = document.createElement('div')

    let text
    if (lang == "EN") {
        text = document.createTextNode(`Solve each riddle carefully. Every answer will give you a part of a secret code. When you've solved them all, put the final code into the box below.`);
    } else {
        text = document.createTextNode(`Löse jedes Rätsel sorgfältig. Jede Antwort gibt dir einen Teil eines geheimen Codes. Wenn du alle gelöst hast, gib den endgültigen Code in das Feld unten ein.`);
    }

    const textElement = document.createElement('div')
    textElement.classList.add('riddleText', 'hori')
    textElement.appendChild(text)
    
    wrapper.appendChild(textElement)
    const subWrapper = document.createElement('div')
    const openSubRiddle1 = () => {
        superWrapper.appendChild(subWrapper)
        wrapper.style.display = "none";

        const backButton = document.createElement('div')
        backButton.style.position = 'relative'
        backButton.style.left = '0';
        backButton.style.width = 'max-content'
        backButton.style.marginBottom = '10px'
        backButton.appendChild(document.createTextNode(lang === 'DE' ? '< Zurück' : '< Back'));        
        backButton.classList.add('small-btn')

        backButton.addEventListener('click', (event) => {
            closeSubRiddle()
        });

        subWrapper.appendChild(backButton)

        let subText
        if (lang == "EN") {
            subText = document.createTextNode(`The elf ${playerName} is absolutely fascinated by stars. Sometimes the elf sits outside and forgets to work because of all the sparkle. On this St. Nicholas Day evening, the elf notices that the constellation Cassiopeia has disappeared. ${playerName} has to put the stars back in their right position and you will then see a 5-digitnumber combination. The elf has to find the smallest number needed to put this number combination in the correctorder 1,2,3,4,5.`);
        } else {
            subText = document.createTextNode(`Der Wichtel ${playerName} Ist absolut begeistert von Sternen. Manchmal sitzt dieser draußen und vergisst das Arbeiten vor lauter Glanz. An diesem Nikolaus Abend bemerkt dieser, dass das Sternbild Kassiopeia verschwunden ist. Der Wichtel muss die Sterne in die richtige Position bringen und man sieht dann eine 5 stellige Zahlenkombination. Der Wichtel muss die kleinsteAnzahl finden, die man braucht diese Zahlenkobination in die richtige Reihenfolge zu bringen 1,2,3,4,5.`);
        }

        subWrapper.appendChild(subText)
        const image = document.createElement('img')
        image.src = './images/nikolausRiddle/image.png'
        image.classList.add('wreath-image', 'nikolaus-img');
        image.classList.add

        subWrapper.appendChild(image)
    }

    const openSubRiddle2 = () => {
        superWrapper.appendChild(subWrapper)
        wrapper.style.display = "none";

        const backButton = document.createElement('div')
        backButton.style.position = 'relative'
        backButton.style.left = '0';
        backButton.style.width = 'max-content'
        backButton.style.marginBottom = '10px'        
        backButton.appendChild(document.createTextNode(lang === 'DE' ? '< Zurück' : '< Back'));        
        backButton.classList.add('small-btn')

        backButton.addEventListener('click', (event) => {
            closeSubRiddle()
        });

        subWrapper.appendChild(backButton)

        let subText
        if (lang == "EN") {
            subText = document.createTextNode(`The elf ${playerName} likes to write some uplifting stories. ${playerName} wrote the following story, but for some reason ${playerName} wants to know how many m's can be found in the story. If there are more than 10 m's, it could become a good story, but if there are more than 30 m, it is mmmmm......`);
        } else {
            subText = document.createTextNode(`Der Wichtel ${playerName} schreibt gerne aufmunternde Geschichten. ${playerName} hat die folgende Geschichte geschrieben, aber aus irgendeinem Grund möchte ${playerName} wissen, wie viele m‘s man in der Geschichte finden kann. Bei mehr als 10 m‘s könnte es eine gute Geschichte werden, aber bei mehr als 30 m naja dann ist es eher mmmmm……..`);
        }

        subWrapper.appendChild(subText)

        const subsubText = document.createElement('div')
        subsubText.classList.add('riddleRightWrapper')
        subsubText.style.width = '40%'
        if (lang == "EN") {
            subsubText.appendChild(document.createTextNode('Nikolaus Day is full of joyful and magical moments! Imagine a man in a big red coat trying to sneak around quietly - but he always ends up tripping over shoes or dropping mandarins and M&M everywhere. Kids leave out their shoes and sometimes when the kids were well- behaved the Nikolaus fills them! Sometimes the kids are clever, and they will use the shoes of their parents. So, there is more to fill. The excitement in the morning make this tradition a magical part of the holiday season.'))
        } else {
            subsubText.appendChild(document.createTextNode('Nikolaus hat’s nicht leicht: Mit seinem großen Sack voller Mandarinen, Nüsse und Schokolade muss er durch den kalten Dezember marschieren. Manchmal verirrt er sich sogar und landet im Wohnzimmer statt vor der Tür! Die Kinder lachen, wenn der Nikolaus dann mit roten Backen und einem mürrischen „Hohoho“ versucht, die Geschenke zu verteilen. Aber am Ende freut sich jeder – sogar der Nikolaus, der sich heimlich ein paar Mandarinen mopsen darf.'))
        }

        const imagewrapper = document.createElement('div')
        imagewrapper.style.display = 'flex'
        imagewrapper.style.justifyContent = 'space-around'
        imagewrapper.style.marginTop = '30px'
        imagewrapper.appendChild(subsubText)

        subWrapper.appendChild(imagewrapper)

        const temp = document.createElement('div')
        temp.classList.add('riddleRightWrapper')
        temp.style.display = 'flex'
        temp.style.flexDirection = 'column'
        temp.style.justifyContent = 'center'
        temp.style.width = '30%'

        const image = document.createElement('img')
        image.src = './images/nikolausRiddle/mandarin.png'
        temp.appendChild(image)

        const image2 = document.createElement('img')
        image2.src = './images/nikolausRiddle/nikolaus.png'
        temp.appendChild(image2)

        imagewrapper.appendChild(temp)
    }

    const closeSubRiddle = () => {
        removeAll(subWrapper)
        wrapper.style.display = "block";
    }

    const subRiddle1BUT = document.createElement('div')
    subRiddle1BUT.appendChild(document.createTextNode('Riddle 1'))
    subRiddle1BUT.classList.add('nikolaus-button')

    subRiddle1BUT.addEventListener('click', (event) => {
        openSubRiddle1()
    });
    

    const subRiddle2BUT = document.createElement('div')
    subRiddle2BUT.appendChild(document.createTextNode('Riddle 2'))
    subRiddle2BUT.classList.add('nikolaus-button')

    subRiddle2BUT.addEventListener('click', (event) => {
        openSubRiddle2()
    });

    const buttonWrapper = document.createElement('div')
    buttonWrapper.style.display = 'flex'
    buttonWrapper.style.width = '100%'
    buttonWrapper.style.justifyContent = 'center'
    buttonWrapper.style.gap = '20px'
    buttonWrapper.style.marginBottom = '20px'

    buttonWrapper.appendChild(subRiddle1BUT)
    buttonWrapper.appendChild(subRiddle2BUT)
    wrapper.appendChild(buttonWrapper)


    const codeCont = document.createElement('div')

    const createDigitInput = () => {
        const input = document.createElement('input');
        input.type = 'text';   
        input.inputMode = 'numeric';
        input.maxLength = 1;
        input.style.textAlign = 'center';
        input.style.width = '44.5px'
        return input;
    }

    const inputArr = []

    for (let i = 0; i < 3; i++) {
        const input = createDigitInput();
        inputArr.push(input);
        codeCont.appendChild(input);
    }

    codeCont.style.display = 'flex'
    codeCont.style.justifyContent = 'center'
    codeCont.style.gap = '5px'
    const checkButton = document.createElement('div')
    checkButton.appendChild(document.createTextNode(lang === 'DE' ? 'Prüfen' : 'Check'));    
    checkButton.classList.add('small-btn')
    const checkCode = () => {
        let total = 0;
        if (inputArr[0].value === '1') {total++; inputArr[0].classList.add('nikolaus-green'); inputArr[0].readOnly = true;}
        if (inputArr[1].value === '8') {total++; inputArr[1].classList.add('nikolaus-green'); inputArr[1].readOnly = true;}
        if (inputArr[2].value === '2') {total++; inputArr[2].classList.add('nikolaus-green'); inputArr[2].readOnly = true;}

        if (total === 3) {
            setTimeout(() => {
                console.log('redirect');
                window.location.href = 'st-nikolaus.html';
            }, 400);
        } else {
            checkButton.classList.add('shake');    
            setTimeout(() => {
                checkButton.classList.remove('shake');
            }, 300);
        }
    }
    
    checkButton.addEventListener('click', (event) => {
        checkCode()
    })
    codeCont.appendChild(checkButton)

    inputArr.forEach((input, index) => {
        input.addEventListener('input', () => {
        if (input.value.length === 1 && index < inputArr.length - 1) {
            inputArr[index + 1].focus();
        }
        });

        input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && input.value === '' && index > 0) {
            inputArr[index - 1].focus();
        }
        });
    });

    wrapper.appendChild(codeCont)


    
    superWrapper.appendChild(wrapper)

    return superWrapper
}

const sockRiddle = (lang) => {
    let text;
    if (lang == "EN") {
        text = document.createTextNode(
            "Today is the big laundry day. However, there is a problem. The elves have very similar tastes and wear very similar socks. Can you help them find the two socks that belong together?"
        );
    } else {
        text = document.createTextNode(
            "Heute ist der große Waschtag. Allerdings gibt es ein Problem. Die Wichteln haben sehr ähnlichen Geschmack und tragen sehr sehr ähnliche Socken. Kannst du ihnen helfen, und die zwei Socken finden, die zusammen gehören?"
        );
    }
    const textElement = document.createElement('p');
    textElement.appendChild(text)
    textElement.classList.add('riddleText', 'hori')

    const image = document.createElement('img');
    image.src = `./images/sockRiddle/image.png`;
    image.classList.add('wreath-image');

    const container = document.createElement('div');
    container.classList.add('wreath-riddle');
    container.appendChild(textElement);
    container.appendChild(image);

    return container;
}

const messageRiddle1 = (lang) => {
    let text;
    if (lang == "EN") {
        text = document.createTextNode(
            "The elves send each other secret messages, but they didn't count on you. Can you decipher the secret message?"
        );
    } else {
        text = document.createTextNode(
            "Die Elfen schicken sich gegenseitig geheime Nachrichten, aber sie haben nicht mit dir gerechnet. Kannst du die geheime Nachricht entschlüsseln?"
        );
    }
    const textElement = document.createElement('p');
    textElement.appendChild(text)
    textElement.classList.add('riddleText', 'hori')

    const image = document.createElement('img');
    image.src = `./images/messageRiddle/message1${lang}.png`;
    image.classList.add('wreath-image');

    const container = document.createElement('div');
    container.classList.add('wreath-riddle');
    container.appendChild(textElement);
    container.appendChild(image);

    return container;
}

const messageRiddle2 = (lang) => {
    let text;
    if (lang == "EN") {
        text = document.createTextNode(
            "The elves send each other secret messages, but they didn't count on you. Can you decipher the secret message?"
        );
    } else {
        text = document.createTextNode(
            "Die Elfen schicken sich gegenseitig geheime Nachrichten, aber sie haben nicht mit dir gerechnet. Kannst du die geheime Nachricht entschlüsseln?"
        );
    }
    const textElement = document.createElement('p');
    textElement.appendChild(text)
    textElement.classList.add('riddleText', 'hori')

    const image = document.createElement('img');
    image.src = `./images/messageRiddle/message2${lang}.png`;
    image.classList.add('wreath-image');

    const container = document.createElement('div');
    container.classList.add('wreath-riddle');
    container.appendChild(textElement);
    container.appendChild(image);

    return container;
}

const mazeRiddle = (lang) => {
    let text;
    if (lang == "EN") {
        text = document.createTextNode(
            `${playerName} the elf has lost their way. You want to rescue them, but you want to save energy and take the shortest route. The three paths are split into segments. Work out how long each segment is and add them up for each colour. Which path (red, green, blue) will get you there using the least energy?`
        );
    } else {
        text = document.createTextNode(
            `Der Wichtel ${playerName} hat sich verlaufen. Du möchtest ihn retten, aber Energie sparen und den kürzesten Weg nehmen. Die drei Wege sind in Abschnitte unterteilt. Finde heraus, wie lang jeder Abschnitt ist und addiere die Längen für jede Farbe. Welcher Weg (Rot, Grün, Blau) bringt dich mit dem geringsten Energieaufwand zu ihm?`
        );
    }
    const textElement = document.createElement('p');
    textElement.appendChild(text);
    textElement.classList.add('riddleText', 'hori');

    const image = document.createElement('img');
    image.src = `./images/mazeRiddle/image.png`;
    image.classList.add('wreath-image');

    const container = document.createElement('div');
    container.classList.add('wreath-riddle');
    container.appendChild(textElement);
    container.appendChild(image);

    return container;
}

const shapeRiddle = (lang) => {
    let text;
    if (lang == "EN") {
        text = document.createTextNode(
            `Now it's time to pay attention. The elf ${playerName} has drawn a complex pattern of triangles. However, they aren't sure how many triangles there are in total. Can you help?`
        );
    } else {
        text = document.createTextNode(
            `Jetzt ist es Zeit, aufmerksam zu sein. Die Elfe ${playerName} hat ein komplexes Muster aus Dreiecken gezeichnet. Allerdings ist die Elfenperson nicht sicher, wie viele Dreiecke es insgesamt sind. Kannst du helfen?`
        );
    }
    const textElement = document.createElement('p');
    textElement.appendChild(text);
    textElement.classList.add('riddleText', 'hori');

    const image = document.createElement('img');
    image.src = `./images/shapeRiddle/image.png`;
    image.classList.add('wreath-image', 'shape-riddle');

    const container = document.createElement('div');
    container.classList.add('wreath-riddle');
    container.appendChild(textElement);
    container.appendChild(image);

    return container;
}

const sphinxRiddle = (lang) => {
    let text;
    if (lang == "EN") {
        text = document.createTextNode(
            `Today, ancient Egypt is on the agenda. Even the Sphinx is eagerly awaiting its gift. The elves are now preparing to pass by the Sphinx. Can you help them?`
        );
    } else {
        text = document.createTextNode(
            `Heute steht das alte Ägypten auf dem Programm. Sogar die Sphinx wartet gespannt auf ihr Geschenk. Die Elfen bereiten sich nun darauf vor, an der Sphinx vorbeizukommen. Kannst du ihnen helfen?`
        );
    }
    const textElement = document.createElement('p');
    textElement.appendChild(text);
    textElement.classList.add('riddleText', 'hori');

    const image = document.createElement('img');
    image.src = `./images/egyptRiddle/image${lang}.png`;
    image.classList.add('wreath-image', 'egypt-riddle');

    const container = document.createElement('div');
    container.classList.add('wreath-riddle');
    container.appendChild(textElement);
    container.appendChild(image);

    return container;
}

const foodRiddle = (lang) => {
    let text;
    if (lang == "EN") {
        text = document.createTextNode(
            `Today we're cooking together! But something's strange! All the ingredients have something in common except for one. Can you save Christmas dinner and pick out the one ingredient that doesn't fit the pattern?`
        );
    } else {
        text = document.createTextNode(
            `Heute steht das gemeinsame Kochen an! Aber irgendetwas ist seltsam! Alle Zutaten haben etwas gemeinsam, bis auf eine. Kannst du das Weihnachtsessen retten und die eine Zutat herausfinden, die nicht zum Muster passt?`
        );
    }
    const textElement = document.createElement('p');
    textElement.appendChild(text);
    textElement.classList.add('riddleText', 'hori');

    const image = document.createElement('img');
    image.src = `./images/foodRiddle/image.png`;
    image.classList.add('wreath-image', 'egypt-riddle');

    const container = document.createElement('div');
    container.classList.add('wreath-riddle');
    container.appendChild(textElement);
    container.appendChild(image);

    return container;
}

const diceRiddle = (lang) => {
    let text;
    if (lang == "EN") {
        text = document.createTextNode(
            `The die has been cast - like a sparkling Christmas star in the sky! Follow the glittering line through the enchanted forest and discover the number that lights up at the top of the die at the end.`
        );
    } else {
        text = document.createTextNode(
            `Der Würfel ist gefallen – wie ein funkelnder Weihnachtsstern am Himmel! Folge der glitzernden Linie durch den Zauberwald und entdecke die Zahl, die am Ende oben auf dem Würfel leuchtet.`
        );
    }
    const textElement = document.createElement('p');
    textElement.appendChild(text);
    textElement.classList.add('riddleText', 'hori');

    const image = document.createElement('img');
    image.src = `./images/diceRiddle/image.png`;
    image.classList.add('wreath-image', 'egypt-riddle');

    const container = document.createElement('div');
    container.classList.add('wreath-riddle');
    container.appendChild(textElement);
    container.appendChild(image);

    return container;
}

const scrambleRiddle = (lang) => {
    let text;
    if (lang == "EN") {
        text = document.createTextNode(
            `Follow the red lines that lead like glowing strings of lights through the snow-covered winter forest. They will bring you to a secret, magical meeting place where Christmas joy awaits you. Name the secret meeting place and become part of the Christmas miracle!`
        );
    } else {
        text = document.createTextNode(
            `Folge den roten Linien, die wie leuchtende Lichterketten durch den verschneiten Winterwald führen. Sie bringen dich zu einem geheimen, magischen Treffpunkt, wo die Weihnachtsfreude auf dich wartet. Nenne den geheimen Treffpunkt und werde Teil des Weihnachtswunders!`
        );
    }
    const textElement = document.createElement('p');
    textElement.appendChild(text);
    textElement.classList.add('riddleText', 'hori');

    const image = document.createElement('img');
    image.src = `./images/scrambleRiddle/image${lang}.png`;
    image.classList.add('wreath-image', 'egypt-riddle');

    const container = document.createElement('div');
    container.classList.add('wreath-riddle');
    container.appendChild(textElement);
    container.appendChild(image);

    return container;
}

const picturesRiddle = (lang) => {
    const words = {
        EN:[{first: "C", length: 8,},{first: "S", length: 8,},{first: "B", length: 5,},
            {type: "pair", pair:[
                {first: "B", length: 9},
                {first: "P", length: 3},
        ],},{first: "O", length: 5 },
            {type: "pair", pair:[
                {first: "T", length: 6},
                {first: "P", length: 5 },
        ],},],
        DE:[{first: "K", length: 10,},{first: "S", length: 6,},{first: "B", length: 4,},{first: "K", length: 14,},{first: "Z", length: 7,},{first: "T", length: 15,}, ]
    }

    let text;
    if (lang == "EN") {
        text = document.createTextNode(
            `In the mysterious elf workshop, all the sparkling gifts and magical items were carefully documented. Can you help the diligent elves identify each item?`
        );
    } else {
        text = document.createTextNode(
            `In der geheimnisvollen Wichtelstube wurden alle funkelnden Geschenke und magischen Gegenstände sorgfältig dokumentiert. Kannst du den fleißigen Wichteln helfen, jeden Gegenstand zu identifizieren?`
        );
    }
    const textElement = document.createElement('p');
    textElement.appendChild(text);
    textElement.classList.add('riddleText', 'hori');

    const imageContainer = document.createElement('div')
    imageContainer.classList.add('picturesRiddle_imagesCont')

    for(i = 0; i < 6; i++){
        const image = document.createElement('img');
        image.src = `./images/picturesRiddle/${i}.png`;
        image.classList.add('picturesRiddle_images');
        imageContainer.appendChild(image)
    }

    const textContainer = document.createElement('div')

    words[lang].forEach(e => {
        const textLines = document.createElement('div')
        textLines.style.display = 'flex'
        textLines.style.gap = '5px'
        textLines.style.justifyContent = 'center'

        if (e.type === 'pair') {
            let obj = e.pair[0]
            for (i = 0; i < obj.length; i++){
                const cell = document.createElement('div')
                cell.classList.add('picturesCell')
                if (i == 0){cell.appendChild(document.createTextNode(obj.first))}
                textLines.appendChild(cell)
            }
            textLines.appendChild(document.createTextNode('-'))
            obj = e.pair[1]
            for (i = 0; i < obj.length; i++){
                const cell = document.createElement('div')
                cell.classList.add('picturesCell')
                if (i == 0){cell.appendChild(document.createTextNode(obj.first))}
                textLines.appendChild(cell)
            }
        }
        
        for (i = 0; i < e.length; i++){
            const cell = document.createElement('div')
            cell.classList.add('picturesCell')
            if (i == 0){cell.appendChild(document.createTextNode(e.first))}
            textLines.appendChild(cell)
        }
        textContainer.appendChild(textLines)
    });

    const riddleBody = document.createElement('div')
    riddleBody.appendChild(imageContainer)
    riddleBody.appendChild(textContainer)

    const container = document.createElement('div');
    container.classList.add('wreath-riddle');
    container.appendChild(textElement);
    container.appendChild(riddleBody);

    return container;
}

const detectiveRiddle = (lang) => {
    const riddleBody = document.createElement('div')

    let text;
    if (lang == "EN") {
        text = document.createTextNode(
            `Oh no! Someone has eaten the Christmas biscuits. Can you help the Christmas police find the cookie monster?`
        );
    } else {
        text = document.createTextNode(
            `Oh nein! Jemand hat die Weihnachtsplätzchen gegessen. Kannst du der Weihnachtspolizei helfen, das Krümelmonster zu finden?`
        );
    }
    const textElement = document.createElement('p');
    textElement.appendChild(text);
    textElement.classList.add('riddleText', 'hori');
    textElement.style.margin = '0 auto'

    let detectiveText;
    if (lang == "EN") {
        detectiveText = `<ul><li>The tallest person cannot eat nuts. </li>
<li>The person who ate them has two neighbours, one of whom witnessed the act. </li>
<li>There are two people who claim to have seen the perpetrator, one is telling the truth, the other is lying.</li>
<ul><li>One person has two people between themselves and the tallest person. </li>
<li>The other has four people between themselves.</li>
<li>The one who is telling the truth is not at either end. </li>
<li>The one who is not telling the truth claims that their neighbour on the right ate the biscuits.</li>
<li>The person who has been wrongly accused has more than three people between them and the tall person.  </li>
</ul><li>The tall person has two friends by their side who did not eat the biscuits and also observed their neighbours, but did not see anything. </li>
<li>The liar is far away from the scene of the crime.</li></ul>`
    } else {
        detectiveText = 
            `<ul><li>Die größte Person kann keine Nüsse essen. </li>
<li>Die Person, die sie gegessen hat, hat zwei Nachbarn, von denen einer die Tat beobachtet hat. </li>
<li>Es gibt zwei Personen, die behaupten, den Täter gesehen zu haben, eine sagt die Wahrheit, die andere lügt.</li>
<ul><li>Eine Person hat zwei Personen zwischen sich und der größten Person. </li>
<li>Die andere  hat vier Personen zwischen sich.</li>
<li>Derjenige, der die Wahrheit sagt, befindet sich nicht an einem der Enden. </li>
<li>Derjenige, der nicht die Wahrheit sagt, behauptet, dass sein rechter Nachbar die Kekse gegessen hat.</li>
<li>Der zu Unrecht Beschuldigte hat mehr als drei Personen zwischen sich und der großen Person.  </li>
</ul><li>Die große Person hat zwei Freunde an seiner Seite, die die Kekse nicht gegessen haben und auch ihre Nachbarn beobachtet haben, aber nichts gesehen haben. </li>
<li>Der Lügner ist weit entfernt vom Ort des Geschehens.</li>`
    }
    const detectiveTextElement = document.createElement('div');
    detectiveTextElement.innerHTML = detectiveText;
    detectiveTextElement.classList.add('riddleText', 'hori');
    detectiveTextElement.style.padding = '0 1rem'

    const image = document.createElement('img');
    image.src = `./images/detectiveRiddle/image.png`;
    image.classList.add('wreath-image', 'egypt-riddle');
    

    riddleBody.appendChild(textElement)
    riddleBody.appendChild(detectiveTextElement)
    riddleBody.appendChild(image)

    return riddleBody
}

const musicRiddle = (lang) => {
    const riddleBody = document.createElement('div')

    let text;
    if (lang == "EN") {
        text = document.createTextNode(
            `Ouch! What kind of music are the elves listening to here? The elves really enjoy listening to two songs at the same time. That way, both sides are happy. Can you figure out which two songs are being played?`
        );
    } else {
        text = document.createTextNode(
            `Autsch! Was für Musik hören die Elfen denn hier? Die Elfen hören sehr gerne zwei Lieder gleichzeitig. Dann sind zwei Partien glücklich. Kannst du auch heraus finden, welche zwei Lieder gespielt werden?`
        );
    }
    const textElement = document.createElement('p');
    textElement.appendChild(text);
    textElement.classList.add('riddleText', 'hori');

    let audioPath = lang === "EN" ? "./audio/AUD-20251215-WA0001.mp3" : "./audio/Media1.mp3";

    const audioElement = document.createElement("audio");
    audioElement.controls = true;

    const sourceMp3 = document.createElement("source");
    sourceMp3.src = audioPath;
    sourceMp3.type = "audio/mpeg";

    audioElement.append(sourceMp3);

    audioElement.appendChild(document.createTextNode("Your browser does not support the audio tag."));

    audioElement.classList.add("riddleAudio", "hori");

    riddleBody.appendChild(textElement)
    riddleBody.appendChild(audioElement);

    return riddleBody
}

const CBNRiddle = (lang) => {
    const riddleBody = document.createElement('div')
    riddleBody.classList.add("sudoku-riddle")

    let text;
    if (lang == "EN") {
        text = document.createTextNode(
            `Today, the elves have the day off and can pursue their hobbies. Hubertus loves painting. Can you see what masterpiece he has created today?`
        );
    } else {
        text = document.createTextNode(
            `Heute haben die Elfen frei und können ihren Hobbys nachgehen. Hubertus liebt es zu malen. Kannst du sehen, welches Meisterwerk er heute geschaffen hat?`
        );
    }
    const textElement = document.createElement('p');
    textElement.appendChild(text);
    textElement.classList.add('riddleText', 'hori');

    riddleBody.appendChild(textElement)

    const artContatiner = document.createElement('div');

    let currentColor = null;

    const colorContainer = document.createElement('div')
    colorContainer.style.display = "flex";
    colorContainer.style.justifyContent = "center";
    colorContainer.style.gap = "5px";

    const colorLib = [
        {class: "Orange", color: "ff8511"},
        {class: "DarkBrown", color: "803300"},
        {class: "Red", color: "ff0000"},
        {class: "LightBrown", color: "c87137"},
        {class: "LightGreen", color: "55d400"},
        {class: "DarkGreen", color: "338000"},
        {class: "Yellow", color: "ffff00"},
        {class: "LightBlue", color: "aaeeff"},
        {class: "DarkBlue", color: "0066ff"},
    ]
    
    colorLib.forEach((colorObj, i) => {
        const colorButton = document.createElement('div')
        colorButton.classList.add('small-btn')
        const square = document.createElement('div')
        square.style.width = "30px"
        square.style.height = "30px"
        square.style.backgroundColor = `#${colorObj.color}`;
        colorButton.appendChild(square)
        square.appendChild(document.createTextNode(i+1))

        colorButton.addEventListener("click", (e) => {
            currentColor = colorObj.class;
        });

        colorContainer.appendChild(colorButton)
    });

    artContatiner.appendChild(colorContainer)
    const svgCont = document.createElement('div')
    svgCont.innerHTML = `
<svg id="mySvg"  viewBox="0 0 203.30925 264.97751" version="1.1" id="svg1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">
  <style id="style98">
    .LightGreen {fill: #55d400;}
    .DarkGreen {fill: #338000;}
    .LightBlue {fill: #aaeeff;}
    .Yellow {fill: #ffff00;}
    .Orange {fill: #ff8511;}
    .DarkBlue {fill: #0066ff;}
    .DarkBrown {fill: #803300;}
    .Red {fill: #ff0000;}
    .LightBrown {fill: #c87137;}
    path {fill: #fff; stroke: #000; stroke-width: 0.5;}
  </style>
  <defs id="defs1" />
  <g id="layer3" style="display:inline" transform="translate(-3.0291841,-17.141564)">
    <path d="m 67.131255,147.31393 c -0.02856,-1.01258 0.07103,-2.05891 -0.228085,-3.03087 -0.109023,-0.90223 -0.229813,-1.83816 -0.46162,-2.70696 -0.191289,-0.70814 -0.189593,-1.44779 -0.451447,-2.13629 -0.372975,-0.67697 -0.877792,-1.38247 -1.411069,-1.99177 -0.592262,-0.52614 -1.21029,-1.08483 -2.086234,-1.00688 -0.813275,-0.22388 -1.690893,-0.28151 -2.416621,-0.75239 0.216604,-0.78281 0.986282,-1.58711 1.237552,-2.45777 0.536315,-0.52411 1.027313,-1.23398 1.512819,-1.85978 0.491266,-0.6562 0.573551,-1.3916 0.852312,-2.10419 -0.124659,-0.4689 0.640032,-1.82419 0.929485,-0.89539 0.559259,0.74222 0.870649,1.48411 1.495094,2.15689 0.565861,0.52636 1.354514,1.00374 2.214299,0.93102 0.896206,0.2664 1.944891,0.34609 2.731438,0.97636 0.793811,0.43602 1.189128,1.31758 1.784976,1.96463 0.367843,0.7689 1.094531,1.29037 1.747095,1.80511 0.622378,0.41881 1.326612,1.09696 1.377211,1.95514 0.199239,0.97167 -0.1035,2.02665 0.255255,2.95547 0.403809,0.67239 0.412626,1.34052 0,1.97591 -0.398112,0.33877 -1.053971,0.14939 -1.313032,0.69686 -0.541337,-0.009 -0.384691,0.68896 -0.872249,0.79277 -0.05873,0.89801 -1.56866,0.77003 -1.944293,1.66975 -0.404072,0.64526 -0.674928,1.21367 -1.124007,1.87451 -0.187785,0.97875 -1.536422,0.27969 -1.542729,1.21385 -0.80828,-0.0777 -1.454822,0.37368 -2.154068,0.51959 -0.292917,-0.0439 -0.05532,-0.61842 -0.13209,-0.87854 0,-0.55569 0,-1.11135 0,-1.66703 z"/>
    <path d="m 63.688227,149.14715 c -0.177825,-0.33484 -0.400791,-0.76164 -0.821035,-0.9037 -0.356744,-0.22618 -0.830316,-0.52858 -1.240215,-0.76782 -0.275075,-0.31304 -0.694794,-0.39762 -1.090894,-0.57174 -0.811526,-0.41113 -1.75561,-0.3686 -2.623486,-0.57009 -0.551993,-0.22565 -1.178956,-0.11542 -1.677511,-0.39958 -0.393958,-0.34934 -0.937624,-0.60694 -1.295962,-1.03459 -0.288049,-0.4624 -0.419894,-0.91188 -0.620799,-1.42674 -0.07147,-0.60661 -0.506049,-1.09301 -0.400419,-1.75403 -0.367609,-0.51634 -0.177387,-1.1811 0.04893,-1.67848 0.332151,-0.46975 0.414264,-1.01729 0.698298,-1.45975 0.229808,-0.36473 0.593177,-0.86086 1.13576,-0.83349 0.452667,-0.24607 1.003338,-0.24667 1.535549,-0.24394 0.49975,-0.0355 0.924766,-0.3128 1.454082,-0.23097 0.652009,-0.0287 1.257627,-0.39138 1.93051,-0.18711 0.419788,0.24215 0.963852,0.24347 1.434665,0.41761 0.601689,-0.0541 1.073697,0.2255 1.519663,0.59453 0.324488,0.3237 0.504209,0.677 0.753419,0.99106 0.270849,0.49574 0.550352,0.92316 0.743511,1.43432 0.363694,0.60277 3.94e-4,1.38757 0.342913,2.00014 0.0936,0.62605 0.06641,1.26388 0.289724,1.85855 0.0082,0.51313 0.03304,1.02492 0.20925,1.49207 0.08079,1.16845 0.03745,2.34085 0.04855,3.5112 -0.731987,-0.0109 -1.466999,0.0298 -2.196413,-0.0357 -0.106757,-0.005 -0.197284,-0.0918 -0.178089,-0.20183 z"/>
    <path d="m 65.991928,121.41495 c -0.310397,-0.0162 -0.718442,0.10226 -1.111067,0.35192 h -8e-4 l -1.710692,-0.25171 c -0.05259,-0.0571 -0.14697,-0.0608 -0.256524,-0.0377 l -0.0497,-0.007 0.0016,0.0184 c -0.222014,0.0593 -0.489196,0.20691 -0.610846,0.2429 -0.07718,0.48229 -0.258867,0.9974 -0.890617,0.82248 -0.669666,0.20974 -1.402318,0.54221 -1.934348,0.97559 -0.576164,0.16063 -0.847492,0.65621 -1.232117,0.982 -0.429856,0.40341 -0.902212,0.86153 -1.409275,1.2722 -0.539278,0.26536 -0.848174,0.74481 -1.272197,1.1263 -0.370838,0.26654 -0.75972,0.50911 -1.055756,0.86657 -0.828949,-3.6e-4 -1.65853,0.001 -2.487474,-0.002 -0.588342,0.0319 -1.213332,-0.14624 -1.620909,-0.48178 -0.642052,-0.15479 0.14802,0.46642 -0.0489,0.77839 0.01319,0.63612 0.292433,1.17345 0.655736,1.64095 0.43545,0.50517 0.966868,0.98758 1.214481,1.52311 0.458759,0.34498 0.429967,0.91971 0.767166,1.36278 0.07241,0.5621 0.439476,0.91211 0.561946,1.4694 0.283473,0.46564 0.310234,1.08789 0.675778,1.38763 0.02381,0.49613 0.456357,0.61222 0.60684,1.04934 v 8e-4 c -0.0199,0.27842 0.227953,0.24323 0.419254,0.22927 0.373539,-0.46484 1.154812,-0.0696 1.560788,-0.47537 0.63115,-0.10409 1.279987,-0.034 1.919116,-0.0537 0.0067,-0.32138 0.323712,-0.5397 0.352722,-0.87138 0.337794,-0.55817 0.530951,-1.36637 0.973185,-1.77242 0.201352,-0.54998 0.364612,-1.01023 0.820075,-1.45496 0.371885,-0.48902 0.895111,-0.90006 1.062167,-1.42692 0.294912,-0.18998 0.187041,-0.58717 0.459338,-0.77518 -0.02725,-0.47425 0.373166,-0.73085 0.357528,-1.17359 0.0073,-0.60725 0.377217,-1.02344 0.562751,-1.60648 0.154641,-0.0866 0.258145,-0.19869 0.327065,-0.32787 l 2.485874,1.7636 c 0.491006,0.7186 1.030006,1.33774 1.4213,1.54715 0.332636,0.17803 1.265761,0.42339 2.073835,0.54512 1.302795,0.19625 1.801145,0.56786 4.40018,3.2843 1.612084,1.68491 3.020021,3.32824 3.128787,3.65145 0.108766,0.32322 0.34707,0.5876 0.529879,0.5876 0.733193,0 3.316369,-0.76606 3.316369,-0.98361 0,-0.12794 0.289199,-0.54308 0.642109,-0.92188 0.566823,-0.60841 0.588039,-0.78199 0.181172,-1.49024 -0.253322,-0.44096 -0.552445,-1.02883 -0.664556,-1.30586 -0.112107,-0.27705 -0.49608,-1.14927 -0.852943,-1.93916 -0.356868,-0.78989 -0.64852,-1.70792 -0.64852,-2.04016 0,-0.7915 -1.093751,-1.74089 -3.301138,-2.86585 -0.984205,-0.50159 -2.404135,-1.35761 -3.156045,-1.90229 -0.751913,-0.54468 -1.566382,-0.99082 -1.810091,-0.99082 -0.24371,0 -1.014882,-0.32222 -1.713098,-0.71666 -0.698216,-0.39445 -1.684571,-0.70694 -2.192476,-0.69422 -0.588576,0.0147 -0.923484,-0.15181 -0.923484,-0.45853 0,-0.28574 -0.212907,-0.4359 -0.523469,-0.45213 z" />
    <path d="m 53.923172,145.61513 c 0.354454,0.58244 1.108596,0.7451 1.516654,1.3119 0.93107,0.42664 2.064686,0.54637 3.107851,0.68442 0.801667,0.23858 1.803052,0.25741 2.359593,0.86721 0.611183,0.50973 1.466027,0.58216 1.812571,1.36313 0.466417,0.97974 1.944002,0.33826 2.838436,0.60431 0.516334,0.37853 1.292468,0.99719 1.880152,0.58585 0.736354,0.14892 1.407971,0.0939 2.202109,0.0327 0.0135,-1.35903 1.559976,-1.03333 2.410441,-0.63811 0.254457,0.76422 0.984689,0.96921 1.711257,0.51684 0.590916,-0.15279 0.912289,0.0155 0.759654,0.63013 2.506693,2.26625 3.561536,0.84939 3.657136,3.1959 0.0956,2.34652 -0.27861,1.64159 -1.217256,2.03808 -0.616058,0.46119 -1.476586,0.30417 -2.125878,0.29428 -0.166088,0.22719 -0.760525,0.12937 -0.981837,-0.005 v -3.6e-4 c -0.863749,-0.087 -1.478446,-0.37131 -2.300294,-0.49564 -0.142918,-0.63138 -0.625667,-0.90144 -1.287063,-0.57058 -0.901321,0.53343 -1.531289,-0.55723 -2.389478,-0.64679 -1.001197,-0.043 -1.824727,-0.31914 -2.891718,-0.29964 -0.68816,-0.42593 -1.568049,-0.23584 -2.235058,-0.68106 -0.954728,-0.13589 -1.831693,-0.20354 -2.700418,-0.53474 -0.92057,0.0251 -1.768547,-0.32829 -2.555484,-0.56582 -0.688546,-0.15702 -1.266397,-0.73157 -1.929553,-1.1034 -0.610342,-0.44529 -1.12277,-0.86437 -1.46851,-1.50855 -0.391454,-0.58881 -0.850483,-1.13 -1.215523,-1.81327 -0.520497,-0.36119 -0.82713,-1.00255 -1.474977,-1.24389 -0.482717,-0.41186 -0.994713,-0.82938 -1.385026,-1.32914 -0.570456,-0.50676 -0.847489,-1.14996 -1.544357,-2.52682 -0.503887,-1.22189 -0.760481,-1.64666 -1.06368,-2.09511 -0.292904,-0.33408 -0.443696,-0.6013 -0.642996,-0.97545 -0.384289,-0.37204 -0.449417,-0.87259 -0.832868,-1.25796 -0.334322,-0.39894 -0.193998,-1.08161 -0.599128,-1.38724 -0.09053,-0.38382 0.460405,-0.476 0.281059,-0.95082 0.357882,-0.4235 0.06255,-1.08766 0.501802,-1.39377 -0.01799,-0.53312 0.354306,-0.81016 0.318852,-1.3613 0.248938,-0.40025 0.314518,-0.92395 0.475365,-1.38084 -0.02288,-0.46186 0.378621,-0.6995 0.259861,-1.21357 0.439722,-0.15451 0.128243,-0.80183 0.510847,-0.96789 -0.06154,-0.43212 0.364205,-0.52684 0.419864,-0.93915 0.131966,-0.36202 0.342359,-0.61882 0.421684,-1.0015 0.344957,-0.12348 0.389519,-0.5125 0.738247,-0.6199 -0.0054,0.55506 0.395461,0.85867 0.308884,1.459 0.305196,0.33035 0.419876,0.84823 0.821851,1.16518 0.396552,0.35065 0.732886,0.64129 0.973247,1.12071 0.08669,0.30429 0.435914,0.31821 0.319295,0.73705 0.366057,0.13915 0.183371,0.73067 0.504856,1.00256 -0.01578,0.38639 0.352274,0.44284 0.305386,0.88102 0.275809,0.25553 0.155399,0.73336 0.469918,0.90738 -0.09877,0.42328 0.360606,0.4165 0.286059,0.85115 0.405389,0.20041 0.475191,0.78241 0.780923,1.076 -0.483193,0.27719 -0.583319,0.91365 -0.821048,1.3802 -0.02342,0.33442 -0.324508,0.47956 -0.311173,0.8559 -0.380419,0.44916 -0.154739,1.15255 -0.225146,1.7126 -0.105935,0.65282 0.460515,1.02681 0.295376,1.68466 -0.17071,0.3515 0.90593,1.44968 0.219942,1.40995"/>
    <path d="m 83.057919,185.52938 c -0.187151,-0.18715 -0.340273,-0.40158 -0.340273,-0.47651 0,-0.0749 -0.164179,-0.31247 -0.364838,-0.52786 -0.355583,-0.38167 -0.365171,-0.50945 -0.377783,-5.03546 l -0.01293,-4.64385 -0.629353,-0.66291 c -0.346143,-0.3646 -0.67235,-0.79513 -0.724899,-0.95673 -0.05255,-0.16161 -0.158621,-0.29383 -0.23571,-0.29383 -0.07709,0 -0.225453,-0.20778 -0.329696,-0.46173 -0.51134,-1.2457 -1.267584,-2.19225 -3.085872,-3.86244 -0.075,-0.0689 -0.545414,-0.5785 -1.045368,-1.13248 -0.734314,-0.81367 -0.927573,-1.15249 -1.005589,-1.76298 -0.05312,-0.41566 -0.171592,-0.89227 -0.263275,-1.05915 -0.110864,-0.20177 -0.109238,-0.48299 0.0048,-0.83951 0.09435,-0.29486 0.217466,-1.12166 0.273585,-1.83735 0.100246,-1.27844 0.110022,-1.30124 0.557834,-1.30124 0.526797,0 0.858767,-0.2726 0.858767,-0.70519 0,-0.22387 -0.130589,-0.30222 -0.503705,-0.30222 -0.42081,0 -0.50371,-0.0668 -0.50371,-0.40603 0,-0.72563 0.172384,-0.9372 0.763619,-0.9372 0.307882,0 0.60648,-0.0756 0.663555,-0.1679 0.05707,-0.0923 0.255493,-0.1679 0.440937,-0.1679 0.414087,0 1.450832,-1.06677 1.521928,-1.566 0.03657,-0.25688 0.188633,-0.38061 0.513696,-0.41801 0.362662,-0.0417 0.46173,-0.14079 0.46173,-0.46173 0,-0.22473 0.07047,-0.40861 0.15659,-0.40861 0.08612,0 0.210296,-0.16999 0.275941,-0.37777 0.06564,-0.20778 0.250991,-0.47047 0.411883,-0.58375 0.160895,-0.11328 0.344936,-0.41474 0.408984,-0.66992 0.06405,-0.25519 0.185637,-0.50673 0.270208,-0.559 0.08457,-0.0523 0.203442,-0.58191 0.264166,-1.177 0.06072,-0.59508 0.155543,-1.11975 0.21071,-1.16592 0.05516,-0.0462 0.175856,-0.20558 0.268201,-0.35423 0.09235,-0.14865 0.308456,-0.46922 0.480241,-0.71236 0.352668,-0.49917 0.262425,-1.28405 -0.147635,-1.28405 -0.273762,0 -0.332602,-0.34556 -0.101489,-0.59605 0.25441,-0.27574 1.028106,-1.75701 1.029189,-1.97042 4.11e-4,-0.11215 0.101941,-0.39728 0.225269,-0.6336 0.123328,-0.23632 0.275326,-0.74919 0.33777,-1.13969 0.08689,-0.54337 0.319722,-0.9279 0.992023,-1.63838 0.483168,-0.5106 1.142934,-1.09185 1.466145,-1.29166 1.047556,-0.6476 1.984422,-1.519 2.473495,-2.30063 0.202235,-0.32322 0.55955,-0.8072 0.794029,-1.07551 0.234483,-0.26832 0.426334,-0.58943 0.426334,-0.71359 0,-0.12416 0.06342,-0.22573 0.140948,-0.22573 0.07752,0 0.220446,-0.17001 0.317609,-0.37779 0.183178,-0.39173 2.205081,-3.16639 2.418077,-3.31833 0.06647,-0.0474 0.499088,-0.61409 0.961377,-1.25927 0.462288,-0.64518 1.034528,-1.41009 1.271646,-1.69981 0.237118,-0.28971 0.431124,-0.57624 0.431124,-0.63672 0,-0.11393 0.208749,-0.39106 0.713583,-0.94734 0.161606,-0.17807 0.293832,-0.36833 0.293832,-0.42279 0,-0.16492 0.740927,-0.72893 0.965436,-0.73491 0.115436,-0.003 0.209881,-0.0777 0.209881,-0.16588 0,-0.0882 0.264445,-0.2099 0.587657,-0.27054 0.323211,-0.0606 0.58766,-0.17739 0.58766,-0.25946 0,-0.20191 3.416817,-0.19119 3.619347,0.0113 0.0883,0.0883 0.78581,0.2127 1.54999,0.27643 0.76419,0.0637 1.42929,0.18037 1.478,0.2592 0.0487,0.0788 0.22362,0.14332 0.38868,0.14332 0.55895,0 2.03072,0.91371 2.03072,1.26072 0,0.047 0.22667,0.39831 0.5037,0.78075 0.27704,0.38245 0.50371,0.79735 0.50371,0.92202 0,0.12466 0.0667,0.22666 0.14832,0.22666 0.0816,0 0.19419,0.13222 0.25025,0.29382 0.056,0.16161 0.29948,0.63384 0.54094,1.04939 0.87877,1.51241 1.41113,2.59959 1.41113,2.88179 0,0.1587 0.0667,0.32978 0.14828,0.38018 0.0816,0.0504 0.20217,0.52709 0.26803,1.05931 0.0659,0.53221 0.20557,1.07209 0.31046,1.19973 0.12736,0.155 0.20697,1.57091 0.23965,4.26294 0.0441,3.63227 0.0195,4.07421 -0.24886,4.46919 -0.5465,0.80437 -0.87401,1.60824 -0.87977,2.15933 -0.005,0.48605 0.0453,0.54569 0.4607,0.54569 0.27361,0 0.60326,-0.15615 0.79754,-0.37779 l 0.33114,-0.37778 0.0517,1.17532 c 0.0826,1.87799 -0.0217,2.1523 -1.29526,3.40798 -0.62778,0.61896 -1.39293,1.31428 -1.70032,1.54515 -0.85728,0.64384 -2.34503,2.11015 -2.34503,2.31122 0,0.0986 -0.0572,0.20451 -0.12718,0.2353 -0.1706,0.0751 -1.21604,1.41731 -1.21604,1.56126 0,0.0626 -0.0944,0.21908 -0.20988,0.3478 -0.49483,0.55178 -0.62964,0.74487 -0.62964,0.90186 0,0.0917 -0.0985,0.22707 -0.21888,0.30092 -0.12038,0.0739 -0.47927,0.50868 -0.79753,0.9663 -0.91659,1.31795 -1.01281,1.41676 -2.34163,2.40509 -1.43611,1.06813 -4.452458,4.0509 -4.615282,4.56392 -0.05974,0.18823 -0.179083,0.34223 -0.265209,0.34223 -0.08612,0 -0.156586,0.10408 -0.156586,0.2313 0,0.12721 -0.106377,0.31957 -0.236387,0.42747 -0.130015,0.10791 -0.360225,0.45716 -0.511586,0.77612 -0.151357,0.31897 -0.339018,0.57994 -0.417021,0.57994 -0.078,0 -0.189229,0.18889 -0.247174,0.41975 -0.05795,0.23087 -0.179468,0.41976 -0.270056,0.41976 -0.09059,0 -0.164705,0.118 -0.164705,0.26223 0,0.26856 -2.74916,3.09582 -3.010297,3.09582 -0.223024,0 -1.690971,1.43568 -1.690971,1.6538 0,0.10622 -0.05667,0.19361 -0.125926,0.19419 -0.189778,0.002 -1.364295,2.04377 -1.379498,2.39857 -0.0033,0.0731 -0.150495,0.28836 -0.327467,0.47832 -0.176969,0.18996 -0.371853,0.54494 -0.433065,0.78884 -0.06122,0.2439 -0.16198,0.48199 -0.223919,0.52909 -0.06194,0.0471 -0.301503,0.46341 -0.53237,0.92514 -0.230867,0.46173 -0.57087,0.9917 -0.755559,1.17769 -0.184693,0.186 -0.561171,0.63934 -0.836611,1.00742 -0.275445,0.36808 -0.709893,0.87447 -0.96544,1.12531 -0.255551,0.25084 -0.467008,0.51529 -0.46991,0.58766 -0.0029,0.0724 -0.189782,0.26582 -0.415289,0.42988 -0.395818,0.28797 -0.421791,0.28652 -0.750284,-0.042 z"/>
    <path d="m 108.34347,125.61721 c -0.0512,-0.0829 -0.71877,-0.19897 -1.48341,-0.25793 -0.76463,-0.059 -1.41574,-0.1837 -1.4469,-0.27718 -0.0702,-0.21071 -2.21141,-0.22797 -2.21141,-0.0178 0,0.0837 -0.37879,0.20425 -0.84176,0.26792 -0.76576,0.10532 -0.92112,0.0654 -1.721,-0.44246 -0.48358,-0.30702 -0.962449,-0.63536 -1.064143,-0.72964 -0.101698,-0.0943 -0.641136,-0.43339 -1.198753,-0.75358 -1.477608,-0.84844 -1.593069,-1.14275 -1.48853,-3.79431 0.04709,-1.19445 0.156615,-3.22952 0.243385,-4.52237 0.08677,-1.29285 0.165965,-4.62109 0.175988,-7.3961 0.01371,-3.79217 0.07036,-5.09762 0.228101,-5.25538 0.291562,-0.2916 0.281683,-8.063742 -0.01096,-8.622282 -0.130454,-0.248996 -0.261732,-2.081363 -0.370461,-5.170879 -0.203963,-5.795684 -0.317613,-7.585992 -0.495612,-7.807243 -0.07439,-0.09247 -0.189729,-1.03702 -0.25631,-2.099003 -0.06658,-1.061983 -0.20501,-2.034359 -0.307627,-2.160835 -0.121908,-0.150253 -0.209504,-1.725193 -0.252731,-4.54403 l -0.06616,-4.314074 1.572527,0.07313 c 0.86489,0.04022 1.597715,0.139463 1.628497,0.220541 0.03078,0.08108 0.465227,0.147412 0.96544,0.147412 0.500209,0 0.909469,0.07555 0.909469,0.167902 0,0.09235 0.14572,0.167902 0.32381,0.167902 0.35893,0 0.56789,0.192746 1.18731,1.095204 0.23087,0.336354 0.62004,0.826917 0.86483,1.090139 0.25358,0.272674 0.49611,0.780661 0.56369,1.180657 0.1196,0.707919 0.82063,2.237928 1.21352,2.648509 0.11677,0.122027 0.2123,0.302254 0.2123,0.400501 0,0.09825 0.17001,0.343598 0.37779,0.545229 0.43768,0.424721 0.96544,1.354219 0.96544,1.700345 0,0.131037 0.0756,0.238247 0.1679,0.238247 0.24467,0 0.20471,2.986037 -0.0497,3.716325 -0.11692,0.335573 -0.31569,0.734371 -0.44172,0.886221 -0.28315,0.34118 -0.15568,4.332428 0.14154,4.4315 0.12141,0.04047 0.18201,1.029619 0.18201,2.970982 0,1.747192 0.0657,2.932675 0.16427,2.966278 0.0915,0.03119 0.21315,1.245584 0.27466,2.742405 0.0607,1.477543 0.16604,2.761995 0.23404,2.854344 0.068,0.09234 0.17737,0.998878 0.24306,2.014518 0.0657,1.015645 0.20048,1.944275 0.29954,2.063645 0.10697,0.12889 0.208,1.42446 0.24879,3.19045 0.0378,1.63539 0.13621,3.12455 0.21875,3.30925 0.0825,0.18469 0.22789,1.92248 0.32299,3.86175 0.18927,3.85982 0.30988,5.11697 0.51543,5.37288 0.0742,0.0923 0.18796,0.45208 0.25287,0.79939 0.0649,0.34732 0.185,0.67289 0.26687,0.7235 0.19281,0.11916 0.19538,3.59814 0.002,3.59814 -0.0804,0 -0.19751,0.45333 -0.26019,1.00741 -0.0627,0.55408 -0.18578,1.00742 -0.27354,1.00742 -0.0878,0 -0.15956,0.10408 -0.15956,0.2313 0,0.29902 -0.4451,0.67098 -0.56697,0.47379 z"/>
    <path d="m 153.23421,228.39193 c -10e-4,-0.16706 -0.10787,-0.49263 -0.23668,-0.7235 -0.12881,-0.23086 -0.48108,-0.91087 -0.78283,-1.51112 -0.30174,-0.60025 -0.60481,-1.1299 -0.67347,-1.177 -0.0687,-0.0471 -0.17681,-0.29265 -0.24031,-0.54568 -0.0635,-0.25303 -0.17683,-0.46005 -0.25183,-0.46005 -0.075,0 -0.18614,-0.22667 -0.24699,-0.50371 -0.0609,-0.27704 -0.18019,-0.5037 -0.2652,-0.5037 -0.085,0 -0.15456,-0.11078 -0.15456,-0.24616 0,-0.26153 -0.51707,-1.45945 -0.69096,-1.60077 -0.0568,-0.0462 -0.16144,-0.27284 -0.2325,-0.50371 -0.0711,-0.23086 -0.1757,-0.45753 -0.23251,-0.50371 -0.0568,-0.0462 -0.29219,-0.46173 -0.52305,-0.92346 -0.44224,-0.88447 -1.17259,-1.9763 -1.3852,-2.0708 -0.0693,-0.0308 -0.12593,-0.163 -0.12593,-0.29383 0,-0.13082 -0.0567,-0.23822 -0.12592,-0.23866 -0.2024,-0.001 -1.3852,-1.14025 -1.3852,-1.33386 0,-0.097 -0.0747,-0.17646 -0.16592,-0.17646 -0.0913,0 -0.21424,-0.30223 -0.27331,-0.67161 -0.0591,-0.36939 -0.16729,-0.67161 -0.2405,-0.67161 -0.0732,0 -0.18289,-0.22667 -0.24373,-0.50371 -0.0608,-0.27704 -0.18019,-0.5037 -0.26519,-0.5037 -0.085,0 -0.15457,-0.10662 -0.15457,-0.23693 0,-0.23215 -0.78415,-0.98609 -1.21109,-1.16444 -0.15976,-0.0667 -0.13949,-0.13874 0.0778,-0.27626 0.16161,-0.10229 0.29383,-0.32889 0.29383,-0.50354 0,-0.17466 0.0756,-0.36425 0.1679,-0.42132 0.20702,-0.12795 0.22507,-3.05105 0.0196,-3.17802 -0.0815,-0.0504 -0.20032,-0.5082 -0.26394,-1.01733 -0.0636,-0.50912 -0.17971,-0.92568 -0.25801,-0.92568 -0.0783,0 -0.19593,-0.75556 -0.26141,-1.67902 -0.0655,-0.92347 -0.17395,-1.67903 -0.24107,-1.67903 -0.0671,0 -0.16566,-0.57671 -0.21897,-1.28159 -0.0533,-0.70487 -0.17755,-1.36221 -0.27609,-1.46075 -0.22433,-0.22434 -0.23573,-2.04321 -0.0154,-2.45494 0.0901,-0.16832 0.21478,-1.14558 0.2771,-2.17169 0.10855,-1.78734 0.12912,-1.86567 0.48986,-1.86567 0.2071,0 0.42458,-0.12515 0.48328,-0.27812 0.0964,-0.25116 0.44246,-0.26811 3.57052,-0.17488 2.03428,0.0606 3.53597,0.17543 3.63867,0.27813 0.0962,0.0962 0.29199,0.17485 0.43512,0.17481 0.30408,-7e-5 2.34022,0.99422 2.66486,1.30131 0.12203,0.11543 0.28561,0.20988 0.36351,0.20988 0.17213,0 0.83369,0.5451 1.65695,1.36526 1.15206,1.14771 1.19967,1.26108 1.19967,2.85654 0,0.80689 0.0756,1.51376 0.1679,1.57083 0.0924,0.0571 0.16753,0.26931 0.16707,0.47164 -8.2e-4,0.40879 0.52086,1.99821 0.70017,2.13281 0.063,0.0473 0.16796,0.55895 0.23337,1.1371 0.0654,0.57815 0.18454,1.09174 0.26472,1.14129 0.20998,0.12977 0.18823,7.7938 -0.0221,7.7938 -0.0923,0 -0.16791,0.22667 -0.16791,0.50371 0,0.27704 0.0662,0.5037 0.14713,0.5037 0.0809,0 0.17947,1.13864 0.219,2.53031 0.0432,1.52105 0.14293,2.57583 0.25001,2.64446 0.098,0.0628 0.23117,0.28416 0.29601,0.49194 0.0648,0.20778 0.18836,0.37779 0.27449,0.37779 0.0861,0 0.15659,0.15111 0.15659,0.3358 0,0.18469 0.0667,0.3358 0.14832,0.3358 0.0816,0 0.19272,0.1698 0.24699,0.37733 0.0755,0.28864 -0.026,0.47488 -0.43172,0.79242 -0.29171,0.22829 -0.72398,0.63346 -0.96058,0.90036 -0.2366,0.2669 -0.5813,0.65388 -0.76599,0.85995 -0.48888,0.54549 -1.31858,1.6064 -1.49985,1.91783 -0.21391,0.36751 -0.37278,0.55606 -1.43845,1.70727 -1.25143,1.35187 -1.34322,1.46497 -1.34322,1.65507 0,0.0908 -0.0755,0.21177 -0.1679,0.26885 -0.0923,0.0571 -0.16902,-0.0329 -0.17037,-0.19997 z"/>
    <path d="m 167.80222,246.85139 c -0.1616,-0.0367 -0.29383,-0.12217 -0.29383,-0.18998 0,-0.12518 -0.93519,-0.56419 -1.65362,-0.77625 -0.44649,-0.13179 -0.7534,-0.41094 -1.43649,-1.30651 -0.26163,-0.34302 -0.54228,-0.62367 -0.62367,-0.62367 -0.21821,0 -0.69572,-0.51551 -1.13323,-1.22342 -0.21194,-0.34293 -0.44949,-0.62351 -0.52788,-0.62351 -0.0784,0 -0.16668,-0.17 -0.19619,-0.37778 -0.0438,-0.30827 -0.17683,-0.38781 -0.72313,-0.43227 -0.77315,-0.0629 -1.0935,-0.275 -1.0935,-0.72391 0,-0.34595 -0.32021,-0.9954 -0.58765,-1.19189 -0.0924,-0.0678 -0.70058,-0.12451 -1.35162,-0.12592 -0.69345,-0.002 -1.26716,-0.086 -1.38519,-0.20406 -0.12656,-0.12655 -0.20149,-0.13544 -0.20149,-0.0239 0,0.0976 -0.46799,0.22647 -1.03999,0.28626 -0.572,0.0598 -1.082,0.17631 -1.13334,0.25894 -0.0943,0.15183 -0.7276,0.23433 -1.54809,0.2017 -0.48796,-0.0194 -1.65146,-1.02548 -1.65146,-1.42801 0,-0.13245 -0.0882,-0.27021 -0.19588,-0.30612 -0.24203,-0.0807 -0.26053,-1.12608 -0.0226,-1.27871 0.0953,-0.0611 0.23046,-0.29423 0.30038,-0.518 0.0699,-0.22376 0.26899,-0.55913 0.44239,-0.74525 0.1734,-0.18611 0.31782,-0.41859 0.32096,-0.51661 0.003,-0.098 0.15168,-0.48044 0.33011,-0.84983 0.17842,-0.36938 0.32697,-0.79937 0.3301,-0.95553 0.003,-0.15615 0.0813,-0.33062 0.17361,-0.38769 0.0923,-0.0571 0.1679,-0.66598 0.1679,-1.35313 0,-1.13742 0.0301,-1.24936 0.3358,-1.24936 0.18469,0 0.33581,-0.10016 0.33581,-0.22258 0,-0.12242 0.18889,-0.40004 0.41975,-0.61693 0.23087,-0.21688 0.41976,-0.48876 0.41976,-0.60417 0,-0.1154 0.51,-0.7292 1.13334,-1.36399 0.62334,-0.63478 1.24668,-1.32979 1.38519,-1.54445 0.13853,-0.21466 0.3463,-0.48897 0.46174,-0.60958 0.11543,-0.12061 0.20988,-0.25986 0.20988,-0.30944 0,-0.0496 0.20778,-0.3147 0.46173,-0.58914 0.25395,-0.27445 0.71731,-0.80845 1.02969,-1.18667 0.55263,-0.66911 0.57441,-0.67845 0.80706,-0.34631 0.1315,0.18775 0.38592,0.34136 0.56538,0.34136 0.17945,0 0.32628,0.10422 0.32628,0.2316 0,0.12738 0.39667,0.58635 0.88149,1.01994 0.48482,0.43358 1.08485,0.97382 1.3334,1.20053 0.56913,0.51912 0.95196,1.27941 1.08528,2.15538 0.057,0.37482 0.15912,0.75703 0.22682,0.84938 0.0677,0.0923 0.17443,0.45282 0.2372,0.80105 0.0882,0.48929 0.40898,0.93241 1.41192,1.9503 0.7138,0.72443 1.49334,1.57285 1.73231,1.88538 0.23897,0.31254 0.7279,0.87787 1.08652,1.25629 0.89239,0.94168 1.2397,1.38448 1.2397,1.58056 0,0.0913 0.0756,0.16598 0.1679,0.16598 0.2079,0 0.58243,0.37365 1.34322,1.34005 0.32321,0.41057 0.76126,0.93813 0.97344,1.17237 1.33176,1.47018 1.3717,1.54799 1.37451,2.67786 0.002,0.92053 -0.0729,1.19445 -0.51852,1.8889 -0.28667,0.44673 -0.58745,0.81224 -0.66841,0.81224 -0.081,0 -0.19244,0.18023 -0.24773,0.40052 -0.0557,0.22197 -0.35653,0.53839 -0.67481,0.70979 -0.31586,0.1701 -0.57428,0.36765 -0.57428,0.43899 0,0.0713 -0.0877,0.12972 -0.1949,0.12972 -0.1072,0 -0.39054,0.2159 -0.62964,0.47978 -0.363,0.40062 -0.60096,0.4927 -1.44215,0.5581 -0.55408,0.0431 -1.13964,0.0483 -1.30124,0.0116 z"/>
    <path d="m 114.1154,257.3005 c 0,-0.14001 -0.28333,-0.38557 -0.62963,-0.54568 -0.3463,-0.16011 -0.66741,-0.33759 -0.71358,-0.39441 -0.0462,-0.0568 -0.23507,-0.15224 -0.41976,-0.21207 -0.18469,-0.0598 -0.63803,-0.37455 -1.00741,-0.69939 -0.36939,-0.32485 -0.8605,-0.63651 -1.09137,-0.69258 -0.23087,-0.0561 -0.49531,-0.1598 -0.58766,-0.23051 -0.0923,-0.0707 -0.60335,-0.18246 -1.13556,-0.24833 -0.53221,-0.0659 -1.00889,-0.18648 -1.05929,-0.26803 -0.12694,-0.20539 -2.38143,-0.18743 -2.45045,0.0195 -0.0843,0.25275 -4.68801,0.2991 -5.190366,0.0523 -0.223508,-0.10983 -1.294167,-0.24951 -2.379237,-0.3104 -1.08507,-0.0609 -1.972851,-0.1788 -1.972851,-0.26204 0,-0.0832 -0.188892,-0.15134 -0.419759,-0.15134 -0.230863,0 -0.419755,-0.0695 -0.419755,-0.15456 0,-0.085 -0.226668,-0.20435 -0.503709,-0.26519 -0.277037,-0.0609 -0.503706,-0.17677 -0.503706,-0.25759 0,-0.0808 -0.283337,-0.19228 -0.629636,-0.24769 -0.346298,-0.0554 -0.760832,-0.17216 -0.921182,-0.25946 -0.160354,-0.0873 -0.413381,-0.15873 -0.562283,-0.15873 -0.382298,0 -1.442734,-0.50824 -1.78384,-0.85494 -0.157871,-0.16047 -0.336063,-0.48709 -0.395982,-0.72582 -0.05992,-0.23874 -0.161385,-0.43407 -0.225479,-0.43407 -0.06409,0 -0.252378,-0.37778 -0.418416,-0.83951 -0.166034,-0.46173 -0.366427,-0.83951 -0.445317,-0.83951 -0.07889,0 -0.193041,-0.26445 -0.253675,-0.58766 -0.06063,-0.32321 -0.168813,-0.58766 -0.240397,-0.58766 -0.07158,0 -0.183581,-0.35889 -0.248882,-0.79754 -0.0653,-0.43864 -0.202345,-0.89906 -0.304548,-1.02316 -0.119249,-0.1448 -0.188806,-1.26959 -0.194162,-3.13979 -0.006,-2.09789 -0.06713,-2.97294 -0.218226,-3.12402 -0.236962,-0.23696 -0.288193,-1.75352 -0.06392,-1.89212 0.08028,-0.0496 0.198742,-0.75297 0.263259,-1.56301 0.115255,-1.44715 0.437411,-2.22836 0.918937,-2.22836 0.100631,0 0.182965,-0.0604 0.182965,-0.13415 0,-0.0738 0.30019,-0.31934 0.667092,-0.54569 0.366903,-0.22634 0.669129,-0.46819 0.671612,-0.53746 0.0025,-0.0693 0.104243,-0.12592 0.22613,-0.12592 0.121884,0 0.475497,-0.22667 0.7858,-0.50371 0.310303,-0.27704 0.626135,-0.50371 0.701852,-0.50371 0.23732,0 0.14974,-0.79895 -0.098,-0.89401 -0.273483,-0.10495 -0.939656,0.041 -0.939656,0.20578 0,0.0617 -0.245557,0.25495 -0.545685,0.42951 -0.300124,0.17456 -0.583462,0.3626 -0.629632,0.41786 -0.04617,0.0553 -0.299529,0.2378 -0.563014,0.40565 l -0.479063,0.30518 0.118564,-0.72881 c 0.06521,-0.40085 0.186342,-0.8006 0.269181,-0.88832 0.08284,-0.0877 0.150622,-0.37422 0.150622,-0.63664 0,-0.26242 0.226669,-0.96194 0.50371,-1.55449 0.277037,-0.59255 0.503706,-1.19385 0.503706,-1.33622 0,-0.14237 0.06955,-0.25885 0.154562,-0.25885 0.08501,0 0.204345,-0.22667 0.265196,-0.50371 0.06085,-0.27704 0.174182,-0.50371 0.251853,-0.50371 0.07767,0 0.190636,-0.22499 0.251036,-0.49999 0.0604,-0.27499 0.292753,-0.86055 0.516347,-1.30124 0.22359,-0.44069 0.406842,-0.93348 0.407232,-1.09509 3.86e-4,-0.1616 0.07026,-0.29383 0.155265,-0.29383 0.08501,0 0.204344,-0.22667 0.265192,-0.5037 0.06085,-0.27704 0.180186,-0.50371 0.265196,-0.50371 0.08501,0 0.154563,-0.0965 0.154563,-0.21451 0,-0.11798 0.226668,-0.65139 0.503705,-1.18536 0.277041,-0.53396 0.50371,-1.07966 0.50371,-1.21266 0,-0.133 0.06736,-0.24181 0.149699,-0.24181 0.08233,0 0.20166,-0.20703 0.265163,-0.46005 0.06351,-0.25303 0.193263,-0.50813 0.288341,-0.5669 0.09508,-0.0588 0.212253,-0.45618 0.260377,-0.88317 0.04813,-0.42698 0.153233,-0.77632 0.233572,-0.77632 0.08033,0 0.146067,-0.11334 0.146067,-0.25186 0,-0.19889 0.23832,-0.25207 1.133341,-0.25288 0.676853,-8.2e-4 1.327048,-0.10206 1.614264,-0.25186 0.264511,-0.13795 0.585625,-0.25082 0.713587,-0.25082 0.127962,0 0.232661,-0.0674 0.232661,-0.1497 0,-0.0823 0.175889,-0.19384 0.390868,-0.2478 0.214975,-0.054 0.580954,-0.26992 0.813286,-0.47993 0.796735,-0.72018 2.194645,-1.33556 3.245265,-1.42862 0.55408,-0.0491 1.11414,-0.17363 1.2446,-0.27678 0.17717,-0.14011 0.25505,-0.13446 0.30782,0.0223 0.0824,0.24482 3.4007,0.30694 3.4007,0.0637 0,-0.0804 0.45104,-0.19725 1.0023,-0.25962 0.55127,-0.0624 1.04278,-0.17888 1.09225,-0.25893 0.0495,-0.08 0.39127,-0.19644 0.75956,-0.25866 0.36829,-0.0622 1.02901,-0.28967 1.46827,-0.50544 0.72687,-0.35704 0.81751,-0.36794 1.00852,-0.12123 0.11544,0.14908 0.20988,0.36824 0.20988,0.48703 0,0.11879 0.23937,0.65213 0.53192,1.1852 0.29255,0.53308 0.71004,1.34701 0.92774,1.80874 0.21771,0.46173 0.45985,0.95533 0.5381,1.09688 0.0782,0.14155 0.19406,0.51933 0.25735,0.83951 0.0633,0.32018 0.17565,0.73326 0.24969,0.91795 0.92314,2.30302 1.30253,5.56991 0.8842,7.61381 -0.24934,1.21822 -1.1009,2.30023 -3.02939,3.84919 -0.42865,0.34429 -0.80455,0.68265 -0.83533,0.75191 -0.0308,0.0693 -0.15009,0.12593 -0.26513,0.12593 -0.44,0 -2.40827,2.22286 -2.95224,3.33411 -0.30027,0.61341 -0.62989,1.26641 -0.73248,1.4511 -0.26416,0.47557 -0.33953,4.66309 -0.10577,5.87659 0.10673,0.55408 0.23278,1.36631 0.28012,1.80495 0.0473,0.43865 0.15433,0.79754 0.23777,0.79754 0.0834,0 0.15169,0.11873 0.15169,0.26384 0,0.28982 2.06356,2.4226 2.34398,2.4226 0.096,0 0.17456,0.0614 0.17456,0.13644 0,0.18242 1.5941,0.87097 2.01643,0.87097 0.18382,0 0.3342,0.0756 0.3342,0.16791 0,0.0923 0.2686,0.1679 0.59688,0.1679 0.80885,0 2.17084,0.62263 1.94977,0.89133 -0.0905,0.11002 -0.21896,0.57782 -0.28542,1.03955 -0.0665,0.46173 -0.17842,0.91506 -0.24877,1.00741 -0.0704,0.0923 -0.18124,0.56449 -0.24641,1.0492 -0.0652,0.48472 -0.17824,0.91824 -0.25128,0.96338 -0.073,0.0451 -0.18392,0.423 -0.24641,0.8397 -0.0625,0.41669 -0.16605,0.75762 -0.23014,0.75762 -0.15556,0 -0.5434,1.11363 -0.64323,1.84693 -0.044,0.32321 -0.16614,0.76233 -0.27141,0.9758 -0.14491,0.29386 -0.14238,0.46665 0.0104,0.71131 0.24571,0.39343 0.25951,0.66353 0.0339,0.66353 -0.0923,0 -0.16791,-0.11456 -0.16791,-0.25457 z"/>
    <path d="m 64.156028,242.46122 c -0.08773,-0.0828 -0.910141,-0.18134 -1.82758,-0.219 -1.091141,-0.0448 -1.691217,-0.13789 -1.73499,-0.26922 -0.03682,-0.11042 -0.17396,-0.20076 -0.304783,-0.20076 -0.130823,0 -0.237861,-0.11333 -0.237861,-0.25185 0,-0.13852 -0.07213,-0.25186 -0.160296,-0.25186 -0.08816,0 -0.211347,-0.28333 -0.273746,-0.62963 -0.0624,-0.3463 -0.177018,-0.71035 -0.254705,-0.809 -0.247412,-0.31419 -0.260324,-5.86661 -0.01432,-6.16301 0.143201,-0.17255 0.249016,-1.13394 0.317329,-2.88313 0.05637,-1.44335 0.16622,-2.66366 0.244116,-2.7118 0.0779,-0.0481 0.141634,-0.42805 0.141634,-0.84423 0,-0.41618 0.07635,-0.89935 0.169667,-1.07372 0.09332,-0.17436 0.217023,-0.79273 0.274907,-1.37415 0.05788,-0.58143 0.163658,-1.13269 0.235062,-1.22504 0.0714,-0.0923 0.182928,-0.45207 0.247834,-0.79939 0.06491,-0.34732 0.178426,-0.66882 0.252272,-0.71446 0.07384,-0.0456 0.187861,-0.4037 0.25338,-0.79568 0.06552,-0.39199 0.167565,-0.75049 0.226775,-0.79666 0.210989,-0.16454 1.03539,-2.01759 1.137643,-2.55714 0.05723,-0.30198 0.165664,-0.62836 0.240963,-0.72529 0.0753,-0.0969 0.187932,-0.49527 0.250285,-0.88521 0.06235,-0.38994 0.174633,-0.74684 0.249518,-0.79312 0.07488,-0.0463 0.18782,-0.44127 0.250978,-0.87776 0.06316,-0.4365 0.171904,-0.86918 0.241658,-0.96153 0.06975,-0.0924 0.170717,-0.43235 0.22437,-0.75556 0.347562,-2.09393 0.518493,-2.85435 0.641612,-2.85435 0.07708,0 0.140148,-0.17111 0.140148,-0.38026 0,-0.20915 0.151111,-0.66221 0.335804,-1.00681 0.184693,-0.34459 0.335808,-0.74015 0.335808,-0.879 0,-0.13886 0.07555,-0.25246 0.167902,-0.25246 0.09234,0 0.167901,-0.1047 0.167901,-0.23266 0,-0.12797 0.112871,-0.44908 0.250819,-0.71359 0.137952,-0.26451 0.251286,-0.64646 0.251853,-0.84879 4.1e-4,-0.20233 0.06489,-0.40734 0.142922,-0.45557 0.07804,-0.0482 0.189052,-0.96771 0.24669,-2.04329 0.06413,-1.19664 0.188259,-2.05634 0.319846,-2.21518 0.296615,-0.35805 0.289678,-12.59792 -0.0072,-12.78143 -0.124338,-0.0768 -0.233153,-0.91802 -0.29682,-2.29451 -0.05529,-1.19525 -0.158569,-2.24874 -0.229517,-2.34109 -0.07095,-0.0923 -0.178516,-0.49231 -0.239031,-0.88881 -0.06051,-0.39651 -0.184163,-0.86874 -0.274776,-1.0494 l -0.329491,-0.65694 c -0.09061,-0.18066 -0.2136,-0.634 -0.273314,-1.00741 -0.05971,-0.37342 -0.169835,-0.67895 -0.24472,-0.67895 -0.07489,0 -0.187143,-0.34 -0.24946,-0.75556 -0.06232,-0.41556 -0.18028,-0.75556 -0.262142,-0.75556 -0.08186,0 -0.148837,-0.2671 -0.148837,-0.59357 0,-0.86863 0.49161,-1.57081 2.521122,-3.60099 0.694021,-0.69425 1.449584,-1.51203 1.679026,-1.81729 0.229443,-0.30527 0.557958,-0.72083 0.730034,-0.92347 0.17208,-0.20264 0.512082,-0.62894 0.755562,-0.94733 0.243484,-0.3184 0.707143,-0.84645 1.030355,-1.17345 0.54596,-0.55237 0.661124,-0.59469 1.623055,-0.59643 1.185287,-0.002 1.453335,0.1468 0.927326,0.51523 -0.202206,0.14163 -0.367649,0.40434 -0.367649,0.5838 0,0.5293 0.841939,0.42647 1.304514,-0.15932 l 0.381055,-0.48256 1.276675,1.28162 c 1.094612,1.09885 2.410636,2.8061 2.410636,3.12727 0,0.15943 0.712212,1.10544 1.286069,1.70826 0.482613,0.50696 0.541437,0.68844 0.651529,2.0101 0.149034,1.78911 0.01568,4.387 -0.238251,4.64092 -0.221636,0.22163 -0.25393,0.96058 -0.04198,0.96058 0.08043,0 0.200647,0.69889 0.267138,1.55309 0.0665,0.85421 0.200195,1.6492 0.29712,1.76665 0.225379,0.27313 0.217844,5.08419 -0.0082,5.22538 -0.08969,0.056 -0.217712,0.68741 -0.284511,1.4031 -0.0668,0.71568 -0.188132,1.30124 -0.269629,1.30124 -0.0815,0 -0.148176,0.28635 -0.148176,0.63634 0,0.34998 -0.113334,1.07145 -0.251853,1.60326 -0.138519,0.53181 -0.251853,1.22324 -0.251853,1.53649 0,0.31326 -0.06916,0.6123 -0.153684,0.66454 -0.08453,0.0522 -0.206926,0.68003 -0.272005,1.3951 -0.06508,0.71507 -0.177379,1.37568 -0.249555,1.46803 -0.07218,0.0923 -0.185361,0.67896 -0.251512,1.30358 -0.06615,0.62462 -0.181635,1.17359 -0.256622,1.21994 -0.07499,0.0463 -0.188112,0.49863 -0.251389,1.00508 -0.06328,0.50645 -0.181902,0.92082 -0.263603,0.92082 -0.08171,0 -0.148558,0.18991 -0.148558,0.42203 0,0.23212 -0.0725,0.55323 -0.161118,0.71359 -0.146349,0.26482 -0.241842,0.63786 -0.664818,2.59713 -0.0744,0.34462 -0.211216,0.7224 -0.30404,0.83952 -0.451605,0.5698 -1.220658,2.17298 -1.220658,2.5446 0,0.2304 -0.06561,0.45947 -0.145792,0.50902 -0.08018,0.0496 -0.197269,0.54513 -0.260189,1.10128 -0.06292,0.55614 -0.180202,1.01117 -0.260628,1.01117 -0.08042,0 -0.196008,0.22667 -0.256856,0.50371 -0.06085,0.27704 -0.171994,0.50371 -0.246993,0.50371 -0.075,0 -0.179402,0.1715 -0.232012,0.38112 -0.05261,0.20961 -0.230806,0.53357 -0.395986,0.7199 -0.488651,0.55123 -1.055888,1.39176 -1.055888,1.56462 0,0.0884 -0.05667,0.1859 -0.125927,0.21668 -0.20427,0.0908 -1.217292,2.17479 -1.217292,2.50423 0,0.16627 -0.07119,0.34631 -0.158199,0.40008 -0.08701,0.0538 -0.209877,0.45491 -0.273036,0.8914 -0.06316,0.43649 -0.173221,0.86918 -0.244588,0.96152 -0.07137,0.0923 -0.184155,0.84792 -0.250638,1.67903 -0.06649,0.83112 -0.179989,1.58668 -0.252226,1.67902 -0.07224,0.0924 -0.168702,0.58347 -0.214367,1.09137 -0.122352,1.36091 -0.47266,3.56039 -0.628421,3.94571 -0.07466,0.18469 -0.174473,1.87119 -0.221801,3.74777 -0.04733,1.87658 -0.157862,3.50104 -0.245626,3.6099 -0.08776,0.10887 -0.212533,0.51906 -0.277263,0.91153 -0.06473,0.39247 -0.181516,0.71358 -0.259524,0.71358 -0.078,0 -0.189791,0.15112 -0.248409,0.33581 -0.05862,0.18469 -0.214824,0.3358 -0.34712,0.3358 -0.132296,0 -0.240537,0.0756 -0.240537,0.16791 0,0.0923 -0.266875,0.1679 -0.593054,0.1679 -0.326179,0 -0.864299,0.11333 -1.195822,0.25185 -0.672092,0.28082 -1.585615,0.33141 -1.829424,0.10132 z"/>
    <path d="m 51.110008,154.76062 c -0.146967,-0.20022 -0.472024,-0.12162 -0.701561,-0.15845 -0.225212,-0.0175 -0.460035,0.009 -0.661827,-0.11495 -0.530967,-0.19336 -1.030769,-0.46044 -1.547399,-0.68497 -0.287069,-0.0157 -0.412818,-0.29423 -0.685542,-0.36656 -0.298925,-0.19526 -0.313541,-0.58626 -0.574876,-0.75508 -0.07649,-0.35834 0.07133,-0.79561 -0.222547,-1.08067 -0.165254,-0.24642 0.02139,-0.49983 0.309055,-0.42367 0.277703,-0.10315 0.517513,-0.67445 0.08887,-0.74617 -0.272058,-0.0863 -0.187328,-0.41369 -0.201722,-0.63482 -0.01303,-0.13573 -0.01793,-0.26257 0.15404,-0.20083 0.216017,0.0329 0.483947,-0.0298 0.64645,0.14055 0.01682,0.42169 0.632727,0.47119 0.785722,0.12084 0.331265,-0.0875 0.448322,-0.56442 0.846245,-0.50534 0.349204,-0.034 0.707825,-0.0155 0.95996,0.225 0.286732,-0.009 0.546408,0.0462 0.734089,0.26005 0.267847,0.0171 0.394529,0.28363 0.646169,0.33881 0.15027,0.26614 0.574332,0.34032 0.775033,0.62403 0.284789,0.15827 0.390329,0.55546 0.671595,0.6521 0.07655,0.15109 0.167885,0.24239 0.318951,0.31894 0.07454,0.25749 0.28037,0.53508 0.471667,0.67854 0.183716,0.081 0.123217,0.36923 0.34079,0.45117 5.84e-4,0.22473 0.156968,0.34165 0.288845,0.48127 -0.105765,0.31673 -0.490288,0.3739 -0.598557,0.6527 -0.280617,0.074 -0.663899,0.24797 -0.754811,0.52055 -0.264137,0.19616 -0.563383,0.36942 -0.932974,0.3348 -0.377686,0.002 -0.778088,0.0409 -1.136289,-0.096 l -0.01936,-0.0321 z"/>
    <path d="m 83.788027,126.19747 c -0.411357,-0.0952 -0.814412,-0.22623 -1.175708,-0.44954 -0.257956,-0.16108 -0.588178,-0.256 -0.770173,-0.50693 -0.252465,-0.17571 -0.494877,-0.39205 -0.709015,-0.62415 -0.200635,-0.24313 -0.421126,-0.45458 -0.572401,-0.71828 -0.04873,-0.38275 -0.397247,-0.62541 -0.325107,-1.0406 -0.0019,-0.37159 -0.03739,-0.76622 0.100181,-1.11759 0.198167,-0.0313 0.139101,-0.31387 0.371983,-0.30177 0.06141,-0.31439 0.392498,-0.4265 0.613349,-0.59952 0.08113,-0.17498 0.34208,-0.19304 0.485713,-0.33857 0.07212,-0.0299 0.435831,-0.0723 0.364723,0.003 -0.206492,0.14163 -0.375095,0.36608 -0.332122,0.63133 0.01148,0.43272 0.579526,0.31163 0.872101,0.34733 0.306655,0.009 0.634468,-0.0289 0.836133,-0.25798 0.37211,0.0109 0.501858,0.51006 0.889828,0.48713 0.340311,0.009 0.688563,0.0363 1.023923,-0.031 0.06599,-0.13496 0.233568,-0.33179 0.350776,-0.0842 0.134215,0.17965 0.426749,0.10207 0.523793,0.34078 0.303335,5.9e-4 0.300646,0.32398 0.527278,0.453 0.05311,0.21783 0.322833,0.29393 0.298782,0.56001 0.288348,0.18374 0.188661,0.57168 0.214781,0.86472 -0.05422,0.26458 0.125109,0.73571 -0.174743,0.85586 -0.17614,0.25602 -0.342913,0.54393 -0.631332,0.72135 -0.212455,0.28872 -0.559312,0.2829 -0.874019,0.39799 -0.203547,0.25152 -0.546888,0.21024 -0.841036,0.21409 -0.318007,-0.0729 -0.524404,0.13434 -0.773014,0.23795 -0.02211,0.005 -0.412526,0.0155 -0.294677,-0.0444 z"/>
    <path d="m 95.257207,212.23751 c 0.117553,-1.81446 0.06716,-2.24443 -0.382684,-3.26493 -0.638226,-1.44787 -1.501656,-2.75675 -2.705765,-4.1017 -0.50561,-0.56475 -1.138333,-1.52199 -1.406049,-2.12722 -0.811431,-1.83436 -2.520124,-3.76218 -4.284953,-4.83443 -0.884649,-0.53748 -1.811996,-1.26309 -2.060767,-1.61246 -0.24877,-0.34937 -0.682057,-1.53766 -0.962862,-2.64065 -0.280805,-1.10298 -0.677534,-2.35893 -0.881628,-2.791 -0.278072,-0.58868 -0.303133,-0.85351 -0.09999,-1.05665 0.149096,-0.14909 0.271082,-0.57558 0.271082,-0.94773 0,-0.83544 0.616974,-2.07777 1.031881,-2.07777 0.506263,0 2.145366,-1.53846 2.88385,-2.70677 0.379786,-0.60083 0.78284,-1.09243 0.895678,-1.09243 0.112837,0 0.688123,-0.98839 1.278411,-2.19641 1.7239,-3.52797 2.103645,-4.04933 4.475096,-6.14408 1.238196,-1.09372 2.252642,-2.05446 2.254325,-2.13498 0.0016,-0.0805 0.709881,-1.20247 1.573778,-2.49323 1.812066,-2.70742 3.94203,-4.99543 5.73924,-6.16512 0.69024,-0.44924 1.32365,-1.0027 1.40756,-1.22992 0.0839,-0.22722 0.34476,-0.62683 0.57965,-0.88803 0.23488,-0.26119 1.2972,-1.65028 2.36069,-3.08685 1.06349,-1.43657 2.07789,-2.6956 2.25422,-2.79783 0.9098,-0.52749 3.67284,-3.1917 3.91406,-3.77405 0.28418,-0.68608 0.69379,-0.90577 0.69641,-0.37353 8.2e-4,0.16325 0.16201,0.60464 0.35822,0.98088 0.19622,0.37624 0.44935,1.49819 0.56252,2.49322 0.19536,1.7178 1.48231,5.60717 1.90934,5.77034 0.10862,0.0415 0.48408,0.50288 0.83434,1.02527 0.91086,1.35849 2.30763,2.96369 4.82502,5.54507 2.73038,2.79979 4.54761,5.41439 4.94987,7.12181 0.16447,0.6981 0.2407,1.42127 0.16941,1.60704 -0.0713,0.18578 0.006,0.66629 0.17277,1.0678 0.2461,0.59414 0.24515,0.76538 -0.005,0.92005 -0.20922,0.1293 -0.25095,0.40684 -0.13057,0.86851 0.0973,0.37315 0.15893,2.91842 0.13696,5.65614 -0.038,4.73904 -0.33306,7.47418 -0.9486,8.79442 -0.12178,0.2612 -0.60282,1.37713 -1.06899,2.47985 -0.46616,1.10272 -1.04906,2.22467 -1.29532,2.49323 -0.24626,0.26855 -0.94174,1.23624 -1.54552,2.15042 -3.40727,5.15894 -4.87081,6.59421 -7.74634,7.5967 -0.58341,0.20339 -1.80871,0.73438 -2.7229,1.17999 -2.43511,1.18695 -5.08943,1.78997 -7.8754,1.78916 -1.99129,-4.1e-4 -2.5621,0.093 -3.87837,0.63577 -0.848881,0.35005 -1.876087,0.87892 -2.282679,1.17526 -0.406592,0.29635 -1.022002,0.60977 -1.367582,0.69651 -0.345577,0.0867 -0.687044,0.25271 -0.758818,0.36884 -0.07177,0.11613 -0.384379,0.21115 -0.694686,0.21115 -0.561471,0 -0.563539,-0.0101 -0.428809,-2.08966 z"/>
    <path d="m 118.20767,222.45619 c -0.14967,-0.0959 -0.40059,-1.02927 -0.5576,-2.07405 -0.15701,-1.04478 -0.36818,-2.00645 -0.46927,-2.13705 -0.10109,-0.1306 -0.51313,-1.30703 -0.91566,-2.61429 -0.40252,-1.30727 -1.04509,-2.85663 -1.42792,-3.44303 -0.97121,-1.48761 -1.12901,-2.10006 -0.58853,-2.28415 0.95909,-0.32664 4.0176,-1.8194 4.64906,-2.26904 0.37078,-0.26401 1.20487,-1.1368 1.85354,-1.93953 0.64867,-0.80273 1.32467,-1.61978 1.50224,-1.81568 0.17757,-0.1959 0.72966,-0.99608 1.22688,-1.77819 0.49721,-0.78211 1.08461,-1.61585 1.30532,-1.85276 0.22072,-0.23691 0.77154,-1.15047 1.22404,-2.03015 0.45251,-0.87967 1.00112,-1.87164 1.21915,-2.2044 0.89863,-1.37148 1.39287,-4.59411 1.54924,-10.10158 0.0822,-2.89493 0.23118,-5.34524 0.33109,-5.44512 0.0999,-0.0999 0.52731,0.14571 0.9498,0.54577 0.42248,0.40007 1.24899,1.02501 1.83668,1.38877 0.58768,0.36376 1.35181,0.96409 1.69805,1.33407 0.34624,0.36998 0.79562,0.67269 0.99861,0.67269 0.66626,0 4.39203,3.98022 6.00129,6.41115 l 0.86455,1.30597 -0.29273,3.11095 c -0.28303,3.00792 -0.27199,3.22026 0.33325,6.41115 0.34428,1.81511 0.78205,3.96328 0.97282,4.7737 0.37396,1.58867 0.44527,3.11644 0.16513,3.53806 -0.31985,0.48141 -1.82476,0.59352 -2.89558,0.21571 -1.32543,-0.46764 -2.94898,-0.4671 -3.33756,0.001 -0.21753,0.26211 -0.24054,0.63516 -0.0842,1.36534 0.21072,0.98416 0.19609,1.01923 -0.71603,1.71703 -2.06516,1.57992 -5.19325,3.51902 -8.45659,5.24223 -1.89366,0.99995 -3.87044,2.10285 -4.39283,2.45089 -1.15287,0.76809 -3.25299,1.6875 -3.84321,1.68252 -0.23699,-0.002 -0.55335,-0.0821 -0.70302,-0.17809 z"/>
    <path d="m 72.134359,149.30158 c -0.885775,-0.10828 0.16009,-1.26391 0.59637,-0.62705 0.799122,0.33076 0.801502,-0.94098 1.262001,-1.3241 0.527523,-0.84215 1.31136,-1.53257 1.683813,-2.46013 0.572662,-0.35955 1.567772,-0.34833 1.559597,-1.26862 0.131081,-0.68171 0.593155,-1.34609 0.328842,-2.0559 -0.181257,-0.66108 -0.661617,-1.32695 -0.457671,-2.03393 0.420391,-0.43485 1.166341,-0.17156 1.691164,-0.46988 0.756978,-0.31931 1.594493,-0.36151 2.358949,-0.64404 0.700585,-0.26815 0.807532,-1.19517 1.497261,-1.458 0.61252,0.14815 0.603919,1.12211 0.48077,1.62386 -0.196382,0.59553 -0.357002,0.34671 -0.09588,1.1116 0.261114,0.76489 -0.169818,0.74157 -0.159358,1.25316 0.01039,0.51159 0.03995,0.50152 -0.04686,1.06494 -0.113893,0.73914 -0.01303,1.09896 -0.04241,1.78795 -0.0121,0.99504 -0.0023,2.11957 -0.686855,2.91674 -0.477602,0.45511 -0.725372,1.49509 -0.803998,2.43153 -0.07863,0.93643 -0.386712,3.31782 -1.24191,4.20391 -0.699114,0.59279 -2.092917,-0.92351 -2.903153,-1.46463 -0.928239,-0.24968 -1.827011,-0.63548 -2.563024,-1.26794 -0.770773,-0.5178 -1.574484,-1.0185 -2.457639,-1.31947 z"/>
    <path d="m 169.882,233.78738 c -0.28485,-0.53225 -1.39598,-1.7858 -3.14049,-3.54305 -0.62034,-0.62486 -1.12789,-1.3294 -1.12789,-1.56565 0,-0.83256 -0.77105,-3.16457 -1.18728,-3.59089 -0.23173,-0.23735 -0.80518,-0.74216 -1.27435,-1.1218 -0.68545,-0.55465 -0.82468,-0.80314 -0.70878,-1.26491 0.0793,-0.31606 -0.003,-0.85104 -0.18292,-1.18884 -0.25686,-0.48223 -0.26338,-0.6356 -0.0303,-0.71384 0.41671,-0.13992 0.37075,-0.99641 -0.0624,-1.16263 -0.19756,-0.0758 -0.4948,-0.0253 -0.66054,0.11226 -0.22697,0.18837 -0.38379,0.0631 -0.63537,-0.5077 -0.18371,-0.41678 -0.46329,-0.88812 -0.62128,-1.04742 -0.15799,-0.15929 -0.36138,-0.92822 -0.45197,-1.70873 -0.15257,-1.31453 -0.11532,-1.48566 0.50545,-2.32232 1.70148,-2.29322 5.46479,-5.28348 5.98929,-4.75899 0.17649,0.1765 0.52866,0.0674 1.18534,-0.36716 0.82848,-0.54826 1.49455,-1.24643 3.65782,-3.83411 l 0.58192,-0.69609 1.55865,0.98438 c 0.85726,0.54141 1.82155,1.22863 2.14287,1.52716 0.32132,0.29854 1.08659,0.91678 1.7006,1.37387 2.05413,1.52916 1.91962,1.36332 1.49042,1.83758 -0.52774,0.58314 -0.76871,2.66256 -0.42813,3.69452 0.31872,0.96573 -0.0872,4.67893 -0.91994,8.41557 -0.70442,3.1608 -0.63774,3.71148 0.63988,5.28444 0.0524,0.0646 0.67756,0.17142 1.38915,0.23745 l 1.29379,0.12006 -1.01544,0.51896 c -0.55849,0.28542 -1.81683,0.89693 -2.79631,1.35889 -1.78636,0.84254 -2.30833,1.19334 -4.1256,2.77268 -0.53877,0.46823 -1.16657,0.919 -1.39511,1.00171 -0.22855,0.0827 -0.41554,0.26058 -0.41554,0.39528 0,0.43367 -0.68726,0.26056 -0.95552,-0.24068 z"/>
    <path d="m 183.187,210.44285 c -0.45594,-0.17161 -0.688,-0.35902 -0.51569,-0.41646 0.17231,-0.0574 0.33165,-0.47563 0.35409,-0.92931 l 0.0408,-0.82489 -1.17496,0.0762 c -0.64623,0.0419 -1.36652,0.17872 -1.60064,0.30402 -0.57522,0.30786 -1.3026,-0.10244 -3.62091,-2.04247 -1.03672,-0.86756 -2.20205,-1.74136 -2.58961,-1.94177 -0.38755,-0.20042 -0.9056,-0.55161 -1.15121,-0.78043 -0.48153,-0.44862 -0.7254,-0.18713 4.87992,-5.23227 l 0.92336,-0.83108 -0.1333,-2.61195 c -0.0733,-1.43657 -0.29908,-3.14621 -0.50171,-3.79919 -0.68571,-2.20976 -0.37101,-3.44429 1.27797,-5.0133 1.11883,-1.06457 4.03756,-2.64646 5.07999,-2.75325 0.59297,-0.0607 0.72495,0.0501 1.06852,0.89747 0.61932,1.52747 1.78903,2.92663 3.91032,4.67733 0.59835,0.49382 1.21854,1.26559 1.38341,1.72151 0.16436,0.45452 0.36712,0.82641 0.45057,0.82641 0.0835,0 0.28597,0.45412 0.45002,1.00916 0.16406,0.55504 0.45981,1.38315 0.65723,1.84024 0.62911,1.45656 0.67252,4.1494 0.0998,6.18884 -0.27741,0.98782 -0.50556,2.43032 -0.50699,3.20558 -0.005,2.51048 -0.19134,3.12236 -1.00208,3.28451 -0.60303,0.12061 -0.69582,0.23229 -0.60178,0.72425 0.10065,0.52652 -0.0824,0.67651 -1.93121,1.5825 -2.2586,1.1068 -3.85488,1.3619 -5.24588,0.83835 z"/>
    <path d="m 136.92733,261.77494 c -0.79406,-0.17753 -1.16649,-0.43584 -1.66214,-1.1528 -0.35134,-0.50821 -0.75939,-0.92807 -0.90679,-0.93302 -0.14741,-0.005 -0.39759,-0.32185 -0.55596,-0.7042 -0.42819,-1.03374 -0.97887,-1.42173 -2.45825,-1.73204 -1.73681,-0.3643 -4.47165,0.0578 -6.45324,0.99591 -1.8004,0.85237 -5.29281,1.87584 -7.03827,2.0626 -1.2518,0.13393 -1.3657,0.10328 -1.74023,-0.46833 -0.31598,-0.48224 -0.3659,-0.89072 -0.23596,-1.93072 0.14044,-1.12406 0.10811,-1.31908 -0.21873,-1.31908 -0.5027,0 -0.49826,-0.0384 0.30562,-2.63859 0.37902,-1.22603 0.74882,-2.49627 0.82177,-2.82276 0.0821,-0.36772 0.41593,-0.718 0.87708,-0.92044 0.41944,-0.18412 0.83937,-0.59903 0.96182,-0.95031 0.11954,-0.34292 0.68116,-0.91692 1.24804,-1.27555 0.56688,-0.35864 1.31816,-0.91848 1.6695,-1.24409 0.35134,-0.32561 1.24867,-1.01593 1.99408,-1.53404 0.74541,-0.51811 2.25222,-1.80125 3.34848,-2.85142 1.09625,-1.05017 2.16478,-1.90811 2.3745,-1.90654 0.20971,0.002 0.8285,0.25858 1.37508,0.57112 0.54657,0.31254 2.13269,0.85892 3.5247,1.21418 3.30608,0.84376 5.22108,0.75558 7.49861,-0.34527 l 1.5693,-0.75853 1.10317,0.6159 c 2.4994,1.39539 4.99674,1.27019 8.33231,-0.41775 0.32312,-0.16351 0.49143,-0.1529 0.55405,0.0349 0.0495,0.14839 0.39846,0.2698 0.77555,0.2698 1.01373,0 2.78783,1.35229 3.42666,2.61195 0.29805,0.58769 0.73282,1.76307 0.96616,2.61195 0.23334,0.84888 0.79602,2.13112 1.2504,2.8494 l 0.82616,1.30597 -0.48956,1.4247 c -0.26926,0.78359 -0.55227,1.71001 -0.62892,2.05871 -0.35503,1.6151 -3.72897,3.94274 -7.14462,4.92897 -1.04478,0.30166 -2.7997,0.91693 -3.89983,1.36725 -1.6226,0.66418 -2.49678,0.85985 -4.63027,1.03642 -3.213,0.26589 -5.3865,0.24839 -6.74027,-0.0543 z"/>
    <path d="m 164.51528,268.76257 c -0.34584,-1.43303 -1.81072,-3.89127 -3.47968,-5.83929 -0.9676,-1.12939 -2.08815,-2.68085 -2.49012,-3.44769 l -0.73084,-1.39425 1.15641,-1.09144 c 0.83819,-0.7911 1.20144,-1.33888 1.32005,-1.99065 0.09,-0.49457 0.36271,-1.41072 0.60603,-2.03589 0.24332,-0.62518 0.44239,-1.56014 0.44239,-2.07769 0,-0.51756 0.11469,-0.94101 0.25486,-0.94101 0.14017,0 0.22032,-0.17939 0.17809,-0.39865 -0.0422,-0.21926 -0.15231,-0.35283 -0.24464,-0.29681 -0.0923,0.056 -0.31643,-0.10135 -0.49802,-0.34967 -0.2479,-0.33904 -0.37602,-0.37729 -0.51429,-0.15356 -0.11318,0.18312 -0.52123,-0.69531 -1.05873,-2.27916 -0.48102,-1.41742 -1.05639,-2.85345 -1.2786,-3.19118 -0.3943,-0.59929 -0.38943,-0.6207 0.20258,-0.89043 0.33363,-0.15202 0.76611,-0.27639 0.96106,-0.27639 0.63227,0 2.21165,0.93702 2.50275,1.48484 0.58805,1.10665 2.8874,3.05293 4.44745,3.76454 1.3779,0.62853 1.74252,0.69972 2.88334,0.56301 0.71829,-0.0861 1.63401,-0.35739 2.03493,-0.60289 0.65366,-0.40027 0.78084,-0.41004 1.23125,-0.0946 0.4108,0.28774 0.47663,0.50995 0.3614,1.22 -0.12274,0.75635 -0.0877,0.84776 0.27224,0.70965 0.22721,-0.0872 0.67151,-0.15853 0.98732,-0.15853 0.31582,0 0.57481,-0.13357 0.57555,-0.29681 8.2e-4,-0.18201 0.37064,-0.31075 0.95608,-0.33284 0.94807,-0.0357 0.95958,-0.0257 1.64616,1.44283 0.38029,0.81337 0.85829,1.61734 1.06224,1.78661 0.49252,0.40875 0.4634,1.24074 -0.10714,3.0608 -0.2595,0.82787 -0.47183,1.87514 -0.47183,2.32725 0,0.72035 0.10642,0.86651 0.86028,1.18148 0.80901,0.33803 0.85314,0.4116 0.7407,1.2345 -0.0658,0.48128 -0.64475,1.72987 -1.28665,2.77465 -1.06229,1.72903 -1.3047,1.96897 -2.69967,2.67212 -1.01017,0.50919 -2.35562,0.91855 -3.94709,1.20091 -1.69677,0.30104 -2.68495,0.61136 -3.3243,1.04396 -0.50039,0.33856 -1.15021,0.68689 -1.44406,0.77406 -0.29384,0.0872 -0.53426,0.26772 -0.53426,0.40123 0,0.25702 -0.94799,1.12866 -1.24209,1.14204 -0.0955,0.004 -0.24448,-0.28594 -0.33115,-0.64508 z"/>
    <path d="m 92.981026,282.01819 c -4.19116,-0.19781 -4.42153,-0.31053 -4.233008,-2.07115 0.119507,-1.1161 0.444176,-1.49975 2.350376,-2.77735 1.611567,-1.08013 3.516248,-3.0533 3.521329,-3.64795 0.0029,-0.34417 0.04454,-0.36109 0.217183,-0.0883 0.181796,0.28723 0.304837,0.27758 0.827439,-0.0648 0.663854,-0.43497 0.837982,-1.34108 0.257718,-1.34108 -0.239643,0 -0.356178,-0.23971 -0.356178,-0.73262 0,-0.53882 -0.219835,-0.92724 -0.831075,-1.46839 -0.457088,-0.40467 -0.831075,-0.86079 -0.831075,-1.01359 0,-0.35934 0.768492,-1.12815 2.601826,-2.60293 0.811752,-0.65299 2.241343,-1.83902 3.176878,-2.63562 2.473451,-2.10613 3.886311,-3.00546 6.123801,-3.898 1.09357,-0.43623 2.36039,-1.04126 2.81515,-1.3445 0.45476,-0.30324 1.01718,-0.55135 1.24983,-0.55135 0.23265,0 0.61826,-0.12194 0.85689,-0.27097 0.25825,-0.16128 0.77739,-0.20652 1.28246,-0.11177 0.67714,0.12703 0.9966,0.38986 1.58122,1.30092 0.40295,0.62794 0.73264,1.3116 0.73264,1.51923 0,0.20764 0.29384,0.61098 0.65299,0.89631 0.5797,0.46057 0.8554,0.50529 2.45646,0.39839 0.9919,-0.0662 2.007,-0.22899 2.25577,-0.3617 0.24877,-0.13271 1.73453,-0.6343 3.3017,-1.11465 1.56717,-0.48034 3.06414,-1.00976 3.32661,-1.17647 0.54793,-0.34804 2.68355,-0.84247 3.63049,-0.84052 1.54031,0.003 2.32454,0.43285 2.97655,1.63081 0.35533,0.65287 1.4198,1.86335 2.44708,2.78276 1.9255,1.72331 2.68387,2.95496 2.69124,4.37076 0.006,1.09208 -0.50431,1.8732 -2.69091,4.12148 -1.77405,1.82409 -2.11749,2.49994 -1.51772,2.98676 1.36209,1.10556 1.6215,1.41603 1.7523,2.09721 0.11514,0.59962 0.0746,0.74962 -0.17834,0.66002 -0.46606,-0.16509 -1.4767,0.74155 -1.31022,1.17539 0.0753,0.1962 0.30052,0.35673 0.50052,0.35673 0.50978,0 0.45257,0.38568 -0.11633,0.78414 -0.26397,0.1849 -0.87837,0.69917 -1.36533,1.14283 -1.47576,1.34453 -2.1904,1.4327 -13.47024,1.66183 -17.77732,0.36112 -22.935186,0.40522 -26.686024,0.22819 z"/>
    <path d="m 70.557908,83.864938 c -0.629344,-0.169182 -1.434016,-0.521826 -1.788162,-0.783657 -1.254962,-0.927831 -2.553357,-1.427917 -4.523955,-1.742419 -2.343636,-0.374044 -2.640547,-0.61596 -3.192503,-2.601247 -0.548415,-1.972539 -1.772283,-3.588859 -3.42278,-4.520343 -1.888563,-1.065837 -2.757681,-1.797857 -3.99179,-3.362088 -0.955728,-1.211395 -2.950874,-5.171298 -2.950874,-5.856811 0,-0.145578 -0.09928,-0.264683 -0.220614,-0.264683 -0.36818,0 -0.771459,-2.520781 -0.597286,-3.733444 0.08961,-0.623852 0.402422,-1.66854 0.695146,-2.321529 0.292728,-0.652986 0.608072,-1.429218 0.700765,-1.724959 0.240599,-0.767646 0.518412,-0.474524 0.846515,0.893153 0.218046,0.908914 0.390988,1.187979 0.736207,1.187979 0.599961,0 0.58961,-0.986105 -0.02368,-2.255774 -0.252333,-0.522388 -0.462411,-1.243642 -0.466844,-1.602787 -0.0051,-0.415897 -0.13622,-0.652986 -0.361045,-0.652986 -0.194141,0 -0.509247,-0.373983 -0.700232,-0.831075 -0.190985,-0.457092 -0.502868,-0.831075 -0.693073,-0.831075 -0.190201,0 -0.776158,-0.347271 -1.302126,-0.771713 -0.525963,-0.424442 -1.38998,-1.085365 -1.920036,-1.468722 -0.530055,-0.383357 -1.025499,-0.891615 -1.10099,-1.129459 -0.07549,-0.237849 0.150257,-1.040193 0.501657,-1.782991 0.3514,-0.742798 0.694099,-1.783902 0.761559,-2.313563 0.195951,-1.538518 0.668935,-2.268998 1.469162,-2.268998 0.572039,0 0.713874,0.120594 0.845235,0.718688 0.257381,1.171845 1.230738,2.703196 2.433571,3.828653 0.619732,0.579867 1.629885,1.765322 2.244778,2.634345 1.71847,2.428692 1.767053,2.447486 6.114483,2.365139 4.531996,-0.08584 8.426569,0.339966 8.148879,0.89095 -0.101505,0.20141 -0.152157,1.735326 -0.112562,3.408714 0.08097,3.421962 0.250248,3.895981 1.843472,5.162115 l 0.933738,0.742043 3.086947,-0.153684 c 2.961172,-0.147425 3.120008,-0.131357 3.898329,0.394385 1.476184,0.99713 2.266876,1.356201 3.011816,1.367743 0.404987,0.0063 1.23875,0.278535 1.852802,0.605026 0.639417,0.339982 1.510928,0.593628 2.039674,0.593628 0.507773,0 0.989262,0.10685 1.069974,0.237447 0.196941,0.318655 1.146287,0.30216 1.474059,-0.02561 0.314563,-0.314563 9.861935,-0.30358 10.478343,0.01207 0.217248,0.111241 0.850209,0.390224 1.406582,0.619962 0.556371,0.229739 0.974271,0.455016 0.928671,0.500615 -0.0456,0.0456 -1.154966,-0.02709 -2.465247,-0.16156 -3.194277,-0.327792 -3.539126,-0.189327 -3.66296,1.470791 -0.133338,1.787542 0.125291,5.192993 0.709142,9.337523 0.275966,1.958962 0.503767,3.679951 0.506222,3.824421 0.0029,0.158733 -0.770712,0.324337 -1.9545,0.418503 -2.74857,0.21864 -6.619178,0.837416 -7.176963,1.147354 -0.259495,0.144187 -2.646108,0.348999 -5.342622,0.458484 -2.680495,0.10884 -5.301033,0.304064 -5.823426,0.433836 -1.295119,0.32173 -3.56046,0.279402 -4.943455,-0.09237 z"/>
    <path d="m 117.17383,72.469928 c -0.45709,-0.18991 -1.68589,-0.636782 -2.73067,-0.993046 -1.04479,-0.356268 -2.11331,-0.725137 -2.37451,-0.819714 -0.26119,-0.09457 -1.16811,-0.351605 -2.01538,-0.571173 -1.4439,-0.374192 -7.38828,-3.309482 -7.56176,-3.733941 -0.0435,-0.106516 -0.22066,-0.193665 -0.39362,-0.193665 -0.17297,0 -0.88034,-0.293844 -1.57194,-0.652986 -1.211493,-0.629114 -1.422806,-0.657328 -5.780075,-0.771713 l -4.522612,-0.118723 c -0.71653,-0.189446 -1.044843,-0.02134 -1.878902,-0.491528 -1.114445,-0.628277 -0.929239,0.182079 -1.76212,-1.395894 -0.561832,-1.064446 -0.628996,-1.439931 -0.596789,-3.336477 0.03513,-2.068553 0.970805,-6.477261 1.513469,-7.131133 0.120742,-0.14548 0.554255,-1.640659 0.963363,-3.322612 0.640615,-2.633734 0.729577,-3.372715 0.641099,-5.325277 -0.119958,-2.6472 -0.363348,-3.261654 -2.214857,-5.591475 -1.769438,-2.226547 -2.665136,-3.145944 -3.729401,-3.82807 -0.489738,-0.313891 -0.890243,-0.756363 -0.890014,-0.98327 2.39e-4,-0.230354 0.472147,-0.710578 1.068526,-1.087352 0.587455,-0.371134 1.068102,-0.764629 1.068102,-0.874433 0,-0.109804 0.18819,-0.259376 0.418199,-0.332377 0.799943,-0.253892 3.115243,-2.638913 3.93611,-4.054648 0.454338,-0.783583 1.101611,-1.682441 1.438383,-1.997465 0.56301,-0.526649 0.687056,-0.550376 1.540598,-0.294649 1.054784,0.316021 5.069431,3.896765 10.119281,9.025595 1.69777,1.724318 3.40741,3.337113 3.7992,3.583991 0.39179,0.246874 1.78088,0.666461 3.08685,0.932416 1.30597,0.265955 3.12246,0.695675 4.03665,0.954932 0.98984,0.280715 2.43049,0.477869 3.56175,0.487424 2.06181,0.0174 8.25419,-0.615997 9.02309,-0.922959 0.2612,-0.104276 1.68126,-0.585732 3.15568,-1.069905 1.47444,-0.484173 3.39778,-1.232569 4.2741,-1.663102 0.87633,-0.430536 1.8334,-0.857137 2.12683,-0.948008 0.29343,-0.09087 1.14778,-0.689396 1.89855,-1.33006 l 1.36505,-1.164843 0.33146,0.883791 c 0.40955,1.092019 0.46691,5.087971 0.10161,7.078396 -0.3957,2.156075 -0.0872,3.353638 1.32378,5.138348 0.6476,0.819139 1.41995,1.693031 1.71634,1.941978 l 0.53889,0.452626 -0.53856,0.199231 c -0.8756,0.323905 -0.53508,0.998689 0.62776,1.243995 1.17817,0.248537 1.16323,0.162017 0.74517,4.315843 -0.30155,2.996244 -0.51091,3.496079 -2.02123,4.825516 -1.05151,0.92557 -1.72343,1.340005 -5.26299,3.246139 -0.81954,0.441336 -1.94149,1.105346 -2.49323,1.475577 -0.55173,0.370227 -1.73558,1.041334 -2.63076,1.491342 -1.33259,0.669883 -2.11411,1.336447 -4.31151,3.677267 -3.19423,3.402721 -4.39673,4.170301 -6.74081,4.302803 -1.01806,0.05755 -1.85824,-0.03238 -2.39815,-0.256712 z"/>
    <path d="m 66.240818,51.87224 c -0.65299,-0.121412 -2.790037,-0.165415 -4.749002,-0.09779 -2.534396,0.08749 -3.756031,0.03887 -4.235315,-0.168583 -0.629525,-0.272474 -1.184137,-0.9162 -2.636644,-3.060285 -0.325124,-0.479925 -1.004718,-1.204955 -1.510217,-1.611182 -1.305557,-1.049177 -1.959816,-2.354845 -2.216663,-4.423689 -0.186471,-1.501976 -0.38488,-2.02393 -1.324577,-3.484546 -1.142133,-1.775262 -2.511206,-3.149724 -4.211374,-4.227939 -0.620036,-0.393212 -1.322668,-1.18188 -1.90918,-2.142953 -0.903533,-1.480547 -0.928385,-1.58039 -0.940046,-3.776527 -0.01092,-2.054028 0.04476,-2.34298 0.622445,-3.230814 0.602104,-0.925365 3.255395,-3.941056 4.750472,-5.399312 0.380935,-0.371553 0.954304,-1.090102 1.274154,-1.596779 1.048907,-1.661575 0.807475,-1.623618 8.893922,-1.398214 6.474405,0.180474 11.823631,0.52367 12.8223,0.822657 0.195893,0.05865 1.149307,0.218094 2.118691,0.354331 0.969384,0.136232 1.877634,0.34024 2.018328,0.453345 0.140689,0.113104 0.736641,0.283046 1.324326,0.377652 1.312477,0.211277 4.337621,1.198884 5.46135,1.782945 0.457092,0.237574 1.739324,0.69341 2.849402,1.012964 1.110078,0.319555 2.689118,0.77407 3.508975,1.01003 0.819858,0.235965 1.460974,0.496819 1.424703,0.579674 -0.03628,0.08285 -0.493366,0.824401 -1.015755,1.647878 -1.191074,1.877568 -3.31286,4.057883 -5.464674,5.615412 -1.278891,0.925689 -1.676667,1.353746 -1.736726,1.868928 -0.128972,1.106277 0.162032,1.766959 0.971781,2.206299 l 0.768269,0.416837 -2.547209,0.147568 c -1.400967,0.08116 -2.683195,0.260197 -2.849398,0.39785 -0.166206,0.137653 -1.779727,0.421433 -3.585608,0.630621 -3.935248,0.455849 -4.57432,0.721504 -4.736841,1.969059 -0.06432,0.493674 -0.280284,1.326337 -0.479929,1.850359 -0.337141,0.884916 -0.476493,2.224983 -0.425287,4.089675 0.01744,0.634672 0.196669,0.880176 1.030264,1.411155 1.347032,0.858028 2.315136,1.755319 2.315136,2.145797 0,0.427729 -1.297685,2.902102 -1.872241,3.569913 -0.508614,0.591166 -1.531741,0.662266 -3.707832,0.257661 z"/>
    <path d="m 150.773,49.499893 c -0.52239,-0.134664 -1.48406,-0.268414 -2.13705,-0.297222 -0.65299,-0.02881 -1.88798,-0.135921 -2.74443,-0.23803 l -1.55717,-0.185653 -1.88585,-2.135536 c -2.77868,-3.146583 -2.79641,-3.182883 -2.61849,-5.361798 0.395,-4.837332 0.4165,-5.914686 0.14308,-7.170309 -0.15745,-0.723072 -0.42893,-1.539802 -0.60329,-1.814964 l -0.31701,-0.500291 5.97883,-0.169104 c 7.64795,-0.216313 11.71152,0.08796 13.08199,0.979559 0.80425,0.523234 1.10538,0.586532 2.23545,0.469898 2.39061,-0.246735 3.86285,0.893674 5.01685,3.886085 1.14499,2.969057 0.88207,5.754887 -0.77747,8.238055 -0.63256,0.94649 -1.12326,1.317148 -3.01147,2.274748 -3.40085,1.724733 -4.73685,2.117498 -7.47967,2.198916 -1.30598,0.03874 -2.80191,-0.03969 -3.3243,-0.174354 z"/>
    <path d="m 176.29887,75.988516 c -0.1959,-0.07277 -0.51645,-0.194228 -0.71235,-0.269912 -0.1959,-0.07568 -0.44997,-0.116097 -0.5646,-0.0898 -0.11464,0.02631 -0.13674,-0.197158 -0.0491,-0.496564 0.0876,-0.299406 0.2512,-1.132065 0.36352,-1.850352 0.30626,-1.958641 0.50181,-2.621781 1.13322,-3.842936 0.69016,-1.334768 0.48791,-1.970737 -0.70296,-2.210445 -0.42553,-0.08565 -1.12942,-0.317071 -1.56421,-0.514266 -0.44118,-0.200097 -2.01704,-0.444607 -3.56602,-0.553303 -2.31383,-0.162373 -2.97226,-0.299373 -3.95847,-0.823642 -2.32859,-1.237876 -3.37474,-2.69158 -4.96272,-6.89603 -0.81358,-2.154112 -1.25412,-2.99425 -1.80542,-3.443022 -0.40108,-0.326495 -1.3387,-1.144559 -2.08359,-1.817919 -0.7449,-0.67336 -1.66162,-1.480781 -2.03717,-1.794274 l -0.68282,-0.569983 2.10752,-0.52025 c 2.01152,-0.496556 5.10054,-1.831254 6.971,-3.012021 0.65867,-0.415803 1.1283,-1.063535 1.92201,-2.650964 1.02105,-2.042096 1.05036,-2.163655 1.05036,-4.356488 0,-1.87506 -0.0895,-2.426094 -0.53046,-3.264938 -0.5102,-0.970632 -0.51299,-1.009159 -0.0734,-1.009159 0.25139,0 0.5306,0.118961 0.62045,0.264354 0.44335,0.717359 2.39693,1.219727 5.95102,1.53033 2.15054,0.187939 3.96318,0.468588 4.41926,0.684228 1.25119,0.591576 5.06499,1.316955 8.19988,1.55961 1.60331,0.124104 3.1162,0.333267 3.36198,0.464808 1.00116,0.535806 3.47755,2.256574 3.74764,2.604125 0.48755,0.62737 0.33914,2.68207 -0.43298,5.994561 -0.65484,2.809339 -0.71775,3.389148 -0.56222,5.181628 0.21792,2.511538 0.17129,4.169058 -0.14487,5.148436 -0.27901,0.864333 -2.3959,4.45856 -3.04865,5.176272 -0.55068,0.605465 -1.95491,4.430531 -2.09151,5.697175 -0.0567,0.525684 -0.004,1.217506 0.1173,1.537384 0.19262,0.50834 0.1176,0.65134 -0.59559,1.135324 -0.44879,0.304553 -1.47412,0.884473 -2.27853,1.288717 -0.80441,0.404245 -1.7781,0.957884 -2.16375,1.230312 -0.56405,0.398441 -1.12137,0.507642 -2.8494,0.55831 -1.18152,0.03464 -2.30849,0.0033 -2.50438,-0.06931 z"/>
    <path d="m 148.04232,281.39282 c -1.23907,-0.70068 -1.66215,-1.18165 -1.66215,-1.88963 0,-0.90761 -0.95013,-1.44654 -3.76169,-2.13369 -2.1637,-0.5288 -3.01566,-0.63118 -4.33347,-0.52069 l -1.64028,0.13751 v -0.72201 c 0,-0.918 -0.64153,-2.2826 -1.21821,-2.59122 -0.24417,-0.13068 -0.44394,-0.37285 -0.44394,-0.53816 0,-0.16532 0.74745,-1.04309 1.66101,-1.95061 0.91355,-0.90752 1.83506,-2.0147 2.0478,-2.46039 0.6007,-1.25851 0.26313,-3.59246 -0.79705,-5.51063 -0.0448,-0.081 1.65923,-0.22598 3.78668,-0.32216 4.11032,-0.18582 6.4373,-0.63011 8.59237,-1.64051 0.66657,-0.31253 1.85307,-0.75322 2.63666,-0.97931 0.78358,-0.2261 1.9514,-0.61393 2.59514,-0.86185 0.922,-0.35508 1.21042,-0.3868 1.35879,-0.14942 0.13041,0.20865 -0.01,0.33841 -0.4552,0.42189 -0.38203,0.0716 -0.67858,0.30255 -0.72979,0.56844 -0.0763,0.39615 0.0206,0.4308 0.83905,0.29993 0.90853,-0.14527 0.94879,-0.11964 2.22041,1.41406 0.7123,0.8591 1.76479,2.10678 2.33886,2.77261 2.19706,2.54823 2.78576,5.19132 1.84838,8.29863 -0.49053,1.62602 -1.40007,2.72423 -3.34936,4.04411 -0.79331,0.53716 -1.5845,1.117 -1.75818,1.28855 -0.55316,0.54631 -4.16824,2.59524 -4.9081,2.78177 -0.39179,0.0988 -1.24662,0.26858 -1.8996,0.37735 -0.65299,0.10876 -1.34753,0.25893 -1.54343,0.3337 -0.19589,0.0748 -0.83701,-0.13595 -1.4247,-0.46827 z"/>
    <path d="m 178.67337,256.3899 c 0,-0.27994 0.0808,-0.50899 0.17963,-0.50899 0.24649,0 0.77652,-1.76429 0.93693,-3.11867 0.1164,-0.98288 0.0574,-1.19035 -0.49632,-1.74403 -0.34564,-0.34564 -0.9419,-1.2494 -1.32503,-2.00836 -0.77473,-1.53476 -1.03479,-1.71179 -2.22972,-1.51787 -0.71668,0.1163 -0.93631,0.0224 -1.67482,-0.71612 -0.7673,-0.7673 -0.82328,-0.9086 -0.57544,-1.45254 0.151,-0.33141 0.36582,-0.60256 0.47737,-0.60256 0.11156,0 0.41456,-0.34727 0.67335,-0.77171 0.35366,-0.58004 0.47075,-1.19609 0.47141,-2.48034 l 8.2e-4,-1.70863 -1.8589,-2.18876 -1.85889,-2.18876 1.32463,-1.32694 c 2.08963,-2.09325 3.81615,-3.18578 6.84535,-4.33166 0.68564,-0.25936 1.24661,-0.55686 1.24661,-0.6611 0,-0.10424 0.46305,-0.31918 1.02901,-0.47763 1.01181,-0.28329 2.21076,-0.13542 3.60127,0.44414 0.26119,0.10887 1.43657,0.547 2.61195,0.97363 3.03175,1.10045 6.53194,2.78392 7.32278,3.52202 0.3708,0.34607 0.81965,0.90756 0.99744,1.24774 0.38327,0.73336 0.8216,3.98254 0.8216,6.0902 0,1.3977 0.0654,1.57971 0.98384,2.7369 1.39817,1.76167 1.68711,2.56559 1.50017,4.174 -0.29909,2.57348 -0.7452,3.64644 -1.84029,4.42621 -2.12007,1.50963 -2.64453,1.72305 -5.15527,2.09789 -2.95484,0.44113 -4.78731,0.77148 -6.88605,1.24137 -0.84888,0.19006 -1.7876,0.34467 -2.08604,0.34357 -0.29844,-0.001 -0.7828,0.15539 -1.07637,0.34774 -0.29357,0.19235 -1.3049,0.42139 -2.24742,0.50899 -1.64317,0.15272 -1.71367,0.13833 -1.71367,-0.34973 z"/>
    <path d="m 197.58615,235.56937 c -0.0804,-0.58693 -0.30606,-1.37613 -0.50135,-1.75379 -0.51617,-0.99816 -3.18846,-2.64611 -6.15583,-3.79618 -1.42176,-0.55104 -2.81084,-1.14458 -3.08684,-1.31898 -0.27602,-0.1744 -0.84453,-0.38849 -1.26337,-0.47576 -0.41885,-0.0873 -1.22024,-0.38609 -1.78088,-0.66407 -0.79287,-0.39312 -1.58574,-0.52712 -3.56873,-0.60315 l -2.54938,-0.0977 -0.51169,-0.82792 -0.51168,-0.82792 0.64016,-2.88576 c 0.35209,-1.58717 0.74062,-3.35412 0.8634,-3.92656 0.29305,-1.3663 0.34373,-3.89017 0.10737,-5.34648 -0.14875,-0.9165 -0.10122,-1.32605 0.22398,-1.92992 l 0.4128,-0.76653 1.58104,0.56048 c 0.86958,0.30827 1.76658,0.66918 1.99336,0.80203 0.53094,0.31104 2.48298,0.31403 2.67453,0.004 0.0807,-0.1306 0.30623,-0.23745 0.50114,-0.23745 0.75205,0 5.84263,-2.63827 5.96054,-3.08914 0.0932,-0.35629 0.26202,-0.42197 0.80539,-0.3133 0.5968,0.11936 0.68751,0.0664 0.68751,-0.40135 0,-0.52555 0.0452,-0.53544 1.83046,-0.40042 1.68353,0.12732 1.88367,0.19938 2.49323,0.89753 0.36452,0.41749 0.66276,0.84573 0.66276,0.95163 0,0.34566 1.66973,3.05128 2.29605,3.72049 1.24749,1.33295 1.35336,1.66201 1.53779,4.77957 0.13179,2.22778 0.0919,3.42335 -0.15546,4.65896 -0.18301,0.91418 -0.44867,2.7841 -0.59034,4.15538 -0.14168,1.37127 -0.36713,3.12001 -0.50101,3.88609 -0.2485,1.42194 -1.32759,3.70183 -1.75596,3.70998 -0.43479,0.008 -1.78088,1.44436 -1.78088,1.89995 0,0.93162 -0.4179,0.65924 -0.55811,-0.36377 z"/>
    <path d="m 156.82797,93.010233 c -0.1959,-0.111656 -1.22849,-0.421491 -2.29465,-0.688518 -1.21882,-0.305259 -2.49705,-0.834941 -3.44302,-1.426739 -0.8275,-0.517677 -1.86715,-1.017844 -2.31033,-1.111481 -1.1864,-0.250679 -2.23886,-0.732439 -2.67797,-1.225846 -0.21299,-0.239322 -0.79676,-1.183103 -1.29726,-2.097288 -0.81317,-1.485271 -0.90557,-1.824974 -0.8683,-3.192232 0.0491,-1.803065 -0.37853,-2.715485 -1.46202,-3.119043 -0.39849,-0.148423 -2.22756,-0.298077 -4.0646,-0.332566 -4.05583,-0.07614 -4.84559,-0.35839 -6.75154,-2.41293 -2.25836,-2.434417 -2.3745,-2.616672 -2.3745,-3.726163 0,-0.762519 0.27222,-1.530469 1.06139,-2.994258 0.58377,-1.082788 1.12523,-2.16984 1.20325,-2.415668 0.078,-0.245827 0.22991,-0.446962 0.33752,-0.446962 0.27343,0 0.95959,-1.786221 0.95959,-2.498027 0,-0.323851 0.0961,-0.588822 0.21359,-0.588822 0.11747,0 0.7853,-0.389173 1.48406,-0.864833 0.69876,-0.47566 1.9822,-1.220383 2.8521,-1.654946 2.67827,-1.337949 4.76581,-2.903777 5.73414,-4.301079 0.62934,-0.908131 0.82278,-1.945065 1.26825,-6.798359 0.12713,-1.385116 0.1303,-1.390013 0.81249,-1.253575 0.37667,0.07534 1.99611,0.310241 3.59875,0.522019 4.31802,0.570591 5.35239,1.012808 7.86481,3.362371 1.15583,1.080917 2.19314,1.965303 2.30512,1.965303 0.34181,0 1.33505,1.947511 1.63486,3.205576 0.25785,1.081992 1.9579,4.471009 2.68275,5.348024 0.56516,0.683785 2.45207,2.10442 3.15586,2.376003 0.38761,0.149568 1.88011,0.357643 3.31668,0.462391 3.08666,0.225055 5.92604,1.041169 5.732,1.64753 -0.0662,0.20702 -0.28444,0.82227 -0.48488,1.367229 -0.20043,0.544955 -0.4803,1.7162 -0.62193,2.602766 -0.14163,0.88657 -0.34448,1.722927 -0.45079,1.858573 -0.10631,0.135645 -0.26461,0.807606 -0.35178,1.493242 -0.1311,1.031097 -0.0955,1.246614 0.20586,1.246614 0.40371,0 0.50301,0.836074 0.1269,1.068525 -0.1306,0.08071 -0.23745,0.406453 -0.23745,0.723865 0,0.317412 -0.27494,1.263889 -0.61097,2.103283 -0.53669,1.340646 -0.8037,1.668684 -2.19641,2.698517 -0.87199,0.64479 -1.82552,1.298367 -2.11893,1.452392 -0.73225,0.384379 -1.48484,1.949246 -1.48484,3.087431 v 0.942578 l -2.81088,1.545914 c -1.54599,0.85025 -3.09636,1.617559 -3.44527,1.70513 -0.34891,0.08757 -0.69311,0.254238 -0.76488,0.370367 -0.16606,0.268693 -2.95329,0.263563 -3.42677,-0.0063 z"/>
    <path d="m 84.055476,64.247966 c -0.388541,-0.248052 -1.180206,-0.522052 -1.759255,-0.608884 -0.57905,-0.08684 -1.702254,-0.5439 -2.496011,-1.015698 l -1.443194,-0.857819 h -3.405262 -3.405257 l -0.898083,-1.052194 c -0.877504,-1.028093 -0.901416,-1.106967 -1.043838,-3.443026 -0.163444,-2.680918 0.105807,-3.889127 0.901642,-4.045902 2.583758,-0.508988 3.332996,-0.750777 3.332996,-1.075601 0,-0.388246 -0.432417,-0.421721 -1.869642,-0.144725 l -0.91984,0.177281 0.979201,-1.815387 c 1.264768,-2.344793 1.260799,-2.884178 -0.02996,-4.071164 -0.555039,-0.510412 -1.348755,-1.06807 -1.763815,-1.239231 -0.415055,-0.17116 -0.81453,-0.467254 -0.887723,-0.657984 -0.236305,-0.615805 0.286838,-3.391414 0.793823,-4.211736 0.270807,-0.438175 0.492378,-1.073795 0.492378,-1.412488 0,-0.713103 0.715036,-0.978709 3.324299,-1.234847 0.848884,-0.08333 2.383334,-0.302813 3.409892,-0.48774 1.026558,-0.184922 2.683782,-0.336226 3.682717,-0.336226 1.559093,0 1.858245,0.06724 2.112831,0.474901 0.306716,0.491126 1.004908,0.656101 1.004908,0.237451 0,-0.918178 2.219367,1.432205 3.561749,3.772004 0.525923,0.916696 0.469393,5.483214 -0.08558,6.913244 -0.614672,1.583851 -2.080603,6.811489 -2.330494,8.310748 -0.119721,0.718286 -0.319625,1.491518 -0.444225,1.718289 -0.286478,0.521387 -0.295474,2.666326 -0.01346,3.21202 0.117189,0.226775 0.404368,0.893149 0.638174,1.480838 0.233809,0.58769 0.581893,1.255517 0.773527,1.484065 0.322481,0.384592 0.279385,0.414242 -0.578812,0.398178 -0.509981,-0.0096 -1.245136,-0.220311 -1.633677,-0.468367 z"/>
    <path d="m 60.423295,255.56538 c 0,-2.13016 -1.145507,-4.52759 -2.66709,-5.58197 -1.289464,-0.89353 -3.687766,-3.27777 -4.101085,-4.07704 -0.174157,-0.33678 -1.126742,-1.19169 -2.116862,-1.89979 -0.990119,-0.70811 -1.800212,-1.37136 -1.800212,-1.47389 0,-0.10254 -0.228671,-0.4151 -0.508159,-0.69459 l -0.508155,-0.50815 0.567521,-0.43743 c 0.312134,-0.24059 0.709823,-0.3859 0.88375,-0.32292 0.173927,0.063 0.521199,0.11451 0.771713,0.11451 0.250511,0 0.455479,0.1472 0.455479,0.3271 0,0.8224 1.263053,1.1831 5.22314,1.49164 1.413987,0.11016 1.976459,0.27377 2.734742,0.79549 0.81263,0.5591 1.254228,0.67215 2.968881,0.75998 2.459732,0.12602 4.542634,0.87143 5.628972,2.01447 0.42092,0.44289 1.083687,0.91625 1.472815,1.0519 0.446888,0.15578 0.933996,0.63312 1.322381,1.29585 0.338188,0.57707 0.710032,1.04922 0.826322,1.04922 0.116293,0 0.279069,0.21307 0.361723,0.47349 0.08265,0.26043 0.305776,0.62899 0.495821,0.81904 0.190049,0.19005 0.440793,0.85538 0.557206,1.47851 0.116416,0.62314 0.327902,1.17172 0.46998,1.21908 0.142073,0.0474 0.258313,0.17544 0.258313,0.28463 0,0.10918 -0.398478,0.0885 -0.885507,-0.046 -0.889558,-0.24562 -1.685467,-0.12298 -5.81887,0.89666 -0.748962,0.18476 -1.666939,0.33592 -2.039949,0.33592 -1.216513,0 -2.943774,0.67061 -3.756724,1.45855 l -0.796146,0.77166 z"/>
    <path d="m 72.513237,254.88015 c -1.304847,0.0402 -2.787471,0.16973 -3.660271,0.36394 -1.044777,0.23249 -2.487453,0.50918 -3.20574,0.61486 -2.378589,0.34993 -3.536766,0.95398 -4.108386,2.14358 -0.160872,0.33478 -0.450788,0.61237 -0.644515,0.61565 -0.193722,0.003 -0.459407,0.0705 -0.590004,0.14911 -0.130597,0.0786 -1.720263,0.58684 -3.53281,1.1295 -1.812546,0.54266 -3.519121,1.14321 -3.792542,1.33473 -0.273426,0.19151 -0.71401,0.35762 -0.978796,0.36875 -0.05275,0.002 -0.08211,0.009 -0.09059,0.0208 -2.1e-4,3.5e-4 -0.0014,0.002 -0.0016,0.002 v 8.1e-4 c -1.03e-4,3.7e-4 -7.35e-4,0.002 -8.05e-4,0.002 -2.8e-5,3.9e-4 -4e-6,0.002 0,0.002 4.1e-5,4e-4 -7.4e-5,0.002 0,0.002 0.0022,0.008 0.01198,0.0188 0.02806,0.0297 l -1.85258,0.44731 h -8.01e-4 c -0.897409,-0.0248 -2.439272,0.47373 -3.664281,1.26499 -1.138201,0.73518 -2.806679,1.58314 -5.619466,2.85462 -0.41153,0.18603 -0.865749,0.33829 -1.009262,0.33829 -0.14351,0 -0.26133,0.10669 -0.26133,0.23729 0,0.1306 0.310902,0.23728 0.691009,0.23728 1.040558,0 7.923651,1.17209 8.332205,1.4189 0.450853,0.27235 3.25491,0.30986 3.418178,0.0457 0.06714,-0.10863 0.888397,-0.33453 1.824523,-0.50182 1.316454,-0.23526 1.728279,-0.40535 1.818912,-0.75194 0.142434,-0.54467 0.669362,-0.58895 0.86737,-0.0729 0.165841,0.43218 1.318872,0.28636 2.213318,-0.27977 0.686539,-0.43453 1.255361,-0.42404 1.255361,0.0233 0,0.41653 0.02676,0.41814 1.42451,0.10421 1.463366,-0.32866 2.658836,-0.91363 2.547599,-1.24734 -0.0064,-0.019 -0.01475,-0.0383 -0.02565,-0.0569 l 1.983248,-1.27861 c 0.26339,-0.054 0.498932,-0.13469 0.696619,-0.24049 0.88082,-0.4714 6.246049,-5.46813 7.145786,-6.65518 0.97121,-1.28134 1.553605,-2.32953 1.386832,-2.4963 -0.16232,-0.16232 -1.289246,-0.21176 -2.594098,-0.17155 z" />
    <path d="m 55.911743,278.15686 c 0,-0.66994 0.189992,-0.97138 1.101676,-1.74794 2.199799,-1.87375 5.546922,-5.18875 5.546922,-5.49368 0,-0.17184 0.105942,-0.31244 0.235423,-0.31244 0.129481,0 0.575725,-0.60298 0.991654,-1.33997 0.41593,-0.73699 1.156835,-1.76109 1.646459,-2.27579 0.489619,-0.51471 0.947725,-1.08568 1.018013,-1.26885 0.07029,-0.18316 0.665951,-0.66416 1.323698,-1.06887 0.657747,-0.40472 1.195905,-0.82638 1.195905,-0.93704 0,-0.11065 0.475791,-0.59106 1.057316,-1.06757 1.030018,-0.84403 1.0806,-0.8584 1.958966,-0.55658 0.495903,0.17039 1.252857,0.60674 1.682117,0.96966 0.429264,0.36292 1.300336,0.92328 1.935714,1.24525 1.133264,0.57427 1.15166,0.60123 0.967468,1.41793 -0.103271,0.45789 -0.466795,1.16413 -0.807824,1.56942 -0.341033,0.4053 -0.621013,0.80884 -0.622174,0.89677 -0.0025,0.19162 -2.496569,2.70514 -3.285427,3.3111 -0.517081,0.39719 -0.790182,1.17883 -1.142736,3.27062 -0.09953,0.5905 -0.3374,0.82193 -1.297541,1.2624 -2.723862,1.2496 -3.792568,1.49614 -6.768766,1.56147 -2.338481,0.0513 -3.075008,0.15621 -3.917924,0.55793 -0.570935,0.27209 -1.43876,0.56694 -1.928503,0.65522 -0.886217,0.15974 -0.890436,0.15667 -0.890436,-0.64904 z"/>
    <path d="m 171.31242,169.33587 c 0,-0.1989 0.1035,-0.36165 0.23,-0.36165 0.12649,0 0.16849,-0.16028 0.0933,-0.35617 -0.0752,-0.1959 -0.2504,-0.35618 -0.38939,-0.35618 -0.13899,0 -0.44611,-0.17502 -0.68249,-0.38894 -0.35003,-0.31678 -0.49659,-0.33351 -0.78982,-0.0901 -0.2552,0.2118 -0.79233,0.25149 -1.84469,0.13628 -0.81656,-0.0894 -2.0109,-0.18505 -2.65409,-0.21258 -0.64318,-0.0275 -1.21128,-0.1756 -1.26242,-0.32904 -0.25043,-0.75126 -1.10647,-1.48642 -1.90537,-1.6363 -0.4805,-0.0901 -1.38232,-0.41939 -2.00404,-0.73167 -0.877,-0.44049 -1.23429,-0.51219 -1.59371,-0.31983 -0.2548,0.13636 -0.52373,0.24793 -0.59761,0.24793 -0.0739,0 -0.13434,-1.44033 -0.13434,-3.20075 v -3.20074 l 1.00916,-0.51162 c 0.55504,-0.2814 1.06259,-0.58256 1.12789,-0.66926 0.0653,-0.0867 0.49271,-0.41803 0.9498,-0.7363 2.47773,-1.72522 6.09686,-5.30178 6.71973,-6.64067 0.60735,-1.30555 0.70528,-4.83473 0.19222,-6.92682 -0.32093,-1.30864 -0.31293,-1.37633 0.28296,-2.39313 0.33727,-0.57552 1.0669,-1.34663 1.62139,-1.71357 0.55449,-0.36695 1.46897,-1.12146 2.03218,-1.67671 0.97054,-0.9568 1.02402,-1.08061 1.02402,-2.37056 0,-1.79995 -0.6643,-6.22278 -1.06952,-7.12078 -0.1768,-0.3918 -0.54588,-1.5531 -0.82019,-2.58067 -0.46525,-1.74284 -0.47188,-1.88797 -0.0988,-2.16078 0.28925,-0.21151 0.36033,-0.49066 0.25676,-1.00848 -0.12882,-0.64411 -0.0192,-0.81763 1.09108,-1.72761 0.67886,-0.55636 2.24938,-1.48817 3.49006,-2.07068 2.22851,-1.04631 6.74403,-2.68046 7.40669,-2.68046 0.18798,0 0.6648,0.36486 1.0596,0.8108 0.57181,0.64587 0.95502,0.84107 1.88393,0.95962 0.64135,0.0819 1.54008,0.24804 1.99718,0.36929 0.45709,0.12125 1.92165,0.38255 3.25457,0.58066 2.76554,0.41102 5.40672,1.36898 5.83369,2.11588 0.19811,0.34655 0.28972,1.85543 0.29025,4.78048 8.2e-4,3.47139 0.0747,4.43688 0.3943,5.14088 0.41215,0.90778 2.27334,3.35025 3.09133,4.05681 0.8247,0.71234 3.02873,4.19798 3.42979,5.42413 0.39867,1.21889 0.38068,1.97284 -0.1384,5.79887 -0.20366,1.50117 -0.17296,2.96343 0.14638,6.97154 0.49506,6.21349 0.41381,6.6989 -1.41652,8.46271 -1.42053,1.36891 -2.09308,1.63807 -5.03122,2.01355 -2.68913,0.34366 -8.23281,1.41847 -8.5482,1.65732 -0.1306,0.0989 -2.42793,0.63705 -5.10517,1.19587 -2.67725,0.55883 -4.90334,1.10822 -4.94688,1.22087 -0.0435,0.11265 -0.22152,0.20481 -0.39553,0.20481 -0.60508,0 -6.41477,1.71331 -6.94563,2.04831 -0.46776,0.29518 -0.53426,0.29213 -0.53426,-0.0245 z"/>
    <path d="m 188.52,186.93214 c -0.54706,-0.57094 -1.41027,-1.81004 -1.91825,-2.75355 l -0.92361,-1.71547 -1.01261,0.13753 c -2.56148,0.3479 -5.89917,2.40077 -7.07739,4.35299 l -0.52097,0.86322 -0.16757,-0.99185 c -0.0922,-0.54551 -0.23966,-0.99184 -0.32776,-0.99184 -0.0881,0 -0.35777,-0.68995 -0.59927,-1.53322 -0.2415,-0.84326 -0.8639,-2.25906 -1.3831,-3.14621 -1.60913,-2.74948 -2.80215,-6.09858 -2.80215,-7.86632 0,-0.39788 -0.10685,-0.78946 -0.23745,-0.87017 -0.1306,-0.0807 -0.23745,-0.44208 -0.23745,-0.80303 0,-0.57936 0.18786,-0.74239 1.60279,-1.39099 1.79347,-0.82212 7.12704,-2.32262 12.88166,-3.624 1.11007,-0.25104 3.46083,-0.78758 5.22389,-1.19232 4.20342,-0.96494 6.20525,-1.35205 8.01394,-1.54972 1.30577,-0.1427 1.48406,-0.11335 1.48406,0.24438 0,0.2236 0.14597,0.69017 0.32437,1.03682 0.17841,0.34664 1.16447,2.3235 2.19124,4.39302 1.71403,3.45469 1.83327,3.78733 1.45651,4.06283 -0.22571,0.16503 -0.41037,0.42185 -0.41037,0.5707 0,0.33337 1.57719,0.36276 1.78088,0.0332 0.38983,-0.63076 0.55459,-0.0784 0.44264,1.48406 -0.15029,2.09757 -0.40525,2.66924 -1.36482,3.06024 -0.40698,0.16584 -1.8806,1.07486 -3.2747,2.02005 -1.39411,0.94519 -2.99689,1.94981 -3.56175,2.23249 -1.36668,0.68394 -5.65729,3.5546 -5.65729,3.78504 0,0.20477 -2.18358,1.19022 -2.63731,1.19022 -0.16143,0 -0.7411,-0.46714 -1.28816,-1.03808 z"/>
    <path d="m 159.63962,207.81764 c -0.0524,-2.96414 -0.1766,-4.6958 -0.35218,-4.91133 -0.4622,-0.56737 -1.27222,-3.86038 -1.27222,-5.17204 0,-0.68589 -0.11883,-1.48047 -0.26407,-1.76572 -0.52118,-1.02359 -2.80277,-2.9103 -4.62788,-3.82693 -1.68148,-0.84449 -2.10977,-0.95303 -4.47926,-1.1352 -1.44101,-0.1108 -3.45359,-0.13312 -4.47241,-0.0496 -2.05342,0.16831 -2.45916,-0.015 -3.19292,-1.44262 -0.69184,-1.34605 -4.87659,-5.76524 -5.69828,-6.01752 -0.42389,-0.13014 -1.03011,-0.54491 -1.34717,-0.92172 -0.31706,-0.37679 -1.03877,-0.92651 -1.6038,-1.22157 -0.56503,-0.29507 -1.51998,-0.98777 -2.12212,-1.53934 -1.04536,-0.95757 -1.10245,-1.0775 -1.26461,-2.6564 -0.0934,-0.90945 -0.22207,-1.87539 -0.28593,-2.14653 -0.0951,-0.404 0.13311,-0.62385 1.26461,-1.21801 0.7594,-0.39877 1.80813,-0.85737 2.33052,-1.01912 0.52239,-0.16175 1.27036,-0.42848 1.66215,-0.59273 0.39179,-0.16425 1.88773,-0.74748 3.3243,-1.29606 1.43657,-0.54858 2.93251,-1.14103 3.3243,-1.31655 1.18643,-0.53152 5.73616,-1.54417 6.94209,-1.54513 1.4549,-0.001 4.6477,-0.5367 7.06746,-1.18544 1.04478,-0.28011 2.05987,-0.51632 2.25577,-0.52491 0.1959,-0.009 0.46303,-0.0956 0.59363,-0.19329 0.64202,-0.48038 1.75641,-0.48399 2.64344,-0.009 0.5012,0.26863 1.15327,0.48841 1.44905,0.48841 0.53074,0 0.85949,0.2722 1.7072,1.41347 0.34872,0.46949 0.68008,0.59705 1.70926,0.65801 0.70219,0.0416 2.18494,0.15349 3.29502,0.24868 l 2.01833,0.17307 -0.045,1.00916 c -0.0247,0.55504 0.0554,1.00917 0.17809,1.00917 0.12267,0 0.22304,0.56986 0.22304,1.26637 0,1.29804 0.44411,3.98237 0.69403,4.19498 0.0768,0.0653 0.28832,0.54613 0.47013,1.06852 0.41967,1.20588 1.75952,3.9961 2.494,5.1937 0.31019,0.50578 0.85189,1.99101 1.20379,3.30051 0.35189,1.3095 0.73633,2.5519 0.85431,2.76087 0.37884,0.67108 1.20177,4.34983 1.33887,5.98515 0.17894,2.13433 0.0186,2.60876 -1.17144,3.46525 -0.55878,0.40219 -1.92664,1.63879 -3.03968,2.74801 -1.11303,1.10922 -2.23499,2.05791 -2.49322,2.10818 -0.28159,0.0548 -0.47281,0.28635 -0.47776,0.57845 -0.0158,0.93431 -1.67866,2.59446 -3.52464,3.51892 -0.96263,0.48209 -2.10342,1.19185 -2.5351,1.57725 -0.43168,0.3854 -0.86639,0.70073 -0.96602,0.70073 -0.0996,0 -0.80164,0.56924 -1.56002,1.26497 -2.27372,2.0859 -2.15447,2.24642 -2.2477,-3.02549 z"/>
    <path d="m 151.60407,158.48406 c -0.95387,-0.43181 -1.59084,-0.48734 -5.93625,-0.51749 l -4.86772,-0.0338 -1.87817,-1.18725 c -2.92381,-1.84822 -2.98955,-1.93502 -2.98955,-3.94673 0,-0.9419 -0.26555,-3.32423 -0.5901,-5.29406 -0.42684,-2.59065 -0.57465,-4.30801 -0.53426,-6.20751 0.0474,-2.23169 -0.007,-2.68882 -0.3597,-3.04444 -0.22855,-0.23015 -0.41554,-0.51395 -0.41554,-0.63068 0,-0.11672 -0.32083,-0.57763 -0.71295,-1.02422 -1.10799,-1.26194 -4.84811,-2.51446 -6.45943,-2.1632 -0.81492,0.17766 -4.05942,1.91481 -5.29375,2.83437 -0.39179,0.29187 -1.18172,0.76976 -1.7554,1.06196 -0.95309,0.48545 -1.02757,0.49352 -0.8635,0.0936 0.0988,-0.24071 0.23333,-0.62465 0.29904,-0.85319 0.0657,-0.22854 0.20071,-0.41554 0.29999,-0.41554 0.0993,0 0.42036,-0.55753 0.71351,-1.23897 0.29314,-0.68143 0.89005,-1.99121 1.32646,-2.91062 0.52313,-1.10212 1.1251,-3.15663 1.76688,-6.03027 0.53538,-2.39724 1.07053,-4.53345 1.18922,-4.74714 1.00805,-1.81485 2.60323,-5.88073 2.72407,-6.94327 0.0801,-0.7046 0.31258,-2.00842 0.51654,-2.89737 0.20395,-0.88894 0.31248,-1.97581 0.24117,-2.41525 -0.12065,-0.74349 -0.069,-0.82306 0.74283,-1.14533 0.47987,-0.19048 1.32662,-0.42195 1.88166,-0.51437 0.55503,-0.0924 1.00916,-0.24839 1.00916,-0.3466 0,-0.0982 0.77468,-0.31455 1.72151,-0.48078 0.94683,-0.16622 2.33588,-0.51219 3.08676,-0.76882 1.16981,-0.3998 1.49274,-0.42536 2.25578,-0.17857 2.69447,0.87149 3.64281,1.88762 4.47376,4.79354 0.30827,1.07806 1.16077,3.14477 1.89442,4.59271 1.93724,3.82328 1.86685,3.78838 7.98962,3.96119 3.18428,0.0899 5.15096,0.0471 5.80375,-0.12614 0.8342,-0.22142 1.07365,-0.19904 1.54343,0.14425 2.67593,1.95548 3.81179,2.30124 6.0699,1.84775 1.5014,-0.30152 1.96581,-0.10545 1.96581,0.82996 0,0.31854 0.14116,0.56455 0.32392,0.56455 0.42154,0 0.9127,1.37857 1.69198,4.749 0.34726,1.50187 0.72578,2.90903 0.84118,3.12701 0.11539,0.21798 0.28143,1.34509 0.36896,2.50469 l 0.15917,2.10835 -1.36092,1.17579 c -0.7485,0.64668 -1.76453,1.52395 -2.25784,1.94948 -0.49331,0.42553 -1.12948,1.3143 -1.41372,1.97502 -0.50749,1.17969 -0.50915,1.22132 -0.0927,2.3118 0.59958,1.56998 0.59461,5.3111 -0.009,6.42849 -0.81225,1.50475 -4.84048,5.24682 -7.74189,7.19191 l -1.77329,1.18881 -0.42256,-0.52184 c -0.47469,-0.58621 -1.13603,-0.48367 -1.13603,0.17613 0,0.29707 -0.41199,0.58396 -1.37471,0.95725 -1.60545,0.62253 -1.32533,0.62088 -2.66194,0.0158 z"/>
    <path d="m 163.41721,120.61553 c -0.48974,-0.20314 -0.89044,-0.45461 -0.89044,-0.55883 0,-0.10422 -0.49428,-0.47916 -1.09839,-0.83319 -0.9484,-0.5558 -1.24834,-0.61992 -2.19641,-0.46953 -0.60392,0.0958 -3.21485,0.16426 -5.8021,0.15213 -4.37354,-0.0205 -4.7531,-0.057 -5.40198,-0.519 -0.38385,-0.27333 -0.69791,-0.58891 -0.69791,-0.70129 0,-0.11237 -0.1557,-0.36001 -0.34599,-0.5503 -0.48561,-0.48561 -1.65777,-2.88949 -2.14762,-4.40436 -0.22647,-0.70038 -0.55879,-1.5552 -0.73849,-1.8996 -0.1797,-0.34441 -0.32739,-0.78129 -0.32819,-0.97083 -8.2e-4,-0.18955 -0.33931,-0.90208 -0.75224,-1.5834 -0.78297,-1.2919 -2.22848,-2.23878 -3.94822,-2.58627 -0.66042,-0.13344 -0.75657,-0.23503 -0.62246,-0.65759 0.0873,-0.27488 0.29761,-1.52098 0.46749,-2.76912 0.16987,-1.24814 0.38192,-2.561213 0.47121,-2.91794 0.21867,-0.873662 -0.0362,-1.778361 -0.58353,-2.071286 -1.12242,-0.600697 -7.58189,0.684486 -10.28987,2.047287 -0.56354,0.2836 -0.65299,0.281351 -0.65299,-0.01642 0,-0.18977 -0.26266,-0.551641 -0.58367,-0.804154 -1.21596,-0.956472 -1.36901,-2.639287 -0.35705,-3.925792 0.4262,-0.541823 2.12797,-5.324858 2.12797,-5.980918 0,-0.148981 0.56097,-0.85674 1.24661,-1.572793 1.63795,-1.710618 2.07769,-2.33372 2.07769,-2.944058 0,-0.694793 -1.27504,-2.55797 -2.42286,-3.540464 -1.35443,-1.159347 -2.27624,-1.534417 -4.43703,-1.805355 -1.84509,-0.231356 -1.97544,-0.213567 -4.58374,0.625511 -1.47655,0.475 -2.95178,1.006972 -3.27827,1.182163 -0.32649,0.175187 -1.39502,0.646066 -2.3745,1.046395 -0.97948,0.400328 -2.20829,0.931788 -2.73067,1.181018 -0.52239,0.24923 -1.76689,0.822759 -2.76555,1.274503 -1.27687,0.577601 -1.86671,0.981976 -1.98751,1.362583 -0.16461,0.518617 -0.18547,0.508676 -0.4994,-0.237943 -0.46381,-1.10308 -0.40674,-2.06155 0.16911,-2.840438 0.44702,-0.604628 0.48832,-0.930396 0.4127,-3.255325 l -0.084,-2.583459 -1.08498,-1.543426 c -0.59674,-0.848884 -1.22699,-1.917409 -1.40056,-2.374497 -0.17356,-0.457092 -0.4053,-0.932584 -0.51497,-1.056655 -0.10966,-0.124067 -0.19939,-0.403953 -0.19939,-0.621969 0,-0.218017 -0.44036,-0.949466 -0.97859,-1.625444 -1.04244,-1.309256 -1.12046,-1.676938 -0.22234,-1.047873 1.86847,1.308734 5.68029,2.957935 8.09279,3.501395 1.41579,0.318931 3.36725,0.961331 4.33658,1.42756 1.46382,0.704073 2.02372,0.847685 3.30485,0.847685 0.84833,0 1.90565,-0.12483 2.34958,-0.277402 1.43173,-0.492066 3.67382,-2.173087 5.17232,-3.877972 0.80351,-0.914184 1.7609,-1.982709 2.12753,-2.374501 0.68395,-0.730883 2.68765,-2.05894 2.85458,-1.892015 0.1054,0.105405 -1.20348,2.799698 -2.45731,5.058304 -0.69431,1.25071 -0.835,1.743433 -0.835,2.924373 0,1.710573 0.1519,2.021225 1.95635,4.000963 1.5278,1.676215 3.08339,2.849398 3.77818,2.849398 0.24154,0 0.43917,0.106853 0.43917,0.23745 0,0.144367 1.05772,0.237451 2.69826,0.237451 2.78295,0 5.05808,0.300415 5.48145,0.723786 0.13301,0.133006 0.25479,1.012952 0.27061,1.955436 0.0284,1.68994 0.81475,4.206826 1.31436,4.206826 0.11452,0 0.20821,0.156718 0.20821,0.348261 0,0.55013 1.56059,1.966197 2.36047,2.141881 0.39951,0.08775 0.72638,0.257903 0.72638,0.378124 0,0.120221 0.24454,0.218583 0.54342,0.218583 0.29888,0 0.91328,0.20033 1.36534,0.445173 0.45206,0.244846 1.45523,0.785602 2.22927,1.201683 3.26176,1.753316 8.11094,2.180959 10.46514,0.922898 0.65299,-0.34895 2.0955,-1.093168 3.20558,-1.653826 1.11008,-0.560653 2.05394,-1.102952 2.09748,-1.205102 0.16051,-0.376638 0.56,-0.171961 0.41284,0.211519 -0.23309,0.607431 0.35599,3.325596 1.07176,4.94538 0.11542,0.261194 0.63659,2.230228 1.15815,4.375628 0.52156,2.14541 1.04556,3.9619 1.16445,4.03665 0.69967,0.43995 0.71521,3.12295 0.0269,4.64747 -0.11792,0.2612 -0.32854,1.54343 -0.46804,2.84941 -0.33875,3.17134 -0.90714,6.02596 -1.34623,6.76117 -0.67447,1.12932 -1.31241,1.42933 -2.43397,1.14465 -0.71078,-0.18042 -1.0743,-0.18038 -1.25482,1.4e-4 -0.38325,0.38326 -0.04,0.99528 0.57318,1.02208 0.52762,0.0231 0.52627,0.0286 -0.0519,0.21378 -0.93309,0.29883 -1.94213,0.24458 -2.90877,-0.15636 z"/>
    <path d="m 73.662405,111.17293 c -0.996,-0.35521 -3.589581,-2.67697 -4.879648,-4.36823 -0.466052,-0.61099 -0.976916,-1.24077 -1.13525,-1.39952 -0.678536,-0.6803 -1.311903,-2.46446 -1.38572,-3.90349 -0.04251,-0.82868 -0.205075,-2.62863 -0.361259,-3.999906 -0.30963,-2.718547 -0.238994,-3.579875 0.490904,-5.985721 0.265791,-0.876096 0.413853,-1.7052 0.329027,-1.842455 -0.08483,-0.137254 0.186713,-0.435548 0.603426,-0.662873 0.416709,-0.227329 1.05116,-0.651808 1.40989,-0.943289 0.358731,-0.291484 1.761061,-1.065286 3.11629,-1.719565 1.976175,-0.954058 2.706959,-1.189982 3.690877,-1.191546 0.676286,-0.0012 1.265728,-0.118657 1.313515,-0.262027 0.05568,-0.167024 1.740736,-0.332673 4.709424,-0.462962 2.542501,-0.111586 5.297995,-0.318635 6.123312,-0.460113 0.82532,-0.141482 2.000699,-0.302263 2.611951,-0.357298 3.019365,-0.271845 4.079492,-0.434297 4.079492,-0.625138 0,-0.114898 0.373983,-0.208908 0.831075,-0.208908 h 0.831075 l 0.0069,2.908759 c 0.0037,1.599821 0.107334,4.297845 0.230063,5.995612 0.122725,1.697768 0.293348,4.059188 0.379162,5.247598 l 0.156028,2.160749 -0.80163,0.160206 c -0.556734,0.111266 -1.200592,0.585596 -2.107602,1.552677 -1.809948,1.92982 -2.66839,2.31244 -5.817523,2.59299 -4.165438,0.37108 -6.682012,1.41767 -8.973625,3.73193 -0.834091,0.84234 -1.630402,1.53153 -1.769577,1.53153 -0.13918,0 -0.824188,0.63632 -1.522248,1.41405 l -1.269196,1.41405 z"/>
    <path d="m 24.460945,103.07458 c -0.0919,-0.61284 -0.285923,-1.06124 -0.459193,-1.06124 -0.165029,0 -0.907318,-1.23421 -1.649529,-2.742681 -0.742215,-1.508473 -1.562319,-2.971129 -1.822454,-3.25035 -0.260131,-0.279217 -0.472968,-0.593222 -0.472968,-0.697781 0,-0.209742 -3.984369,-6.178914 -4.251211,-6.368942 -0.0917,-0.0653 -0.455618,-0.503718 -0.808714,-0.97426 C 14.259931,86.997263 11.544685,85.104012 9.1983683,83.936227 8.3141378,83.496135 7.5372531,83.066637 7.4719525,82.981783 7.4066555,82.896923 6.3997456,82.576369 5.2343775,82.269431 4.0690136,81.962494 3.0787588,81.598907 3.0338159,81.46146 2.9104834,81.084276 5.2773257,78.087658 6.8841072,76.586671 c 1.5370809,-1.435875 4.5769258,-3.77913 6.2866458,-4.846038 0.587689,-0.366734 1.121952,-0.741985 1.187248,-0.833898 0.0653,-0.09191 1.561235,-1.023402 3.324299,-2.069977 4.463535,-2.649605 4.653477,-2.760694 6.610546,-3.866413 0.958549,-0.541569 2.187535,-1.32413 2.731082,-1.739029 0.543542,-0.414895 1.682618,-1.057312 2.53128,-1.427588 0.848658,-0.370281 1.879722,-0.824188 2.291252,-1.008688 0.411529,-0.184496 0.881702,-0.335447 1.044826,-0.335447 0.60258,0 7.970064,-1.72424 8.756848,-2.049397 0.447956,-0.185128 1.529488,-0.485683 2.403409,-0.667901 2.332919,-0.486426 4.910041,-1.289329 5.261129,-1.639104 0.582017,-0.579837 1.612622,-1.158838 1.612622,-0.905979 0,0.307446 -0.52669,1.535205 -0.729544,1.700632 -0.494336,0.403119 -1.170056,3.351425 -1.170056,5.105172 0,1.931729 0.729246,4.867725 1.209047,4.867725 0.118608,0 0.215652,0.135584 0.215652,0.301294 0,0.165714 0.40768,1.100671 0.905951,2.077689 1.030802,2.021196 2.751575,4.017315 4.317948,5.008883 l 1.068526,0.676409 -1.116715,0.0045 c -0.614191,0.0025 -1.362161,0.102753 -1.66215,0.222823 -0.299988,0.120073 -2.092497,0.720618 -3.983359,1.334542 -3.975824,1.290876 -5.466447,2.243514 -5.466447,3.493535 0,0.393298 -0.199928,1.048254 -0.444291,1.455461 -0.244354,0.407204 -0.512981,1.273748 -0.596944,1.925651 -0.108475,0.842193 -0.460988,1.648954 -1.217863,2.787192 -0.585863,0.881053 -1.065201,1.6857 -1.065201,1.788108 0,0.102409 -0.296751,0.55781 -0.659446,1.012008 -0.362692,0.454199 -1.07836,1.520356 -1.590377,2.36924 -2.200631,3.648499 -4.393645,6.069979 -6.532649,7.2132 -0.458841,0.245236 -1.261661,0.756453 -1.784054,1.136046 -0.522388,0.379588 -1.495737,1.054138 -2.162994,1.498998 -0.667257,0.44487 -1.522075,1.14281 -1.8996,1.55098 -0.37752,0.40818 -0.968608,0.89207 -1.313524,1.07532 -0.626943,0.3331 -0.627161,0.3329 -0.786259,-0.72805 z"/>
    <path d="m 28.52725,178.55277 c -0.0863,-0.0863 -0.847028,-0.43356 -1.690515,-0.77171 -1.460982,-0.5857 -1.590138,-0.70478 -2.727063,-2.51441 -1.789451,-2.84826 -3.579731,-6.49833 -3.843318,-7.83585 -0.258108,-1.30973 0.173312,-7.63221 0.536089,-7.85642 0.270483,-0.16718 0.262299,-2.13026 -0.01108,-2.65396 -0.11837,-0.22678 -0.343634,-0.8907 -0.500582,-1.47539 -0.277977,-1.03556 -0.929715,-2.12209 -2.552856,-4.25597 -0.437162,-0.57471 -1.01686,-1.48296 -1.288212,-2.01832 -0.271353,-0.53536 -0.585851,-1.03311 -0.698881,-1.1061 -0.518831,-0.33504 -1.161859,-4.32075 -1.625867,-10.07764 -0.27368,-3.39553 -0.649571,-7.08194 -0.835311,-8.19202 -0.185739,-1.11007 -0.452101,-3.08989 -0.591912,-4.39958 -0.139808,-1.3097 -0.463696,-3.23304 -0.719752,-4.2741 -0.256052,-1.04106 -0.585695,-2.80109 -0.732537,-3.91117 -0.146842,-1.11007 -0.353104,-2.23203 -0.458365,-2.49322 -0.105256,-0.26119 -0.250769,-0.90648 -0.323359,-1.43397 -0.147761,-1.07372 -0.432761,-0.85735 2.825732,-2.14524 0.914185,-0.36133 1.715577,-0.73158 1.780877,-0.82278 0.09881,-0.13801 1.618196,-0.52237 5.164538,-1.30646 0.469196,-0.10374 0.53425,-0.0236 0.534168,0.65811 -7.8e-5,0.66006 0.275354,1.03708 1.840238,2.51899 1.012181,0.95851 2.225578,1.9919 2.696436,2.29644 1.259843,0.81482 2.978083,2.9434 3.256425,4.03411 0.13331,0.52239 0.365278,3.12569 0.515481,5.78511 0.297502,5.26738 0.499692,6.07395 1.700411,6.78323 0.381633,0.22544 0.948443,0.81314 1.25958,1.30602 0.311136,0.49287 1.044617,1.21335 1.629955,1.60106 0.989499,0.65542 1.032115,0.725 0.606754,0.99064 -0.251623,0.15714 -1.322907,0.5591 -2.380637,0.89323 -2.164349,0.68372 -2.706254,1.14421 -3.621608,3.07746 -0.740298,1.56354 -0.799697,3.08653 -0.168748,4.32686 1.377782,2.70847 2.347458,9.69937 2.065401,14.89053 -0.27368,5.03704 -0.230408,7.00233 0.161023,7.31309 0.197658,0.15692 0.433865,0.70903 0.524909,1.2269 0.220343,1.25337 0.720609,2.20621 1.69042,3.21971 0.888011,0.92801 1.285598,2.39132 1.281386,4.71612 -0.0025,1.30584 -0.02048,1.34144 -0.89044,1.7517 -0.488413,0.23033 -1.625481,0.84473 -2.526823,1.36534 -1.85306,1.07032 -1.675726,0.99591 -1.881971,0.78966 z"/>
    <path d="m 45.925375,130.98248 c -0.248191,0 -1.067487,0.2837 -1.821317,0.63089 -0.75383,0.34719 -2.065064,0.9392 -2.913947,1.31548 -0.848884,0.37628 -1.809234,0.81672 -2.133956,0.9788 l -0.452927,0.22606 -0.02565,-0.0649 -1.267386,0.65734 c -0.0052,-0.0696 -0.01042,-0.10964 -0.01523,-0.11864 v -8e-4 l -8e-4,-8e-4 c -0.04642,-0.0464 -0.232956,0.0638 -0.414448,0.2453 -0.514171,0.51417 -1.09215,0.76869 -3.644235,1.60327 -1.799572,0.5885 -2.556485,0.96802 -3.126382,1.56639 -1.45173,1.52426 -1.596627,3.35427 -0.504231,6.37702 0.330382,0.91418 0.72045,2.09015 0.86737,2.61253 0.475484,1.69061 1.038165,8.8772 0.882605,11.27822 l -0.146702,2.25581 0.479378,-0.8786 c 0.263399,-0.48336 0.942357,-1.19785 1.509484,-1.58804 0.567126,-0.39019 1.502887,-1.3593 2.078641,-2.15319 0.733949,-1.01202 1.374691,-1.60202 2.145177,-1.97363 0.604419,-0.29152 1.603219,-1.09079 2.218929,-1.77643 l 1.119087,-1.24654 h -0.359133 c 0.04899,-0.0374 0.07776,-0.0593 0.07776,-0.0593 l 4.010584,-0.74873 c 1.234239,0.154 1.369807,0.0383 1.580025,-0.67338 0.165156,-0.55914 0.421671,-0.82636 0.939516,-0.97799 0.391792,-0.11472 0.897923,-0.30242 1.124698,-0.41766 0.226775,-0.11523 0.626849,-0.21002 0.889817,-0.21002 0.634495,0 0.608987,-0.12307 -0.257328,-1.21689 -0.404856,-0.51117 -0.994955,-1.46507 -1.310671,-2.11952 -0.353268,-0.73228 -0.79808,-1.27531 -1.156762,-1.41169 -0.578635,-0.21999 -1.010653,-1.18318 -0.732696,-1.63293 0.07975,-0.12904 -0.121314,-0.62705 -0.446512,-1.10625 -1.110681,-1.63668 -1.059475,-2.22127 0.662151,-7.53137 0.569684,-1.7571 0.575968,-1.83976 0.145098,-1.83976 z" />
    <path d="m 65.559044,103.74689 c -0.132342,0.21422 -0.201648,0.43655 -0.236482,0.67418 -3.7e-5,2.5e-4 3.7e-5,5.4e-4 0,8e-4 l -1.138324,2.57004 c -0.152523,0.0999 -0.340721,0.26895 -0.605232,0.52267 -0.453661,0.43515 -1.192531,1.51774 -1.642555,2.40571 -0.551312,1.08782 -1.29702,2.0564 -2.285465,2.96846 -0.80685,0.7445 -2.112231,1.99496 -2.900317,2.77927 -1.447236,1.44032 -2.762278,2.52465 -3.926415,3.23701 -0.349418,0.21381 -0.850977,0.66309 -1.115077,0.99884 -0.2641,0.33575 -0.7624,0.73919 -1.107057,0.89623 -0.943826,0.43003 -0.811054,0.92153 0.204414,0.75674 0.703593,-0.11417 0.830554,-0.0663 0.828091,0.31184 -0.0017,0.28532 -0.344074,0.61036 -0.949137,0.90024 -0.775534,0.37155 -0.947532,0.57585 -0.947532,1.1279 0,0.37078 0.106685,0.67417 0.237282,0.67417 0.130597,0 0.238087,0.36505 0.238087,0.81126 0,0.66892 0.11413,0.8535 0.652534,1.05014 0.359141,0.13118 1.16781,0.24703 1.797266,0.25733 0.904083,0.0148 1.363629,-0.13208 2.187665,-0.69903 0.573731,-0.39473 1.127723,-0.84895 1.230513,-1.00926 0.349422,-0.54493 3.428472,-3.02217 3.756465,-3.02217 0.185058,0 0.394197,-0.36013 0.482585,-0.83129 0.152929,-0.81517 0.498041,-1.04055 0.945931,-0.61806 0.133035,0.12549 0.858981,0.11955 1.769212,-0.0144 0.848884,-0.12495 2.157396,-0.16227 2.908333,-0.0826 0.430205,0.0457 0.73046,0.0688 0.937116,0.0633 l 1.497453,0.61485 c 3.08e-4,2.4e-4 4.96e-4,5.7e-4 8.04e-4,8e-4 0.08971,0.069 0.204012,0.12192 0.31825,0.1467 0.344221,0.25024 0.77789,0.32781 1.062968,0.66215 -0.03361,0.1829 0.136211,0.0962 0.246102,0.11544 0.182321,-0.0595 0.622917,0.14824 0.561146,-0.16354 -0.04876,-0.47234 0.236609,-0.76864 0.450521,-1.14313 0.04387,-0.58658 0.108848,-1.13853 0.344702,-1.60247 -0.01675,-0.66217 0.400579,-1.06879 0.27015,-1.78765 0.258018,-0.45872 0.544869,-1.06022 0.976395,-1.34755 -0.0057,-0.44108 0.318873,-0.71844 0.344702,-1.14794 0.343294,-0.11084 0.08565,-0.68695 0.454527,-0.66135 0.01588,-0.47762 0.309355,-0.8109 0.38158,-1.27781 0.577978,-0.41187 -0.420395,-0.17494 -0.348712,-0.58599 -0.595369,-0.20718 -0.952647,-0.61027 -1.513489,-0.84974 -0.28225,-0.57099 -1.128647,-0.64403 -1.388433,-1.24895 -0.376971,-0.20931 -0.684939,-0.59942 -1.022889,-0.96116 -0.403616,-0.3791 -0.811788,-0.83262 -1.243335,-1.2265 -0.322296,-0.48825 -0.659606,-0.9393 -1.006056,-1.28904 -0.07927,-0.61372 -0.792662,-0.78383 -0.899433,-1.41568 -0.243993,-0.1186 -0.252494,-0.43435 -0.486595,-0.65254 0.06571,-0.43761 -0.355205,-0.5507 -0.322259,-0.90825 z" />
    <path d="m 42.495975,150.74762 -1.338732,1.45577 c -1.777023,1.93195 -1.804572,1.95652 -3.15925,2.83298 -0.645569,0.41768 -1.507821,1.24004 -1.915911,1.82773 -0.408086,0.58769 -1.285885,1.44279 -1.950379,1.89988 -1.532825,1.0544 -2.731976,3.30746 -2.731976,5.13207 0,1.85647 0.703002,3.9849 1.618503,4.90041 1.114396,1.11439 1.537151,2.29284 1.694661,4.72404 0.07491,1.15632 0.147027,2.10113 0.160325,2.09949 0.01332,-0.002 0.719115,-0.21854 1.567999,-0.48179 1.616066,-0.50116 2.374427,-0.7959 2.804927,-1.21207 l 1.876628,-0.59321 c 0.0028,0.0977 0.03081,0.15311 0.08417,0.15311 0.128265,0 1.087167,-0.22149 2.13155,-0.49221 1.044379,-0.27071 2.212863,-0.45948 2.596499,-0.41925 0.50925,0.0534 1.008006,-0.16344 1.846969,-0.80324 1.202107,-0.91674 4.630247,-2.64432 7.405515,-3.52319 l 0.653335,1.02288 c -0.0583,0.029 -0.103726,0.0559 -0.133872,0.081 -3.74e-4,3.1e-4 -0.0013,10e-4 -0.0016,0.002 l -8.01e-4,8e-4 c -0.03578,0.0512 0.147672,0.36483 0.416849,0.70704 0.275642,0.35042 0.606217,1.02396 0.735102,1.49665 0.128882,0.47269 0.513602,1.17942 0.854544,1.57121 0.340946,0.39179 0.769,0.99849 0.950742,1.34755 0.324073,0.62243 2.405969,1.62091 3.379696,1.62091 0.589515,0 1.464392,0.66796 1.495052,1.14153 0.0027,0.0415 0.0085,0.0653 0.01684,0.0729 l 8e-4,8e-4 c 3.66e-4,2.1e-4 0.002,6.5e-4 0.0024,8e-4 l 8.01e-4,8e-4 c 3.94e-4,4e-5 0.002,1e-5 0.0024,0 8.17e-4,-1.3e-4 0.0032,-4.5e-4 0.004,-8e-4 0.04075,-0.0217 0.118198,-0.28312 0.199604,-0.69662 0.201246,-1.02226 1.232947,-2.46146 2.839396,-3.96249 0.419307,-0.39179 1.505243,-1.59648 2.412926,-2.67666 2.032959,-2.41932 2.466661,-2.71401 3.97451,-2.70232 l 1.183218,0.009 -0.259733,-0.6389 c -0.293213,-0.72236 -0.368639,-4.09895 -0.113831,-5.0928 l 0.167541,-0.65333 0.120246,-1.29464 c 0.268984,-0.35543 -0.06397,-0.98432 0.37757,-1.25857 0.142069,-0.12643 -0.36946,-0.0216 -0.483385,-0.0585 -0.553586,0.15415 -0.764026,-0.37787 -1.260976,-0.2958 -0.567807,-0.0109 -1.046402,-0.3402 -1.642551,-0.28699 -0.320609,-0.3838 -0.918173,-0.11276 -1.167182,-0.47617 -0.565054,0.0226 -1.120918,0.0277 -1.489441,-0.42407 -0.383509,-0.16116 -0.676287,-0.44 -1.158362,-0.36073 -0.454663,-0.0819 -1.060411,0.1519 -1.397253,-0.23168 -0.151809,-0.0588 -0.545148,-0.0743 -0.782397,-0.0545 l -0.03046,-0.006 -4.450683,-0.56595 c -0.602379,-0.19085 -1.223856,-0.36524 -1.921522,-0.55874 -1.747992,-0.79526 -2.362344,-1.02784 -2.590888,-1.1247 -0.291821,-0.12368 -0.416048,-0.0677 -0.416048,0.18838 0,0.20058 -0.359367,0.74649 -0.799233,1.21288 -0.329171,0.34902 -0.601164,0.57204 -0.873781,0.70143 l -3.410163,-0.14509 c 0.01877,-0.10496 -0.11053,-0.18358 -0.321454,-0.18358 -0.914993,0 -2.716298,-0.78864 -3.510363,-1.53754 -0.699029,-0.65927 -0.820075,-0.93199 -0.820075,-1.84056 v -1.06617 l -1.721914,-0.2429 z" />
    <path d="m 54.864852,216.02358 c -0.316604,-0.50153 -0.771549,-1.27541 -1.01099,-1.71973 -0.239437,-0.44432 -0.729188,-1.1919 -1.088329,-1.6613 -0.359145,-0.46939 -0.65299,-0.92335 -0.65299,-1.0088 0,-0.23247 -3.187377,-5.1494 -3.887091,-5.99633 -0.334064,-0.40433 -0.995427,-1.31258 -1.4697,-2.01832 -0.474273,-0.70573 -1.016379,-1.44343 -1.204675,-1.63933 -0.622487,-0.6476 -4.936753,-6.37745 -5.942252,-7.89199 -0.543066,-0.81801 -1.130751,-1.64977 -1.305971,-1.84835 -0.17522,-0.19858 -0.574502,-0.99998 -0.887293,-1.78087 -0.312794,-0.7809 -1.160758,-2.58943 -1.884372,-4.01897 -1.322808,-2.61328 -2.878133,-4.51922 -4.742944,-5.81213 -1.216755,-0.8436 -0.96652,-1.34903 1.259776,-2.5445 1.044782,-0.56102 2.086596,-1.0235 2.31514,-1.02774 0.228544,-0.004 0.415535,-0.1007 0.415535,-0.21438 0,-0.11367 1.202094,-0.55364 2.671313,-0.9777 1.469224,-0.42406 2.99187,-0.91437 3.383661,-1.08958 0.895083,-0.40026 4.123815,-1.28779 4.684867,-1.28779 0.231171,0 0.420309,0.16028 0.420309,0.35618 0,0.44771 0.861102,0.46888 1.116087,0.0274 0.572827,-0.99169 3.145089,-2.50074 5.92136,-3.47383 1.162228,-0.40737 1.252064,-0.40801 1.899595,-0.0136 0.446175,0.27178 0.827032,0.82526 1.108589,1.61105 0.235899,0.65836 0.885658,1.82454 1.443915,2.5915 1.01986,1.40114 1.506861,1.68825 4.721799,2.7837 0.231507,0.0789 0.4574,0.27941 0.501981,0.44562 0.04459,0.16622 0.32737,1.1036 0.628409,2.08308 0.30104,0.97948 0.530524,2.02063 0.509961,2.31366 -0.06313,0.89976 0.867497,3.04638 1.457632,3.36221 0.831691,0.4451 1.26187,3.91064 1.226056,9.8771 -0.03669,6.11336 -0.253766,7.06731 -2.146717,9.43415 -0.759227,0.9493 -1.63616,1.98943 -1.948737,2.31141 -0.312577,0.32198 -0.862396,1.1768 -1.221816,1.8996 -1.2975,2.6093 -2.949073,5.07302 -4.319257,6.4432 l -1.397208,1.39721 z"/>
    <path d="m 68.830885,243.02321 c -0.08673,-0.14033 -0.03723,-0.3296 0.110018,-0.42059 0.147236,-0.091 0.539623,-0.85373 0.87197,-1.69497 0.486759,-1.23209 0.628418,-2.08361 0.728462,-4.37891 0.0683,-1.56717 0.442283,-5.20016 0.831062,-8.0733 0.700277,-5.17517 0.717675,-5.24605 1.86507,-7.5984 0.637012,-1.30598 1.368908,-2.59825 1.626441,-2.87174 0.751775,-0.79832 1.182907,-1.80463 1.814312,-4.23477 0.337203,-1.29784 0.803493,-2.50673 1.08232,-2.80602 0.269431,-0.2892 0.537291,-0.74165 0.595237,-1.00544 0.624005,-2.84065 1.597514,-6.75056 1.774823,-7.12823 0.12263,-0.26119 0.551837,-2.5051 0.953799,-4.98645 0.401959,-2.48135 0.760287,-4.61438 0.796287,-4.74007 0.09248,-0.3229 0.791791,1.13961 0.98805,2.06637 0.314785,1.48645 1.05414,2.44845 2.56877,3.34232 0.803801,0.47437 1.623387,0.99883 1.821305,1.16547 0.673893,0.56737 1.823028,2.19946 2.470334,3.50854 0.355172,0.71828 0.94028,1.62653 1.300242,2.01832 1.217567,1.32525 2.16984,2.68803 2.67277,3.82499 0.42147,0.9528 0.480278,1.431 0.371372,3.01987 -0.07784,1.13574 -0.248651,1.9615 -0.428751,2.07281 -0.164651,0.10176 -0.329192,0.56378 -0.365647,1.02671 -0.06768,0.85932 -0.623352,2.14147 -1.161198,2.67932 -0.164733,0.16473 -0.637151,1.13163 -1.049813,2.14866 -0.412662,1.01703 -1.004247,2.3834 -1.314624,3.03639 -1.318732,2.7744 -2.748701,6.41649 -2.877267,7.32833 -0.224525,1.59243 -0.606072,2.61294 -1.166299,3.11947 -0.543806,0.49168 -1.067766,0.76457 -6.053189,3.15256 -1.632471,0.78194 -3.181832,1.62131 -3.443026,1.86525 -0.54046,0.50477 -5.286811,3.72996 -6.453755,4.38539 -0.518584,0.29127 -0.823063,0.34964 -0.929075,0.17812 z"/>
    <path d="m 57.918196,241.17797 c -0.316427,-0.30648 -5.590346,-1.27577 -7.565097,-1.39038 -1.009492,-0.0586 -1.774014,-0.22852 -1.987183,-0.44169 -0.303654,-0.30365 -0.396906,-0.30081 -0.75468,0.023 -0.375481,0.33981 -0.44347,0.30396 -0.847981,-0.44717 -0.660562,-1.22659 -0.198245,-3.84089 1.180694,-6.67657 0.574108,-1.1806 1.3409,-2.89025 1.703977,-3.7992 0.682086,-1.70757 2.165757,-4.29388 3.059407,-5.33311 0.280756,-0.32649 0.97538,-1.42173 1.543611,-2.43386 1.061749,-1.89119 1.273198,-2.09911 1.509216,-1.48406 0.07518,0.1959 0.300313,0.35618 0.500307,0.35618 0.421938,0 0.486504,-0.73195 0.09877,-1.11968 -0.310775,-0.31078 0.35486,-1.25646 2.038492,-2.89612 0.591671,-0.57621 1.075761,-1.15382 1.075761,-1.28356 0,-0.12974 0.250347,-0.56654 0.556328,-0.97065 0.305982,-0.40413 0.981714,-1.54501 1.501628,-2.53529 0.971378,-1.8502 3.583367,-5.34088 3.819648,-5.1046 0.07283,0.0728 -0.200594,0.80146 -0.607616,1.61917 -0.452426,0.90893 -0.974256,2.61838 -1.342686,4.39845 -0.331453,1.60144 -0.704865,3.09737 -0.829798,3.3243 -0.124933,0.22693 -0.66674,1.7367 -1.204019,3.35504 -0.537279,1.61835 -1.124443,3.16771 -1.304814,3.44303 -0.373047,0.56943 -1.117499,5.01459 -1.575088,9.40495 -0.328732,3.15404 -0.298696,8.73479 0.05198,9.65713 0.22027,0.57935 -0.15783,0.7832 -0.620857,0.33474 z"/>
    <path d="m 93.428838,271.25699 c -1.203399,-1.14415 -3.802069,-3.14277 -4.630274,-3.56111 -0.391792,-0.1979 -1.513744,-0.4886 -2.493225,-0.646 -3.120426,-0.50144 -4.107906,-0.77568 -6.113235,-1.69776 -1.536773,-0.70664 -1.960066,-1.00779 -1.960066,-1.3945 0,-0.65047 -0.696073,-0.9091 -1.070101,-0.39759 -0.268611,0.36735 -0.329216,0.36521 -0.856099,-0.0303 -0.311863,-0.23407 -0.863409,-0.55375 -1.225658,-0.71041 -0.362248,-0.15666 -1.110217,-0.72607 -1.662149,-1.26536 l -1.003516,-0.98051 0.949802,-0.98284 c 1.310478,-1.35606 1.928655,-2.13525 2.367856,-2.98457 0.206257,-0.39886 0.532547,-0.72519 0.725092,-0.72519 0.19254,0 0.350074,-0.16993 0.350074,-0.3776 0,-0.51056 -1.215277,-2.18163 -1.676092,-2.30473 -0.229878,-0.0614 -0.486418,-0.61853 -0.677046,-1.47035 -0.216526,-0.96755 -0.562094,-1.65945 -1.173306,-2.34924 -0.871543,-0.98359 -1.078979,-1.30064 -1.972518,-3.01494 -0.267704,-0.5136 -0.798872,-1.15608 -1.180378,-1.42773 l -0.693643,-0.49392 0.540279,-0.40926 c 0.297153,-0.2251 1.286739,-0.87458 2.199076,-1.44329 0.912341,-0.56872 1.803997,-1.17924 1.981462,-1.3567 0.177461,-0.17746 0.659807,-0.49569 1.071874,-0.70716 0.412072,-0.21148 1.410884,-0.85508 2.219586,-1.43023 0.808697,-0.57516 2.090929,-1.29917 2.849398,-1.60893 0.758468,-0.30975 2.259459,-0.99931 3.335532,-1.53235 1.076074,-0.53304 1.984323,-0.9691 2.018324,-0.96901 0.03402,9e-5 0.08825,2.12925 0.120541,4.73147 0.07055,5.68561 0.305115,6.8752 2.014794,10.21812 1.316064,2.57329 1.608952,2.8278 3.744016,3.25346 0.326491,0.0651 1.234741,0.43144 2.018324,0.81412 1.825031,0.89127 4.902485,1.26271 10.566518,1.27536 3.99859,0.009 6.1737,0.3017 6.1737,0.83098 0,0.11538 -1.36237,0.86481 -3.02748,1.66541 -4.46967,2.14904 -5.79225,2.86621 -6.46183,3.50394 -0.33127,0.31552 -1.056431,0.89152 -1.61147,1.28 -0.555043,0.38849 -1.009164,0.79386 -1.009164,0.90083 0,0.10697 -0.441011,0.48633 -0.980022,0.84303 -0.970718,0.64239 -1.868161,1.40913 -3.433997,2.93386 -1.066452,1.03845 -1.090656,1.98593 -0.07743,3.03131 0.464743,0.4795 0.703404,0.94284 0.652986,1.26774 -0.07533,0.48542 -0.12266,0.47097 -0.910532,-0.27812 z"/>
    <path d="m 117.80315,247.56975 c 0.12216,-0.61076 0.0525,-0.7353 -0.53645,-0.95922 -0.37225,-0.14153 -0.73796,-0.35625 -0.81268,-0.47714 -0.0747,-0.12091 -0.7023,-0.32725 -1.39463,-0.45854 -1.74204,-0.33037 -3.44053,-1.31465 -4.22702,-2.44955 -0.812,-1.17171 -1.47107,-3.7889 -1.48442,-5.89467 -0.0171,-2.69114 1.50706,-5.3392 4.16445,-7.23548 2.49665,-1.78157 3.95279,-3.69976 4.25176,-5.60088 0.13576,-0.86327 0.15457,-0.87645 1.48957,-1.04325 1.37273,-0.17151 4.13934,-1.2603 4.44047,-1.74752 0.0907,-0.14682 1.19852,-0.79727 2.46174,-1.44545 3.63833,-1.86687 6.2566,-3.32692 6.62283,-3.69315 0.18578,-0.18579 0.83778,-0.62227 1.44889,-0.96996 0.6111,-0.34768 1.43165,-0.91971 1.82344,-1.27118 0.98336,-0.88213 3.27275,-2.13364 3.90308,-2.13364 0.28653,0 0.71098,-0.10169 0.94322,-0.22599 0.30194,-0.16159 0.69665,-0.0902 1.38526,0.25048 0.80288,0.39723 1.10561,0.76889 1.82056,2.23508 0.47165,0.96725 1.34941,2.27033 1.95057,2.89574 0.60117,0.62541 1.51555,1.99193 2.03195,3.03671 0.51641,1.04478 1.03389,2.05988 1.14997,2.25577 0.11607,0.1959 0.82064,1.62546 1.56572,3.17682 1.24979,2.60227 1.35538,2.95153 1.36397,4.51154 0.009,1.56455 -0.083,1.87981 -1.22581,4.21848 -0.67931,1.39016 -1.23512,2.71136 -1.23512,2.93599 0,0.55873 1.20319,2.72847 1.51302,2.72847 0.13767,0 -0.49372,0.36788 -1.40307,0.81751 -1.51842,0.75079 -1.74642,0.79964 -2.7933,0.59855 -0.62695,-0.12043 -1.29381,-0.37285 -1.48189,-0.56093 -1.03646,-1.03646 -3.38982,-1.03582 -4.89155,0.001 -1.08597,0.75002 -3.07207,0.99091 -4.64978,0.56397 -0.62373,-0.16878 -1.2409,-0.38467 -1.3715,-0.47975 -0.1306,-0.0951 -0.82353,-0.29645 -1.53984,-0.44751 -0.71632,-0.15105 -1.65738,-0.48408 -2.09126,-0.74008 -0.43388,-0.256 -1.20645,-0.46545 -1.71683,-0.46545 -1.01279,0 -1.41611,0.28515 -4.30571,3.04414 -0.86919,0.8299 -2.15142,1.8813 -2.8494,2.33644 -0.69798,0.45514 -1.42933,1.01443 -1.62523,1.24286 -0.1959,0.22843 -0.91399,0.80592 -1.59576,1.28332 l -1.23959,0.86801 z"/>
    <path d="m 38.221723,265.39006 c -0.780805,-0.3313 -1.543427,-1.1828 -1.543427,-1.72328 0,-0.49244 1.062689,-3.39157 1.417812,-3.86795 0.09736,-0.1306 0.465211,-1.08364 0.817452,-2.11787 0.853928,-2.50726 0.907835,-2.59592 2.826976,-4.64945 1.191341,-1.27477 1.890911,-2.28698 2.461621,-3.56175 1.545002,-3.45098 3.251664,-6.21275 4.021866,-6.5083 0.235505,-0.0904 0.550447,0.08 0.848658,0.45913 0.260805,0.33156 1.036368,0.96245 1.723473,1.40199 0.687106,0.43953 1.500643,1.15741 1.807859,1.59528 0.720265,1.02658 3.138174,3.45197 4.445824,4.45956 1.559836,1.20191 2.186205,2.65412 2.186205,5.06862 v 1.98052 l -0.890436,0.37746 c -1.916305,0.81231 -8.054737,2.57763 -8.771682,2.52261 -0.451473,-0.0346 -0.938901,0.10578 -1.205944,0.34746 -0.246513,0.22309 -0.673901,0.40562 -0.949757,0.40562 -0.275851,0 -0.568534,0.10837 -0.6504,0.24084 -0.08187,0.13246 -0.542295,0.4426 -1.023176,0.68918 -0.480881,0.24659 -1.128059,0.66984 -1.438177,0.94056 -0.59117,0.51607 -3.676763,1.78165 -4.897499,2.00875 -0.391791,0.0729 -0.926054,0.0419 -1.187248,-0.069 z"/>
    <path d="m 113.37463,140.37336 c 0,-3.76643 -1.72203,-8.45072 -4.51879,-12.29208 -1.14986,-1.57933 -1.15474,-1.59367 -0.49772,-1.46227 1.56488,0.31298 2.54268,-2.52543 2.3712,-6.88327 -0.0816,-2.07327 -0.0638,-2.1665 0.40111,-2.10324 0.45514,0.0619 0.48573,-0.0528 0.4749,-1.78087 -0.0113,-1.80151 0.0176,-1.89582 1.17184,-3.82325 1.36147,-2.27352 3.42271,-4.34155 5.47855,-5.4966 0.77624,-0.43612 1.57161,-0.92245 1.76751,-1.08074 0.1959,-0.15828 1.21099,-0.74002 2.25577,-1.29276 1.04478,-0.55273 1.93522,-1.10118 1.97876,-1.21878 0.0435,-0.1176 0.16138,-0.21382 0.2619,-0.21382 0.10051,0 1.07999,-0.53436 2.17662,-1.18747 1.09663,-0.65311 2.36786,-1.36042 2.82495,-1.571806 1.28816,-0.595717 4.90903,-1.436511 6.94541,-1.612782 2.16402,-0.187319 2.02598,-0.51468 1.49311,3.540988 -0.31522,2.39916 -0.40135,2.66419 -1.05725,3.25328 -0.74854,0.67229 -0.83571,0.70062 -5.30363,1.72411 -3.00379,0.68808 -3.88855,1.03599 -4.58129,1.80145 -0.36531,0.40367 -0.39298,0.57068 -0.15712,0.94835 0.3299,0.52826 0.37724,1.33038 0.089,1.50851 -0.23938,0.14794 -0.665,2.12215 -0.87561,4.0615 -0.11053,1.01778 -0.47967,2.069 -1.2924,3.68047 -0.86532,1.71575 -1.31969,3.05161 -1.89799,5.58008 -0.41817,1.82836 -0.85696,3.538 -0.97509,3.7992 -0.11813,0.26119 -0.31914,0.96106 -0.4467,1.55525 -0.49451,2.30351 -3.89394,9.23348 -4.72841,9.63917 -0.30759,0.14954 -0.68158,0.51327 -0.83107,0.80827 -0.31046,0.61264 -1.20958,1.30204 -1.99333,1.52839 -0.51558,0.1489 -0.53426,0.0996 -0.53426,-1.40928 z"/>
    <path d="m 128.21114,172.99791 c -0.26204,-0.82561 -2.29295,-3.65836 -3.40486,-4.74916 -1.32999,-1.30474 -3.39267,-3.54219 -4.59565,-4.98504 -2.85557,-3.42497 -4.00822,-5.79237 -4.32971,-8.89266 -0.2247,-2.16694 -0.57671,-3.21212 -1.33829,-3.97371 -0.62343,-0.62343 -0.6931,-0.84798 -0.6931,-2.2341 0,-1.65977 0.15127,-1.95891 2.19101,-4.33278 0.49271,-0.57342 0.89584,-1.13891 0.89584,-1.25663 0,-0.64779 2.25733,-2.65513 4.2741,-3.80078 0.97948,-0.5564 1.939,-1.16481 2.13227,-1.35201 0.19328,-0.1872 1.12784,-0.70909 2.07681,-1.15976 1.71281,-0.81341 1.73713,-0.81734 3.32908,-0.53912 0.88202,0.15415 2.0845,0.5131 2.67219,0.79766 0.89602,0.43386 1.19346,0.76656 1.84238,2.06081 0.67981,1.35584 0.74475,1.64424 0.53427,2.37293 -0.41628,1.44117 -0.14299,5.44798 0.46169,6.76889 0.33439,0.73049 0.72341,3.4384 0.72341,5.03558 0,2.42881 0.17803,2.89332 1.40053,3.65408 0.60098,0.37399 1.3064,0.85068 1.56759,1.05931 0.2612,0.20864 0.90231,0.61151 1.4247,0.89526 0.87761,0.47671 1.32405,0.51986 5.87371,0.5678 4.76352,0.0502 4.96068,0.0715 6.05308,0.65298 1.43541,0.76414 1.67206,0.75534 3.42025,-0.12714 0.79347,-0.40055 1.59182,-0.67103 1.7741,-0.60108 0.25998,0.0998 0.33143,0.78949 0.33143,3.19916 v 3.07198 l -1.12788,0.38646 c -1.51094,0.51771 -6.49233,1.32023 -8.19525,1.32029 -0.75271,2e-5 -1.5541,0.10445 -1.78087,0.23207 -0.22678,0.12762 -1.87918,0.60257 -3.67201,1.05544 -1.79283,0.45288 -3.71617,1.08823 -4.2741,1.41189 -0.55792,0.32366 -2.2167,0.98185 -3.68616,1.46263 -1.46947,0.48077 -3.36188,1.22756 -4.20536,1.65951 -1.42996,0.7323 -1.54317,0.75522 -1.6752,0.33924 z"/>
    <path d="m 109.60508,112.87667 c -0.1624,-1.73042 -0.34702,-4.42844 -0.41026,-5.99561 -0.0632,-1.56717 -0.27088,-3.97135 -0.46143,-5.34263 -0.43201,-3.108922 -0.82312,-7.739599 -0.98771,-11.694408 -0.12102,-2.907906 -0.1073,-3.027487 0.3473,-3.027487 0.32938,0 0.51407,-0.203918 0.60742,-0.670659 0.11314,-0.565661 0.38731,-0.774045 1.7512,-1.330968 0.88938,-0.363167 2.25817,-0.960005 3.04176,-1.326304 1.90227,-0.889246 3.00035,-1.343322 4.98645,-2.06197 0.91418,-0.330788 1.769,-0.684741 1.8996,-0.786562 0.13059,-0.101822 1.00084,-0.411148 1.93388,-0.687393 2.41944,-0.716325 4.98502,-0.345503 6.23117,0.900636 0.22659,0.22659 0.62027,0.565771 0.87485,0.75374 0.79332,0.585743 1.76407,1.900113 1.76407,2.388517 0,0.25679 -0.64263,1.117552 -1.42806,1.912796 -0.78544,0.795247 -1.48797,1.725611 -1.5612,2.067473 -0.20247,0.945275 -1.09505,3.441581 -1.32173,3.696545 -0.11031,0.124072 -0.20097,0.391201 -0.20145,0.593629 -4.1e-4,0.202423 -0.32065,1.009159 -0.71146,1.792746 -1.0138,2.032689 -0.99489,3.5722 0.059,4.800098 0.42422,0.494286 0.86197,0.964824 0.97277,1.045639 0.18124,0.132182 -1.10344,0.968042 -3.40623,2.216222 -0.45709,0.24776 -0.8845,0.52133 -0.9498,0.60793 -0.0653,0.0866 -1.02697,0.63948 -2.13705,1.22864 -6.22203,3.30225 -8.99463,6.44228 -10.07717,11.41261 -0.2867,1.31633 -0.52736,0.5809 -0.81588,-2.49323 z"/>
    <path d="m 84.146314,140.7856 c -0.01207,-0.23325 -0.03879,-1.27891 -0.05937,-2.3237 -0.02992,-1.52083 -0.16491,-2.16739 -0.676947,-3.24262 -0.351762,-0.73867 -0.73784,-1.40376 -0.85795,-1.478 -0.269243,-0.1664 -1.608415,-3.54235 -1.825849,-4.60283 -0.170216,-0.83019 -1.976224,-2.90522 -2.528559,-2.90522 -0.340995,0 -2.131366,-0.8913 -2.340102,-1.16497 -0.0653,-0.0856 -0.920119,-0.62625 -1.8996,-1.20142 -0.979481,-0.57517 -1.901209,-1.13494 -2.048281,-1.24395 -0.327488,-0.24273 0.258444,-3.67204 0.721968,-4.22551 0.164064,-0.19589 0.413656,-0.67673 0.554645,-1.06852 1.244185,-3.45742 1.579512,-4.15538 1.996431,-4.15538 0.323063,0 0.437387,-0.17774 0.437387,-0.68001 0,-0.49541 0.306186,-0.98473 1.127887,-1.80247 1.945634,-1.93624 5.054203,-4.64102 5.333884,-4.64102 0.147412,0 0.945812,-0.33019 1.774219,-0.73377 1.249939,-0.60893 2.020704,-0.78646 4.530313,-1.04348 3.333279,-0.34138 4.342123,-0.67213 5.383678,-1.76505 0.383579,-0.40249 0.837703,-0.73179 1.009164,-0.73179 0.171464,0 0.311752,-0.0838 0.311752,-0.18626 0,-0.10244 0.299685,-0.36328 0.665964,-0.57965 l 0.665964,-0.39339 -0.06102,6.21908 c -0.03357,3.4205 -0.188834,7.82188 -0.345047,9.78084 -0.336719,4.22244 -0.231885,6.09108 0.379622,6.76678 0.23977,0.26495 0.903447,0.7152 1.474834,1.00057 1.269262,0.6339 1.757203,1.13595 1.107312,1.13934 -0.87415,0.005 -2.866805,1.13062 -3.413816,1.92916 -0.301101,0.43956 -0.672198,0.90605 -0.824663,1.03665 -0.152462,0.13059 -0.656101,0.82514 -1.119198,1.54342 -0.463097,0.71829 -1.126935,1.62654 -1.475191,2.01833 -0.348257,0.39179 -1.510973,1.98176 -2.583816,3.53327 -1.96319,2.83909 -3.022607,4.01451 -4.559778,5.05904 -0.751844,0.51089 -0.836033,0.52491 -0.855845,0.14253 z m 2.775494,-14.34292 c 0.534953,-0.24965 1.095931,-0.72449 1.246611,-1.0552 0.362506,-0.79561 0.334523,-2.45772 -0.05315,-3.15683 -0.438967,-0.7916 -2.230269,-1.93367 -3.032913,-1.93367 -0.593501,0 -0.676619,-0.0875 -0.676619,-0.71234 0,-0.82749 -0.103225,-0.84503 -2.025875,-0.34424 -1.90079,0.4951 -3.198024,1.78055 -3.198024,3.169 0,3.65323 4.041506,5.75925 7.739968,4.03328 z"/>
    <path d="m 58.462162,76.089643 -2.521947,0.15231 c -1.96683,0.118784 -3.122458,0.345584 -5.252322,1.0301 -1.501869,0.482687 -2.766202,0.957805 -2.809733,1.055756 -0.04353,0.09795 -0.222617,0.177962 -0.397612,0.177962 -0.590767,0 -1.778833,1.207027 -1.778833,1.80689 0,0.317482 -0.258481,0.985667 -0.573968,1.485432 -0.315487,0.499765 -0.649854,1.432665 -0.743118,2.07303 -0.173562,1.191723 -0.623434,2.29818 -1.20486,2.963648 -0.339227,0.388257 -1.945114,2.917563 -3.681914,5.799037 -0.551025,0.91418 -1.12148,1.769282 -1.267386,1.899879 -0.145907,0.130601 -0.612369,0.726056 -1.03732,1.323502 -0.910059,1.279469 -2.322154,2.502122 -4.237445,3.669087 -2.821229,1.718944 -5.576584,3.808714 -7.738995,5.870384 -0.376696,0.35914 -0.757024,0.65529 -0.844927,0.65734 -0.0879,0.002 -0.579132,0.42975 -1.091826,0.94994 l -0.932305,0.94593 c 0,0 -0.628483,1.03461 -0.628483,1.34916 0,0.41672 2.66267,3.0937 4.210996,4.23343 0.491754,0.36199 1.404522,1.19868 2.028942,1.8598 1.455855,1.54143 1.768535,2.64951 1.952784,6.92293 0.07883,1.82837 0.193394,3.56524 0.254119,3.85908 0.02128,0.10297 0.05657,0.19548 0.0994,0.27336 l 0.175556,1.5223 c -0.35573,0.1917 -0.05354,0.7685 0.953948,1.90709 0.620339,0.70107 1.433149,1.67281 1.806085,2.15881 0.372936,0.486 1.01386,1.0932 1.424511,1.34915 0.485034,0.30231 0.982514,0.42095 1.419695,0.33909 0.945801,-0.17708 2.0578,-1.02551 2.0578,-1.5704 0,-0.30043 0.163551,-0.45934 0.474568,-0.45934 0.316599,0 0.475373,0.15877 0.475373,0.47537 0,0.56514 0.08951,0.58063 0.779992,0.13628 0.289252,-0.18614 1.21263,-0.56793 2.052188,-0.84813 2.026302,-0.67625 3.279044,-1.33308 3.63702,-1.90629 0.161204,-0.25813 0.411296,-0.46896 0.555536,-0.46896 0.14424,0 0.456234,-0.21337 0.692613,-0.47457 0.236379,-0.26119 0.565932,-0.47537 0.732697,-0.47537 0.166761,0 0.531472,-0.32006 0.810455,-0.71185 0.419828,-0.5896 0.442858,-0.71265 0.134672,-0.71265 -0.474798,0 -0.487165,-0.61764 -0.01603,-0.79843 0.245786,-0.0943 0.355927,-0.47827 0.355927,-1.23853 0,-0.73271 -0.0055,-0.97639 -0.208428,-1.01006 l 0.186782,-1.75639 c 0.246114,-0.30194 0.318101,-0.60834 0.16594,-0.85454 -0.179612,-0.29062 0.534508,-1.22811 0.935506,-1.22811 0.18711,0 0.90183,-0.50806 1.588845,-1.12951 0.687024,-0.62144 1.623154,-1.38315 2.080246,-1.69225 0.457088,-0.3091 1.579705,-1.32418 2.49389,-2.2558 0.91418,-0.93162 2.276332,-2.25286 3.026978,-2.93639 0.938305,-0.85441 1.590852,-1.72242 2.089062,-2.77687 0.469458,-0.99362 1.13839,-1.90625 1.899879,-2.59089 0.874294,-0.78607 1.175998,-1.22553 1.175998,-1.71711 0,-0.36349 0.16894,-1.3365 0.375969,-2.16201 0.320273,-1.27706 0.338825,-1.97848 0.124252,-4.701597 -0.266706,-3.384666 -0.117254,-4.989215 0.607641,-6.525319 0.21415,-0.453796 0.376109,-1.177086 0.359937,-1.607278 -0.04184,-1.112861 0.692442,-1.732901 4.290355,-3.624198 1.489355,-0.782897 1.728086,-1.183103 0.711855,-1.191229 -0.764617,-0.0061 -2.095289,-0.582814 -3.689934,-1.598466 -0.846971,-0.539447 -1.65731,-0.801454 -3.167261,-1.026095 -1.97668,-0.294082 -3.172803,-0.852655 -3.176086,-1.483026 -8.04e-4,-0.15377 -0.149473,-0.563338 -0.330271,-0.909854 -0.180798,-0.34652 -0.46226,-1.040784 -0.625277,-1.543151 -0.163018,-0.502364 -0.509485,-1.216694 -0.769571,-1.587241 z" />
  </g>
  <g id="layer4" style="display:inline; pointer-events: none;"" transform="translate(-3.0291841,-17.141564)">
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="56.709465" y="145.91458" id="text98-5">
      <tspan style="fill:#000000;stroke-width:0.820874" x="56.709465" y="145.91458" id="tspan99-1">1</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;display:inline;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="66.715225" y="141.7153" id="text98-5-4">
      <tspan style="fill:#000000;stroke-width:0.820874" x="66.715225" y="141.7153" id="tspan99-1-5">1</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="68.095306" y="209.37106" id="text98-2-3">
      <tspan style="fill:#000000;stroke-width:0.820874" x="68.095306" y="209.37106" id="tspan100-2">2</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="96.675148" y="237.72871" id="text98-2-5">
      <tspan style="fill:#000000;stroke-width:0.820874" x="96.675148" y="237.72871" id="tspan100-7">2</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="147.83018" y="212.54393" id="text98-2-2">
      <tspan style="fill:#000000;stroke-width:0.820874" x="147.83018" y="212.54393" id="tspan100-79">2</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="158.80095" y="238.32576" id="text98-2-23">
      <tspan style="fill:#000000;stroke-width:0.820874" x="158.80095" y="238.32576" id="tspan100-3">2</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="100.44448" y="105.75513" id="text98-2-8">
      <tspan style="fill:#000000;stroke-width:0.820874" x="100.44448" y="105.75513" id="tspan100-74">2</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;display:inline;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="91.315453" y="156.29454" id="text98-2-8-0">
      <tspan style="fill:#000000;stroke-width:0.820874" x="91.315453" y="156.29454" id="tspan100-74-6">2</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="69.885475" y="132.508" id="text98-2-31">
      <tspan style="fill:#000000;stroke-width:0.820874" x="69.885475" y="132.508" id="tspan100-9">2</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="46.539299" y="141.18947" id="text98-2-6">
      <tspan style="fill:#000000;stroke-width:0.820874" x="46.539299" y="141.18947" id="tspan100-5">2</tspan>
    </text>
    <text xml:space="preserve" style="font-size:3.1806px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke-width:0.26505" x="82.983383" y="124.95051" id="text98-2-60">
      <tspan style="fill:#000000;stroke-width:0.26505" x="82.983383" y="124.95051" id="tspan100-66">3</tspan>
    </text>
    <text xml:space="preserve" style="font-size:3.45936px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke-width:0.28828" x="49.160866" y="153.38083" id="text98-2-60-9">
      <tspan style="fill:#000000;stroke-width:0.28828" x="49.160866" y="153.38083" id="tspan100-66-7">3</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="103.80715" y="193.29051" id="text98-2-60-0-7">
      <tspan style="fill:#000000;stroke-width:0.820874" x="103.80715" y="193.29051" id="tspan100-66-1-7">4</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="127.19844" y="208.73755" id="text98-2-60-0-9">
      <tspan style="fill:#000000;stroke-width:0.820874" x="127.19844" y="208.73755" id="tspan100-66-1-8">4</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="75.357986" y="150.33759" id="text98-2-60-0">
      <tspan style="fill:#000000;stroke-width:0.820874" x="75.357986" y="150.33759" id="tspan100-66-1">4</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="181.78568" y="202.80522" id="text98-2-60-0-0">
      <tspan style="fill:#000000;stroke-width:0.820874" x="181.78568" y="202.80522" id="tspan100-66-1-1">5</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="166.25896" y="222.65515" id="text98-2-60-0-0-4">
      <tspan style="fill:#000000;stroke-width:0.820874" x="166.25896" y="222.65515" id="tspan100-66-1-1-7">5</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="135.88658" y="253.02757" id="text98-2-60-0-0-2">
      <tspan style="fill:#000000;stroke-width:0.820874" x="135.88658" y="253.02757" id="tspan100-66-1-1-0">5</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="163.38589" y="260.41544" id="text98-2-60-0-0-6">
      <tspan style="fill:#000000;stroke-width:0.820874" x="163.38589" y="260.41544" id="tspan100-66-1-1-1">5</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="115.3647" y="275.19119" id="text98-2-60-0-0-1">
      <tspan style="fill:#000000;stroke-width:0.820874" x="115.3647" y="275.19119" id="tspan100-66-1-1-4">5</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="69.39576" y="75.643936" id="text98-2-60-0-0-0">
      <tspan style="fill:#000000;stroke-width:0.820874" x="69.39576" y="75.643936" id="tspan100-66-1-1-8">5</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="111.26033" y="56.838348" id="text98-2-60-0-0-8">
      <tspan style="fill:#000000;stroke-width:0.820874" x="111.26033" y="56.838348" id="tspan100-66-1-1-3">5</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="146.55797" y="44.525219" id="text98-2-60-0-0-3">
      <tspan style="fill:#000000;stroke-width:0.820874" x="146.55797" y="44.525219" id="tspan100-66-1-1-49">5</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="172.00508" y="57.248791" id="text98-2-60-0-0-9">
      <tspan style="fill:#000000;stroke-width:0.820874" x="172.00508" y="57.248791" id="tspan100-66-1-1-9">5</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="57.903419" y="33.44339" id="text98-2-60-0-0-84">
      <tspan style="fill:#000000;stroke-width:0.820874" x="57.903419" y="33.44339" id="tspan100-66-1-1-99">5</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="188.62982" y="224.06894" id="text98-2-60-0-0-33">
      <tspan style="fill:#000000;stroke-width:0.820874" x="188.62982" y="224.06894" id="tspan100-66-1-1-74">6</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="181.28612" y="246.11385" id="text98-2-60-0-0-33-8">
      <tspan style="fill:#000000;stroke-width:0.820874" x="181.28612" y="246.11385" id="tspan100-66-1-1-74-0">6</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="146.28702" y="274.47131" id="text98-2-60-0-0-33-89">
      <tspan style="fill:#000000;stroke-width:0.820874" x="146.28702" y="274.47131" id="tspan100-66-1-1-74-7">6</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="149.16008" y="76.640358" id="text98-2-60-0-0-33-890">
      <tspan style="fill:#000000;stroke-width:0.820874" x="149.16008" y="76.640358" id="tspan100-66-1-1-74-78">6</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="74.870865" y="53.655853" id="text98-2-60-0-0-33-1">
      <tspan style="fill:#000000;stroke-width:0.820874" x="74.870865" y="53.655853" id="tspan100-66-1-1-74-2">6</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="60.846783" y="253.91501" id="text98-2-60-0-0-33-6">
      <tspan style="fill:#000000;stroke-width:0.820874" x="60.846783" y="253.91501" id="tspan100-66-1-1-74-26">7</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="64.980667" y="275.22849" id="text98-2-60-0-0-33-6-1">
      <tspan style="fill:#000000;stroke-width:0.820874" x="64.980667" y="275.22849" id="tspan100-66-1-1-74-26-9">7</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="62.130768" y="264.43109" id="text98-2-60-0-0-33-6-5">
      <tspan style="fill:#000000;stroke-width:0.820874" x="62.130768" y="264.43109" id="tspan100-66-1-1-74-26-2">7</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="182.09566" y="147.20052" id="text98-2-60-0-0-33-6-18">
      <tspan style="fill:#000000;stroke-width:0.820874" x="182.09566" y="147.20052" id="tspan100-66-1-1-74-26-1">8</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="186.65723" y="178.83211" id="text98-2-60-0-0-33-6-18-5">
      <tspan style="fill:#000000;stroke-width:0.820874" x="186.65723" y="178.83211" id="tspan100-66-1-1-74-26-1-2">8</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="153.74222" y="186.24524" id="text98-2-60-0-0-33-6-18-7">
      <tspan style="fill:#000000;stroke-width:0.820874" x="153.74222" y="186.24524" id="tspan100-66-1-1-74-26-1-22">8</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="141.83952" y="139.45537" id="text98-2-60-0-0-33-6-18-6">
      <tspan style="fill:#000000;stroke-width:0.820874" x="141.83952" y="139.45537" id="tspan100-66-1-1-74-26-1-9">8</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;display:inline;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="48.259735" y="193.63312" id="text98-2-60-0-0-33-6-18-6-0">
      <tspan style="fill:#000000;stroke-width:0.820874" x="48.259735" y="193.63312" id="tspan100-66-1-1-74-26-1-9-5">8</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;display:inline;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="79.452995" y="224.00552" id="text98-2-60-0-0-33-6-18-6-2">
      <tspan style="fill:#000000;stroke-width:0.820874" x="79.452995" y="224.00552" id="tspan100-66-1-1-74-26-1-9-8">8</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;display:inline;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="81.50518" y="257.66141" id="text98-2-60-0-0-33-6-18-6-1">
      <tspan style="fill:#000000;stroke-width:0.820874" x="81.50518" y="257.66141" id="tspan100-66-1-1-74-26-1-9-2">8</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;display:inline;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="129.5264" y="233.03516" id="text98-2-60-0-0-33-6-18-6-4">
      <tspan style="fill:#000000;stroke-width:0.820874" x="129.5264" y="233.03516" id="tspan100-66-1-1-74-26-1-9-4">8</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;display:inline;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="44.976234" y="258.07187" id="text98-2-60-0-0-33-6-18-6-07">
      <tspan style="fill:#000000;stroke-width:0.820874" x="44.976234" y="258.07187" id="tspan100-66-1-1-74-26-1-9-7">8</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;display:inline;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="51.132801" y="235.08733" id="text98-2-60-0-0-33-6-18-6-3">
      <tspan style="fill:#000000;stroke-width:0.820874" x="51.132801" y="235.08733" id="tspan100-66-1-1-74-26-1-9-82">8</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="148.40652" y="107.44123" id="text98-2-60-0-0-33-6-18-4">
      <tspan style="fill:#000000;stroke-width:0.820874" x="148.40652" y="107.44123" id="tspan100-66-1-1-74-26-1-91">8</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="113.93997" y="121.80655" id="text98-2-60-0-0-33-6-18-3">
      <tspan style="fill:#000000;stroke-width:0.820874" x="113.93997" y="121.80655" id="tspan100-66-1-1-74-26-1-93">8</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="25.275217" y="80.762779" id="text98-2-60-0-0-33-6-18-9">
      <tspan style="fill:#000000;stroke-width:0.820874" x="25.275217" y="80.762779" id="tspan100-66-1-1-74-26-1-7">8</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="77.40081" y="100.05335" id="text98-2-60-0-0-33-6-18-76">
      <tspan style="fill:#000000;stroke-width:0.820874" x="77.40081" y="100.05335" id="tspan100-66-1-1-74-26-1-6">8</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="62.132046" y="118.5921" id="text98-2-60-0-0-33-6-18-44">
      <tspan style="fill:#000000;stroke-width:0.820874" x="62.132046" y="118.5921" id="tspan100-66-1-1-74-26-1-1">8</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="19.529102" y="142.73886" id="text98-2-60-0-0-33-6-18-35">
      <tspan style="fill:#000000;stroke-width:0.820874" x="19.529102" y="142.73886" id="tspan100-66-1-1-74-26-1-5">8</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="36.380707" y="147.51152" id="text98-2-60-0-0-33-6-18-53">
      <tspan style="fill:#000000;stroke-width:0.820874" x="36.380707" y="147.51152" id="tspan100-66-1-1-74-26-1-61">8</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;display:inline;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="127.73161" y="161.4725" id="text98-2-60-0-0-33-6-18-6-7">
      <tspan style="fill:#000000;stroke-width:0.820874" x="127.73161" y="161.4725" id="tspan100-66-1-1-74-26-1-9-29">9</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;display:inline;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="58.979221" y="169.40889" id="text98-2-60-0-0-33-6-18-6-7-3">
      <tspan style="fill:#000000;stroke-width:0.820874" x="58.979221" y="169.40889" id="tspan100-66-1-1-74-26-1-9-29-2">9</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;display:inline;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="42.151276" y="108.66412" id="text98-2-60-0-0-33-6-18-6-7-5">
      <tspan style="fill:#000000;stroke-width:0.820874" x="42.151276" y="108.66412" id="tspan100-66-1-1-74-26-1-9-29-3">9</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;display:inline;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="87.299416" y="117.28331" id="text98-2-60-0-0-33-6-18-6-7-2">
      <tspan style="fill:#000000;stroke-width:0.820874" x="87.299416" y="117.28331" id="tspan100-66-1-1-74-26-1-9-29-6">9</tspan>
    </text>
    <text xml:space="preserve" style="font-size:9.8505px;text-align:start;writing-mode:lr-tb;direction:ltr;text-anchor:start;display:inline;fill:#000000;fill-opacity:1;stroke-width:0.820874" x="114.3883" y="96.761429" id="text98-2-60-0-0-33-6-18-6-7-34">
      <tspan style="fill:#000000;stroke-width:0.820874" x="114.3883" y="96.761429" id="tspan100-66-1-1-74-26-1-9-29-0">9</tspan>
    </text>
  </g>
</svg>
    `
    
    svgCont.classList.add("svgCont")
    artContatiner.appendChild(svgCont)
    riddleBody.appendChild(artContatiner)

    setInterval(() => {
        const svg = document.querySelector("#mySvg");
        // svg.style.transform = "scale(0.75)"
        svg?.addEventListener("click", (e) => {
            const path = e.target.closest("path");
            if (!path || !svg.contains(path)) return;
            path.classList.remove(...path.classList);
            path.classList.add(currentColor);
            clearInterval()
        });
    }, 100);

    
    

    return riddleBody
}

const mobiusRiddle = (lang) => {
    const riddleBody = document.createElement('div')

    let text;
    if (lang == "EN") {
        text = document.createTextNode(
            `Today's craft lesson includes some maths tutoring. It's about a special object, the Möbius strip. You can make a Möbius strip by closing a strip of paper into a ring and twisting it once. The elves are surprised to discover that this strip is something very special: it seems to have only one side and only one edge. What happens if you cut the Möbius strip exactly in the middle (between the blue and the red)? And how does the result change if you rotate the strip twice before closing it? Can you predict what will happen in each case?`
        );
    } else {
        text = document.createTextNode(
            `Heute gibt es in der Bastelstunde etwas Mathematik-Nachhilfe. Es geht um ein besonderes Objekt das Möbiusband. Ein Möbiusband kann man basteln, indem man einen Papierstreifen zu einem Rin schließt und ihn dabei einmal verdreht. Die Wichtel stellen dabei überrascht fest, dass dieses Ban etwas ganz Besonderes ist: Es scheint nur eine einzige Seite und nur eine einzige Kante zu haben. Wa passiert, wenn man das Möbiusband genau in der Mitte entlangschneidet (zwischen rot und blau) Und wie verändert sich das Ergebnis, wenn man den Streifen zweimal rotiert, bevor man ihn schließt Kannst du vorhersagen, was jeweils entsteht?`
        );
    }
    const textElement = document.createElement('p');
    textElement.appendChild(text);
    textElement.classList.add('riddleText', 'hori');

    riddleBody.appendChild(textElement)

    const image1 = document.createElement('img');
    image1.src = `./images/mobiusRiddle/0.jpg`;
    image1.style.width = '50%';
    const image2 = document.createElement('img');
    image2.src = `./images/mobiusRiddle/1.jpg`;
    image2.style.width = '50%';

    const imageCont = document.createElement('div');
    imageCont.classList.add('wreath-image', 'egypt-riddle');

    imageCont.appendChild(image1)
    imageCont.appendChild(image2)

    riddleBody.appendChild(imageCont)

    return riddleBody
}

const finalRiddle = (lang) => {
    const riddleBody = document.createElement('div')
    riddleBody.style.overflow = 'scrolls'

    let text;
    if (lang == "EN") {
        text = document.createTextNode(
            `
The 24th is here,
hooray, hooray!

We wish you a truly wonderful and merry christmas! But before we let you drift off into heavenly peace, you get to use your thinking cap one last time to find all the differences in the christmas chaos.

The final results Will be uploaded on Boxing Day.

God jul. Frohe Weihnachten. Joyeux Noël. Vrolijk kerstfeest.
Merry Christmas. Hyvää joulua.

Your secret santas Ines, Nikolai, Tim

Can you find all of the diffrences from the picture sent to you?`
        );
    } else {
        text = document.createTextNode(
`Der 24. ist da,
hurra, hurra!

Wir wünschen Dir eine ganz tolle und frohe Weihnacht! Bevor wir Dich aber in die himmlische Ruh’ entlassen, darfst Du noch ein letztes Mal Deine Denkmaschine benutzen, um im Weihnachtschaos alle Unterschiede festzustellen.

Die finalen Ergebnisse werden am zweiten Weihnachtstag hochgeladen.

God jul. Frohe Weihnachten. Joyeux Noël. Vrolijk kerstfeest.
Merry Christmas. Hyvää joulua.

Eure Wichtel Ines, Nikolai, Tim

Können Sie alle Unterschiede zu dem Ihnen zugesandten Bild finden?`
        );
    }
    const textElement = document.createElement('p');
    textElement.appendChild(text);
    textElement.classList.add('riddleText', 'hori', 'christmasText');

    riddleBody.appendChild(textElement)

    const image = document.createElement('img');
    image.src = `./images/finalRiddle/image.png`;
    image.classList.add('wreath-image', 'egypt-riddle');

    riddleBody.appendChild(image)

    return riddleBody
}

const riddleLib = [
    {
        title: "Wreath Riddle",
        riddle: wreathRiddle,
    },
    {
        title: "Sudoku Riddle",
        riddle: sudokuRiddle,
    },
    {
        title: "Match Riddle",
        riddle: matchRiddle,
    },
    {
        title: "Map Riddle",
        riddle: mapRiddle,
    },
    {
        title: "Earth Riddle",
        riddle: earthRiddle,
    },
    {
        title: "Nikolaus Riddle",
        riddle: nikolausRiddle,
    },
    {
        title: "Sock Riddle",
        riddle: sockRiddle,
    },
    {
        title: "Message Riddle1",
        riddle: messageRiddle1,
    },
    {
        title: "Message Riddle2",
        riddle: messageRiddle2,
    },
    {
        title: "Inequality Riddle",
        riddle: inequalityRiddle,
    },
    {
        title: "Maze Riddle",
        riddle: mazeRiddle,
    },
    {
        title: "Shape Riddle",
        riddle: shapeRiddle,
    },
    {
        title: "Sphinx Riddle",
        riddle: sphinxRiddle,
    },
    {
        title: "Food Riddle",
        riddle: foodRiddle,
    },
    {
        title: "Dice Riddle",
        riddle: diceRiddle,
    },
    {
        title: "Scramble Riddle",
        riddle: scrambleRiddle,
    },
    {
        title: "Picture Riddle",
        riddle: picturesRiddle,
    },
    {
        title: "Search Riddle",
        riddle: wordSearchRiddle,
    },
    {
        title: "Detective Riddle",
        riddle: detectiveRiddle,
    },
    {
        title: "Music Riddle",
        riddle: musicRiddle,
    },
    {
        title: "Elves Riddle",
        riddle: elvesRiddle,
    },
    {
        title: "Art Riddle",
        riddle: CBNRiddle,
    },
    {
        title: "Möbius Riddle",
        riddle: mobiusRiddle,
    },
    {
        title: "Final Riddle",
        riddle: finalRiddle,
    },


];

const openRiddle = (num, lang) => {    
    num = (((num - 1) % riddleLib.length) + riddleLib.length) % riddleLib.length + 1;
    const idx = num - 1;

    const header = document.createElement('div');
    header.innerText = `#${num} ` + riddleLib[idx].title;

    const riddleBody = document.createElement('div');
    riddleBody.classList.add("riddlebody");

    riddleBody.append(riddleLib[idx].riddle(lang));

    openModal(header, riddleBody, null, null, true);
};