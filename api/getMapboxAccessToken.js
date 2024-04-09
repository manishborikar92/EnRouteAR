// api/getMapboxAccessToken.js

export default function handler(req, res) {
    const mapboxAccessToken = process.env.MAPBOX_ACCESS_TOKEN;
    res.status(200).json({ mapboxAccessToken });
  }
  