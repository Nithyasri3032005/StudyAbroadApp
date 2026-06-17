import React, {useRef} from 'react';
import {TouchableOpacity, Text, StyleSheet, View, Animated} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useFavorites} from '../context/FavoritesContext';
import {useTheme} from '../context/ThemeContext';

export default function UniversityCard({item, onPress}) {
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
    toggleFavorite(item.id);
  };

  return (
    <TouchableOpacity
      style={[styles.card, {backgroundColor: colors.card, borderColor: colors.border}]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.cardContent}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, {color: colors.text}]} numberOfLines={2}>
              {item?.name || 'Not Available'}
            </Text>
            <View style={[styles.rankingBadge, {backgroundColor: colors.primary}]}>
              <MaterialCommunityIcons
                name="trophy"
                size={12}
                color="#fff"
                style={{marginRight: 4}}
              />
              <Text style={styles.rankingText}>
                {item?.ranking || 'N/A'}
              </Text>
            </View>
          </View>
          <Animated.View style={{transform: [{scale: scaleAnim}]}}>
            <TouchableOpacity onPress={handleFavoritePress}>
              <MaterialCommunityIcons
                name={isFavorite(item.id) ? 'heart' : 'heart-outline'}
                size={24}
                color={isFavorite(item.id) ? '#f5576c' : colors.textSecondary}
              />
            </TouchableOpacity>
          </Animated.View>
        </View>

        <View style={styles.infoRow}>
          <MaterialCommunityIcons
            name="map-marker-radius"
            size={16}
            color={colors.primary}
            style={styles.infoIcon}
          />
          <Text style={[styles.infoText, {color: colors.textSecondary}]}>
            {item?.country || 'Not Available'}
          </Text>
        </View>

        <Text style={[styles.description, {color: colors.textSecondary}]} numberOfLines={2}>
          {item?.description || 'Not Available'}
        </Text>

        <View style={[styles.detailsRow, {backgroundColor: colors.surface, borderColor: colors.border}]}>
          <View style={styles.detailItem}>
            <MaterialCommunityIcons
              name="currency-usd"
              size={14}
              color={colors.primary}
            />
            <Text style={[styles.detailText, {color: colors.text}]}>
              {item?.tuitionFee || 'N/A'}
            </Text>
          </View>
          <View style={[styles.divider, {backgroundColor: colors.border}]} />
          <View style={styles.detailItem}>
            <MaterialCommunityIcons name="clock-outline" size={14} color={colors.primary} />
            <Text style={[styles.detailText, {color: colors.text}]}>
              {item?.duration || 'N/A'}
            </Text>
          </View>
        </View>

        <View style={[styles.footer, {borderTopColor: colors.border}]}>
          <Text style={[styles.footerText, {color: colors.primary}]}>
            Tap to see more details
          </Text>
          <MaterialCommunityIcons
            name="arrow-right"
            size={16}
            color={colors.primary}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.12,
    shadowRadius: 8,
    borderWidth: 1,
  },
  cardContent: {
    padding: 16,
  },
  header: {
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleContainer: {
    flexDirection: 'column',
    flex: 1,
    marginRight: 10,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleIcon: {
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  rankingBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  rankingText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoIcon: {
    marginRight: 8,
  },
  infoText: {
    fontSize: 14,
    fontWeight: '500',
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  detailItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    width: 1,
    height: 20,
    marginHorizontal: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
  },
  footerText: {
    fontSize: 12,
    fontWeight: '600',
  },
});