const feeds = [
  { name: "YYZ Deals", url: "https://www.yyzdeals.com/atom/1" },
  { name: "YVR Deals", url: "https://www.yvrdeals.com/atom/1" },
  { name: "YUL Deals", url: "https://www.yuldeals.com/atom/1" },
];

async function main() {
  for (const feed of feeds) {
    try {
      const res = await fetch(feed.url, {
        headers: {
          "User-Agent": "CanadianTravelDeals/1.0",
          Accept: "application/atom+xml, application/rss+xml, application/xml, text/xml",
        },
      });

      if (!res.ok) {
        console.log(`${feed.name}: HTTP ${res.status}`);
        continue;
      }

      const xml = await res.text();
      console.log(`\n=== ${feed.name} ===`);
      console.log(`Content-Type: ${res.headers.get("content-type")}`);
      console.log(`Length: ${xml.length}`);

      const isAtom = xml.includes("<feed");
      const isRss = xml.includes("<rss") || xml.includes("<channel");
      console.log(`Type: ${isAtom ? "Atom" : isRss ? "RSS" : "Unknown"}`);

      if (isAtom) {
        const entryMatch = xml.match(/<entry[\s>]([\s\S]*?)<\/entry>/i);
        if (entryMatch) {
          const entry = entryMatch[0];
          console.log(`\nFirst entry (${entry.length} chars):`);
          console.log(entry.substring(0, 2000));

          const imgPatterns = [
            { name: "img src", pat: /<img[^>]+src="([^"]+)"/i },
            { name: "media:content", pat: /<media:content[^>]+url="([^"]+)"/i },
            { name: "media:thumbnail", pat: /<media:thumbnail[^>]+url="([^"]+)"/i },
            { name: "enclosure", pat: /<enclosure[^>]+url="([^"]+)"/i },
          ];

          for (const { name, pat } of imgPatterns) {
            const m = entry.match(pat);
            if (m) {
              console.log(`\nImage found [${name}]: ${m[1]}`);
            }
          }

          const contentMatch = entry.match(/<content[^>]*>([\s\S]*?)<\/content>/i);
          if (contentMatch) {
            const decoded = contentMatch[1]
              .replace(/&lt;/g, "<")
              .replace(/&gt;/g, ">")
              .replace(/&amp;/g, "&")
              .replace(/&quot;/g, '"');
            console.log(`\nDecoded content (first 1500 chars):`);
            console.log(decoded.substring(0, 1500));

            const imgInContent = decoded.match(/<img[^>]+src="([^"]+)"/i);
            if (imgInContent) {
              console.log(`\nImage in decoded content: ${imgInContent[1]}`);
            } else {
              console.log(`\nNo <img> found in decoded content`);
            }
          }
        }
      } else if (isRss) {
        const itemMatch = xml.match(/<item[\s>]([\s\S]*?)<\/item>/i);
        if (itemMatch) {
          console.log(`\nFirst item (${itemMatch[0].length} chars):`);
          console.log(itemMatch[0].substring(0, 2000));
        }
      }
    } catch (err) {
      console.log(`${feed.name}: Error - ${err.message}`);
    }
  }
}

main();
