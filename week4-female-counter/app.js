var hanzi = require("hanzi");
hanzi.start();  // Start the Hanzi module

function analyzeSentenceWithRadical(sentence, radical) {
    let decomposition = hanzi.decomposeMany(sentence);
    let radicalCharCount = {};
    let charactersWithRadical = {};

    // Process each character's decomposition to find the specified radical
    for (let char of sentence) {
        if (!decomposition[char]) continue;  // Skip if no decomposition available
        let components = decomposition[char];
        let foundRadical = false;

        // Check each decomposition level for the radical
        ['components1', 'components2', 'components3'].forEach(level => {
            if (components[level] && components[level].includes(radical)) {
                foundRadical = true;
            }
        });

        if (foundRadical) {
            if (!charactersWithRadical[char]) {
                charactersWithRadical[char] = {
                    count: 0,
                    components: components.components1  // Store Level 1 components
                };
            }
            charactersWithRadical[char].count++;
            radicalCharCount[char] = (radicalCharCount[char] || 0) + 1;
        }
    }

    // Log the characters and their counts
    for (let char in charactersWithRadical) {
        console.log(`Character: ${char}, Count: ${charactersWithRadical[char].count}`);
        console.log(`Components Level 1: ${charactersWithRadical[char].components}`);
    }

    console.log(`Total instances of characters containing the radical '${radical}':`);
    Object.keys(radicalCharCount).forEach(char => {
        console.log(`${char}: ${radicalCharCount[char]}`);
    });

    //html
    // let resultDiv = document.getElementById('result');
    // resultDiv.innerHTML = ''; // Clear previous results

    // if (Object.keys(charactersWithRadical).length === 0) {
    //     resultDiv.innerHTML = '<p>No characters with the radical found.</p>';
    // } else {
    //     for (let char in charactersWithRadical) {
    //         resultDiv.innerHTML += `<p>Character: ${char}, Count: ${charactersWithRadical[char].count}, Components Level 1: ${charactersWithRadical[char].components}</p>`;
    //     }
    // }
}

let sentence = '女人追求关系，男人追求占有。—小仓千加子一语道破。女人的嫉妒指向夺去男人的其他女人，而男人的嫉妒则指向了背叛自己的女人。因为女人的背叛是对男人所有权的侵犯，建立在占有一个女人的基础上而得以维系的男人的自我，会因此面临崩溃的危机。对于女人，嫉妒是以其他女人为对手围绕男人展开的竞争；而对于男人，嫉妒则是维护自尊和自我确认的争斗';
analyzeSentenceWithRadical(sentence, '女');

// document.getElementById('analyzeButton').addEventListener('click', function () {
//     let sentence = document.getElementById('sentenceInput').value;
//     analyzeSentenceWithRadical(sentence, '女');
// });

