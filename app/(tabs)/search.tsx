import MovieCard from '@/components/MovieCard'
import SearchBar from '@/components/SearchBar'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { fetchMovies } from '@/services/api'
import { updateSearchCount } from '@/services/appwrite'
import useFetch from '@/services/useFetch'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'

const search = () => {

  const [searchQuery , setSearchQuery] = useState("");

  const router = useRouter();
  const {
      data: movies,
      loading:moviesLoading,
      fetchData: loadMovies,
      reset,
      error: moviesError} = useFetch(() => fetchMovies({
          query: searchQuery
        }) ,false);


  useEffect(()=>{
    if (Array.isArray(movies) && movies.length > 0) {
      console.log(true)
      updateSearchCount(searchQuery, movies[0]);
  }
    
    const timeoutId = setTimeout(async ()=>{
      if (searchQuery.trim()){
        await loadMovies();
      }else{
        reset()
      }
  }, 500)

  return ()=> clearTimeout(timeoutId)

  },[searchQuery])


  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='flex-1 absolute w-full z-0'  resizeMode='cover'/>
      <FlatList 
        data={movies} 
        renderItem={({item})=> <MovieCard {...item}/>}
        keyExtractor={(item)=>item.id.toString()}
        className='px-5'
        numColumns={3}
        columnWrapperStyle={{
          justifyContent:"center",
          gap: 16,
          marginVertical: 16
        }}
        contentContainerStyle ={{paddingBottom:100}}
        ListHeaderComponent={
          <>
            <View className='w-full flex-row justify-center mt-20 items-center'>
              <Image source={icons.logo} className='w-12 h-10'/>
            </View>

            <View className='my-5'>
              <SearchBar 
                value={searchQuery} 
                onChangeText={(text: string)=>setSearchQuery(text)} 
                placeHolder='Search movies...' />
            </View>
            {moviesLoading && (
              <ActivityIndicator size={"large"} color={'#0000ff'} className='my-3' />
            )}
            {moviesError && (
              <>
              <Text className='text-red-500 px-5 my-3'>Error:{moviesError}</Text>
              </>
            )}

            {!moviesLoading && !moviesError && searchQuery.trim() && movies?.length>0 &&(
              <Text className='text-xl text-white font-bold'>
                Search Results for
                <Text className='text-accent'> {searchQuery}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <View className='mt-10 px-5'>
              <Text className='text-center text-gray-500'>
                {searchQuery.trim()? 'no Movie found': "Search for a Movie"}
              </Text>
            </View>
          ): null
        }
      />
    </View>
  )
}

export default search