import React, {useRef} from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  View,
  SafeAreaView,
  Animated,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useFavorites} from '../context/FavoritesContext';
import {useTheme} from '../context/ThemeContext';

export default function DetailScreen({route, navigation}) {

  const university = route?.params?.university;
  const {toggleFavorite, isFavorite} = useFavorites();
  const {colors} = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleFavoritePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
    toggleFavorite(university.id);
  };

  const openWebsite = () => {
    if (university?.website) {
      Linking.openURL(university.website);
    }
  };

  const openMap = () => {

    const url =
      `https://www.google.com/maps/search/?api=1&query=${university?.latitude},${university?.longitude}`;

    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={[styles.header, {backgroundColor: colors.surface, borderBottomColor: colors.border}]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialCommunityIcons name="chevron-left" size={28} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, {color: colors.text}]}>Details</Text>
        <Animated.View style={{transform: [{scale: scaleAnim}]}}>
          <TouchableOpacity onPress={handleFavoritePress}>
            <MaterialCommunityIcons
              name={isFavorite(university.id) ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorite(university.id) ? '#f5576c' : colors.textSecondary}
            />
          </TouchableOpacity>
        </Animated.View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.heroSection, {backgroundColor: colors.primary}]}>
          <Text style={styles.title}>
            {university?.name || 'Not Available'}
          </Text>
          <View style={styles.heroInfo}>
            <MaterialCommunityIcons name="globe" size={16} color="#fff" />
            <Text style={styles.heroCountry}>
              {university?.country || 'Not Available'}
            </Text>
          </View>
          <View style={[styles.rankingBox, {backgroundColor: 'rgba(255, 255, 255, 0.15)', borderColor: 'rgba(255, 255, 255, 0.2)'}]}>
            <MaterialCommunityIcons name="trophy" size={24} color="#FFC107" />
            <Text style={styles.rankingNumber}>
              #{university?.ranking || 'N/A'}
            </Text>
            <Text style={styles.rankingLabel}>Global Ranking</Text>
          </View>
        </View>

        <View style={[styles.content, {backgroundColor: colors.background}]}>
          <Text style={[styles.description, {color: colors.textSecondary}]}>
            {university?.description || 'Not Available'}
          </Text>

          <View style={styles.infoGrid}>
            <DetailItem
              icon="cash"
              label="Tuition Fee"
              value={university?.tuitionFee}
              colors={colors}
            />
            <DetailItem
              icon="calendar"
              label="Duration"
              value={university?.duration}
              colors={colors}
            />
          </View>

          <View style={styles.infoGrid}>
            <DetailItem
              icon="clock-outline"
              label="Intake"
              value={university?.intake}
              colors={colors}
            />
            <DetailItem
              icon="map-marker"
              label="Location"
              value={university?.address}
              colors={colors}
            />
          </View>

          <View style={[styles.divider, {backgroundColor: colors.border}]} />

          <TouchableOpacity
            style={[styles.actionButton, {backgroundColor: colors.primary}]}
            onPress={openWebsite}
          >
            <MaterialCommunityIcons
              name="globe"
              size={20}
              color="#fff"
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>
              Visit Official Website
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, {backgroundColor: colors.accent}]}
            onPress={openMap}
          >
            <MaterialCommunityIcons
              name="map"
              size={20}
              color="#fff"
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>
              View on Map
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function DetailItem({icon, label, value, colors}) {
  return (
    <View style={[styles.detailItemContainer, {backgroundColor: colors.surface, borderColor: colors.border}]}>
      <View style={[styles.detailIconBox, {backgroundColor: `${colors.primary}15`}]}>
        <MaterialCommunityIcons name={icon} size={20} color={colors.primary} />
      </View>
      <View style={styles.detailContent}>
        <Text style={[styles.detailLabel, {color: colors.textSecondary}]}>{label}</Text>
        <Text style={[styles.detailValue, {color: colors.text}]} numberOfLines={2}>
          {value || 'Not Available'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    elevation: 2,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },
  heroSection: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#667eea',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 10,
  },
  heroInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  heroCountry: {
    fontSize: 16,
    color: '#e0e0ff',
    marginLeft: 8,
    fontWeight: '600',
  },
  rankingBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  rankingNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    marginTop: 4,
  },
  rankingLabel: {
    fontSize: 12,
    color: '#e0e0ff',
    marginTop: 4,
    fontWeight: '600',
  },
  content: {
    padding: 20,
  },
  description: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    marginBottom: 24,
    fontWeight: '500',
  },
  infoGrid: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 12,
  },
  detailItemContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  detailIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#667eea15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 11,
    color: '#999',
    fontWeight: '600',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 13,
    color: '#333',
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 20,
  },
  actionButton: {
    marginBottom: 12,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  buttonPrimary: {
    backgroundColor: '#667eea',
  },
  buttonSecondary: {
    backgroundColor: '#f5576c',
  },
});