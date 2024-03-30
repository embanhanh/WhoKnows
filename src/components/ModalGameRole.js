import React from "react";
import { View, Text, Modal, StyleSheet, Image, Dimensions } from "react-native";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

function ModalGameRole({
    roleVisible,
    handleCloseRoleModal,

}) {
    const windowWidth = Dimensions.get('window').width;
    const avatarSize = windowWidth * 0.25; // Kích thước avatarContainer dựa trên tỷ lệ màn hình
    return ( 
        <Modal
                animationType="fade"
                transparent={true}
                visible={roleVisible}
                onRequestClose={handleCloseRoleModal}
            >
                {roleVisible  && <View style={styles.overlay} />}
                {/* <View style={styles.container}>
                    <View style={styles.infoRole}>
                        <Text style={{...styles.infoText, fontSize: RFValue(25), fontWeight: "bold", marginTop: "13%"}}>The Ghost</Text>
                        <Text style={{...styles.infoText, fontSize: RFValue(13), fontStyle: "italic", marginTop: "5%"}}>"Một thực thể tà ác có khả năng sao chép</Text>
                        <Text style={{...styles.infoText, fontSize: RFValue(13), fontStyle: "italic"}}>nhân dạng"</Text>
                    </View>

                    <View style={{...styles.avatarContainer, width: avatarSize, height: avatarSize }}>
                        <Image source={require('../assets/img/role-Ghost.png')} style={styles.avatar}/>
                    </View>
                </View> */}

                <View style={styles.container}>
                    <View style={styles.infoRole}>
                        <Text style={{...styles.infoText, fontSize: RFValue(25), fontWeight: "bold", marginTop: "13%"}}>The Villager</Text>
                        <Text style={{...styles.infoText, fontSize: RFValue(13), fontStyle: "italic", marginTop: "4%"}}>"Một người dân với nhiệm vụ phải tìm ra</Text>
                        <Text style={{...styles.infoText, fontSize: RFValue(13), fontStyle: "italic"}}>thực thể tà ác đã thâm nhập vào ngôi </Text>
                        <Text style={{...styles.infoText, fontSize: RFValue(13), fontStyle: "italic"}}>làng"</Text>
                    </View>

                    <View style={{...styles.avatarContainer, width: avatarSize, height: avatarSize }}>
                        <Image source={require('../assets/img/role-Villager.png')} style={styles.avatar}/>
                    </View>
                </View>
            </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },

      avatarContainer: {
        position: "absolute",
        borderRadius: 50, 
        borderWidth: 3, 
        borderColor:   '#327D35',  //"#472A9D",
        backgroundColor: "#1B5D20", //"#1F287C",
        alignItems: 'center',
        justifyContent: 'center',
        top: "32%",
      },

      avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 50, 
      },

      infoRole: {
        position: "relative",
        width: "72%",
        height: "20%",
        borderRadius: RFValue(20),
        backgroundColor:  "#3E8D41", //"#79209F",
        alignItems: "center",
      },

      infoText: {
        color: "white",
      },

      overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
})

export default ModalGameRole;