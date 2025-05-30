import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { Tabs } from 'expo-router'
import React from 'react'
import { Image, ImageBackground, Text, View } from 'react-native'

type TabIconProps = {
    icon: any;
    text: string;
    focused: boolean;
};

const TabIcon = ({ icon, text, focused }: TabIconProps) => {
    if (focused){
    return (
        <ImageBackground
            source={images.highlight}
            className='flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden'
        >
            <Image
                source={icon}
                style={{ width: 20, height: 20, tintColor: "#151312" }}
            />
            <Text className='text-secondary text-base font-semibold ml-2'>{text}</Text>
        </ImageBackground>
    );
    }
    else {
        return (
            <View className='size-full justify-center items-center mt-4 rounded-full'>
                <Image 
                    source={icon}
                    tintColor={"#A8B5DB"}
                    className='size-5'
                />
            </View>
        )
    }

}

const _layout = () => {
  return (
    <Tabs
        screenOptions={{
            tabBarShowLabel: false,
            tabBarItemStyle: {
                width: "100%",
                height: "100%",
                justifyContent: "center"
            },
            tabBarStyle: {
                backgroundColor: "#0f0D23",
                borderRadius:50,
                marginHorizontal: 20,
                marginBottom: 36,
                height: 52,
                position: "absolute",
                overflow: "hidden",
                borderWidth: 1,
                borderColor: "#0f0D23",
            }
        }}
    >
        <Tabs.Screen
            name="index"
            options={{
                title: "Home",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon focused={focused} icon={icons.home} text={"Home"}/>
                )
            }} />
        <Tabs.Screen
            name="search"
            options={{
                title: "Search",
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <TabIcon focused={focused} icon={icons.search} text={"Search"}/>
                )
            }} />
        <Tabs.Screen
            name="saved"
            options={{
                title: "saved",
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <TabIcon focused={focused} icon={icons.save} text={"Saved"}/>
                )
            }} />
        <Tabs.Screen
            name='profile'
            options={{
                title: "Profile",
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <TabIcon focused={focused} icon={icons.person} text={"Profile"}/>
                )
            }} />
    </Tabs>
  )
}

export default _layout