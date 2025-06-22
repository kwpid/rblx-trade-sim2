// Game State
let gameState = {
    player: null,
    aiPlayers: [],
    items: [],
    trades: [],
    releasedItems: [],
    gameTime: 0,
    releaseTimer: 30,
    nextReleaseTime: 30,
    selectedItems: {
        player: [],
        ai: []
    },
    currentTradePartner: null
};

// Item Database - Simulated Roblox items with images
const itemDatabase = [
    { id: 1, name: "Dominus Empyreus", image: "https://via.placeholder.com/150x150/FFD700/000000?text=👑", basePrice: 50000, rarity: "legendary", buyLimit: 1 },
    { id: 2, name: "Sparkle Time Fedora", image: "https://via.placeholder.com/150x150/9370DB/FFFFFF?text=🎩", basePrice: 25000, rarity: "epic", buyLimit: 2 },
    { id: 3, name: "Robloxian 2.0", image: "https://via.placeholder.com/150x150/4169E1/FFFFFF?text=👤", basePrice: 15000, rarity: "rare", buyLimit: 3 },
    { id: 4, name: "Clockwork's Headphones", image: "https://via.placeholder.com/150x150/32CD32/FFFFFF?text=🎧", basePrice: 12000, rarity: "rare", buyLimit: 3 },
    { id: 5, name: "Sparkle Time Fedora", image: "https://via.placeholder.com/150x150/FF6347/FFFFFF?text=🎩", basePrice: 8000, rarity: "uncommon", buyLimit: 5 },
    { id: 6, name: "Super Super Happy Face", image: "https://via.placeholder.com/150x150/FF69B4/FFFFFF?text=😊", basePrice: 6000, rarity: "uncommon", buyLimit: 5 },
    { id: 7, name: "Builderman's Face", image: "https://via.placeholder.com/150x150/808080/FFFFFF?text=👨", basePrice: 4000, rarity: "common", buyLimit: 10 },
    { id: 8, name: "ROBLOX Visor", image: "https://via.placeholder.com/150x150/20B2AA/FFFFFF?text=🕶️", basePrice: 3000, rarity: "common", buyLimit: 10 },
    { id: 9, name: "ROBLOX T-Shirt", image: "https://via.placeholder.com/150x150/FF4500/FFFFFF?text=👕", basePrice: 2000, rarity: "common", buyLimit: 10 },
    { id: 10, name: "ROBLOX Hat", image: "https://via.placeholder.com/150x150/8A2BE2/FFFFFF?text=🎩", basePrice: 1500, rarity: "common", buyLimit: 10 },
    { id: 11, name: "Dominus Frigidus", image: "https://via.placeholder.com/150x150/00CED1/FFFFFF?text=❄️", basePrice: 75000, rarity: "legendary", buyLimit: 1 },
    { id: 12, name: "Dominus Vespertilio", image: "https://via.placeholder.com/150x150/2F4F4F/FFFFFF?text=🦇", basePrice: 60000, rarity: "legendary", buyLimit: 1 },
    { id: 13, name: "Sparkle Time Fedora", image: "https://via.placeholder.com/150x150/FF1493/FFFFFF?text=⭐", basePrice: 35000, rarity: "epic", buyLimit: 2 },
    { id: 14, name: "ROBLOXian", image: "https://via.placeholder.com/150x150/00FF7F/000000?text=🤖", basePrice: 20000, rarity: "rare", buyLimit: 3 },
    { id: 15, name: "Super Super Happy Face", image: "https://via.placeholder.com/150x150/FFD700/000000?text=😄", basePrice: 10000, rarity: "rare", buyLimit: 3 },
    { id: 16, name: "Builderman's Face", image: "https://via.placeholder.com/150x150/4682B4/FFFFFF?text=👷", basePrice: 7000, rarity: "uncommon", buyLimit: 5 },
    { id: 17, name: "ROBLOX Visor", image: "https://via.placeholder.com/150x150/DC143C/FFFFFF?text=🥽", basePrice: 5000, rarity: "uncommon", buyLimit: 5 },
    { id: 18, name: "ROBLOX T-Shirt", image: "https://via.placeholder.com/150x150/32CD32/FFFFFF?text=👔", basePrice: 3000, rarity: "common", buyLimit: 10 },
    { id: 19, name: "ROBLOX Hat", image: "https://via.placeholder.com/150x150/FF6347/FFFFFF?text=🎯", basePrice: 2500, rarity: "common", buyLimit: 10 },
    { id: 20, name: "ROBLOX Cap", image: "https://via.placeholder.com/150x150/9370DB/FFFFFF?text=🧢", basePrice: 1800, rarity: "common", buyLimit: 10 }
];

// AI Names
const aiNames = [
    "TraderPro", "ItemHunter", "ValueSeeker", "RAPMaster", "TradeKing", "ItemCollector",
    "ValueMaximizer", "TradeExpert", "ItemInvestor", "RAPHunter", "TradeMaster", "ItemTrader",
    "ValueBuilder", "TradePro", "ItemSeeker", "RAPCollector", "TradeBuilder", "ItemMaster",
    "ValueHunter", "TradeInvestor", "ItemKing", "RAPExpert", "TradeSeeker", "ItemBuilder",
    "ValueCollector", "TradeKing", "ItemPro", "RAPBuilder", "TradeMaster", "ItemHunter",
    "ValueExpert", "TradeSeeker", "ItemCollector", "RAPKing", "TradeBuilder", "ItemMaster",
    "ValuePro", "TradeHunter", "ItemExpert", "RAPSeeker", "TradeCollector", "ItemKing",
    "ValueBuilder", "TradeMaster", "ItemPro", "RAPHunter", "TradeExpert", "ItemSeeker",
    "ValueKing", "TradeCollector", "ItemBuilder", "RAPMaster", "TradePro", "ItemHunter",
    "ValueSeeker", "TradeKing", "ItemExpert", "RAPBuilder", "TradeMaster", "ItemCollector",
    "ValueHunter", "TradePro", "ItemKing", "RAPSeeker", "TradeBuilder", "ItemMaster",
    "ValueExpert", "TradeHunter", "ItemPro", "RAPKing", "TradeSeeker", "ItemBuilder",
    "ValueMaster", "TradeCollector", "ItemKing", "RAPPro", "TradeBuilder", "ItemHunter",
    "ValueSeeker", "TradeMaster", "ItemExpert", "RAPKing", "TradePro", "ItemCollector",
    "ValueBuilder", "TradeHunter", "ItemKing", "RAPMaster", "TradeSeeker", "ItemBuilder",
    "ValuePro", "TradeKing", "ItemMaster", "RAPExpert", "TradeBuilder", "ItemHunter",
    "ValueKing", "TradePro", "ItemSeeker", "RAPBuilder", "TradeMaster", "ItemCollector",
    "ValueHunter", "TradeExpert", "ItemKing", "RAPPro", "TradeBuilder", "ItemMaster",
    "ValueSeeker", "TradeKing", "ItemExpert", "RAPHunter", "TradePro", "ItemBuilder"
];

// Initialize Game
function initGame() {
    // Create player
    const username = document.getElementById('usernameInput').value.trim();
    if (username.length < 3 || username.length > 26) {
        alert('Username must be between 3 and 26 characters!');
        return;
    }

    gameState.player = {
        username: username,
        balance: Math.floor(Math.random() * 90000) + 10000, // 10k-100k starting money
        inventory: [],
        value: 0,
        rap: 0,
        buyHistory: {} // Track how many of each item the player has bought
    };

    // Create AI players
    gameState.aiPlayers = [];
    for (let i = 0; i < 100; i++) {
        const aiPlayer = {
            username: aiNames[i],
            balance: Math.floor(Math.random() * 200000) + 5000, // 5k-205k starting money
            inventory: [],
            value: 0,
            rap: 0,
            buyHistory: {}
        };
        gameState.aiPlayers.push(aiPlayer);
    }

    // Show game interface
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('gameInterface').style.display = 'block';

    // Update UI
    updatePlayerInfo();
    updateLeaderboards();

    // Start game loop
    startGameLoop();
}

// Game Loop
function startGameLoop() {
    setInterval(() => {
        gameState.gameTime++;
        gameState.releaseTimer--;

        // Update release timer display
        document.getElementById('nextReleaseTimer').textContent = `${gameState.releaseTimer}s`;

        // Release new item every 30 seconds
        if (gameState.releaseTimer <= 0) {
            releaseNewItem();
            gameState.releaseTimer = 30;
        }

        // AI behavior
        aiBehavior();

        // Update UI
        updateMarketplace();
        updatePlayerInfo();
        updateLeaderboards();
        updateTrades();

    }, 1000);
}

// Release new item
function releaseNewItem() {
    const availableItems = itemDatabase.filter(item => 
        !gameState.releasedItems.some(released => released.id === item.id)
    );

    if (availableItems.length === 0) {
        // Reset if all items have been released
        gameState.releasedItems = [];
        return;
    }

    const randomItem = availableItems[Math.floor(Math.random() * availableItems.length)];
    const stock = Math.floor(Math.random() * 50) + 10; // 10-60 stock

    const releasedItem = {
        ...randomItem,
        stock: stock,
        currentPrice: randomItem.basePrice,
        value: randomItem.basePrice,
        rap: randomItem.basePrice,
        trades: [],
        resellers: [] // Track who owns this item for reselling
    };

    gameState.releasedItems.push(releasedItem);
    gameState.items.push(releasedItem);

    console.log(`New item released: ${releasedItem.name} (Stock: ${stock})`);
}

// AI Behavior
function aiBehavior() {
    // AI purchasing items (reduced frequency)
    gameState.aiPlayers.forEach(ai => {
        if (Math.random() < 0.02) { // 2% chance per second (reduced from 10%)
            const availableItems = gameState.items.filter(item => 
                item.stock > 0 && ai.balance >= item.currentPrice && 
                (!ai.buyHistory[item.id] || ai.buyHistory[item.id] < item.buyLimit)
            );

            if (availableItems.length > 0) {
                const randomItem = availableItems[Math.floor(Math.random() * availableItems.length)];
                purchaseItem(ai, randomItem);
            }
        }
    });

    // AI trading with each other
    if (Math.random() < 0.05) { // 5% chance per second
        const aiWithItems = gameState.aiPlayers.filter(ai => ai.inventory.length > 0);
        if (aiWithItems.length >= 2) {
            const ai1 = aiWithItems[Math.floor(Math.random() * aiWithItems.length)];
            const ai2 = aiWithItems[Math.floor(Math.random() * aiWithItems.length)];
            
            if (ai1 !== ai2) {
                createAITrade(ai1, ai2);
            }
        }
    }

    // AI sending trades to player (increased frequency)
    if (Math.random() < 0.05) { // 5% chance per second (increased from 2%)
        const aiWithItems = gameState.aiPlayers.filter(ai => ai.inventory.length > 0);
        if (aiWithItems.length > 0 && gameState.player.inventory.length > 0) {
            const randomAI = aiWithItems[Math.floor(Math.random() * aiWithItems.length)];
            createAITrade(randomAI, gameState.player);
        }
    }

    // AI reselling items
    gameState.aiPlayers.forEach(ai => {
        ai.inventory.forEach(item => {
            if (Math.random() < 0.001) { // 0.1% chance per second per item
                resellItem(ai, item);
            }
        });
    });
}

// Purchase item
function purchaseItem(buyer, item) {
    if (item.stock > 0 && buyer.balance >= item.currentPrice) {
        // Check buy limit
        const buyHistory = buyer.buyHistory[item.id] || 0;
        if (buyHistory >= item.buyLimit) {
            return; // Can't buy more due to buy limit
        }

        buyer.balance -= item.currentPrice;
        const purchasedItem = { ...item, purchasePrice: item.currentPrice };
        buyer.inventory.push(purchasedItem);
        
        // Update buy history
        buyer.buyHistory[item.id] = (buyer.buyHistory[item.id] || 0) + 1;
        
        item.stock--;

        // Update resellers list
        if (!item.resellers.find(r => r.username === buyer.username)) {
            item.resellers.push({
                username: buyer.username,
                quantity: 1
            });
        } else {
            const reseller = item.resellers.find(r => r.username === buyer.username);
            reseller.quantity++;
        }

        // Update item value based on demand
        if (item.stock < item.stock + 1) {
            item.currentPrice = Math.floor(item.currentPrice * 1.05); // 5% price increase
        }

        // Update buyer's value and RAP
        updatePlayerStats(buyer);
    }
}

// Resell item
function resellItem(seller, item) {
    const resellPrice = calculateResellPrice(item);
    
    // Find the item in the marketplace
    const marketplaceItem = gameState.items.find(mpItem => mpItem.id === item.id);
    
    if (marketplaceItem) {
        // Add to marketplace stock
        marketplaceItem.stock++;
        marketplaceItem.currentPrice = resellPrice;
        
        // Remove from seller's inventory
        const itemIndex = seller.inventory.findIndex(invItem => invItem.id === item.id);
        if (itemIndex > -1) {
            seller.inventory.splice(itemIndex, 1);
            seller.balance += resellPrice;
            
            // Update resellers list
            const reseller = marketplaceItem.resellers.find(r => r.username === seller.username);
            if (reseller) {
                reseller.quantity--;
                if (reseller.quantity <= 0) {
                    marketplaceItem.resellers = marketplaceItem.resellers.filter(r => r.username !== seller.username);
                }
            }
            
            updatePlayerStats(seller);
        }
    }
}

// Calculate resell price
function calculateResellPrice(item) {
    let basePrice = item.value || item.currentPrice || item.basePrice;
    
    // Consider rarity
    const rarityMultiplier = {
        'common': 1.1,
        'uncommon': 1.2,
        'rare': 1.4,
        'epic': 1.7,
        'legendary': 2.2
    };
    
    basePrice *= rarityMultiplier[item.rarity] || 1.1;
    
    // Consider stock (lower stock = higher price)
    const marketplaceItem = gameState.items.find(mpItem => mpItem.id === item.id);
    if (marketplaceItem && marketplaceItem.stock < 10) {
        basePrice *= (1 + (10 - marketplaceItem.stock) * 0.1);
    }
    
    // Add some randomness
    basePrice *= (0.8 + Math.random() * 0.4);
    
    return Math.floor(basePrice);
}

// Create AI trade
function createAITrade(ai1, ai2) {
    if (ai1.inventory.length === 0 || ai2.inventory.length === 0) return;

    const ai1Item = ai1.inventory[Math.floor(Math.random() * ai1.inventory.length)];
    const ai2Item = ai2.inventory[Math.floor(Math.random() * ai2.inventory.length)];

    const trade = {
        id: Date.now() + Math.random(),
        from: ai1.username,
        to: ai2.username,
        fromItems: [ai1Item],
        toItems: [ai2Item],
        status: 'pending',
        timestamp: Date.now()
    };

    gameState.trades.push(trade);

    // AI automatically accepts fair trades
    const ai1Value = ai1Item.value || ai1Item.currentPrice || ai1Item.basePrice;
    const ai2Value = ai2Item.value || ai2Item.currentPrice || ai2Item.basePrice;
    
    if (Math.abs(ai1Value - ai2Value) / Math.max(ai1Value, ai2Value) < 0.3) { // 30% tolerance
        executeTrade(trade);
    } else {
        trade.status = 'inactive';
    }
}

// Execute trade
function executeTrade(trade) {
    const fromPlayer = trade.from === gameState.player.username ? gameState.player : 
                      gameState.aiPlayers.find(ai => ai.username === trade.from);
    const toPlayer = trade.to === gameState.player.username ? gameState.player : 
                    gameState.aiPlayers.find(ai => ai.username === trade.to);

    if (!fromPlayer || !toPlayer) return;

    // Transfer items
    trade.fromItems.forEach(item => {
        const itemIndex = fromPlayer.inventory.findIndex(invItem => invItem.id === item.id);
        if (itemIndex > -1) {
            const transferredItem = fromPlayer.inventory.splice(itemIndex, 1)[0];
            toPlayer.inventory.push(transferredItem);
            
            // Update resellers list
            const marketplaceItem = gameState.items.find(mpItem => mpItem.id === item.id);
            if (marketplaceItem) {
                const fromReseller = marketplaceItem.resellers.find(r => r.username === fromPlayer.username);
                if (fromReseller) {
                    fromReseller.quantity--;
                    if (fromReseller.quantity <= 0) {
                        marketplaceItem.resellers = marketplaceItem.resellers.filter(r => r.username !== fromPlayer.username);
                    }
                }
                
                if (!marketplaceItem.resellers.find(r => r.username === toPlayer.username)) {
                    marketplaceItem.resellers.push({
                        username: toPlayer.username,
                        quantity: 1
                    });
                } else {
                    const toReseller = marketplaceItem.resellers.find(r => r.username === toPlayer.username);
                    toReseller.quantity++;
                }
            }
        }
    });

    trade.toItems.forEach(item => {
        const itemIndex = toPlayer.inventory.findIndex(invItem => invItem.id === item.id);
        if (itemIndex > -1) {
            const transferredItem = toPlayer.inventory.splice(itemIndex, 1)[0];
            fromPlayer.inventory.push(transferredItem);
            
            // Update resellers list
            const marketplaceItem = gameState.items.find(mpItem => mpItem.id === item.id);
            if (marketplaceItem) {
                const toReseller = marketplaceItem.resellers.find(r => r.username === toPlayer.username);
                if (toReseller) {
                    toReseller.quantity--;
                    if (toReseller.quantity <= 0) {
                        marketplaceItem.resellers = marketplaceItem.resellers.filter(r => r.username !== toPlayer.username);
                    }
                }
                
                if (!marketplaceItem.resellers.find(r => r.username === fromPlayer.username)) {
                    marketplaceItem.resellers.push({
                        username: fromPlayer.username,
                        quantity: 1
                    });
                } else {
                    const fromReseller = marketplaceItem.resellers.find(r => r.username === fromPlayer.username);
                    fromReseller.quantity++;
                }
            }
        }
    });

    // Update item values based on trade
    [...trade.fromItems, ...trade.toItems].forEach(item => {
        const marketplaceItem = gameState.items.find(mpItem => mpItem.id === item.id);
        if (marketplaceItem) {
            marketplaceItem.trades.push({
                price: item.value || item.currentPrice || item.basePrice,
                timestamp: Date.now()
            });
            
            // Update value based on recent trades
            const recentTrades = marketplaceItem.trades.filter(t => 
                Date.now() - t.timestamp < 300000 // Last 5 minutes
            );
            
            if (recentTrades.length > 0) {
                const avgPrice = recentTrades.reduce((sum, t) => sum + t.price, 0) / recentTrades.length;
                marketplaceItem.value = Math.floor(avgPrice);
                marketplaceItem.currentPrice = Math.floor(avgPrice);
            }
        }
    });

    trade.status = 'completed';
    
    // Update player stats
    updatePlayerStats(fromPlayer);
    updatePlayerStats(toPlayer);
}

// Update player statistics
function updatePlayerStats(player) {
    let totalValue = 0;
    let totalRAP = 0;

    player.inventory.forEach(item => {
        const marketplaceItem = gameState.items.find(mpItem => mpItem.id === item.id);
        if (marketplaceItem) {
            totalValue += marketplaceItem.value || marketplaceItem.currentPrice || marketplaceItem.basePrice;
            totalRAP += marketplaceItem.rap || marketplaceItem.currentPrice || marketplaceItem.basePrice;
        } else {
            totalValue += item.value || item.currentPrice || item.basePrice;
            totalRAP += item.rap || item.currentPrice || item.basePrice;
        }
    });

    player.value = totalValue;
    player.rap = totalRAP;
}

// Update UI Functions
function updatePlayerInfo() {
    document.getElementById('userDisplayName').textContent = gameState.player.username;
    document.getElementById('userBalance').textContent = `$${gameState.player.balance.toLocaleString()}`;
    document.getElementById('currentValue').textContent = `$${gameState.player.value.toLocaleString()}`;
    document.getElementById('currentRAP').textContent = `$${gameState.player.rap.toLocaleString()}`;
    document.getElementById('itemsOwned').textContent = gameState.player.inventory.length;
    
    updateInventory();
}

function updateInventory() {
    const inventoryGrid = document.getElementById('inventoryGrid');
    inventoryGrid.innerHTML = '';

    gameState.player.inventory.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = 'item-card';
        itemCard.onclick = () => openItemModal(item, true);
        itemCard.innerHTML = `
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="item-fallback">${item.name.charAt(0)}</div>
            </div>
            <div class="item-name">${item.name}</div>
            <div class="item-value">Value: $${(item.value || item.currentPrice || item.basePrice).toLocaleString()}</div>
            <div class="item-rap">RAP: $${(item.rap || item.currentPrice || item.basePrice).toLocaleString()}</div>
        `;
        inventoryGrid.appendChild(itemCard);
    });
}

function updateMarketplace() {
    const itemsGrid = document.getElementById('itemsGrid');
    itemsGrid.innerHTML = '';

    gameState.items.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = 'item-card';
        itemCard.onclick = () => openItemModal(item, false);
        
        const canBuy = item.stock > 0 && gameState.player.balance >= item.currentPrice;
        const buyLimitReached = gameState.player.buyHistory[item.id] >= item.buyLimit;
        
        itemCard.innerHTML = `
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="item-fallback">${item.name.charAt(0)}</div>
            </div>
            <div class="item-name">${item.name}</div>
            <div class="item-price">$${item.currentPrice.toLocaleString()}</div>
            <div class="item-stock">Stock: ${item.stock}</div>
            <div class="item-value">Value: $${item.value.toLocaleString()}</div>
            <div class="item-rap">RAP: $${item.rap.toLocaleString()}</div>
            <button class="buy-btn" ${!canBuy || buyLimitReached ? 'disabled' : ''} 
                    onclick="event.stopPropagation(); purchaseItem(gameState.player, ${JSON.stringify(item).replace(/"/g, '&quot;')})">
                ${item.stock === 0 ? 'Out of Stock' : buyLimitReached ? 'Buy Limit Reached' : 'Buy'}
            </button>
        `;
        itemsGrid.appendChild(itemCard);
    });
}

function updateTrades() {
    const tradesList = document.getElementById('tradesList');
    const filter = document.getElementById('tradeFilter').value;
    tradesList.innerHTML = '';

    const playerTrades = gameState.trades.filter(trade => 
        trade.from === gameState.player.username || trade.to === gameState.player.username
    );

    const filteredTrades = playerTrades.filter(trade => {
        if (filter === 'inbound') return trade.to === gameState.player.username && trade.status === 'pending';
        if (filter === 'outbound') return trade.from === gameState.player.username && trade.status === 'pending';
        if (filter === 'inactive') return trade.status === 'inactive';
        if (filter === 'completed') return trade.status === 'completed';
        return false;
    });

    filteredTrades.forEach(trade => {
        const tradeItem = document.createElement('div');
        tradeItem.className = 'trade-item';
        tradeItem.onclick = () => openTradeModal(trade);
        
        const partner = trade.from === gameState.player.username ? trade.to : trade.from;
        const fromValue = trade.fromItems.reduce((sum, item) => sum + (item.value || item.currentPrice || item.basePrice), 0);
        const toValue = trade.toItems.reduce((sum, item) => sum + (item.value || item.currentPrice || item.basePrice), 0);
        
        tradeItem.innerHTML = `
            <div class="trade-header">
                <span class="trade-partner">${partner}</span>
                <span class="trade-status ${trade.status}">${trade.status}</span>
            </div>
            <div class="trade-summary">
                ${trade.fromItems.map(item => item.name).join(', ')} ⇄ ${trade.toItems.map(item => item.name).join(', ')}
                <br>$${fromValue.toLocaleString()} ⇄ $${toValue.toLocaleString()}
            </div>
        `;
        tradesList.appendChild(tradeItem);
    });
}

function updateLeaderboards() {
    // Value leaderboard
    const allPlayers = [gameState.player, ...gameState.aiPlayers];
    const valueLeaderboard = allPlayers.sort((a, b) => b.value - a.value).slice(0, 50);
    
    const valueList = document.getElementById('valueLeaderboardList');
    valueList.innerHTML = '';
    
    valueLeaderboard.forEach((player, index) => {
        const entry = document.createElement('div');
        entry.className = 'leaderboard-entry';
        const rankClass = index < 3 ? ['gold', 'silver', 'bronze'][index] : '';
        
        entry.innerHTML = `
            <span class="rank ${rankClass}">${index + 1}</span>
            <span class="player-name" ${player.username !== gameState.player.username ? `onclick="openTradeModal(null, '${player.username}')" style="cursor: pointer; color: #00a2ff;"` : ''}>${player.username}</span>
            <span class="player-value">$${player.value.toLocaleString()}</span>
        `;
        valueList.appendChild(entry);
    });

    // RAP leaderboard
    const rapLeaderboard = allPlayers.sort((a, b) => b.rap - a.rap).slice(0, 50);
    
    const rapList = document.getElementById('rapLeaderboardList');
    rapList.innerHTML = '';
    
    rapLeaderboard.forEach((player, index) => {
        const entry = document.createElement('div');
        entry.className = 'leaderboard-entry';
        const rankClass = index < 3 ? ['gold', 'silver', 'bronze'][index] : '';
        
        entry.innerHTML = `
            <span class="rank ${rankClass}">${index + 1}</span>
            <span class="player-name" ${player.username !== gameState.player.username ? `onclick="openTradeModal(null, '${player.username}')" style="cursor: pointer; color: #00a2ff;"` : ''}>${player.username}</span>
            <span class="player-value">$${player.rap.toLocaleString()}</span>
        `;
        rapList.appendChild(entry);
    });
}

// Modal Functions
function openItemModal(item, isOwned) {
    const modal = document.getElementById('itemModal');
    const marketplaceItem = gameState.items.find(mpItem => mpItem.id === item.id);
    
    let resellersHtml = '';
    if (marketplaceItem && marketplaceItem.resellers.length > 0) {
        resellersHtml = '<h4>Resellers:</h4><ul>';
        marketplaceItem.resellers.forEach(reseller => {
            resellersHtml += `<li>${reseller.username}: ${reseller.quantity} copies</li>`;
        });
        resellersHtml += '</ul>';
    }
    
    let actionsHtml = '';
    if (isOwned) {
        actionsHtml = `
            <button class="btn-resell" onclick="resellItem(gameState.player, ${JSON.stringify(item).replace(/"/g, '&quot;')})">Resell Item</button>
        `;
    } else if (marketplaceItem && marketplaceItem.stock > 0) {
        const canBuy = gameState.player.balance >= marketplaceItem.currentPrice;
        const buyLimitReached = gameState.player.buyHistory[item.id] >= item.buyLimit;
        
        actionsHtml = `
            <button class="btn-purchase" ${!canBuy || buyLimitReached ? 'disabled' : ''} 
                    onclick="purchaseItem(gameState.player, ${JSON.stringify(marketplaceItem).replace(/"/g, '&quot;')})">
                ${buyLimitReached ? 'Buy Limit Reached' : 'Purchase'}
            </button>
        `;
    }
    
    document.getElementById('itemModalContent').innerHTML = `
        <div class="item-details">
            <div class="item-image-large">
                <img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="item-fallback-large">${item.name.charAt(0)}</div>
            </div>
            <h3>${item.name}</h3>
            <p><strong>Rarity:</strong> ${item.rarity}</p>
            <p><strong>Current Price:</strong> $${(item.currentPrice || item.basePrice).toLocaleString()}</p>
            <p><strong>Value:</strong> $${(item.value || item.currentPrice || item.basePrice).toLocaleString()}</p>
            <p><strong>RAP:</strong> $${(item.rap || item.currentPrice || item.basePrice).toLocaleString()}</p>
            <p><strong>Stock:</strong> ${marketplaceItem ? marketplaceItem.stock : 'N/A'}</p>
            <p><strong>Buy Limit:</strong> ${item.buyLimit}</p>
            ${resellersHtml}
        </div>
        <div class="item-actions">
            ${actionsHtml}
            <button class="btn-close" onclick="closeItemModal()">Close</button>
        </div>
    `;
    
    modal.style.display = 'flex';
}

function closeItemModal() {
    document.getElementById('itemModal').style.display = 'none';
}

function openTradeModal(trade, aiUsername = null) {
    const modal = document.getElementById('tradeModal');
    
    if (trade) {
        // Existing trade
        const partnerName = trade.from === gameState.player.username ? trade.to : trade.from;
        
        document.getElementById('tradePartnerName').textContent = partnerName;
        
        // Display trade items
        const yourItems = trade.from === gameState.player.username ? trade.fromItems : trade.toItems;
        const theirItems = trade.to === gameState.player.username ? trade.toItems : trade.fromItems;
        
        const yourValue = yourItems.reduce((sum, item) => sum + (item.value || item.currentPrice || item.basePrice), 0);
        const theirValue = theirItems.reduce((sum, item) => sum + (item.value || item.currentPrice || item.basePrice), 0);
        
        document.getElementById('yourTradeItems').innerHTML = yourItems.map(item => 
            `<div>${item.name}</div>`
        ).join('');
        document.getElementById('theirTradeItems').innerHTML = theirItems.map(item => 
            `<div>${item.name}</div>`
        ).join('');
        
        document.getElementById('yourTradeValue').textContent = yourValue.toLocaleString();
        document.getElementById('theirTradeValue').textContent = theirValue.toLocaleString();
        
        // Set up trade actions
        document.getElementById('acceptTrade').onclick = () => {
            executeTrade(trade);
            modal.style.display = 'none';
            updateTrades();
            updatePlayerInfo();
        };
        
        document.getElementById('declineTrade').onclick = () => {
            trade.status = 'inactive';
            modal.style.display = 'none';
            updateTrades();
        };
        
        document.getElementById('counterTrade').onclick = () => {
            // Simple counter - swap items
            [trade.fromItems, trade.toItems] = [trade.toItems, trade.fromItems];
            modal.style.display = 'none';
            updateTrades();
        };
    } else if (aiUsername) {
        // New trade with AI
        const aiPlayer = gameState.aiPlayers.find(ai => ai.username === aiUsername);
        if (!aiPlayer) return;
        
        gameState.currentTradePartner = aiPlayer;
        gameState.selectedItems.player = [];
        gameState.selectedItems.ai = [];
        
        document.getElementById('tradePartnerName').textContent = aiUsername;
        document.getElementById('yourTradeItems').innerHTML = '<p>Select items from your inventory</p>';
        document.getElementById('theirTradeItems').innerHTML = '<p>Select items from their inventory</p>';
        document.getElementById('yourTradeValue').textContent = '0';
        document.getElementById('theirTradeValue').textContent = '0';
        
        // Show inventory selection
        showInventorySelection();
        
        document.getElementById('acceptTrade').style.display = 'none';
        document.getElementById('declineTrade').style.display = 'none';
        document.getElementById('counterTrade').textContent = 'Send Trade';
        document.getElementById('counterTrade').onclick = () => {
            if (gameState.selectedItems.player.length > 0 || gameState.selectedItems.ai.length > 0) {
                sendTradeToAI();
                modal.style.display = 'none';
            }
        };
    }
    
    modal.style.display = 'flex';
}

function showInventorySelection() {
    // This would show inventory selection UI
    // For now, we'll use a simple approach
    console.log('Show inventory selection for trade');
}

function sendTradeToAI() {
    const trade = {
        id: Date.now() + Math.random(),
        from: gameState.player.username,
        to: gameState.currentTradePartner.username,
        fromItems: gameState.selectedItems.player,
        toItems: gameState.selectedItems.ai,
        status: 'pending',
        timestamp: Date.now()
    };
    
    gameState.trades.push(trade);
    
    // AI evaluates the trade
    const playerValue = gameState.selectedItems.player.reduce((sum, item) => sum + (item.value || item.currentPrice || item.basePrice), 0);
    const aiValue = gameState.selectedItems.ai.reduce((sum, item) => sum + (item.value || item.currentPrice || item.basePrice), 0);
    
    if (Math.abs(playerValue - aiValue) / Math.max(playerValue, aiValue) < 0.3) {
        executeTrade(trade);
    } else {
        trade.status = 'inactive';
    }
    
    updateTrades();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(btn.dataset.tab).classList.add('active');
        });
    });

    // Leaderboard tab switching
    document.querySelectorAll('.leaderboard-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.leaderboard-tab').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.leaderboard').forEach(l => l.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(btn.dataset.leaderboard + 'Leaderboard').classList.add('active');
        });
    });

    // Trade filter
    document.getElementById('tradeFilter').addEventListener('change', updateTrades);

    // Modal close buttons
    document.getElementById('closeTradeModal').addEventListener('click', () => {
        document.getElementById('tradeModal').style.display = 'none';
    });

    document.getElementById('closePurchaseModal').addEventListener('click', () => {
        document.getElementById('purchaseModal').style.display = 'none';
    });

    // Start game button
    document.getElementById('startGameBtn').addEventListener('click', initGame);

    // Username input enter key
    document.getElementById('usernameInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            initGame();
        }
    });
}); 