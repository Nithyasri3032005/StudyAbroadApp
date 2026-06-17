import React from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '../context/ThemeContext';

export default function SearchBar({value, onChangeText}) {
  const {colors} = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: colors.surface, borderColor: colors.border}]}>
      <MaterialCommunityIcons
        name="magnify"
        size={20}
        color={colors.primary}
        style={styles.icon}
      />
      <TextInput
        placeholder="Search universities..."
        placeholderTextColor={colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, {color: colors.text}]}
        selectionColor={colors.primary}
      />
      {value !== '' && (
        <TouchableOpacity onPress={() => onChangeText('')}>
          <MaterialCommunityIcons
            name="close-circle"
            size={20}
            color={colors.textSecondary}
            style={styles.clearIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    marginBottom: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  clearIcon: {
    marginLeft: 10,
    padding: 5,
  },
});