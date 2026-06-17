import React, {useState} from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import SearchBar from '../components/SearchBar';
import UniversityCard from '../components/UniversityCard';
import {universities} from '../data/UniversityData';
import {useTheme} from '../context/ThemeContext';

export default function HomeScreen({navigation}) {

  const [search, setSearch] = useState('');
  const {colors, isDarkMode, toggleTheme} = useTheme();

  const filteredData = universities.filter(item =>
    (item?.name || '')
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={[styles.headerGradient, {backgroundColor: colors.primary}]}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Study Abroad</Text>
          <TouchableOpacity
            style={styles.themeToggle}
            onPress={toggleTheme}
          >
            <MaterialCommunityIcons
              name={isDarkMode ? 'white-balance-sunny' : 'moon-waning-crescent'}
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerSubtitle}>
          Explore top universities worldwide
        </Text>
      </View>

      <View style={styles.content}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
        />

        <FlatList
          data={filteredData}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <UniversityCard
              item={item}
              onPress={() =>
                navigation.navigate('Details', {
                  university: item,
                })
              }
            />
          )}
          scrollEnabled={true}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No universities found
              </Text>
              <Text style={styles.emptySubtext}>
                Try a different search
              </Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  themeToggle: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#e0e0ff',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 14,
  },
});