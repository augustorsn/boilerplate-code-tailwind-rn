import { View, Image, StatusBar, Alert } from "react-native"

import { Input } from "@/components/input"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { colors } from "@/styles/colors"
import { Button } from "@/components/button"
import { Link } from "expo-router"
import { useState } from "react"


export default function Home() {
    const [code, setCode] = useState("")

    function handleAcessCredential() {
        if (!code.trim()) {
            return Alert.alert("Credencial", "Informe o código do ingresso!")
        }
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
                />

                <Link href="/register"
                    className="text-grey-100 text-base font-bold text-center mt-8"
                > Ainda nao possui ingresso?</Link>
            </View>
        </View>
    )
}


