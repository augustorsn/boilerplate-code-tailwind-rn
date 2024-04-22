import { Credencial } from "@/components/credencial";
import { Header } from "@/components/header";
import { Link } from "expo-router";
import { StatusBar, View } from "react-native";

export default function Ticket() {
    return (
        <View className="flex-1 bg-green-500">
            <StatusBar barStyle="light-content" />
            <Header title="Minha Credencial"/>
            <Credencial  />
            <Link href="/" className="text-grey-100 text-base font-bold text-center mt-8"> Já  possui ingresso</Link>
        </View>
    )
}