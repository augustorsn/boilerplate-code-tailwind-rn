import { Credencial } from "@/components/credencial";
import { Header } from "@/components/header";
import { Link, Redirect } from "expo-router";
import { Share, StatusBar, View, Text, ScrollView, TouchableOpacity, Alert, Modal } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { Button } from "@/components/button";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker"
import { QRCode } from "@/components/qrcode";
import { useBadgeStore } from "@/store/badge-store"
import { api } from "@/server/api";
import DialogInput from "react-native-dialog-input";

const EVENT_ID = "9e9bd979-9d10-4915-b339-3786b1634f33"

export default function Ticket() {
    const [expandQRCode, setExpandQRCode] = useState(false)
    const badgeStore = useBadgeStore()
    const [visible, setVisible] = useState(false)
    const [inputDialog, setInputDialog] = useState("")
    console.log(badgeStore.data?.uriImage)
    async function handleShare() {
        try {
            if (badgeStore.data?.checkInURL) {
                await Share.share({
                    message: badgeStore.data.checkInURL,
                })
            }

        } catch (error) {
            Alert.alert("Compartilhar", "Não foi possivel compartilhar")
        }
    }

    async function handleSelectImage() {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 4],
            })

            if (result.assets) {
                console.log(result.assets)


                const updateImageResponse = await api.post(`/events/${EVENT_ID}/attendees/update`, {
                    name: badgeStore.data?.name,
                    email: badgeStore.data?.email,
                    uriImage: result.assets[0].uri,
                })
                if (updateImageResponse.data.attendeeId) {
                    badgeStore.updateAvatar(result.assets[0].uri)
                    console.log('salvou no back-end')
                }
            }
        } catch (error) {
            console.log(error)
            Alert.alert("Foto", "Não foi possivel selecionar a imagem.")
        }
    }

    async function testeImage(campo: string) {
        try {
            console.log("campo = " + campo);
            if (campo) {
                const updateImageResponse = await api.post(`/events/${EVENT_ID}/attendees/update`, {
                    name: badgeStore.data?.name,
                    email: badgeStore.data?.email,
                    uriImage: campo,
                })
                if (updateImageResponse.data.attendeeId) {
                    badgeStore.updateAvatar(campo)
                    console.log('salvou no back-end')
                }
            }
        } catch (error) {
            console.log(error)
            Alert.alert("Foto", "Não foi possivel selecionar a imagem.")
        } finally {
            setVisible(false)
        }
    }

    if (!badgeStore.data?.checkInURL) {
        return <Redirect href="/" />
    }
    return (
        <View className="flex-1 bg-green-500" >
            <StatusBar barStyle="light-content" />
            <Header title="Minha Credencial" />
            <ScrollView className="-mt-28 -z-10" contentContainerClassName="px-8 pb-8">
                <Credencial data={badgeStore.data} onChageAvatar={handleSelectImage} onExpandQRCode={() => setExpandQRCode(true)} />
                <FontAwesome name="angle-double-down" size={24} color={colors.gray[300]} className="self-center my-6" />
                <DialogInput
                    isDialogVisible={visible}
                    title={"Novo Avatar"}
                    message={"Deseja troca o avatar?"}
                    hintInput={"https://github.com/augustorsn.png"}
                    submitInput={(inputText) => {                        
                            testeImage(inputText);
                    }}
                    cancelText="cancelar"
                    submitText="Enviar"
                    closeDialog={() => setVisible(false)}>
                </DialogInput>


                <TouchableOpacity activeOpacity={0.7} className="mt-6" onPress={() => setVisible(true)}>
                    <Text className="font-body text-orange-500 text-sm">Trocar Imagem via url web</Text>
                </TouchableOpacity>
                <Text className="text-white font-bold text-2xl mt-4" > Compartilhar Credencial</Text>
                <Text className="text-white font-regular text-base mt-6 mb-4"> Mostre ao mundo que você vai participar do evento {badgeStore.data.eventTitle}</Text>
                <Button title="Compartilhar" onPress={handleShare} />
                <TouchableOpacity activeOpacity={0.7} className="mt-5" onPress={() => badgeStore.remove()}>
                    <Text className="text-base text-white font-bold text-center"> Remover Ingresso</Text>
                </TouchableOpacity>
            </ScrollView>
            <Modal statusBarTranslucent visible={expandQRCode}>
                <View className="flex-1 bg-green-500 items-center justify-center">
                    <TouchableOpacity activeOpacity={0.7} onPress={() => setExpandQRCode(false)}>
                        <QRCode value={"213asd123"} size={300} />
                        <Text className="font-body text-orange-500 text-center text-sm mt-10"> Fechar</Text>
                    </TouchableOpacity>

                </View>

            </Modal>


        </View>
    )
}