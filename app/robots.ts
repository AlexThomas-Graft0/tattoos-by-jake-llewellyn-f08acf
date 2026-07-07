import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://tattoos-by-jake-llewellyn-f08acf.duckbyte.co/sitemap.xml",
  };
}
