# Roblox Trading Simulator

A realistic HTML-based simulation of the Roblox trading economy where you can purchase items, trade with AI players, and build your virtual wealth.

## 🎮 Game Overview

This simulator recreates the Roblox trading experience with:
- **100 AI players** with varying starting balances
- **Dynamic item releases** every 30 seconds
- **Realistic economy** based on supply, demand, and completed trades
- **Trading system** with AI players sending offers
- **Leaderboards** tracking top players by Value and RAP

## 🚀 How to Play

1. **Start the Game**: Open `index.html` in your web browser
2. **Choose Username**: Enter a username (3-26 characters) and click "Start Game"
3. **Explore the Interface**: Use the navigation tabs to access different features

## 📋 Game Features

### Marketplace
- View all available items with their current prices, stock, value, and RAP
- Purchase items when they're in stock
- Watch prices fluctuate based on AI trading activity
- Items go out of stock and can only be purchased through resales

### Profile
- View your current balance, total value, RAP, and items owned
- Browse your inventory
- Track your trading progress

### Trades
- **Inbound**: Trades sent to you by AI players
- **Outbound**: Trades you've sent to others
- **Inactive**: Declined or expired trades
- **Completed**: Successfully executed trades
- Accept, decline, or counter trade offers

### Leaderboards
- **Top Value**: Players ranked by total item value
- **Top RAP**: Players ranked by total RAP (Recent Average Price)
- Real-time updates as the economy evolves

## 🎯 Game Mechanics

### Item Releases
- New items are released every 30 seconds
- Each item has a limited stock (10-60 copies)
- Once out of stock, items can only be purchased through resales

### AI Behavior
- AI players automatically purchase items based on availability and their balance
- AI players trade with each other behind the scenes
- AI players occasionally send trade offers to you
- AI players resell items based on market conditions

### Economy System
- **Value**: Based on completed trades and market demand
- **RAP**: Recent Average Price of trades
- Prices fluctuate based on:
  - Item rarity (Common, Uncommon, Rare, Epic, Legendary)
  - Available stock (lower stock = higher prices)
  - Trading activity
  - AI buying/selling behavior

### Trading System
- AI players send fair trades based on item values
- You can accept, decline, or counter trade offers
- Trades affect item values in the marketplace
- Successful trades update both players' inventories and statistics

## 🎨 Design Features

- **Roblox-inspired UI** with modern design
- **Responsive layout** that works on desktop and mobile
- **Real-time updates** without page refreshes
- **Smooth animations** and hover effects
- **Modal dialogs** for trade interactions

## 🛠️ Technical Details

### Files Structure
```
rblx-trade-sim2/
├── index.html      # Main game interface
├── styles.css      # Game styling
├── script.js       # Game logic and AI behavior
└── README.md       # This file
```

### Technologies Used
- **HTML5** for structure
- **CSS3** for styling and animations
- **Vanilla JavaScript** for game logic
- **No external dependencies** - runs entirely in the browser

### Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🎲 Game Tips

1. **Watch the Marketplace**: Monitor item releases and stock levels
2. **Time Your Purchases**: Buy items when they're first released for better prices
3. **Consider Trades**: AI offers are usually fair - consider accepting them
4. **Track Your Progress**: Use the Profile tab to monitor your growth
5. **Check Leaderboards**: See how you rank against AI players

## 🔧 Customization

You can modify the game by editing:

- **Item Database**: Add new items in `script.js` (lines 12-32)
- **AI Names**: Change AI player names in `script.js` (lines 34-44)
- **Game Balance**: Adjust starting money, release timers, and AI behavior
- **Styling**: Modify colors and layout in `styles.css`

## 🎉 Enjoy the Game!

This simulator provides an engaging way to experience the dynamics of a virtual trading economy. Watch as prices fluctuate, items become rare, and your trading skills develop over time.

**Happy Trading!** 🎮💰 