import "@/styles/global.css"
import { Slot } from "expo-router"
import { useFonts, Roboto_700Bold, Roboto_400Regular, Roboto_500Medium } from "@expo-google-fonts/roboto"
import { Loading } from "@/components/loading"

export default function Layout() {
    const [fontsLoaded] = useFonts({
        Roboto_700Bold,
        Roboto_400Regular,
        Roboto_500Medium,
    });

    if (!fontsLoaded) {
        return <Loading />
    }

    return (
        <Slot />
    )
}