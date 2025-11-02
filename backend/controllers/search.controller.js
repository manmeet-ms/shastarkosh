// controllers/search.controller.js
import ForumPost from '../models/ForumPost.model.js';
import ShastarInfo from '../models/ShastarInfo.model.js';
import ResourceMaterial from '../models/ResourceMaterial.model.js';
import Category from '../models/Category.model.js';

export const globalSearch = async (req, res) => {
  const { q, type = "all", limit = 20 } = req.query;
  if (!q) return res.json({ results: [] });

  const searchQuery = { $text: { $search: q } };
  const options = { limit: parseInt(limit), score: { $meta: "textScore" } };

  try {
    const results = [];

    // Search Posts
    if (type === "all" || type === "posts") {
      const posts = await ForumPost.find(searchQuery, { score: { $meta: "textScore" } })
        .populate("author", "username avatar")
        .sort({ score: { $meta: "textScore" } })
        .limit(10);
      results.push(...posts.map(p => ({ ...p.toObject(), type: "post" })));
    }

    // Search Shastars
    if (type === "all" || type === "shastars") {
      const shastars = await ShastarInfo.find(searchQuery, { score: { $meta: "textScore" } })
        .populate("createdBy", "username avatar")
        .sort({ score: { $meta: "textScore" } })
        .limit(10);
      results.push(...shastars.map(s => ({ ...s.toObject(), type: "shastar" })));
    }

    // Search Resources
    if (type === "all" || type === "resources") {
      const resources = await ResourceMaterial.find(searchQuery, { score: { $meta: "textScore" } })
        .populate("createdBy", "username avatar")
        .sort({ score: { $meta: "textScore" } })
        .limit(10);
      results.push(...resources.map(r => ({ ...r.toObject(), type: "resource" })));
    }

    // Search Categories
    if (type === "all" || type === "categories") {
      const categories = await Category.find(searchQuery, { score: { $meta: "textScore" } })
        .sort({ score: { $meta: "textScore" } })
        .limit(5);
      results.push(...categories.map(c => ({ ...c.toObject(), type: "category" })));
    }

    res.json({ results, query: q });
  } catch (err) {
    res.status(500).json({ message: "Search failed", error: err.message });
  }
};