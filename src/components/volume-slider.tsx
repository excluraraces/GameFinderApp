import { useRef, useState } from "react";
import { StyleSheet, View, type GestureResponderEvent } from "react-native";

type Props = {
  value: number;
  disabled: boolean;
  label: string;
  onPreview: (value: number | null) => void;
  onCommit: (value: number) => Promise<void>;
};

export default function VolumeSlider({ value, disabled, label, onPreview, onCommit }: Props) {
  const [draft, setDraft] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const width = useRef(0);
  const current = useRef(value);
  const gesture = useRef({ left: 0, identifier: "" });
  const active = useRef(false);
  const busy = useRef(false);
  const shown = draft ?? value;

  function update(event: GestureResponderEvent) {
    if (!active.current || width.current <= 0) return;
    const touch = event.nativeEvent;
    // Lock the coordinate origin at touch-down. Android locationX can change
    // during a drag as the touch target moves; pageX remains stable.
    // Once started on the bar, keep tracking horizontal motion at any height.
    if (touch.identifier !== gesture.current.identifier) return;
    const next = Math.round(Math.max(0, Math.min(1,
      (touch.pageX - gesture.current.left - 12) / Math.max(1, width.current - 24))) * 100);
    if (next === current.current) return;
    current.current = next;
    setDraft(next);
    onPreview(next);
  }

  async function commit(next: number) {
    if (busy.current || disabled) return;
    busy.current = true;
    setSaving(true);
    try { await onCommit(next); }
    finally {
      busy.current = false;
      setSaving(false);
      setDraft(null);
      onPreview(null);
    }
  }

  return (
    <View
      accessible
      accessibilityRole="adjustable"
      accessibilityLabel={label}
      accessibilityValue={{ min: 0, max: 100, now: shown }}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={shown}
      accessibilityState={{ disabled: disabled || saving }}
      accessibilityActions={[{ name: "increment" }, { name: "decrement" }]}
      onAccessibilityAction={({ nativeEvent }) => {
        if (nativeEvent.actionName === "increment" || nativeEvent.actionName === "decrement") {
          void commit(Math.max(0, Math.min(100, value + (nativeEvent.actionName === "increment" ? 5 : -5))));
        }
      }}
      style={[styles.touchArea, (disabled || saving) && styles.disabled]}
      onLayout={event => { width.current = event.nativeEvent.layout.width; }}
      onStartShouldSetResponder={() => !disabled && !busy.current}
      onMoveShouldSetResponder={() => false}
      onResponderGrant={event => {
        const touch = event.nativeEvent;
        gesture.current = { left: touch.pageX - touch.locationX, identifier: touch.identifier };
        active.current = true;
        current.current = value;
        update(event);
      }}
      onResponderMove={update}
      onResponderRelease={event => {
        update(event);
        active.current = false;
        void commit(current.current);
      }}
      onResponderTerminationRequest={() => false}
      onResponderTerminate={() => {
        active.current = false;
        setDraft(null);
        onPreview(null);
      }}
    >
      <View pointerEvents="none" style={styles.track}>
        <View style={[styles.fill, { width: `${shown}%` }]} />
        <View style={[styles.thumb, { left: `${shown}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  touchArea: { width: "100%", height: 48, justifyContent: "center", paddingHorizontal: 12, marginTop: 12 },
  disabled: { opacity: 0.5 },
  track: { height: 10, borderRadius: 5, backgroundColor: "rgba(255,255,255,0.15)" },
  fill: { height: 10, borderRadius: 5, backgroundColor: "#22C55E" },
  thumb: { position: "absolute", top: -7, marginLeft: -12, width: 24, height: 24, borderRadius: 12, backgroundColor: "#F9FAFB", borderWidth: 3, borderColor: "#22C55E" },
});
