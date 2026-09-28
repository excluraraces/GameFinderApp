# GameFinder ses tasarımı

Özgün sesler `scripts/synthesize-audio.cjs` ile matematiksel olarak sentezlenir;
harici müzik veya ses örneği içermez. `npm run audio:generate` WAV dosyalarını
yeniden üretir. 32 kHz, mono, 16-bit PCM; toplam yaklaşık 1.8 MB.

| Dosya | Kullanım |
| --- | --- |
| select.wav | Soru cevabı ve ses ayarı geri bildirimi; kısa yumuşak tık |
| navigate.wav | Dil, favoriler ve ayarlar menüsüne giriş; iki notalı geçiş |
| back.wav | Geri ve yeniden başla; aşağı yönlü iki nota |
| start.wav | Testi başlatma; üç notalı yükseliş |
| favorite.wav | Başarıyla kaydedilen favori; parlak iki nota |
| unfavorite.wav | Başarıyla kaldırılan favori; daha sakin iniş |
| result.wav | Sonuçlar açılınca bir kez; kısa A minör arpej |
| ambient.wav | 80 BPM, 24 saniye döngü; sakin pad ve seyrek pluck |

Ses motoru `src/audio/` içindedir. Müzik ilk kullanıcı etkileşiminden sonra başlar,
400 ms içinde hafifçe yükselir ve efektlerin altında kalır. Ayarlar mevcut
AsyncStorage kaydını kullanır; ses seviyesi sürüklerken canlı uygulanır.
Müzik ve efekt anahtarları bağımsızdır. Sıfır ses, arka plan ve reklam hazırlığı
oynatmayı durdurur. Başarısız ses yükleme uygulama akışını engellemez;
gecikmiş efektler sonradan oynatılmaz. Hızlı dokunuşlarda efekt yığılması önlenir.
Sonuç bulunamazsa başarı melodisi yerine nötr geçiş sesi çalar.

Expo 56 `expo-audio` kullanılır. Mikrofon/kayıt ve arka plan oynatma izinleri
istenmez. iOS sessiz anahtarına saygı gösterilir; diğer uygulamaların müziği
kesilmez (`mixWithOthers`). Native geliştirme derlemesi kullanıyorsanız yeni
modül için yeniden derleyin. Tarayıcıda ilk etkileşim öncesinde otomatik müzik yoktur.

## Doğrulama

- `npm run test:audio`: anahtarlar, sıfır ses, reklam, arka plan, hızlı dokunuş,
  bekleyen seek iptali, decoder hatası, WAV genliği ve döngü birleşimi.
- `node node_modules/typescript/bin/tsc --noEmit --incremental false`
- Mevcut öneri, kayıt ve reklam testleri `scripts/test-*.cjs` dosyalarındadır.
- Telefonda sessiz anahtarı, kulaklık/Bluetooth, uygulamalar arası geçiş ve
  gerçek reklam açılıp kapandıktan sonra ses ayrıca kontrol edilmelidir.

API referansı: https://docs.expo.dev/versions/v56.0.0/sdk/audio/
