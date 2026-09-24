import re

with open("/tmp/phamily_index.html", "r", encoding="utf-8") as f:
    html = f.read()

# Find hero content
hero_m = re.search(r'class="[^"]*o-hero[^"]*"(.*?)<section|<div class="b-', html, re.DOTALL)
if hero_m:
    print("=== HERO ===")
    print(re.sub(r'<[^>]+>', ' ', hero_m.group(0))[:800])

# Find all blocks starting with b- or o-
matches = re.findall(r'<([a-z0-9]+)\s+class="([bo]-[a-zA-Z0-9_-]+)[^"]*"(.*?)', html)
print(f"\nFound {len(matches)} class matches")
for tag, cls, _ in matches[:30]:
    print("Class:", cls)

# Find all headings h1, h2, h3, h4
print("\n=== HEADINGS ===")
for m in re.finditer(r'<(h[1-4])[^>]*>(.*?)</\1>', html, re.DOTALL | re.IGNORECASE):
    t = " ".join(re.sub(r'<[^>]+>', ' ', m.group(2)).split())
    print(f"[{m.group(1)}] {t}")
