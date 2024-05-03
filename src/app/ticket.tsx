import { Credencial } from "@/components/credencial";
import { Header } from "@/components/header";
import { Link } from "expo-router";
import { StatusBar, View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { Button } from "@/components/button";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker"

export default function Ticket() {
    const [image, setImage] = useState("")
    async function handleSelectImage(){
        try{
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4,4],
            })

            if(result.assets){
                console.log(result.assets)
                setImage(result.assets[0].uri)
            }
        }catch(error){
            console.log(error)
            Alert.alert("Foto","Não foi possivel selecionar a imagem.")
        }
    }    
    return (
        <View className="flex-1 bg-green-500">
            <StatusBar barStyle="light-content" />
            <Header title="Minha Credencial" />
            <ScrollView className="-mt-28 -z-10" contentContainerClassName="px-8 pb-8">
                <Credencial image={image} onChageAvatar={handleSelectImage} />
                <FontAwesome name="angle-double-down" size={24} color={colors.gray[300]} className="self-center my-6" />
                <Text className="text-white font-bold text-2xl mt-4"> Compartilhar Credencial</Text>
                <Text className="text-white font-regular text-base mt-6"> Mostre ao mundo que você vai participar</Text>
                <Link href="/" className="text-grey-100 text-base font-bold text-center mt-8 mb-6 "> Já  possui ingresso</Link>
                <Button  title="Compartilhar"/>
                <TouchableOpacity activeOpacity={0.7} className="mt-10">
                    <Text className="text-base text-white font-bold text-center"> Remover Ingresso</Text>
                </TouchableOpacity>
            </ScrollView>


        </View>
    )
}