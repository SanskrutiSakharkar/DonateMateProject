export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiService = {
    getNGOs: async (category = null) => {
        try {
            // ✅ Clean and normalize the category
            const cleanedCategory = category ? category.trim().toLowerCase() : null;

            const url = cleanedCategory && cleanedCategory !== 'all'
                ? `${API_BASE_URL}/ngos/category/${cleanedCategory}` // ✅ use RESTful route
                : `${API_BASE_URL}/ngos`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success && Array.isArray(data.data)) {
                return { success: true, data: data.data };
            } else if (Array.isArray(data)) {
                return { success: true, data: data };
            } else {
                console.warn('API returned non-array data:', data);
                return { success: true, data: [] };
            }

        } catch (error) {
            console.error('API fetch failed:', error);

            // Return fallback NGO data
            const fallbackNGOs = [
                {
                    id: 1,
                    name: 'Teach for India',
                    category: 'education',
                    description: 'Eliminating educational inequity by expanding educational opportunity.',
                    website: 'https://teachforindia.org',
                    verified: true,
                    rating: 4.8,
                    projects: 45,
                    beneficiaries: '50,000+'
                },
                // You can add more fallback NGOs here
            ];

            return { success: true, data: fallbackNGOs };
        }
    }
};

export { apiService };
