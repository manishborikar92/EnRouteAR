export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://enroutear.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
