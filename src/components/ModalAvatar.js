import React,{useContext, useState} from 'react';
import { Modal, ScrollView, Image, StyleSheet,View, TouchableOpacity, Button } from "react-native";
import userContext from '../AuthContext/AuthProvider';


function ModalAvatar({ handleClose, confirmAvatar }) {
    const {user} = useContext(userContext)
    const importAll = (r) => {
        let images = {};
        r.keys().map((item) => { images[item.replace('./', '')] = r(item); });
        return images;
    };
    const imageFiles = importAll(require.context('../assets/avatar', false, /\.(png|jpe?g|svg)$/));

    const [avatar, setAvatar] = useState(user.photoURL)

    const selectAvatar = (avatar)=>{
        setAvatar(avatar)
    }
    
    const images = Object.keys(imageFiles).map((key) => {
        return (
            <TouchableOpacity  key={key} onPress={()=>selectAvatar(imageFiles[key])}>
                <Image
                    source={imageFiles[key]}
                    style={{ width: 100, height: 100, margin: 10 }}
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
            <ScrollView contentContainerStyle={styles.container}>
                {images}
            </ScrollView>
            <Button title='Xác nhận' onPress={()=>confirmAvatar(avatar)}>

            </Button>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
})

export default ModalAvatar;