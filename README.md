# Galaxy Forge - 3D Star Map

A live, explorable 3D model of real stars using accurate astronomical data.

## What This Is

A 3D visualization of **real stars** with:
- **Accurate 3D positions** from astronomical catalogs
- **Real spectral classifications** (O, B, A, F, G, K, M types)
- **Correct colors** based on stellar temperature
- **Actual apparent magnitudes** (brightness)

Currently includes:
- The 60 brightest stars visible from Earth
- Nearby stars within 20 light years
- Our Sun (Sol) at the origin

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

## Real Stars You Can See

Look for these bright stars:
- **Sirius** - Brightest star in the night sky (A-type, white)
- **Betelgeuse** - Red supergiant in Orion
- **Rigel** - Blue supergiant in Orion
- **Alpha Centauri** - Nearest star system (4.37 ly away)
- **Vega** - Brilliant blue-white star
- **Arcturus** - Orange giant
- **Sol** - Our Sun (at the center)

## Next Steps

This is the foundation. Coming next:
- More stars (millions from Gaia catalog)
- Procedural star systems
- Planetary generation
- Galaxy structure (spiral arms, core)
- Time controls (see stellar motion)
- VR support
