import api from "./api.js";

export const globalSearchSrv = async (query, type = 'all') => {
    try {
        const res = await api.get(`/search?q=${encodeURIComponent(query)}&type=${type}`);
        return res.data;
    } catch (err) {
        console.error("Search failed:", err);
        return { results: [], query };
    }
}
