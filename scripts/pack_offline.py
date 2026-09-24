#!/usr/bin/env python3
import os
import shutil
import glob
import zipfile

def pack():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    dist_dir = os.path.join(base_dir, 'dist')
    public_dir = os.path.join(base_dir, 'public')
    bundle_dir = os.path.join(base_dir, 'akaber-offline-bundle')

    print(f"Creating offline bundle at: {bundle_dir}")
    os.makedirs(bundle_dir, exist_ok=True)

    # 1. Images
    bundle_images_dir = os.path.join(bundle_dir, 'images')
    os.makedirs(bundle_images_dir, exist_ok=True)
    source_images_dir = os.path.join(public_dir, 'images')
    if os.path.exists(source_images_dir):
        for img in os.listdir(source_images_dir):
            src_file = os.path.join(source_images_dir, img)
            if os.path.isfile(src_file):
                dst_file = os.path.join(bundle_images_dir, img)
                shutil.copy2(src_file, dst_file)
                print(f"Copied image: {img} -> {bundle_images_dir}")

    # 2. Assets
    bundle_assets_dir = os.path.join(bundle_dir, 'assets')
    os.makedirs(bundle_assets_dir, exist_ok=True)
    dist_assets_dir = os.path.join(dist_dir, 'assets')
    
    css_files = glob.glob(os.path.join(dist_assets_dir, '*.css'))
    js_files = glob.glob(os.path.join(dist_assets_dir, '*.js'))

    css_content = ""
    if css_files:
        with open(css_files[0], 'r', encoding='utf-8') as f:
            css_content = f.read()
        shutil.copy2(css_files[0], os.path.join(bundle_assets_dir, os.path.basename(css_files[0])))

    js_content = ""
    if js_files:
        with open(js_files[0], 'r', encoding='utf-8') as f:
            js_content = f.read()
        shutil.copy2(js_files[0], os.path.join(bundle_assets_dir, os.path.basename(js_files[0])))

    # 3. Create Standalone Offline index.html with Inlined CSS & JS
    index_html_content = f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Akaber Real Estate Development | أكابر للتطوير العقاري</title>
    <meta name="description" content="Premier real estate development, investment, and property acquisition." />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800&family=Cinzel:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
{css_content}
    </style>
  </head>
  <body class="bg-[#0A0A0A] text-[#F5F5F0] antialiased selection:bg-[#C5A880] selection:text-black">
    <div id="root"></div>
    <script>
{js_content}
    </script>
  </body>
</html>
"""
    with open(os.path.join(bundle_dir, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(index_html_content)
    print("Created standalone inlined index.html")

    # 4. Launchers and READMEs
    win_bat = """@echo off
title Akaber Real Estate Development
echo ========================================================
echo   Akaber Real Estate Development - Luxury Portal
echo   Opening in your default web browser...
echo ========================================================
start "" "%~dp0index.html"
exit
"""
    with open(os.path.join(bundle_dir, 'Click-To-Open-Windows.bat'), 'w', encoding='utf-8') as f:
        f.write(win_bat)

    mac_cmd = """#!/bin/bash
cd "$(dirname "$0")"
echo "Opening Akaber Real Estate..."
open index.html
"""
    mac_path = os.path.join(bundle_dir, 'Click-To-Open-Mac.command')
    with open(mac_path, 'w', encoding='utf-8') as f:
        f.write(mac_cmd)
    os.chmod(mac_path, 0o755)

    readme_urdu = """========================================================
  اکابر للتطوير العقاري - Akaber Real Estate Development
========================================================

استعمال کا آسان طریقہ (Without Localhost):
1. آپ کو کسی بھی لوکل ہوسٹ (localhost)، Node.js، یا ٹرمینل کمانڈ کی بالکل ضرورت نہیں ہے!
2. بس اس فولڈر کو Extract (Unzip) کریں اور سیدھا 'index.html' پر ڈبل کلک کریں۔
   (یا 'Click-To-Open-Windows.bat' پر ڈبل کلک کریں)
3. پوری ویب سائٹ، تمام تصاویر (Images)، انگلش اور عربی فونٹس، اور ایڈمن پینل فوراً آپ کے براؤزر میں کھل جائیں گے۔

تصاویر (Images) کا فولڈر:
- اس زپ فائل کے اندر 'images' کا فولڈر موجود ہے جس میں ویب سائٹ کی تمام ہائی کوالٹی تصاویر رکھی گئی ہیں۔

ایڈمن پورٹل لاگ ان (Admin Login):
- ویب سائٹ کے فوٹر میں یا نیو بار میں ایڈمن لاگ ان موجود ہے۔
- Username: admin
- Password: Admin@2027

نیا فیچر:
- ایڈمن پینل میں اب آپ اپنے کمپیوٹر سے کوئی بھی نئی تصویر (Picture) اور کوئی بھی نیا فونٹ (English / Arabic Font) براہ راست اپ لوڈ کر کے فورا لاگو کر سکتے ہیں۔
"""
    with open(os.path.join(bundle_dir, 'README-URDU.txt'), 'w', encoding='utf-8') as f:
        f.write(readme_urdu)

    readme_en = """========================================================
  Akaber Real Estate Development - Standalone Offline
========================================================

HOW TO RUN (Zero Configuration, No Localhost Needed):
1. No Node.js, terminal, or local server required.
2. Double-click "index.html" directly in any browser (Chrome, Edge, Safari, Firefox).
   Or double-click "Click-To-Open-Windows.bat" on Windows.
3. The entire site with all photography, dynamic language switcher, and full CMS works offline!

IMAGES INCLUDED:
- All high-resolution architectural photography is bundled in the /images folder.

ADMIN CMS CREDENTIALS:
- Username: admin
- Password: Admin@2027
"""
    with open(os.path.join(bundle_dir, 'README-ENGLISH.txt'), 'w', encoding='utf-8') as f:
        f.write(readme_en)

    # 5. Create ZIP Archive
    zip_destinations = [
        os.path.join(public_dir, 'akaber-real-estate.zip'),
        os.path.join(public_dir, 'akaber-real-estate-offline.zip'),
        os.path.join(dist_dir, 'akaber-real-estate.zip'),
        os.path.join(dist_dir, 'akaber-real-estate-offline.zip'),
    ]

    for zip_path in zip_destinations:
        os.makedirs(os.path.dirname(zip_path), exist_ok=True)
        with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
            for root, dirs, files in os.walk(bundle_dir):
                for file in files:
                    full_path = os.path.join(root, file)
                    rel_path = os.path.relpath(full_path, bundle_dir)
                    zipf.write(full_path, rel_path)
        print(f"Created ZIP: {zip_path} ({os.path.getsize(zip_path)} bytes)")

if __name__ == '__main__':
    pack()
