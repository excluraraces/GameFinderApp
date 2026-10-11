import { useState } from "react";
import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const email = "excluraraces@gmail.com";
const policy = {
  tr: [
    ["Gizlilik politikası", "Bugün Ne Oynasam • Exclura Studio\nSon güncelleme: 11 Ekim 2026"],
    ["Tercihleriniz", "Test yanıtları, oyun önerileri ve oyuncu profilini oluşturmak için cihazınızda işlenir. Uygulama hesap açmanızı istemez; test yanıtlarınızı geliştiricinin sunucusuna göndermez."],
    ["Cihazda saklanan bilgiler", "Favori oyunlarınız, dil seçiminiz ve ses ayarlarınız uygulamanın cihazdaki depolamasında saklanır. Bu sürümde reklam veya uygulama içi analiz hizmeti kullanılmaz."],
    ["Saklama ve silme", "Favorilerinizi uygulamadan kaldırabilirsiniz. Yerel kayıtların tamamını silmek için Android ayarlarından uygulamanın verilerini temizleyebilirsiniz. Cihazın yedekleme hizmeti, sistem ayarlarınıza bağlı olarak uygulama verilerini yedekleyebilir veya geri yükleyebilir."],
    ["Destek ve iletişim", "Destek bağlantısı, e-posta uygulamanızı açar. Gönderdiğiniz mesaj ve adresiniz, talebinizi yanıtlamak amacıyla e-posta sağlayıcısı üzerinden işlenir. Destek yazışmanızın silinmesini aynı adresten talep edebilirsiniz. Hassas bilgilerinizi mesajınıza eklemeyin."],
    ["İletişim", email],
  ],
  en: [
    ["Privacy policy", "Bugün Ne Oynasam • Exclura Studio\nLast updated: October 11, 2026"],
    ["Your preferences", "Quiz answers are processed on your device to produce game recommendations and your player profile. The app does not require an account or send quiz answers to the developer's server."],
    ["Information stored on your device", "Favorite games, language and sound settings are stored in the app's local storage. This version does not use advertising or in-app analytics services."],
    ["Retention and deletion", "You can remove favorites in the app. To delete all local records, clear the app's data in Android settings. Depending on your system settings, your device's backup service may back up or restore app data."],
    ["Support", "The support link opens your email app. Messages you send and your email address are processed through the email provider to respond to your request. You can request deletion of your support correspondence at the same address. Do not include sensitive information in your message."],
    ["Contact", email],
  ],
};

export default function PrivacySupport({ language }: { language: "tr" | "en" }) {
  const [expanded, setExpanded] = useState(false);
  const [failed, setFailed] = useState(false);
  const tr = language === "tr";
  return (
    <View style={s.card}>
      <TouchableOpacity accessibilityRole="button" accessibilityState={{ expanded }}
        style={s.button} onPress={() => setExpanded(value => !value)}>
        <Text style={s.link}>{tr ? "Gizlilik politikası" : "Privacy policy"} {expanded ? "−" : "+"}</Text>
      </TouchableOpacity>
      {expanded && policy[language].map(([title, body]) => (
        <View key={title} style={s.section}>
          <Text style={s.heading}>{title}</Text>
          <Text selectable style={s.body}>{body}</Text>
        </View>
      ))}
      <TouchableOpacity accessibilityRole="button" style={s.button} onPress={() => {
        setFailed(false);
        void Linking.openURL(`mailto:${email}?subject=GameFinder%20Support`).catch(() => setFailed(true));
      }}>
        <Text style={s.link}>{tr ? "Destek için e-posta gönder" : "Email support"}</Text>
      </TouchableOpacity>
      <Text selectable style={s.body}>{email}</Text>
      {failed && <Text accessibilityRole="alert" style={s.body}>{tr
        ? "E-posta uygulaması açılamadı. Yukarıdaki adresi kopyalayıp mesaj gönderebilirsiniz."
        : "Could not open an email app. Copy the address above to send a message."}</Text>}
    </View>
  );
}

const s = StyleSheet.create({
  card: { width: "100%", maxWidth: 430, padding: 18, marginVertical: 16, borderRadius: 22, backgroundColor: "#0A1223", borderWidth: 1, borderColor: "#334155", flexShrink: 0 },
  button: { minHeight: 48, justifyContent: "center", paddingVertical: 10 },
  link: { color: "#6EE7D5", fontSize: 17, fontWeight: "600" },
  heading: { color: "#FFFFFF", fontSize: 16, fontWeight: "600", marginBottom: 6 },
  body: { color: "#CBD5E1", fontSize: 15, lineHeight: 23 },
  section: { marginVertical: 10 },
});
