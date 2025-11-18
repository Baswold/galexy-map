# Galaxy Forge - Interactive 3D Star & Planet Map

A comprehensive, interactive 3D visualization of real astronomical data featuring stars, exoplanets, moons, and advanced exploration tools.

## What This Is

A fully interactive 3D space exploration tool with:
- **90 real stars** with accurate 3D positions from astronomical catalogs
- **52 planets** across 20 star systems including famous exoplanets
- **10 major moons** (Galilean moons, Titan, our Moon, etc.)
- **2000 asteroid belt particles** for our Solar System
- **Real-time orbital motion** with time controls
- **Interactive selection** with detailed information panels
- **Advanced filtering** by spectral type, distance, and brightness
- **Distance measurement** between any celestial objects
- **Constellation lines** for major constellations
- **Beautiful bloom effects** and procedural space backgrounds

### Featured Systems
- **Solar System**: All 8 planets plus major moons
- **TRAPPIST-1**: Famous system with 7 terrestrial planets
- **Kepler-186**: First Earth-size planet in habitable zone
- **55 Cancri**: 5 planets including the "diamond planet"
- **Proxima Centauri**: Our nearest stellar neighbor
- Plus 15 more confirmed exoplanet systems!

## Running It

Start a local web server:

```bash
python3 -m http.server 8000
```

Then open: http://localhost:8000

## Controls & Features

### Camera Navigation
- **Drag** to rotate the view
- **Scroll** to zoom in/out
- **Right-click + drag** to pan
- **Quick jump buttons** to Solar System, Proxima Centauri, and Sirius

### Interactive Features
- **Click** any star or planet to view detailed information
- **Search bar** to find specific stars and planets
- **Hover** over objects to see their names
- **Distance measurement tool** - click two objects to measure distance
- **Time controls** - Play/pause and adjust orbital motion speed
- **Screenshot export** - Save your current view

### View Options
- **Toggle Orbits** - Show/hide planetary orbital paths
- **Toggle Labels** - Show/hide object name labels
- **Toggle Constellations** - Show/hide constellation lines

### Filters
- **Spectral Type** - Filter stars by O, B, A, F, G, K, M classification
- **Distance Range** - Show only stars within specified parsecs
- **Brightness** - Filter by apparent magnitude

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
All 8 planets with major moons:
- **Mercury, Venus, Earth, Mars** (terrestrial planets)
  - Earth's Moon
  - Phobos and Deimos (Mars' moons)
- **Jupiter, Saturn** (gas giants)
  - Io, Europa, Ganymede, Callisto (Jupiter's Galilean moons)
  - Titan, Rhea, Iapetus (Saturn's major moons)
- **Uranus, Neptune** (ice giants)
- **Asteroid Belt** (2000 particles between Mars and Jupiter)

### Famous Exoplanet Systems
- **TRAPPIST-1** (40.7 ly) - 7 terrestrial planets, multiple in habitable zone
- **Kepler-186** (151 ly) - 5 planets including Kepler-186f (first Earth-size in habitable zone)
- **Kepler-452** (430 ly) - Earth's cousin, super-Earth in habitable zone
- **Kepler-62** (368 ly) - 5 planets, 2 potentially habitable
- **55 Cancri** (41 ly) - 5 planets including the "diamond planet" 55 Cancri e
- **Gliese 876** (15.3 ly) - 4 planets in compact configuration
- **Proxima Centauri** (4.24 ly) - Closest star, 2 confirmed planets
- **Tau Ceti** (11.9 ly) - Sun-like star with 4 super-Earths
- **Epsilon Eridani** (10.5 ly) - Young star with gas giant
- **Barnard's Star** (6 ly) - Ancient red dwarf with super-Earth
- **HD 209458** (47 ly) - First transiting exoplanet "Osiris"
- **WASP-12** (427 ly) - Hottest known exoplanet
- **HD 189733** (19.8 ly) - The "blue planet" (rains glass)
- **Pollux** (33.8 ly) - Orange giant with massive gas giant
- **Fomalhaut** (25.1 ly) - Young bright star with giant planet
- **Kepler-22** (190 ly) - First confirmed planet in habitable zone
- **Plus more systems**: 61 Cygni, Epsilon Indi, Lalande 21185

### Notable Stars
- **Sirius** - Brightest star in the night sky (8.6 ly)
- **Betelgeuse** - Red supergiant in Orion (642 ly)
- **Rigel** - Blue supergiant in Orion (860 ly)
- **Vega** - Brilliant blue-white star (25 ly)
- **Arcturus** - Orange giant (36.7 ly)
- **Aldebaran** - Eye of Taurus (65.3 ly)
- **Polaris** - North Star (433 ly)
- **Alpha Centauri** - Nearest star system (4.37 ly)

### Visualized Constellations
- **Orion** - The Hunter (features Betelgeuse and Rigel)
- **Ursa Major** - The Big Dipper
- **Cassiopeia** - The W-shaped constellation
- **Canis Major** - The Greater Dog (features Sirius)

## Technical Details

### Technologies
- **Three.js** - 3D rendering engine
- **WebGL** - Hardware-accelerated graphics
- **Post-processing** - UnrealBloomPass for realistic star glow
- **Real astronomical data** from Yale Bright Star Catalog and NASA Exoplanet Archive

### Performance
- Efficient particle systems for 2000+ objects
- BufferGeometry for optimal rendering
- Smooth 60 FPS target
- Dynamic filtering and rendering

### Data Accuracy
- Real 3D positions converted from RA/Dec coordinates
- Accurate distances in parsecs and light years
- Real orbital parameters from confirmed measurements
- Proper spectral classifications

## Project Structure

```
galexy-map/
├── index.html              # Main application with all features
├── fetch_star_data.py      # Generate star catalog from real data
├── generate_planets.py     # Generate planet and moon data
├── data/
│   ├── hygdata_v3.csv     # 90 stars with positions and properties
│   └── planets.csv         # 62 celestial bodies (planets + moons)
├── README.md               # This file
└── FEATURES.md            # Comprehensive feature documentation
```

## Future Possibilities

The foundation is built for:
- Loading millions of stars from Gaia catalog
- Procedural planet generation for all stars
- Galaxy structure visualization (spiral arms, core)
- Stellar proper motion over time
- VR support
- Binary and multi-star systems
- Ecliptic plane and celestial coordinate grids
- More realistic elliptical orbits

## Credits

Data sources:
- Yale Bright Star Catalog
- NASA Exoplanet Archive
- Hipparcos catalog
- JPL planetary ephemerides
- IAU constellation definitions

Built with Three.js and modern web technologies.
