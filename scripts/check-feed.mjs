// Check what the feeds actually return, especially image data
const feeds = [
  { name: "YYZ Deals", url: "https://www.yyzdeals.com/atom/1" },
  { name: "YVR Deals", url: "https://www.yvrdeals.com/atom/1" },
  { name: "YUL Deals", url: "https://www.yuldeals.com/atom/1" },
];

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

    // Check feed type
    const isAtom = xml.includes("<feed");
    const isRss = xml.includes("<rss") || xml.includes("<channel");
    console.log(`Type: ${isAtom ? "Atom" : isRss ? "RSS" : "Unknown"}`);

    // Find the first entry/item and print it
    if (isAtom) {
      const entryMatch = xml.match(/<entry[\s>]([\s\S]*?)<\/entry>/i);
      if (entryMatch) {
        const entry = entryMatch[0];
        console.log(`\nFirst entry (${entry.length} chars):`);
        console.log(entry.substring(0, 2000));
        
        // Check for images
        const imgPatterns = [
          /<img[^>]+src="([^"]+)"/i,
          /<media:content[^>]+url="([^"]+)"/i,
          /<media:thumbnail[^>]+url="([^"]+)"/i,
          /<enclosure[^>]+url="([^"]+)"/i,
          /src="(https?:\/\/[^"]+\.(jpg|jpeg|png|gif|webp)[^"]*)"/i,
        ];
        
        for (const pat of imgPatterns) {
          const m = entry.match(pat);
          if (m) {
            console.log(`\nImage found with pattern ${pat}: ${m[1]}`);
          }
        }
        
        // Also check the full content tag
        const contentMatch = entry.match(/<content[^>]*>([\s\S]*?)<\/content>/i);
        if (contentMatch) {
          const decoded = contentMatch[1]
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&amp;/g, "&")
            .replace(/&quot;/g, '"');
          console.log(`\nDecoded content (first 1000 chars):`);
          console.log(decoded.substring(0, 1000));
          
          const imgInContent = decoded.match(/<img[^>]+src="([^"]+)"/i);
          if (imgInContent) {
            console.log(`\nImage in decoded content: ${imgInContent[1]}`);
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
