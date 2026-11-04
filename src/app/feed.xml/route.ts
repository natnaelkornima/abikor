import { portfolio } from "@/data/portfolio";

export async function GET() {
  const { profile, articles } = portfolio;
  const siteUrl = "https://natnael.dev";

  const itemsXml = articles
    .map(
      (a) => `
    <item>
      <title><![CDATA[${a.title}]]></title>
      <link>${siteUrl}/articles#${a.slug}</link>
      <guid>${siteUrl}/articles#${a.slug}</guid>
      <pubDate>${new Date(a.date).toUTCString()}</pubDate>
      <description><![CDATA[${a.summary}]]></description>
      <category>${a.category}</category>
    </item>`
    )
    .join("");

  const feedXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${profile.name} — Technical Writing</title>
    <link>${siteUrl}</link>
    <description>${profile.bio[0]}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(feedXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}

