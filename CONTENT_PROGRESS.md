# Oyun açıklamaları ilerleme kaydı

## 26 Eylül 2026

- Tamamlanan grup: oyun kimlikleri **1-50** (Baldur's Gate 3 - Disco Elysium).
- Türkçe: `src/data/game.ts` içindeki 50 `story` alanı yenilendi.
- İngilizce: `src/data/game.en.ts` içindeki aynı 50 kimliğin açıklaması yenilendi.
- Üslup: oyuna özgü, ilgi çekici, spoilersız iki cümle. Hikâyeli oyunlarda dünya/karakter; diğerlerinde temel oyun deneyimi öne çıkarıldı.
- Türkçe ve İngilizce metinler anlamca eşleştirildi; uzunluklar yaklaşık 190-265 karakter.
- Oyun kimlikleri, başlıklar, görseller, platformlar ve puanlama verileri korunmuştur.
- 51-200 arasındaki açıklamalar bu çalışmada değiştirilmedi.
- Kontroller: 100 açıklamanın değiştiği, diğer verilerin aynı kaldığı ve her dilde ilk 50 metnin benzersiz olduğu doğrulandı. TypeScript, 1.120 öneri senaryosu ve kayıt testleri geçti.
- Cihazda yeni metinlerin kart düzeni henüz kontrol edilmedi.

## İkinci grup: 51-100

- Tamamlanan oyunlar: **Marvel's Spider-Man Remastered - Human: Fall Flat**.
- Kullanıcının isteğiyle metinler genişletildi: her dilde üç cümle, yaklaşık 318-395 karakter. İlk 50 oyunun iki cümlelik metinleri korundu.
- `src/data/game.ts` ve `src/data/game.en.ts` içinde 50 Türkçe ve 50 İngilizce açıklama güncellendi.
- Özellikle MOBA ve parti oyunlarındaki tekrarlanan genel tanıtımlar, oyunların kendilerine özgü mekaniklerini anlatan metinlerle değiştirildi.
- Toplam ilerleme: **100/200 oyun**, iki dilde **200 açıklama** tamamlandı.
- Doğrulama: 1-50 ve 101-200 arasındaki metinler ile tüm oyun metadata alanları aynı kaldı. Bu gruptaki her dilde 50 açıklama benzersiz. TypeScript ve 1.120 öneri senaryosu geçti.
- Daha uzun metinlerin telefondaki kart görünümü henüz kontrol edilmedi.

### İkinci grupta özellik kontrolü için kullanılan kaynaklar

- [SMITE 2: üçüncü şahıs MOBA ve mitolojik karakterler](https://www.smite2.com/play-for-free)
- [Predecessor: resmi oyun sayfası](https://www.predecessorgame.com/en-US)
- [Deadlock: geliştiricinin Steam sayfası](https://store.steampowered.com/app/1422450/Deadlock/)
- [Heroes of the Storm: ortak deneyim sistemi](https://news.blizzard.com/en-gb/article/13474202/from-the-bullpen-team-xp-and-leveling)
- [Eternal Return: Steam oyun merkezi](https://steamcommunity.com/app/1049590)
- [Battlerite: arena savaşı ve takım boyutları](https://store.steampowered.com/app/504370/)
- [Onmyoji Arena: resmi oyun sayfası](https://www.onmyojiarena.us/)
- [Heroes Evolved: savaş sisi ve görüş araçları](https://heroes.99.com/client/m/2021/news.shtml)
- [Legend of Ace: geliştiricinin kart sistemi açıklaması](https://play.google.com/store/apps/details?id=com.funcube.loa)

## Üçüncü grup: 101-150 — 28 Eylül 2026

- Pummel Party - LIMBO arasındaki 50 oyunun Türkçe ve İngilizce açıklamaları tamamlandı. Her açıklama üç cümle; yaklaşık 325-401 karakter.
- Toplam ilerleme: **150/200 oyun**, iki dilde **300 açıklama**.
- Önceki 100 oyun, 151-200 grubu ve oyunların diğer verileri korundu.
- Sonuçlar ve favoriler ortak GameDescription bileşenini kullanıyor. Uzun metinler 140 birim yüksekliğindeki kutuda kaydırılabiliyor; Tamamını göster / Kısalt seçeneği de bulunuyor. Kısa metinlerde bu kontroller gösterilmiyor.
- Tarayıcıda 50 oyun ve kısa metin örneği, TR/EN dillerinde 280, 350 ve 430 birim kart genişliklerinde kontrol edildi. Yatay taşma ve kaydırılamayan kesik metin bulunmadı. Kaydırma ve açma/kapatma işlevleri doğrulandı.
- Fiziksel telefonda dokunmatik kaydırma henüz denenmedi.
- TypeScript ve 1.120 öneri senaryosu geçti. Geçici görsel test ekranı kaldırıldı.

## Dördüncü grup: 151-200 — 28 Eylül 2026

- Viewfinder - Rubber Bandits arasındaki son 50 oyunun Türkçe ve İngilizce açıklamaları tamamlandı.
- Her metin oyuna özgü, spoilersız üç cümle: Türkçe 349-409, İngilizce 341-399 karakter.
- 50 Türkçe ve 50 İngilizce metnin değiştiği, her dilde benzersiz olduğu, ilk 150 oyunun açıklamaları ve tüm diğer oyun bilgilerinin korunduğu otomatik olarak doğrulandı.
- Sonuçlar ve favorilerde önceki turda doğrulanan kaydırılabilir açıklama bileşeni kullanılmaya devam ediyor. Bu turda arayüz kodu değiştirilmedi; yeni metinler için ayrıca cihaz testi yapılmadı.
- TypeScript kontrolü ve 1.120 öneri senaryosu geçti.
- Toplam ilerleme: **200/200 oyun**, iki dilde **400 açıklama tamamlandı**.

### Son grupta özellik doğrulaması için kullanılan kaynaklar

- [WWE 2K26 — 2K](https://newsroom.2k.com/games/wwe-2k26)
- [EA Sports FC 26 oynanış açıklaması](https://forums.ea.com/blog/ea-sports-fc-game-info-hub-en/ea-sports-fc-26--pitch-notes---gameplay-deep-dive/12371925)
- [Gigantic: Rampage Edition resmi sitesi](https://www.gogigantic.com/en)
- [Catalyst Black — geliştiricinin App Store açıklaması](https://apps.apple.com/us/app/catalyst-black/id1525298433)
- [Super Mario Party Jamboree — Nintendo](https://www.nintendo.com/en-gb/Games/Nintendo-Switch-games/Super-Mario-Party-Jamboree-2591147.html)

## Bundan sonrası

Planlanan dört açıklama grubu tamamlandı. Yeni bir grup yazılması gerekmiyor. Kullanıcının istediği metin düzeltmeleri veya fiziksel telefonda kaydırma ve okunabilirlik kontrolü üzerinden devam edilebilir.
