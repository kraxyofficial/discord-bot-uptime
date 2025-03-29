const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits, Events } = require('discord.js');

// Express uygulaması oluştur
const app = express();
const PORT = process.env.PORT || 3000;

// JSON ve form verilerini işleme
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Botları depolamak için obje
const activeBots = {};

// Ana web sayfası
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Bot başlatma endpointi
app.post('/api/start-bot', (req, res) => {
  const { token, clientId } = req.body;
  
  if (!token || !clientId) {
    return res.status(400).json({ success: false, message: 'Token ve Client ID gerekli!' });
  }
  
  // Bot zaten çalışıyor mu kontrol et
  if (activeBots[clientId]) {
    return res.status(400).json({ success: false, message: 'Bot zaten çalışıyor!' });
  }
  
  try {
    // Discord botu oluştur
    const client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
      ]
    });
    
    // Bot hazır olduğunda
    client.once(Events.ClientReady, () => {
      console.log(`Bot hazır: ${client.user.tag}`);
      
      // Botun bilgilerini kaydet
      activeBots[clientId] = {
        client,
        startTime: new Date(),
        status: 'online'
      };
      
      return res.json({ 
        success: true, 
        message: 'Bot başarıyla başlatıldı!', 
        botName: client.user.tag 
      });
    });
    
    // Botu Discord'a bağla
    client.login(token).catch(error => {
      console.error('Bot giriş hatası:', error);
      return res.status(400).json({ 
        success: false, 
        message: 'Bot girişi başarısız: ' + error.message 
      });
    });
  } catch (error) {
    console.error('Bot başlatma hatası:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Bot başlatma hatası: ' + error.message 
    });
  }
});

// Bot durdurma endpointi
app.post('/api/stop-bot', (req, res) => {
  const { clientId } = req.body;
  
  if (!clientId || !activeBots[clientId]) {
    return res.status(400).json({ success: false, message: 'Bot bulunamadı veya çalışmıyor!' });
  }
  
  try {
    // Botu kapat
    activeBots[clientId].client.destroy();
    console.log(`Bot durduruldu: ${clientId}`);
    
    // Uptime hesapla
    const uptime = calculateUptime(activeBots[clientId].startTime);
    
    // Botun kaydını sil
    delete activeBots[clientId];
    
    return res.json({ 
      success: true, 
      message: 'Bot başarıyla durduruldu!', 
      uptime: uptime 
    });
  } catch (error) {
    console.error('Bot durdurma hatası:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Bot durdurma hatası: ' + error.message 
    });
  }
});

// Bot durum kontrolü
app.get('/api/bot-status/:clientId', (req, res) => {
  const { clientId } = req.params;
  
  if (!clientId || !activeBots[clientId]) {
    return res.json({ 
      running: false 
    });
  }
  
  const bot = activeBots[clientId];
  return res.json({
    running: true,
    startTime: bot.startTime,
    uptime: calculateUptime(bot.startTime),
    username: bot.client.user.tag,
    status: bot.status
  });
});

// Dosya yükleme endpointi için multer eklenebilir
// Bu örnek basit tutmak için dosya yükleme detayları atlanmıştır

// Uptime hesaplama yardımcı fonksiyonu
function calculateUptime(startDate) {
  const diff = Math.floor((new Date() - startDate) / 1000);
  
  const days = Math.floor(diff / (24 * 60 * 60));
  const hours = Math.floor((diff % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((diff % (60 * 60)) / 60);
  const seconds = diff % 60;
  
  let result = '';
  if (days > 0) result += `${days}g `;
  if (hours > 0) result += `${hours}s `;
  if (minutes > 0) result += `${minutes}d `;
  result += `${seconds}s`;
  
  return result;
}

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Uptime servisi başlatıldı: http://localhost:${PORT}`);
});
