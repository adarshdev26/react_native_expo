import { Tabs } from "expo-router";
import { Ionicons } from '@expo/vector-icons'

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'gray',
          padding: 10,
          height: 90
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: '#fff'
      }}
    >
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile', tabBarIcon: ({ focused }) => (
            <Ionicons
              size={24}
              name={focused ? 'person' : 'person-outline'}
            />
          )
        }}
      />
         <Tabs.Screen
        name="books"
        options={{ title: 'Books', tabBarIcon: ({focused}) => (
          <Ionicons 
          size={24}
          name={focused ? 'book' : 'book-outline'}
          />
        )}}
      />
      
      <Tabs.Screen
        name="create"
        options={{ title: 'Create', tabBarIcon: ({ focused }) => (
          <Ionicons
          size={24}
          name={focused ? 'create' : 'create-outline'}
          />
        ) }}
      />
   

    </Tabs>


  )
}

export default _layout