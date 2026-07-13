// components/LanguageSwitcher.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.langBtn, i18n.language === 'en' && styles.active]} 
        onPress={() => i18n.changeLanguage('en')}
      >
        <Text style={styles.langText}>🇬🇧 EN</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.langBtn, i18n.language === 'my' && styles.active]} 
        onPress={() => i18n.changeLanguage('my')}
      >
        <Text style={styles.langText}>🇲🇲 မြန်</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 4,
  },
  langBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  active: {
    backgroundColor: '#9FDCFF',
  },
  langText: {
    fontSize: 7,
    fontWeight: '500',
    color: '#333',
  },
});