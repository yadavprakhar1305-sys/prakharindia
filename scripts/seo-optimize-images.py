"""Optimize local JPG and PNG assets for Core Web Vitals (LCP) while preserving dimensions."""

import argparse
import io
import os
from pathlib import Path
from PIL import Image

ROOT_DIR = Path(__file__).resolve().parent.parent
IMAGES_DIR = ROOT_DIR / "images"
SKIP_SMALLER_BYTES = 120 * 1024


def optimize_jpeg(path: Path, quality: int) -> bytes:
    with Image.open(path) as im:
        rgb = im.convert("RGB") if im.mode != "RGB" else im
        buf = io.BytesIO()
        rgb.save(buf, format="JPEG", quality=quality, optimize=True, progressive=True)
        return buf.getvalue()


def optimize_png(path: Path) -> bytes:
    with Image.open(path) as im:
        # Quantize non-alpha or RGBA cleanly only when it significantly shrinks weight.
        quant = im.quantize(colors=256, method=Image.Quantize.FASTOCTREE)
        buf_q = io.BytesIO()
        quant.save(buf_q, format="PNG", optimize=True)

        buf_opt = io.BytesIO()
        im.save(buf_opt, format="PNG", optimize=True)
        return buf_q.getvalue() if buf_q.tell() < buf_opt.tell() else buf_opt.getvalue()


def main():
    parser = argparse.ArgumentParser(description="Optimize JPG/PNG files in images/ for web SEO speed.")
    parser.add_argument("--quality", type=int, default=80, help="JPEG quality (default: 80)")
    parser.add_argument("--apply", action="store_true", help="Write optimized files in place (backups saved to scratch/)")
    args = parser.parse_args()

    if not IMAGES_DIR.exists():
        print("No images/ directory found.")
        return

    backup_dir = ROOT_DIR / "scratch" / "img-backup"
    if args.apply:
        backup_dir.mkdir(parents=True, exist_ok=True)

    total_before = 0
    total_after = 0
    optimized_count = 0

    for path in sorted(IMAGES_DIR.iterdir()):
        if not path.is_file():
            continue
        ext = path.suffix.lower()
        orig_size = path.stat().st_size
        total_before += orig_size

        if ext not in {".jpg", ".jpeg", ".png"} or orig_size <= SKIP_SMALLER_BYTES:
            total_after += orig_size
            continue

        new_bytes = optimize_jpeg(path, args.quality) if ext in {".jpg", ".jpeg"} else optimize_png(path)
        if len(new_bytes) < orig_size * 0.90:
            optimized_count += 1
            total_after += len(new_bytes)
            pct = (1 - len(new_bytes) / orig_size) * 100
            print(f"[{'OPT' if args.apply else 'DRY'}] {path.name:32s} {orig_size/1024:6.1f} KB -> {len(new_bytes)/1024:6.1f} KB (-{pct:.0f}%)")
            if args.apply:
                backup_file = backup_dir / path.name
                if not backup_file.exists():
                    backup_file.write_bytes(path.read_bytes())
                path.write_bytes(new_bytes)
        else:
            total_after += orig_size

    saved_mb = (total_before - total_after) / (1024 * 1024)
    print(f"\nSummary: {optimized_count} image(s) optimized | {total_before/1024/1024:.2f} MB -> {total_after/1024/1024:.2f} MB (saved {saved_mb:.2f} MB)")


if __name__ == "__main__":
    main()
