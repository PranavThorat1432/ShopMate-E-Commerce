export async function getAIRecommendation(userPrompt, filteredProducts) {
    const apiKey = process.env.GEMINI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
        const geminiPrompt = `
            You are a product recommendation engine for an eCommerce application.

            STRICT RULES:
            1. Only use products from the provided list.
            2. Do NOT create or modify any product.
            3. Do NOT explain anything.
            4. Return ONLY valid JSON.
            5. If no products match, return an empty JSON array: []

            Here is the list of available products:
            ${JSON.stringify(filteredProducts)}

            User request: "${userPrompt}"

            Matching Rules:
            - Match based on product name, description, category, tags, and price relevance.
            - Consider synonyms and intent (e.g., "cheap" means lower price).
            - Rank results by relevance (most relevant first).
            - Return maximum 5 products.

        `;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{text: geminiPrompt}],
                }] 
            })
        });

        const data = await response.json();

        const aiReponseText = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';

        const cleanedText = aiReponseText.replace(/```json|```/g, ``).trim();
        if(!cleanedText) {
            return {
                success: false,
                message: 'AI response is empty or not valid JSON!'
            };
        }

        let parsedProducts;
        try {
            parsedProducts = JSON.parse(cleanedText);
        } catch (error) {
            return {
                success: false,
                message: 'Failed to parse AI response as JSON!'
            };
        }

        return {
            success: true,
            products: parsedProducts
        }

    } catch (error) {
        return {
            success: false,
            message: `Get-AI-Recommendation Error: ${error}`
        };
    }
};