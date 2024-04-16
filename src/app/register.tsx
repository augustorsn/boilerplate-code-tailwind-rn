import { View, Image, StatusBar } from "react-native"

import { Input } from "@/components/input"
import { FontAwesome6, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import { colors } from "@/styles/colors"
import { Button } from "@/components/button"
import { Link } from "expo-router"


export default function Register() {

    return (
        <View className="flex-1 bg-green-500 items-center justify-center p-8">
        <Image source={require("@/assets/logo.png")}
            className="h-16"
        />
        <StatusBar barStyle="light-content" />
        <View className="w-full mt-12 gap-3">
            <Input>
                <FontAwesome6
                    name="user-circle"
                    color={colors.green[200]}
                    size={20}
                />
                <Input.Field                    
                    placeholder="Nome Completo"
                />
            </Input>
            <Input>
                <MaterialIcons
                    name="alternate-email"
                    color={colors.green[200]}
                    size={20}
                />
                <Input.Field
                    keyboardType="email-address"
                    placeholder="E-mail"
                />
            </Input>
            <Button
                title="Realizar Inscrição"
            />

            <Link href="/" className="text-grey-100 text-base font-bold text-center mt-8"> Já  possui ingresso</Link>
        </View>
    </View>
    )
}


