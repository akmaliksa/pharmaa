import urllib.request
import re
import json

req = urllib.request.Request("https://phamilypharma.com/", headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode("utf-8")
except Exception as e:
    print("Error fetching:", e)
    exit(1)

with open("/tmp/phamily_index.html", "w") as f:
    f.write(html)

print("Saved to /tmp/phamily_index.html, length:", len(html))

# Extract title
title = re.search(r"<title>(.*?)</title>", html, re.I)
print("Title:", title.group(1) if title else "")

# Extract meta description
desc = re.search(r'<meta name="description" content="([^"]+)"', html, re.I)
print("Desc:", desc.group(1) if desc else "")

# Extract navigation links
nav_links = re.findall(r'<a[^>]+href="([^"]+)"[^>]*>(.*?)</a>', html, re.I | re.S)
print(f"Total links: {len(nav_links)}")

# Extract all sections with their classes and contents
sections = re.findall(r'<section[^>]*class="([^"]+)"[^>]*>(.*?)</section>', html, re.I | re.S)
print(f"Total sections: {len(sections)}")
for i, (cls, content) in enumerate(sections):
    headings = re.findall(r'<(h[1-6]|p)[^>]*>(.*?)</\1>', content, re.I | re.S)
    clean_h = [" ".join(re.sub(r'<[^>]+>', ' ', h[1]).split()) for h in headings[:4]]
    print(f"Section {i} (class: {cls[:40]}): {clean_h}")

# Also check CSS link
css_matches = re.findall(r'href=[\'"]([^\'"]+\.css)[\'"]', html)
print("CSS files:", css_matches)
