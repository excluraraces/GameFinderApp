export type QuestionOption = {
  label: string;
  value: string;
};

export type Question = {
  question: string;
  options: QuestionOption[];
};

export const questions: Question[] = [
  {
    question: "Bugünkü oyun seansın hangi platformda geçecek?",
    options: [
      { label: "Bilgisayarın başına geçiyorum", value: "PC" },
      { label: "PlayStation kolu hazır", value: "PlayStation" },
      { label: "Xbox'ta oynayacağım", value: "Xbox" },
      { label: "Nintendo Switch yanımda", value: "Nintendo Switch" },
      { label: "Telefon veya tabletteyim", value: "Mobil" },
    ],
  },
  {
    question: "Bugün seni en çok hangi oyun deneyimi cezbediyor?",
    options: [
      { label: "Güçlü bir hikâyenin içine dalmak", value: "RPG" },
      { label: "Reflekslerimi ve nişanımı konuşturmak", value: "FPS" },
      { label: "Hızın ve direksiyonun tadını çıkarmak", value: "Yarış" },
      { label: "Plan kurup doğru hamleyi yapmak", value: "Strateji" },
      { label: "Gerilim içinde hayatta kalmaya çalışmak", value: "Korku" },
    ],
  },
  {
    question: "İyi bir hikâye, oyun seçiminde ne kadar söz sahibi?",
    options: [
      { label: "Hikâye benim için oyunun kalbidir", value: "Çok önemli" },
      { label: "Güçlü olursa büyük artı yazar", value: "Biraz önemli" },
      { label: "Ben doğrudan oynanışa bakarım", value: "Önemli değil" },
    ],
  },
  {
    question: "Bugün nasıl bir oynanış temposu istiyorsun?",
    options: [
      { label: "Durmadan akan, canlı bir aksiyon", value: "Hızlı ve aksiyonlu" },
      {
        label: "Acele etmeden düşünüp hamle yapacağım",
        value: "Yavaş ve taktiksel",
      },
      {
        label: "Sakin, huzurlu ve kafa dağıtmalık",
        value: "Rahatlatıcı",
      },
      { label: "Beni sürekli diken üstünde tutacak", value: "Gerilimli" },
    ],
  },
  {
    question: "Bu maceraya nasıl atılmak istersin?",
    options: [
      { label: "Tek başıma, kendi tempomda", value: "Tek kişilik" },
      { label: "Arkadaşlarımla aynı tarafta", value: "Arkadaşlarla" },
      { label: "Rakiplere karşı çevrimiçi mücadelede", value: "Online rekabetçi" },
      { label: "Fark etmez; oyun iyi olsun yeter", value: "Fark etmez" },
    ],
  },
  {
    question: "İçine gireceğin oyun dünyası nasıl kurulmuş olsun?",
    options: [
      { label: "İstediğim yere gidebildiğim açık dünya", value: "Açık dünya" },
      {
        label: "Bölüm bölüm ilerleyen, düzenli bir yapı",
        value: "Bölüm bölüm ilerleyen",
      },
      { label: "Sinematik ve çizgisel bir yolculuk", value: "Lineer hikaye" },
      {
        label: "Kendi hedeflerimi koyduğum özgür bir alan",
        value: "Sandbox",
      },
    ],
  },
  {
    question: "Bugün oyun sana nasıl davransın?",
    options: [
      { label: "Fazla yormasın, rahat ilerlesin", value: "Kolay" },
      { label: "Dengeli ve adil bir mücadele sunsun", value: "Orta" },
      { label: "Ter döktürsün ama karşılığını versin", value: "Zor" },
      { label: "Merhamet göstermesin; hazırım", value: "Çok zor" },
    ],
  },
  {
    question: "Hangi görsel dünya seni daha hızlı içine çeker?",
    options: [
      { label: "Gerçekçi ve sinematik bir görünüm", value: "Gerçekçi" },
      { label: "Renkli ve stilize bir sanat dili", value: "Cartoon" },
      { label: "Piksel piksel işlenmiş retro tarz", value: "Pixel" },
      { label: "Anime estetiği ve canlı karakterler", value: "Anime" },
    ],
  },
  {
    question: "Oyunda güçlendiğini hissetmek senin için ne kadar önemli?",
    options: [
      {
        label: "Karakterimi ve ekipmanımı sürekli geliştirmeliyim",
        value: "Evet çok isterim",
      },
      { label: "Bir miktar gelişim hissi yeterli", value: "Biraz olsun" },
      {
        label: "Gelişim şart değil; oynanış güçlü olsun",
        value: "Gerek yok",
      },
    ],
  },
  {
    question: "Nasıl bir oyun ömrü arıyorsun?",
    options: [
      { label: "Kısa sürede tamamlanıp tatmin etsin", value: "Kısa" },
      {
        label: "Kararında bir uzunluğu olsun",
        value: "Orta uzunlukta",
      },
      {
        label: "Uzun süre dünyasında yaşayabileyim",
        value: "Çok uzun",
      },
      {
        label: "Dönüp dönüp oynayabileceğim kadar sınırsız olsun",
        value: "Sonsuz oynanabilir",
      },
    ],
  },
  {
    question: "Direksiyon başına geçmek bugün kulağa nasıl geliyor?",
    options: [
      { label: "Tam olarak araç ve hız arıyorum", value: "Evet" },
      { label: "Olursa keyif verir ama şart değil", value: "Biraz" },
      { label: "Bugün araç odaklı bir oyun istemiyorum", value: "Hayır" },
    ],
  },
  {
    question: "Karanlık koridorlara girmeye ne kadar hazırsın?",
    options: [
      { label: "Korku ve gerilimi özellikle arıyorum", value: "Çok severim" },
      { label: "Dozunda gerilim iyi gider", value: "Bazen oynarım" },
      { label: "Bugün korkuyla hiç uğraşmayayım", value: "Sevmem" },
    ],
  },
  {
    question: "Plan kurmak ve hamle hesaplamak seni ne kadar çeker?",
    options: [
      { label: "Taktik düşünmeden oyun eksik kalır", value: "Evet" },
      { label: "Biraz strateji olsun ama beni boğmasın", value: "Biraz" },
      { label: "Bugün kafamı planlarla yormak istemiyorum", value: "Hayır" },
    ],
  },
  {
    question: "Oyunu kapattığında nasıl hissetmek istersin?",
    options: [
      { label: "Rahatlamış ve kafamı dağıtmış", value: "Rahatlatmalı" },
      {
        label: "Zorlu bir mücadeleyi aşmış",
        value: "Zorlamalı",
      },
      {
        label: "Hem eğlenmiş hem de güzelce sınanmış",
        value: "İkisi dengeli olmalı",
      },
    ],
  },
  {
    question: "Bugün hangi atmosferin içinde kaybolmak istersin?",
    options: [
      {
        label: "Fantastik evrenler ve mitolojik diyarlar",
        value: "Fantastik",
      },
      {
        label: "Bilim kurgu ve ileri teknoloji dünyaları",
        value: "Bilim kurgu",
      },
      { label: "Gerçekçi ve modern bir dünya", value: "Gerçekçi" },
      {
        label: "Karanlık, kasvetli ve sert bir atmosfer",
        value: "Karanlık",
      },
    ],
  },
  {
    question: "Bugün oyunu açmandaki asıl sebep ne?",
    options: [
      { label: "Günün stresini üzerimden atmak", value: "Stres atmak" },
      { label: "Kendime sağlam bir meydan okuma bulmak", value: "Meydan okuma" },
      { label: "Unutulmaz bir hikâye yaşamak", value: "Hikâye yaşamak" },
      { label: "Arkadaşlarla eğlenceli vakit geçirmek", value: "Sosyalleşmek" },
    ],
  },
  {
    question: "Bu seans için ayırabileceğin gerçekçi süre ne kadar?",
    options: [
      { label: "En fazla yarım saatim var", value: "30 dakika" },
      { label: "Bir iki saat rahat oynarım", value: "1-2 saat" },
      { label: "Bütün akşam bende", value: "Tüm akşam" },
      { label: "Bugün zaman sınırım yok", value: "Zaman sınırsız" },
    ],
  },
  {
    question: "Aynı yerde birkaç kez kaybedersen ne yaparsın?",
    options: [
      { label: "Sinirim bozulmadan başka oyuna geçerim", value: "Çabuk vazgeçerim" },
      { label: "Birkaç kez daha dener, sonra karar veririm", value: "Birkaç kez denerim" },
      { label: "Hatalarımı çözüp öğrenerek devam ederim", value: "Öğrenerek ilerlerim" },
      { label: "Gerekirse elli kez denerim", value: "Asla vazgeçmem" },
    ],
  },
  {
    question: "Haritanın seni yönlendirmemesi nasıl hissettirir?",
    options: [
      { label: "Harika; kaybolmak keşfin bir parçasıdır", value: "Kaybolmayı severim" },
      { label: "Biraz özgürlük güzel ama ipucu da isterim", value: "Dengeli keşif" },
      { label: "Nereye gideceğim belli olsun", value: "Yönlendirme isterim" },
      { label: "Dümdüz ilerlemek bugün daha iyi", value: "Çizgisel ilerleme" },
    ],
  },
  {
    question: "Sandıklar, nadir eşyalar ve ekipman yağmuru hakkında ne düşünüyorsun?",
    options: [
      { label: "Yeni eşya bulmak oyunun en güzel kısmıdır", value: "Loot vazgeçilmez" },
      { label: "Kararında olursa gelişimi güzelleştirir", value: "Loot dengeli" },
      { label: "Fazla eşya yönetimi beni yoruyor", value: "Az loot" },
      { label: "Hiç uğraşmadan oyuna devam etmek isterim", value: "Loot istemem" },
    ],
  },
  {
    question: "Kendi karakterini oluşturmak sana ne kadar keyif verir?",
    options: [
      { label: "Yüzünden yeteneğine kadar saatlerce uğraşırım", value: "Detaylı karakter" },
      { label: "Birkaç önemli seçimi kendim yapmak isterim", value: "Temel karakter" },
      { label: "Hazır ve güçlü bir ana karakter tercih ederim", value: "Hazır karakter" },
    ],
  },
  {
    question: "Verdiğin kararların hikâyeyi değiştirmesi ne kadar önemli?",
    options: [
      { label: "Seçimlerim dünyayı ve sonu değiştirmeli", value: "Kararlar çok önemli" },
      { label: "Birkaç anlamlı sonuç görmem yeter", value: "Kararlar biraz önemli" },
      { label: "İyi yazılmış tek bir hikâye de yeterli", value: "Sabit hikâye" },
    ],
  },
  {
    question: "Büyük boss savaşları sende nasıl bir etki bırakır?",
    options: [
      { label: "Oyunun zirvesi boss savaşlarıdır", value: "Boss severim" },
      { label: "Kararında ve unutulmaz birkaç tane olsun", value: "Boss dengeli" },
      { label: "Uzun boss mücadeleleri beni çabuk yoruyor", value: "Boss az olsun" },
      { label: "Boss yerine akıcı ilerleyişi tercih ederim", value: "Boss istemem" },
    ],
  },
  {
    question: "Önünde ana görev ve uzak bir soru işareti var; hangisine gidersin?",
    options: [
      { label: "Soru işaretine; orada ne olduğunu bilmeliyim", value: "Keşif öncelikli" },
      { label: "Yoluma göre ikisini dengelerim", value: "Keşif görev dengeli" },
      { label: "Önce ana görevi bitiririm", value: "Görev öncelikli" },
      { label: "Bana net bir rota verilsin, onu izlerim", value: "Rota odaklı" },
    ],
  },
  {
    question: "Oyun uzun diyaloglarla önüne geldiğinde ne yaparsın?",
    options: [
      { label: "Her cümleyi dinler, karakterleri tanırım", value: "Diyalog severim" },
      { label: "Önemli sahneleri takip ederim", value: "Diyalog dengeli" },
      { label: "Kısa konuşmalar yeter; oynanışa dönelim", value: "Az diyalog" },
      { label: "Geçme tuşu nerede?", value: "Diyalog istemem" },
    ],
  },
  {
    question: "Bulmacalar oyunun akışına karıştığında tepkin ne olur?",
    options: [
      { label: "Çözene kadar başından kalkmam", value: "Bulmaca severim" },
      { label: "Kararında olursa dünyayı zenginleştirir", value: "Bulmaca dengeli" },
      { label: "Basit olsun ve tempoyu kesmesin", value: "Kolay bulmaca" },
      { label: "Bulmaca yerine doğrudan aksiyon isterim", value: "Bulmaca istemem" },
    ],
  },
  {
    question: "Bir şeyler kurmak, yönetmek veya büyütmek sana nasıl geliyor?",
    options: [
      { label: "Kendi düzenimi kurmak oyunun asıl keyfidir", value: "Kurmayı severim" },
      { label: "Yan sistem olarak bulunması hoşuma gider", value: "Kurma dengeli" },
      { label: "Hazır sistemde ilerlemeyi tercih ederim", value: "Kurma az olsun" },
      { label: "Yönetim ekranları bugün benden uzak dursun", value: "Kurma istemem" },
    ],
  },
  {
    question: "Rekabetin dozu bugün ne kadar yüksek olsun?",
    options: [
      { label: "Sıralama, galibiyet ve ciddi rekabet istiyorum", value: "Yoğun rekabet" },
      { label: "Tatlı bir rekabet oyunu canlı tutar", value: "Hafif rekabet" },
      { label: "Birlikte oynayalım ama birbirimizi yormayalım", value: "İş birliği" },
      { label: "Bugün tamamen kendi dünyamda kalacağım", value: "Rekabet istemem" },
    ],
  },
  {
    question: "Şu anki enerjini en iyi hangisi anlatıyor?",
    options: [
      { label: "Yerimde duramıyorum; tempo istiyorum", value: "Enerjim yüksek" },
      { label: "Dengeli bir şey için hazırım", value: "Enerjim dengeli" },
      { label: "Yorgunum; oyun beni taşısın", value: "Enerjim düşük" },
      { label: "Kafam açık; uzun uzun düşünebilirim", value: "Zihnim açık" },
    ],
  },
  {
    question: "Bu seansın sonunda hangi cümleyi kurmak istersin?",
    options: [
      { label: "Ne güzel kafa dağıttım", value: "Kafa dağıttım" },
      { label: "Bu hikâyeyi uzun süre unutamam", value: "Hikâyeye kapıldım" },
      { label: "Sonunda o mücadeleyi aştım", value: "Mücadeleyi aştım" },
      { label: "Bir tur daha oynamadan bırakamam", value: "Bir tur daha" },
    ],
  },
];