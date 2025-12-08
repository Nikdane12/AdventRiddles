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
            subsubText.appendChild(document.createTextNode('Nikolaus Day is full of joyful and magical moments! Imagine a man in a big red coat trying to sneak around quietly - but he always ends up tripping over shoes or dropping mandarins and M&M everywhere. Kids leave out their shoes and sometimes when the kids were well- behaved the Nikolaus fills them! Sometimes the kids are clever, and they will use the shoes of their parents. So, there is more to fill . The excitement in the morning make this tradition a magical part of the holiday season.'))
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
        title: "#12 Earth Riddle",
        riddle: earthRiddle,
    },
    {
        title: "#06 Nikolaus Riddle",
        riddle: nikolausRiddle,
    },
    {
        title: "#42 Sock Riddle",
        riddle: sockRiddle,
    },
    {
        title: "#09 Message Riddle1",
        riddle: messageRiddle1,
    },
    {
        title: "#39 Message Riddle2",
        riddle: messageRiddle2,
    },
    {
        title: "#59 Inequality Riddle",
        riddle: inequalityRiddle,
    },
    
    
    

    // {
    //     title: "#29 Elves Riddle",
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