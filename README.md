# Galaxy Forge - 3D Star & Planet Map

A live, explorable 3D model of real stars and planetary systems using accurate astronomical data with an immersive, interactive interface.

## 🌟 What This Is

A comprehensive 3D visualization of **real stars and planets** with:
- **Accurate 3D positions** from astronomical catalogs
- **Real spectral classifications** (O, B, A, F, G, K, M types)
- **Correct colors** based on stellar temperature and planet types
- **Actual apparent magnitudes** (brightness)
- **Real exoplanet systems** with confirmed and suspected planets
- **Interactive constellation patterns** connecting famous stars
- **Modern UI** with search, filters, and guided tours

Currently includes:
- **80 real stars** (brightest visible + nearby within 20 light years)
- **27 planetary systems** with 39 planets total
  - Our complete Solar System (all 8 planets)
  - 26 exoplanet systems (confirmed and suspected)
- **20+ constellation patterns** (Orion, Ursa Major, Leo, etc.)
- Orbital paths showing planet trajectories

## 🚀 Running It

Start a local web server:

```bash
python3 -m http.server 8000
# or
./run.sh
```

Then open: http://localhost:8000

## 🎮 Controls

### Mouse Controls
- **Left-click + drag** to rotate the view
- **Scroll wheel** to zoom in/out
- **Right-click + drag** to pan
- **Click on stars/planets** to see detailed information
- **Hover** over objects to see their names

### Keyboard Shortcuts
```
Navigation:
  H       - Go to Solar System
  R       - Reset camera view
  1-6     - Jump to tour bookmarks

View Controls:
  O       - Toggle orbital paths
  L       - Toggle labels
  P       - Toggle planets
  C       - Toggle constellations
  ↑/↓     - Adjust star size

Time Controls:
  SPACE   - Pause/Play time
  +       - Speed up time
  -       - Slow down time

Other:
  F       - Focus on search
  S       - Take screenshot
  ESC     - Close info panel
  ?       - Show help
```

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

## ✨ Features

### 🔍 Interactive Exploration
- **Smart Search** - Find any star, planet, or system instantly
- **Click & Explore** - Click celestial objects for detailed information panels
- **Hover Tooltips** - See object names as you explore
- **Info Panels** - Detailed data on spectral class, distance, mass, radius, orbital parameters

### 🎨 Visualization
- **Beautiful Space Background** - 10,000+ background stars for immersion
- **Constellation Lines** - Toggle famous constellation patterns
- **Orbital Paths** - See planet orbits around their stars
- **Color-Coded Stars** - Spectral type determines color (blue giants to red dwarfs)
- **Dynamic Labels** - Show/hide labels for notable objects
- **Color Legend** - Understand star types at a glance

### 🎛️ Control Panel
- **Three Tabs**: View, Filters, Tours
- **Display Options**: Toggle orbits, labels, planets, constellations
- **Size Controls**: Adjust star and planet sizes
- **Star Type Filters**: Show/hide specific spectral classes (O, B, A, F, G, K, M)
- **Distance Filter**: Limit stars by distance (10-3000 light years)

### 🚀 Guided Tours
Pre-configured viewpoints for:
1. Solar System - Our home
2. Alpha Centauri - Nearest star system
3. Sirius - Brightest star
4. Betelgeuse - Red supergiant
5. Nearby Stars - Local neighborhood
6. Galactic View - Wide perspective

### 📸 Capture & View
- **Screenshot Export** - Save high-quality PNG images
  - Press 'S' or click camera button
  - Automatic filename with date
  - Visual flash feedback
- **Fullscreen Mode** - Immersive viewing
  - Toggle with button or F11
  - Perfect for presentations
  - Full browser window

### ⏰ Time Controls & Animation
- **Play/Pause** - Control time flow
- **Speed Controls** - 0.125x to 32x speed
- **Date Display** - Current date in simulation
- **Real Orbital Motion** - Planets orbit their stars in real-time!
  - Based on actual orbital periods
  - Speed scales with time controls
  - Smooth, accurate animations

## 🌍 Real Systems You Can Explore

### Our Solar System (Sol)
All 8 planets in their correct orbital positions:
- **Terrestrial Planets**: Mercury, Venus, Earth, Mars
- **Gas Giants**: Jupiter, Saturn
- **Ice Giants**: Uranus, Neptune

### Major Exoplanet Systems
- **Proxima Centauri** (4.24 ly) - 3 planets including potentially habitable Proxima b
- **Tau Ceti** (11.9 ly) - 4 super-Earths in the habitable zone
- **Epsilon Eridani** (10.5 ly) - Gas giant in a young stellar system
- **Barnard's Star** (6 ly) - Super-Earth around ancient red dwarf
- **Pollux** (33.8 ly) - Massive gas giant around orange giant
- **Fomalhaut** (25 ly) - Famous exoplanet with wide orbit
- **Vega** (25 ly) - Potential planets in debris disk
- **Sirius** (8.6 ly) - Brightest star with suspected planet
- **And 18 more systems** including Altair, Arcturus, Aldebaran, Betelgeuse, Rigel, Canopus

### Famous Stars
- **Sirius** - Brightest star in night sky (8.6 ly)
- **Betelgeuse** - Red supergiant in Orion (642 ly)
- **Rigel** - Blue supergiant in Orion (860 ly)
- **Vega** - Brilliant blue-white star (25 ly)
- **Arcturus** - Orange giant (36.7 ly)
- **Polaris** - North Star (433 ly)
- **Deneb** - Distant supergiant (2615 ly)
- **Antares** - Red supergiant (550 ly)

### Constellations
View traditional constellation patterns:
- **Orion** - The Hunter
- **Ursa Major** - Big Dipper
- **Canis Major** - Sirius and companions
- **Leo** - The Lion
- **Scorpius** - The Scorpion
- **Cygnus** - The Swan
- **Gemini** - The Twins
- **And 13 more** classical constellations

## 🛠️ Technical Details

### Data Sources
- **HYG Database** - Real stellar positions and properties
- **NASA Exoplanet Archive** - Confirmed exoplanet data
- **IAU Constellation Data** - Traditional star patterns

### Technology Stack
- **Three.js** - 3D graphics engine
- **WebGL** - Hardware-accelerated rendering
- **Vanilla JavaScript** - No framework dependencies
- **CSS3** - Modern, responsive UI

### Performance
- Efficient particle system for 80+ stars
- Optimized mesh rendering for 39 planets
- Dynamic LOD (Level of Detail) support ready
- Smooth 60fps on modern hardware

## 🎯 Future Enhancements

### Planned Features
- **More Data**: Thousands of stars from Gaia DR3 catalog
- **Nebulae & Deep Sky Objects**: Add famous nebulae (Orion, Crab, etc.)
- **Distance Measurement Tools**: Interactive ruler for measuring distances
- **Camera Path Recording**: Save and replay flight paths
- **Asteroid Belt**: Add asteroid belt to Solar System
- **Comet Trails**: Visualize comets with tails
- **VR Support**: Full virtual reality mode with hand controllers
- **Galaxy Structure**: Milky Way spiral arms visualization
- **Binary Star Systems**: Proper orbital mechanics for binary pairs
- **Stellar Evolution**: Show star lifecycle stages
- **Mobile Optimization**: Touch gestures and mobile UI
- **Multi-language Support**: Interface translations
- **Educational Mode**: Guided tours with narration
- **API Integration**: Real-time data from space telescopes

### Completed Recently ✅
- ✅ Real orbital motion for planets
- ✅ Screenshot export functionality
- ✅ Fullscreen viewing mode
- ✅ Constellation patterns
- ✅ Advanced filtering system
- ✅ Comprehensive keyboard shortcuts
- ✅ Guided tours system
