# Oyuncu profili

Profil, bu testteki tercihlerin dağılımıdır; beceri ölçümü, psikolojik test veya
oyun önerilerindeki uyum yüzdesi değildir. Oyun önerilerinin puanlaması korunmuştur.

`src/domain/player-profile.ts` içindeki model 17 eğilim içerir. Tercih cevabı,
sorunun ağırlığı kadar puan bütçesine sahiptir (en fazla 5). Birkaç eğilimi
destekleyen cevap bu bütçeyi paylaştırır. “Biraz önemli” gibi seçenekler daha
zayıf sinyal verir. Nötr cevaplar zorla bir profile dönüştürülmez.

- Platform ve kategori tek başına profil puanı vermez.
- Arkadaşlarla/rekabetçi oynama seçimi bir puanlık destek verir; tek başına profil oluşturmaz.
- Görsel tarz ve atmosfer genel olarak nötrdür. Simülasyondaki açık gerçekçilik
  sorusu kendi bağlamında değerlendirilir.
- Aynı soru tekrar cevaplanırsa son cevap geçerlidir. `matchValues` eşanlamlı
  seçenekleri ayrıca puanlanmaz. Sıralama rastgele değildir.
- Tüm eğilimlerin payları en büyük kalan yöntemiyle yuvarlanır ve toplamı %100 olur.
  İlk üç dışındaki pay kartta “Diğer eğilimler” olarak görünür; tamamı açılabilir.
- İlk iki pay arasında en fazla 5 yüzde puanı varsa birden fazla eğilimin öne
  çıktığı belirtilir. Her eğilimin altında en güçlü iki cevap gösterilir.
- Destekleyen tercih yoksa yüzdeler uydurulmaz; açıklayıcı boş durum gösterilir.

Görünüm: `src/components/player-profile-card.tsx`.
İki dilli açıklamalar: `src/data/player-profile-copy.ts`.
Profil adları: `src/data/translations.ts`.

`npm run test:profiles` gerçek sorulardan 2.800 senaryoyu, 17 eğilimin erişilebilirliğini,
ağırlıkları, nötr cevapları, tekrarlı cevapları, eşitlikleri ve dil tutarlılığını kontrol eder.
