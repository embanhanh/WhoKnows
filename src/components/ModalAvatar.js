import React,{useContext, useState} from 'react';
import { Modal, ScrollView, Image, StyleSheet,View, TouchableOpacity, Button, SafeAreaView, Text } from "react-native";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import userContext from '../AuthContext/AuthProvider';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome.js';


function ModalAvatar({ handleClose, confirmAvatar }) {
    const {user} = useContext(userContext)
    const importAll = (r) => {
        let images = {};
        r.keys().map((item) => { images[item.replace('./', '')] = r(item); });
        return images;
    };
    const imageFiles = importAll(require.context('../assets/avatar', false, /\.(png|jpe?g|svg)$/));

    const [selectedImage, setSelectedImage] = useState(user.photoURL);

    const selectAvatar = (avatar) => {
        setSelectedImage(avatar);
    };

    const handleConfirmAvatar = () => {
        confirmAvatar(selectedImage);
        handleClose();
    };
    
    const images = Object.keys(imageFiles).map((key) => {
        return (
            <TouchableOpacity  key={key} onPress={()=>selectAvatar(imageFiles[key])}>
                <Image
                    source={imageFiles[key]}
                    style={{ width: 50, 
                            height: 50, 
                            borderRadius: 50, 
                            marginTop: "30%", 
                            borderWidth: selectedImage === imageFiles[key] ? 2 : 0,
                            borderColor: selectedImage === imageFiles[key] ? 'yellow' : 'transparent'}}
                />  
            </TouchableOpacity>
        );
    });

    return ( 
        <Modal
            animationType="none"
            transparent={true}
            visible={true}
            onRequestClose={()=>handleClose()}
            >
            <View style={styles.overlay} />
            <SafeAreaView style={styles.container}>
                <Animatable.View 
                        animation="bounceIn" 
                        duration={500} 
                        style={styles.avatarContainer}>
                    <Image source={require('../assets/img/owl.png')} style={styles.owlImage}></Image>
                    <View style={styles.titleModalContainner}>
                        <Text style={styles.titleModal}>Avatar</Text>
                    </View>

                    <View style={styles.avatarListContainer}>
                        {images}
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.mainButton} onPress={handleConfirmAvatar}>
                            <View style={styles.backgroundBehindText}/>
                            <Text style={styles.textButton}>
                                Xác nhận
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                        <Icon name="close"  style={styles.closeIcon}></Icon>
                    </TouchableOpacity>
                </Animatable.View>
            </SafeAreaView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    owlImage: {
        position: "absolute",
        width: '30%',
        height: '23%',
        top: "-21.5%",
        left: "5%",
    },

    avatarContainer: {
        position: "relative",
        width: "75%",
        height: "60%",
        borderRadius: RFValue(20),
        backgroundColor:  "#1E1E1E",
        alignItems: "center",
    },

    titleModalContainner: {
        flex: 0.7,
        alignItems: "center",
        justifyContent: "center"
    },

    titleModal: {
        color: "white",
        fontSize: RFValue(25), 
        fontWeight: "bold", 
    },

    avatarListContainer: {
        flex: 2.5,
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: 'space-between',
        paddingHorizontal: "5%",
        marginHorizontal: "10%",
        backgroundColor: "#121212",
        borderRadius: 20,
    },

    buttonContainer: {
        flex: 0.75,
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "space-between",
    },

    mainButton: {
        position: "relative",
        paddingVertical: "3%",
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: "80%",
    },

    backgroundBehindText: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "#F06E0A",
        backgroundImage: "linear",
        borderRadius: RFValue(15),
    },

    textButton: {
        fontSize: 18,
        color: "white",
        fontWeight: "bold",
    },

    closeButton: {
        backgroundColor: "#022728",
        borderRadius: RFValue(30),
        paddingHorizontal: "2.5%", 
        paddingVertical: "2%", 
        position: "absolute",
        top: "-2%",
        right: "-4%",
        justifyContent: "center",
        alignItems: "center",
    },

    closeIcon: {
        fontSize: RFValue(14),
        color: "white",
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
})

export default ModalAvatar;