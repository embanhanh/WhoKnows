import React, { useState, useContext, useCallback } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome.js';
import Slider from '@react-native-community/slider';

import styles from "../components/Styles.js";
import SoundVolumeContext from "../AuthContext/SoundProvider.js";

function ModalSetting({setModalVisible}) {
    const { volume,setVolume } = useContext(SoundVolumeContext)


    return ( 
        <Modal
            animationType="fade"
            transparent={true}
            visible={true}
            onRequestClose={() => {
                setModalVisible(false);
            }}
        >
            <View style={styles.overlay} />
            <View style={styles.modalContainer}>
                <TouchableOpacity onPress={()=>{setModalVisible(false);}}>
                    <Icon name="close" style={styles.iconClose}></Icon>
                </TouchableOpacity>
                <Text style={{width: 200, height: 40}}>{volume*100}</Text>
                <Slider
                    style={{width: 200, height: 40}}
                    value={volume*100}
                    onValueChange={(value) => {
                        setVolume(value/100); 
                    }}
                    minimumValue={0}
                    maximumValue={100}
                    step={1}
                />
            </View>
        </Modal>
    );
}

export default ModalSetting;