import { View, Image } from "react-native";

export function Credencial() {
    return (
        <View className="
        w-full
        self-stretch
        items-center"
        >
            <Image
                source={require("@/assets/ticket/band.png")}
            ></Image>

        </View>
    )
}