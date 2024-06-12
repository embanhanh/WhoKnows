import React, { useState, useContext } from "react";
import { Alert,View, Text, TouchableOpacity, Image } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome.js';
import { signOut, updateProfile } from "firebase/auth";
import { useNavigation } from "@react-navigation/core";
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import styles from "../components/Styles.js";
import { auth } from "../../firebaseconfig";
import userContext from "../AuthContext/AuthProvider";
import ModalEditName from "../components/ModalEditName.js";
import ModalAvatar from "../components/ModalAvatar.js";

function Profile() {
    const {user} = useContext(userContext)
    const navigation = useNavigation();

    const [editVisible, setEditVisible] = useState(false);
    const [userName, setUserName] = useState(user?.displayName)
    const [avatar, setAvatar] = useState(user?.photoURL)
    const [isModalAvatar, setModalAvatar] = useState(false)

    const handleHome = () => {
        navigation.navigate('Home');
    };

    const handleCloseEditModal = ()=>{
        setEditVisible(false); 
    }

    const updateDisplayName = async (newName) => {
        try {
            await updateProfile(user, {
                displayName: newName
            });
            await user.reload();
            setUserName(user?.displayName)
        } catch (error) {
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi cập nhật tên: " + error.message);
        }
    };

    const handleConfirm = async(newName) => {
        if (newName.trim() !== '') {
            if (newName.length > 10) {
                Alert.alert('Thông báo', 'Tên quá dài. Vui lòng nhập tên có tối đa 10 ký tự.');
                return;
            }

            if (newName.length < 3) {
                Alert.alert('Thông báo', 'Tên quá ngắn. Vui lòng nhập tên có tối thiểu 3 ký tự.');
                return;
            }
    
            const harmfulWords = ["Lon", "Cac", "Me", "Loz", "Cak", "Kak"]; 
            const containsHarmfulWord = harmfulWords.some(word => newName.toLowerCase().includes(word.toLowerCase()));
            if (containsHarmfulWord) {
                Alert.alert('Thông báo', 'Tên chứa từ ngữ độc hại. Vui lòng nhập tên khác.');
                return;
            }
            await updateDisplayName(newName);
            handleCloseEditModal();
        } else {
            Alert.alert('Thông báo', 'Vui lòng nhập tên mới');
        }
    };

    const handleConfirmAvatar = async (avatar)=>{
        try {
            if(avatar && avatar !== user?.photoURL){
                setAvatar(avatar)
                await updateProfile(user, {
                    photoURL: avatar
                });
                await user.reload();
            }
            setModalAvatar(false)
        } catch (error) {
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi cập nhật tên: " + error.message);
        }
    }

    const handleCloseModal = ()=>{
        setModalAvatar(false)
    } 

    return ( 
        <View style={styles.profileContainer} >
            {isModalAvatar && <ModalAvatar handleClose={handleCloseModal} confirmAvatar={handleConfirmAvatar}/>}
            <View style={styles.headerProfile}>
                <Text style={styles.textHeader}>Hồ sơ</Text>
            </View>

            <View style={styles.toolsProfile}>
                <TouchableOpacity style={styles.tools} onPress={handleHome}>
                    <View style={styles.square}>    
                        <Icon name="home" style={styles.iconTools}></Icon>
                    </View>
                    <Text style={styles.textTools}>Trang Chủ</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tools} onPress={async() => {
                        const isGoogleProvider = user.providerData.some((profile) => profile.providerId === 'google.com');
                        try{
                            if(isGoogleProvider){
                                await GoogleSignin.revokeAccess();
                                await GoogleSignin.signOut();
                            }
                            await signOut(auth).then(()=>console.log("Log out success")).catch((e)=>Alert.alert("eror",e.Message))
                        }catch(e){
                            console.log(e);
                        }
                    }}
                >
                    <View style={styles.square}>    
                        <Icon name="sign-out" style={styles.iconTools}></Icon>
                    </View>
                    <Text style={styles.textTools}>Đăng Xuất</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.cardContainer}>
                <TouchableOpacity style={styles.avatar} onPress={()=>setModalAvatar(true)}>
                    <Image source={ 
                        {uri: avatar}
                    } style={{ 
                        width: "100%", 
                        height: "100%", 
                        borderRadius: 999, 
                        overflow: 'hidden',
                    }}></Image>
                </TouchableOpacity>

                <View style={styles.displayUserName}>
                    <Text style={styles.textProfile}>
                        {userName}  
                    </Text>
                    <TouchableOpacity style={styles.iconEditContainer} onPress={() => {setEditVisible(true)}}>
                        <Icon name="edit" style={styles.iconEdit}></Icon>
                    </TouchableOpacity>
                </View>
            </View>

            {
                editVisible &&
                <ModalEditName
                    handleConfirm={handleConfirm}
                    handleCloseEditModal={handleCloseEditModal}
                />
            }
        </View>
    );
}

export default Profile;