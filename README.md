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

## Interactive Features

### Click & Explore
- **Click on stars and planets** to see detailed information
- **Info panel** shows:
  - Star: Spectral class, temperature, magnitude, distance
  - Planet: Type, orbital data, mass, radius
- **Hover effects** with smooth highlighting

### Keyboard Shortcuts
Press **?** or **H** to see all shortcuts:
- **?** / **H** - Show keyboard shortcuts help
- **Escape** - Close info panels
- **Home** - Reset camera to initial position
- **Ctrl+F** - Focus search box (ready for future search feature)

### Search & Filter (Backend Ready)
The codebase includes a complete search and filter system:
- Search stars by name
- Filter by spectral type (O, B, A, F, G, K, M)
- Filter by magnitude and distance
- Filter planets by type

## Code Architecture

### JavaScript Modules (Clean & Organized)
- **constants.js** - All configuration and magic numbers
- **colors.js** - Star and planet color management
- **data-loader.js** - CSV parsing and data loading
- **star-renderer.js** - Star field visualization
- **planet-renderer.js** - Planet and orbit rendering
- **scene-manager.js** - Three.js scene setup
- **ui-manager.js** - UI updates and statistics
- **interaction-manager.js** - Click/hover interactions
- **info-panel.js** - Detailed object information
- **search-filter.js** - Search and filtering engine
- **keyboard-shortcuts.js** - Keyboard hotkey system
- **main.js** - Application initialization

### Python Scripts (Type-Safe & Documented)
- **fetch_star_data.py** - Star catalog generator with type hints
- **generate_planets.py** - Planet system generator with full documentation

## Code Quality Features

✓ **Modular Architecture** - Clean separation of concerns
✓ **Type Hints** - Full Python type annotations
✓ **Comprehensive Documentation** - JSDoc and docstrings
✓ **Error Handling** - Robust validation throughout
✓ **Constants Management** - No magic numbers
✓ **Beautiful UI** - Modern glassmorphism design
✓ **Interactive** - Click, hover, and keyboard controls
✓ **Extensible** - Easy to add new features

## Next Steps

Future enhancements:
- More stars (millions from Gaia catalog)
- Real-time orbital animation
- Search UI implementation
- Galaxy structure (spiral arms, core)
- Time controls (see stellar motion)
- VR support
- Performance optimizations (LOD, instancing)
