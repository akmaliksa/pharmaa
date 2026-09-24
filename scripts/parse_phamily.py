import re

with open("/tmp/phamily_index.html", "r", encoding="utf-8") as f:
    html = f.read()

# Find links
print("=== ALL LINKS ===")
links = re.findall(r'<a\s+[^>]*href=[\'"]?([^\'" >]+)[\'"]?[^>]*>(.*?)</a>', html, re.DOTALL | re.IGNORECASE)
for href, inner in links:
    text = re.sub(r'<[^>]+>', ' ', inner).strip()
    text = " ".join(text.split())
    if text:
        print(f"  {text} -> {href}")

print("\n=== HEADINGS AND P IN ORDER ===")
items = re.findall(r'<(h[1-6]|p|span|button)\b([^>]*)>(.*?)</\1>', html, re.DOTALL | re.IGNORECASE)
captured = []
for tag, attrs, inner in items:
    # only get items with text
    clean = re.sub(r'<[^>]+>', ' ', inner).strip()
    clean = " ".join(clean.split())
    if len(clean) > 8 and clean not in captured:
        captured.append(clean)
        if len(captured) <= 70:
            print(f"<{tag} {attrs[:30]}> {clean}")

print("\n=== IMAGES / FIGURES / SVGS ===")
imgs = re.findall(r'<img\s+[^>]*src=[\'"]?([^\'" >]+)[\'"]?[^>]*>', html, re.IGNORECASE)
for img in imgs[:20]:
    print("  IMG:", img)

# CSS files
css = re.findall(r'<link\s+[^>]*href=[\'"]?([^\'" >]+\.css[^\'" >]*)[\'"]?', html, re.IGNORECASE)
print("\n=== CSS LINKS ===", css)
