

export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const apiService = {
  getNGOs: async (category = null) => {
    try {
      // ✅ Clean the category
      const cleanedCategory = category ? category.trim().toLowerCase() : null;

      // ✅ Build the correct endpoint
      const url = cleanedCategory && cleanedCategory !== 'all'
        ? `${API_BASE_URL}/ngos/category/${cleanedCategory}`
        : `${API_BASE_URL}/ngos`;

      // ✅ Debug log to confirm actual URL used
      console.log("🔍 Fetching NGOs from:", url);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && Array.isArray(data.data)) {
        return { success: true, data: data.data };
      } else {
        console.warn("❗Unexpected API format:", data);
        return { success: false, data: [] };
      }

    } catch (error) {
      console.error("❌ API fetch failed:", error);

      // 🔒 In production, we should not show mock data
      // return fallback only in development if needed
      if (process.env.NODE_ENV === "development") {
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
          }
        ];
        return { success: true, data: fallbackNGOs };
      }

      return { success: false, data: [] };
    }
  }
};
