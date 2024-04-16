import { View, Image, StatusBar } from "react-native"

import { Input } from "@/components/input"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { colors } from "@/styles/colors"
import { Button } from "@/components/button"
import { Link } from "expo-router"


export default function Home() {

    return (
        <View className="flex-1 bg-green-500 items-center justify-center p-8">
            <Image source={require("@/assets/logo.png")}
                className="h-16"
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
                    />
                </Input>
                <Button
                    title="Acessar Credencial"
                />

                <Link href="/register" className="text-grey-100 text-base font-bold text-center mt-8"> Ainda nao possui ingresso</Link>
            </View>
        </View>
    )
}


