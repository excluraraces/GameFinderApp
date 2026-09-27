# Sonuç öncesi reklam altyapısı

## Şimdiki durum

- Yalnızca test reklamları: `src/ads/result-ad.native.ts`, Google `TestIds.INTERSTITIAL` kullanır.
- `app.json` içindeki Android/iOS uygulama kimlikleri Google'ın örnek uygulama kimlikleridir; gelir oluşturmaz.
- Test başlatılınca reklam önceden yüklenir. Son cevap tamamlanınca hazırsa gösterilir; kapatılınca öneriler açılır.
- Reklam yoksa, yüklenemediyse, süresi geçtiyse veya uygulama arka plandaysa doğrudan önerilere geçilir. Sonradan yüklenen reklam sonuçların üstüne açılmaz.
- Uygulamanın çalıştığı oturumda en fazla bir gösterim denemesi vardır. Sonuçlara, favorilere veya ayarlara dönmek reklam göstermez.
- Expo Go ve web reklam SDK'sını çalıştırmaz. `__DEV__` kapalı yayın derlemelerinde de reklam devre dışıdır.
- SDK 17.2.0 React Native >=0.86 istediğinden mevcut RN 0.85.3 projesinde 16.5.0 sürümü sabitlendi; bağımlılık kontrolü zorla aşılmadı.

## Telefonda test

Reklam için native SDK'yı içeren yeni bir Android/iOS geliştirme derlemesi gerekir; Expo Go veya yalnızca JavaScript yenilemesi yeterli değildir. Yerel Android geliştirme ortamı hazır olduğunda `npx expo run:android` kullanılabilir. Bu çalışmada native proje üretilmedi, mağazaya yükleme yapılmadı ve cihazda reklam gösterimi doğrulanmadı.

1. Geliştirme derlemesinde soruları cevapla; hazır olan test reklamını kapattığında sonuçlar açılmalı.
2. Aynı oturumda yeniden test yap: ikinci reklam açılmamalı.
3. İnternetsiz yeniden başlat ve testi bitir: sonuçlar reklam beklememeli.
4. Expo Go ve web'de aynı akış reklamsız çalışmalı.

## Hesaplar açıldığında

Gerçek reklama geçiş yalnızca kimlik değiştirmekten ibaret değildir: AdMob uygulama ve reklam birimi kimlikleri, kullanıcı rızası için UMP akışı (SDK başlatılmadan önce), gerekli gizlilik seçenekleri ve mağaza veri beyanları tamamlanmalı. Ardından geliştirmede test kimliği, yayında gerçek kimlik seçimi açıkça eklenmeli ve yeni native derleme cihazda denenmelidir. Şimdiki `requestNonPersonalizedAdsOnly` ayarı kullanıcı rızası akışının yerine geçmez.

## Kontroller ve kaynaklar

- `node scripts/test-ads.cjs`: reklam yaşam döngüsü ve hata senaryoları.
- `node scripts/test-recommendations.cjs`: öneri sonuçlarının regresyon kontrolü.
- `node node_modules/typescript/bin/tsc --noEmit --incremental false`.
- [Expo kurulumu ve Expo Go sınırı](https://docs.page/invertase/react-native-google-mobile-ads/installation/expo)
- [Geçiş reklamı API'si](https://docs.page/invertase/react-native-google-mobile-ads/ad-formats/interstitial)
- [Google yerleşim rehberi](https://support.google.com/admob/answer/6066980)
