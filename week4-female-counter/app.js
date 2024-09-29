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
}

// Example usage
let sentence = '女人追求关系，男人追求占有。—小仓千加子一语道破。女人的嫉妒指向夺去男人的其他女人，而男人的嫉妒则指向了背叛自己的女人。';
analyzeSentenceWithRadical(sentence, '女');
