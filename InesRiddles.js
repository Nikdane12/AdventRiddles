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
    const riddleText = "The elves are sitting around a campfire discussing magic, plants, films and tea. They cannot agree on which symbols belong to which categories. Can you help? There are three symbols for each category. Connect them to form a triangle. (You will have four triangles.) Count how many individual lines can be found from other triangles in each triangle. The numbers correspond to letters. Can you find the correct solution word?";

    const photoPos = [ // in %
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
    // This riddle uses a different text layout (100% width, 50% height, then image below), 
    // so we keep the .hori class which CSS will handle.
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
    // Removed: if(orientation == 'P'){ container.classList.add('vert') }

    const textElement = document.createElement('p');
    textElement.appendChild(text)
    textElement.classList.add('riddleText')
    // Removed: if(orientation == 'L'){ textElement.classList.add('vert') }

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

}

const riddleLib = [
    {
        title: "#74 Wreath Riddle",
        riddle: wreathRiddle,
    },
    {
        title: "#82 Sudoku Riddle",
        riddle: sudokuRiddle,
    },
    {
        title: "#65 Match Riddle",
        riddle: matchRiddle,
    },
    {
        title: "#52 Map Riddle",
        riddle: mapRiddle,
    },
    {
        title: "#59 Inequality Riddle",
        riddle: inequalityRiddle,
    },
    
    
    

    // {
    //     title: ""29 Elves Riddle",
    //     riddle: elvesRiddle,
    // },


];

const openRiddle = (num, lang) => {    
    num = (((num - 1) % riddleLib.length) + riddleLib.length) % riddleLib.length + 1;
    const idx = num - 1;

    const header = document.createElement('div');
    header.innerText = riddleLib[idx].title;

    const riddleBody = document.createElement('div');
    riddleBody.classList.add("riddlebody");

    riddleBody.append(riddleLib[idx].riddle(lang));

    openModal(header, riddleBody, null, null, true);
};