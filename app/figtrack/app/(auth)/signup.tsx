import * as React from 'react';
import { Link, useRouter } from 'expo-router';
import { Text, View, StyleSheet, Button } from 'react-native';
import { FormNav } from '~/components/registration/forms';
import { Auth } from '~/lib/func/tailored';

export default function SignUpAuthentication() {
      const navigation = useRouter()

        // fetching session
        // const [session, setSession] = React.useState(null)
        const [status, setStatus] = React.useState(false)

        React.useEffect(()=>{
          const getSession = async () => {
            try {
              const response = await Auth.isAlive()
              
              if (response.status) {
                // setSession(response.data)
                // setStatus(true)
                return navigation.navigate('/(dashboard)')
              }else{
                // setSession(null)
                setStatus(false)
              }
            } catch (error) {
              setStatus(false)
            }
          };
          getSession();
        }, [])
  
        return (
          <View className='mx-2'>  
              <View className='h-full'>
                <FormNav />
              </View>
        </View>
        );
}

const styles = StyleSheet.create({
    body: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100%',
        margin: 10,
    },
    
    message: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: '#000000',
      marginBottom: 4,
      borderRadius: 3,
      marginTop: 15
    },
    
    form: {
      flex: 4,
      justifyContent: 'flex-start',
      // alignItems: 'center',
      // backgroundColor: '#FEFCFD',
      marginBottom: 4,
      display: 'flex'
    },
    signup: {
      fontSize: 25,
      fontStyle: 'normal',
      fontWeight: '300',
      marginLeft: 5,
      marginTop: 10,
      marginBottom: 20
    }
    
});
