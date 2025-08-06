# Truth & Dare - Modern Web Game

A beautiful, animated multiplayer Truth and Dare web application built with React, TypeScript, Framer Motion, and Tailwind CSS.

## Features

🎯 **Realistic Bottle Spin Animation**
- Smooth, physics-based spinning animation
- Realistic bottle design with 3D effects
- Cool spinning sound effects using Web Audio API

👥 **Player Management**
- Add/remove players dynamically
- Circular player wheel layout
- Visual selection indicators

🎨 **Modern UI/UX**
- Glassmorphism design with backdrop blur effects
- Dark/light gradient backgrounds
- Smooth animations and transitions
- Fully responsive design

🎮 **Interactive Gameplay**
- No predefined questions - players create their own
- Animated modal for Truth or Dare selection
- Real-time task display
- Minimum 2 players required

## Tech Stack

- **React 18** with TypeScript
- **Framer Motion** for animations
- **Tailwind CSS** for styling
- **Web Audio API** for sound effects

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd truth-and-dare
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## How to Play

1. **Add Players**: Use the "Add Player" button to add participants to the game
2. **Spin the Bottle**: Click the "Spin the Bottle!" button to start the game
3. **Choose Challenge**: When a player is selected, choose between Truth or Dare
4. **Create Task**: Type in a custom question or challenge for the selected player
5. **Complete Challenge**: The selected player must complete the task!

## Game Rules

- Minimum 2 players required to start
- Players can be added or removed at any time
- Each spin randomly selects a player
- No predefined questions - everything is custom!
- Players can choose between Truth (questions) or Dare (actions)

## Features in Detail

### Bottle Animation
- Realistic 3D bottle design with gradient colors
- Smooth spinning animation with easing
- Dynamic rotation calculation
- Glow effects during spinning
- Web Audio API sound effects

### Player Wheel
- Circular arrangement of players
- Visual selection indicators
- Hover effects and animations
- Responsive design for mobile

### Task Modal
- Animated modal with backdrop blur
- Truth/Dare selection buttons
- Custom task input
- Form validation
- Smooth transitions

### Responsive Design
- Works on desktop, tablet, and mobile
- Adaptive layouts and sizing
- Touch-friendly interactions

## Customization

### Colors and Themes
The app uses Tailwind CSS with custom gradients. You can modify the color scheme by editing:
- `src/index.css` - Main styles and custom classes
- Component files - Individual styling

### Animations
Framer Motion animations can be customized in:
- `src/components/Bottle.tsx` - Bottle spinning
- `src/components/PlayerWheel.tsx` - Player animations
- `src/components/TaskModal.tsx` - Modal transitions

### Sound Effects
The spinning sound is generated using Web Audio API. You can modify the sound in:
- `src/components/Bottle.tsx` - `playSpinningSound()` function

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Built with React and TypeScript
- Animations powered by Framer Motion
- Styling with Tailwind CSS
- Sound effects using Web Audio API

---

**Have fun playing Truth & Dare!** 🎉
