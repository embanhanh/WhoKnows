import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';

const PlayerCard = () => {
  const windowWidth = Dimensions.get('window').width;
  const avatarSize = windowWidth * 0.15; // Đặt kích thước avatarContainer dựa trên tỷ lệ màn hình

  return (
    <View style={styles.container}>
      <View style={[styles.avatarContainer, { width: avatarSize, height: avatarSize }]}>
        <Image source={require('../assets/img/Manager.jpg')} style={styles.avatar} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: "50%",
  },
  avatarContainer: {
    borderRadius: 70, 
    borderWidth: 3, 
    borderColor: 'green', 
    overflow: 'hidden', 
    alignItems: 'center',
    justifyContent: 'center',
  
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 50, 
  },
});

export default PlayerCard;
