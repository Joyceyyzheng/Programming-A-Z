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
    let resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; // Clear previous results

    if (Object.keys(charactersWithRadical).length === 0) {
        resultDiv.innerHTML = '<p>No characters with the radical found.</p>';
    } else {
        for (let char in charactersWithRadical) {
            resultDiv.innerHTML += `<p>Character: ${char}, Count: ${charactersWithRadical[char].count}, Components Level 1: ${charactersWithRadical[char].components}</p>`;
        }
    }
}

document.getElementById('analyzeButton').addEventListener('click', function () {
    let sentence = document.getElementById('sentenceInput').value;
    analyzeSentenceWithRadical(sentence, '女');
});

