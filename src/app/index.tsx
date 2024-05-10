import { View, Image, StatusBar, Alert } from "react-native"

import { Input } from "@/components/input"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { colors } from "@/styles/colors"
import { Button } from "@/components/button"
import { Link, Redirect } from "expo-router"
import React, { useState } from "react"
import { api } from "@/server/api"
import { useBadgeStore } from "@/store/badge-store"
import DialogInput from "react-native-dialog-input";



export default function Home() {
    const [code, setCode] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const badgeStore = useBadgeStore()
    const [visible, setVisible] = useState(false)
    const [inputDialog, setInputDialog] = useState("")
    console.log("Dados =>", badgeStore.data)


    async function handleAcessCredential() {
        try {
            if (!code.trim()) {
                return Alert.alert("Ingresso", "Informe o código do ingresso!")
            }
            setIsLoading(true)
            const { data } = await api.get(`/attendees/${code}/badge`)
            badgeStore.save(data.badge)
            badgeStore.updateAvatar(data.badge.uriImage)
        } catch (error) {
            setIsLoading(false)
            return Alert.alert("Ingresso", "Ingresso não encontrado")

        } finally {

        }

    }

    if (badgeStore.data?.checkInURL) {
        return <Redirect href="/ticket" />
    }


    return (
        <View className="flex-1 bg-green-500 items-center justify-center p-8">
            <Image source={require("@/assets/logo.png")}
                className="h-17"
                resizeMode="contain"
            />
            <StatusBar barStyle="light-content" />
            <View className="w-full mt-12 gap-3">
                <Input>
                    <MaterialCommunityIcons
                        name="ticket-confirmation-outline"
                        color={colors.green[200]}
                        size={20}
                    />
                    <Input.Field
                        placeholder="Código do ingresso"
                        onChangeText={setCode}
                    />
                </Input>
                <Button
                    title="Acessar Credencial"

                    onPress={handleAcessCredential}
                    isLoading={isLoading}

                />

                <Link href="/register"
                    className="text-grey-100 text-base font-bold text-center mt-8"
                > Ainda nao possui ingresso? = { inputDialog }</Link>

                <DialogInput
                    isDialogVisible={visible}
                    title={"Nova Imagem"}
                    message={"Digite a url da nova imagem"}
                    hintInput={"https://github.com/augustorsn.png"}
                    submitInput={(inputText) => {
                        setInputDialog(inputText),
                            setVisible(false);
                    }}
                    cancelText="cancelar"
                    submitText="Enviar"
                    closeDialog={() => setVisible(false)}>
                </DialogInput>

                <Button title="teste prompt" onPress={() => setVisible(true)} />

            </View>
        </View>
    )
}


