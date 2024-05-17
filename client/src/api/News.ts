export const fetchNewsData = async () => {
    try {
        const response = await fetch('http://localhost:8000/news');
        if (!response.ok) {
            throw new Error('Failed to fetch news');
        }
        const data = await response.json();
        return {
            mainNews: data.mainNews || [],
            secondaryNews: data.secondaryNews || []
        };
    } catch (error) {
        console.error('Error fetching news:', error);
        throw error;
    }
};
