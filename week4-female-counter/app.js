//Require
var hanzi = require("hanzi");
//Initiate
hanzi.start();


function analyzeSentence(sentence) {
    // Decompose each character in the sentence
    let decomposition = hanzi.decomposeMany(sentence);
    console.log(decomposition);

    // Optional: Process further if needed
    for (let char in decomposition) {
        console.log(`Character: ${char}`);
        console.log(`Components Level 1: ${decomposition[char].components1}`);
        // console.log(`Components Level 2: ${decomposition[char].components2}`);
        // console.log(`Components Level 3: ${decomposition[char].components3}`);
    }


}

// Example usage
//analyzeSentence('女人追求关系，男人追求占有。—小仓千加子一语道破。女人的嫉妒指向夺去男人的其他女人，而男人的嫉妒则指向了背叛自己的女人。因为女人的背叛是对男人所有权的侵犯，建立在占有一个女人的基础上而得以维系的男人的自我，会因此面临崩溃的危机。对于女人，嫉妒是以其他女人为对手围绕男人展开的竞争；而对于男人，嫉妒则是维护自尊和自我确认的争斗。');

/////
function characterFrequency(character, text) {
    // Count occurrences of the character in the given text
    const count = (text.match(new RegExp(character, 'g')) || []).length;

    // Get frequency data from the corpus
    const corpusData = hanzi.getCharacterFrequency(character);

    // Output both counts and corpus data
    console.log(`Frequency in text: ${count}`);
    // console.log('Corpus data:', corpusData);
}

// Example usage
let sentence = '这是一个热热的夏天，非常热。';
characterFrequency('热', sentence);