# Media assets

Drop the real files in this folder with these exact names (the site references them; graceful placeholders show until they exist):

## Videos
| File | Used for |
|------|----------|
| `vsl-main.mp4` | Hero welcome video (16:9) |
| `vsl-poster.jpg` | Poster frame for the hero video |
| `testimonial-josh-macin.mp4` | Josh Macin featured testimonial (vertical 9:16) |
| `testimonial-matt-komo.mp4` | Matt Komo featured testimonial (vertical 9:16) |
| `student-testimonial-1.mp4` | Student wins card 1 (vertical 9:16) |
| `student-testimonial-2.mp4` | Student wins card 2 (vertical 9:16) |
| `student-testimonial-3.mp4` | Student wins card 3 (vertical 9:16) |

## Images
| File | Used for |
|------|----------|
| `cameron-writing.jpg` | Bio photo (4:5 portrait) |
| `cameron-logo.png` | Footer logo |
| `profile-snow.jpg` | Marie & Jake Snow portrait |
| `profile-julian.jpg` | Julian Alexander portrait |
| `profile-sam-kolder.jpg` | Sam Kolder portrait |
| `profile-eva.jpg` | Eva Hooft portrait |
| `profile-dennis.jpg` | Dennis Echelbarger portrait |
| `profile-pompa.jpg` | Dr. Daniel Pompa portrait |
| `profile-horwitz.jpg` | Adam Horwitz portrait |

> Tip: keep each mp4 under ~25 MB (Cloudflare's per-asset limit). Compress with:
> `ffmpeg -i input.mp4 -vcodec libx264 -crf 28 -preset slow -acodec aac -b:a 128k output.mp4`
