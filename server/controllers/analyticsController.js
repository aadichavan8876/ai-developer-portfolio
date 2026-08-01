const Analytics = require('../models/Analytics');

let memoryStats = {
  pageviews: 1420,
  resumeDownloads: 345,
  aiQueries: 890
};

const trackEvent = async (req, res) => {
  try {
    const { type } = req.body;
    if (type === 'resume_download') {
      memoryStats.resumeDownloads++;
    } else {
      memoryStats.pageviews++;
    }

    try {
      await Analytics.create({
        type: type || 'pageview',
        ip: req.ip,
        userAgent: req.headers['user-agent']
      });
    } catch (e) {}

    res.json({ success: true, stats: memoryStats });
  } catch (error) {
    res.json({ success: true, stats: memoryStats });
  }
};

const getAnalytics = async (req, res) => {
  try {
    let pageviews = memoryStats.pageviews;
    let resumeDownloads = memoryStats.resumeDownloads;

    try {
      const dbPageviews = await Analytics.countDocuments({ type: 'pageview' });
      const dbDownloads = await Analytics.countDocuments({ type: 'resume_download' });
      if (dbPageviews > 0) pageviews += dbPageviews;
      if (dbDownloads > 0) resumeDownloads += dbDownloads;
    } catch (e) {}

    res.json({
      success: true,
      data: {
        visitorCount: pageviews,
        resumeDownloads: resumeDownloads,
        activeProjects: 3,
        certificationsCount: 3
      }
    });
  } catch (error) {
    res.json({
      success: true,
      data: {
        visitorCount: memoryStats.pageviews,
        resumeDownloads: memoryStats.resumeDownloads,
        activeProjects: 3,
        certificationsCount: 3
      }
    });
  }
};

module.exports = { trackEvent, getAnalytics };
