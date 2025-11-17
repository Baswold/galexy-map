# Galaxy Forge - 3D Star & Planet Map

A live, explorable 3D model of real stars and planetary systems using accurate astronomical data.

## What This Is

A 3D visualization of **real stars and planets** with:
- **Accurate 3D positions** from astronomical catalogs
- **Real spectral classifications** (O, B, A, F, G, K, M types)
- **Correct colors** based on stellar temperature and planet types
- **Actual apparent magnitudes** (brightness)
- **Real exoplanet systems** with confirmed planets

Currently includes:
- 80 real stars (brightest visible + nearby within 20 light years)
- **10 planetary systems** with 21 planets total
- Our complete Solar System (all 8 planets)
- 9 confirmed exoplanet systems
- Orbital paths showing planet trajectories

## Running It

Start a local web server:

```bash
python3 -m http.server 8000
```

Then open: http://localhost:8000

## Controls

- **Drag** to rotate the view
- **Scroll** to zoom in/out
- **Right-click + drag** to pan
- **Current position** shown in top-left

## The Data

### Stars
Star positions are in **parsecs** (1 parsec ≈ 3.26 light years):
- **x, y, z** = 3D Cartesian coordinates
- **Spectral class** determines color:
  - O/B = Blue (hot stars)
  - A = Blue-white
  - F = White
  - G = Yellow (like our Sun)
  - K = Orange
  - M = Red (cool stars)
- **Magnitude** determines size (brightness)

### Planets
Planet positions and orbits use **real exoplanet data**:
- **Orbital distances** in AU (Astronomical Units)
- **Planet types** with realistic colors:
  - Terrestrial = Brown/rocky (like Earth, Mars)
  - Super-Earth = Blue-gray (larger rocky planets)
  - Gas Giant = Golden/orange (like Jupiter, Saturn)
  - Ice Giant = Steel blue (like Uranus, Neptune)
- **Orbital paths** shown as gray circles around stars

## Real Systems You Can Explore

### Our Solar System (Sol)
All 8 planets in their correct orbital positions:
- Mercury, Venus, Earth, Mars (terrestrial planets)
- Jupiter, Saturn (gas giants)
- Uranus, Neptune (ice giants)

### Confirmed Exoplanet Systems
- **Proxima Centauri** - Closest star system (4.24 ly) - 2 planets
- **Tau Ceti** - Sun-like star 11.9 ly away - 4 super-Earths
- **Epsilon Eridani** - Young star 10.5 ly away - 1 gas giant
- **Barnard's Star** - Ancient red dwarf 6 ly away - 1 super-Earth
- **Pollux** - Orange giant 33.8 ly away - 1 massive gas giant
- **Fomalhaut** - Young bright star 25 ly away - 1 giant planet
- **Plus 4 more systems** (61 Cygni, Epsilon Indi, Lalande 21185)

### Notable Stars
- **Sirius** - Brightest star in the night sky (8.6 ly)
- **Betelgeuse** - Red supergiant in Orion (642 ly)
- **Rigel** - Blue supergiant in Orion (860 ly)
- **Vega** - Brilliant blue-white star (25 ly)
- **Arcturus** - Orange giant (36.7 ly)

## Next Steps

This is the foundation. Coming next:
- More stars (millions from Gaia catalog)
- Procedural star systems
- Planetary generation
- Galaxy structure (spiral arms, core)
- Time controls (see stellar motion)
- VR support
