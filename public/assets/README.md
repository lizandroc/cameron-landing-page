# Media assets

Drop the real files in this folder with these exact names (the site references them; graceful placeholders show until they exist):

## Videos
| File | Used for |
|------|----------|
| `vsl-main.mp4` | Hero welcome video (16:9) |
| `vsl-poster.jpg` | Poster frame for the hero video |
| `testimonial-kyle.mp4` | Kyle featured testimonial — first card (vertical 9:16) |
| `testimonial-josh-macin.mp4` | Josh Macin featured testimonial (vertical 9:16) |
| `testimonial-matt-komo.mp4` | Matt Komo featured testimonial (vertical 9:16) |
| `student-testimonial-1.mp4` | Student wins card 1 (vertical 9:16) |
| `student-testimonial-2.mp4` | Student wins card 2 (vertical 9:16) |
| `student-testimonial-3.mp4` | Student wins card 3 (vertical 9:16) |

## Images
| File | Used for |
|------|----------|
| `cameron-writing.jpg` | Bio photo (4:5 portrait) |
| `cameron-logo.png` | Footer logo (hidden until the file exists) |
| `profile-snow.jpg` | Marie & Jake Snow portrait (More client wins rail) |
| `profile-julian.jpg` | Julian Alexander portrait |
| `profile-sam-kolder.jpg` | Sam Kolder portrait |
| `profile-eva.jpg` | Eva Hooft portrait |
| `profile-dennis.jpg` | Dennis Echelbarger portrait |
| `profile-pompa.jpg` | Dr. Daniel Pompa portrait |
| `profile-horwitz.jpg` | Adam Horwitz portrait |

## Trusted-by name photos → `names/` subfolder

Each name in the "Trusted by..." list looks for a photo at `assets/names/<slug>.jpg`,
where the slug is the name lowercased with punctuation collapsed to dashes:

| Name | File |
|------|------|
| Eva Hooft | `names/eva-hooft.jpg` |
| Joshua Macin | `names/joshua-macin.jpg` |
| Dr. Daniel Pompa | `names/dr-daniel-pompa.jpg` |
| Dr. John Demartini | `names/dr-john-demartini.jpg` |
| Marie & Jake Snow | `names/marie-and-jake-snow.jpg` |
| Dennis Echelbarger | `names/dennis-echelbarger.jpg` |
| Matt Proper | `names/matt-proper.jpg` |
| AwesomeREI | `names/awesomerei.jpg` |
| Arlin Moore | `names/arlin-moore.jpg` |
| Sam Kolder | `names/sam-kolder.jpg` |
| Brendon Hayward | `names/brendon-hayward.jpg` |
| Matt Komo | `names/matt-komo.jpg` |
| Val Days | `names/val-days.jpg` |
| Adam Horwitz | `names/adam-horwitz.jpg` |
| Julian Alexander | `names/julian-alexander.jpg` |
| Celia Smith | `names/celia-smith.jpg` |
| Max Muench / FollowTheTracks | `names/max-muench-followthetracks.jpg` |
| Kaizen Asuidu | `names/kaizen-asuidu.jpg` |
| Mike Gore-Hickman | `names/mike-gore-hickman.jpg` |
| Justin Goff | `names/justin-goff.jpg` |
| Stefan Georgi | `names/stefan-georgi.jpg` |
| Jesse Showalter | `names/jesse-showalter.jpg` |
| Altis.World | `names/altis-world.jpg` |
| Hoo.be / Jordan Taylor | `names/hoo-be-jordan-taylor.jpg` |
| Jeff Salzenstein / Tennis Evolution | `names/jeff-salzenstein-tennis-evolution.jpg` |

A missing photo just shows a subtle blank circle — nothing breaks.

> Tip: keep each mp4 under ~25 MB (Cloudflare's per-asset limit). Compress with:
> `ffmpeg -i input.mp4 -vcodec libx264 -crf 28 -preset slow -acodec aac -b:a 128k output.mp4`
