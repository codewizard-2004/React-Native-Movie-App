import { icons } from '@/constants/icons'
import { Link } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const MovieCard = ({id , poster_path, title, vote_average, release_date}: Movie) => {
  return (
    <Link href={`/movies/${id}` as any}
      asChild>
      <TouchableOpacity className='w-[30%]'>
        <Image
            source={{
                uri: poster_path? `https://image.tmdb.org/t/p/w500${poster_path}` : "https://placehold.co/600x400/1a1a1a/ffffff.png"
            }}
            className='w-full h-52 rounded-lg'
            resizeMode='cover'
        />
        <Text className="text-sm font-bold text-white" numberOfLines={1}>{title}</Text>
        <View className='flex-col justify-start gap-x-1'>
            <View className='flex-row items-center justify-start mt-1'>
            {Array.from({ length: Math.round(vote_average / 2) }).map((_, i) => (
                <Image source={icons.star} className='size-3' key={i} />
            ))}
            </View>
            {/* <Text className='text-white'>{Math.round(vote_average /2)}</Text> */}
            <View className='flex-row items-center justify-between'>
                <Text className='text-xs text-light-300 font-medium mt-1'>
                    {release_date?.split("-")[0] || "N/A"}
                </Text>
                {/* <Text className='text-xs font-medium text-light-300 uppercase'>
                    Movie
                </Text> */}
            </View>
        </View>
      </TouchableOpacity>
    </Link>
  )
}

export default MovieCard