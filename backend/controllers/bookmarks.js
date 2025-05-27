const Bookmark = require('../models/Bookmark');
const fetch = require('node-fetch');

exports.createBookmarks = async (req, res) => {
  try {

    const { url, tags } = req.body;
    if (!url) {
      return res.status(400).json({
        success: false,
        error: 'URL is required'
      });
    }
    const html = await fetch(url).then(res => res.text());
    const title = html.match(/<title>(.*?)<\/title>/)?.[1] || url;
    const favicon = new URL('/favicon.ico', url).href;
    
    const encoded = encodeURIComponent(url);
    let summary = '';

    try {
      const response = await fetch(`https://r.jina.ai/${encoded}`);
      summary = await response.text();
    } catch (error) {
      summary = 'Summary temporarily unavailable.';
    }

    const count = await Bookmark.countDocuments({ userId: req.user.id });

    const bookmark = await Bookmark.create({
      userId: req.user.id,
      url,
      title,
      favicon,
      summary,
      tags,
      order: count
    });

    res.status(201).json({
      success: true,
      message: "Bokkmark created successfully",
      bookmark
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};


exports.getBookmarks = async (req, res) => {
  try {
    const { tag } = req.query;
    const filter = { userId: req.user.id };
    if (tag) filter.tags = tag;
    const bookmarks = await Bookmark.find(filter).sort({ order: 1 });
    res.status(200).json({
      success: true,
      message: "Get the data",
      bookmarks
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

exports.deleteBookmark = async (req, res) => {
  try {
    await Bookmark.deleteOne({ _id: req.params.id, userId: req.user.id });
    res.status(200).json({
      message: 'Bookmark deleted'
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

exports.updateBookmarks = async (req, res) => {
  try {
    const { reordered } = req.body;
    await Promise.all(
      reordered.map((id, index) =>
        Bookmark.updateOne({ _id: id, userId: req.user.id }, { $set: { order: index } })
      )
    );
    res.status(200).json({
      message: 'Reordered successfully'
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

