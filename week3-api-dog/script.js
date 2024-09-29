console.info("huh")

let line;
// fetch('https://dog-api.kinduff.com/api/facts') // Adjusted to HTTPS and correct endpoint
//     .then(response => {
//         console.log(response); // Log the response object
//         if (!response.ok) {

//             throw new Error(`HTTP error! status: ${response.status}`);
//         } else if (!response.headers.get("content-type")?.includes("application/json")) {
//             throw new Error("Not a JSON response");
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log('Data fetched successfully:', data);
//         dogdata = data;
//     })
//     .catch(error => {
//         console.error('Error fetching data:', error);
//     });

async function fetchDogData() {
    try {
        const response = await fetch('https://dog-api.kinduff.com/api/facts')
        console.log("res", response)
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }

}

// async function handleDogData() {
//     try {
//         const dogdata = await fetchDogData()
//         line = dogdata.facts[0]
//         console.log(line)
//     } catch (error) {
//         console.error('Error handling dog data:', error);
//     }
// }

// handleDogData()

async function updateDogData() {
    const data = await fetchDogData();
    const dogFact = data.facts[0];  // Assuming the API returns an object with a facts array
    document.getElementById('fact').textContent = dogFact;
}

document.getElementById('getData').addEventListener('click', updateDogData);