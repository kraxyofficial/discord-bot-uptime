# Discord Bot Uptime Servisi

Bu proje, Discord botlarınızı 7/24 aktif tutmak için bir web arayüzüne sahip uptime servisidir. Kullanıcıların botlarını kolayca başlatıp durdurmalarını sağlar.

## Özellikler

- Discord botları için token ve client ID yönetimi
- Botları başlatma/durdurma kontrolü
- Çalışma süresi (uptime) takibi
- Dosya yükleme desteği
- Log sistemi

## Kurulum

### Gereksinimler

- Node.js (v16.9.0 veya üzeri)
- npm veya yarn

### Adımlar

1. Projeyi bilgisayarınıza klonlayın:
   ```
   git clone https://github.com/kullaniciadi/discord-bot-uptime.git
   cd discord-bot-uptime
   ```

2. Gerekli paketleri yükleyin:
   ```
   npm install
   ```

3. Uygulamayı başlatın:
   ```
   npm start
   ```

4. Tarayıcınızda http://localhost:3000 adresine gidin.

## Kullanım

1. "Bot Yapılandırması" sekmesinde Discord botunuzun Client ID ve Token bilgilerini girin.
2. "Kaydet" butonuna tıklayın.
3. "Başlat" butonuna tıklayarak botunuzu çalıştırın.
4. "Dosyalar" sekmesinden botunuzun çalışması için gerekli ek dosyaları yükleyebilirsiniz.
5. "Günlükler" sekmesinden botun çalışma durumunu takip edebilirsiniz.

## Glitch veya Replit'te Çalıştırma

Bu projeyi ücretsiz hosting sağlayıcılarında çalıştırmak için:

### Replit:

1. Replit hesabınıza giriş yapın.
2. "New Repl" seçeneğini tıklayın ve "Import from GitHub" seçin.
3. GitHub repo URL'sini girin.
4. "Import" butonuna tıklayın.
5. Repl'in çalışması için "Run" butonuna tıklayın.

### Glitch:

1. Glitch hesabınıza giriş yapın.
2. "New Project" > "Import from GitHub" seçeneğini tıklayın.
3. GitHub repo URL'sini girin.
4. Projeniz otomatik olarak çalışacaktır.

## Güvenlik Notları

- Token bilgilerini güvenli bir şekilde saklamanız önemlidir.