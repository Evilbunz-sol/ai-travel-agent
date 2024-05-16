export async function fetchReport(formData) {    
    const userMessage = `I need travel arrangements for ${formData.numberOfTravellers} person(s) from ${formData.flyingFrom} to ${formData.flyingTo} between ${formData.dateFrom} and ${formData.dateTo} with a budget of $${formData.budget}. Please suggest the best and only 1 hotel, flight, and three activities i can do. Also, provide the current weather in ${formData.flyingTo}.`;


    const messages = [
        {
            role: "system",
            content: `You are a helpful AI Travel Agent. Provide concise travel advice formatted as a single JSON object. Include the name of the best hotel along with a brief reason why it is good (approximately 15 words), the name of the flight company and a brief description explaining why it is the best option (approximately 15 words), and list three activities, each with descriptions under 50 words in total. You will also have a function available to you to get the weather information, use the tools to add the information. Use the following JSON structure as a template for returning the data:
            {
                "hotel": "Example Hotel - Provides luxurious rooms and central location.",
                "flight": "Example Airlines - Reliable service, direct flights, good amenities.",
                "activity_1": "Visit iconic landmark A as it explores the history of art.",
                "activity_2": "Explore cultural site B and learn the history of the city.",
                "activity_3": "Stroll through area C and find the best restaurants in town.",
                "weather": "You can expect the weather to be quite mild. Low will be 19° and high will be 25°"
            }
            Ensure each piece of information is clearly and distinctly provided to allow for straightforward data extraction and use.`
        },
        { 
            role: "user", 
            content: userMessage
        }
    ]


    const body = JSON.stringify({
        messages: messages
    });

    const url = 'https://ai-travel-agent-worker.jameel-altamash.workers.dev';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        });
        if (response.ok) {
            const data = await response.json();
            const parsedData = parseResponseData(data.content);
            return parsedData
        } else {
            console.error("HTTP error:", response.status, await response.text()); // Log HTTP error
        }
    } catch (err) {
        throw err
    }
}

function parseResponseData(data) {
    try {
        return JSON.parse(data);
    } catch (error) {
        return { error: "Failed to parse response data" };
    }
}












     

