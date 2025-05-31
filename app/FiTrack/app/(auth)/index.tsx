import { StyleSheet, View, Text, TextInput, Button, Pressable, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useRouter, Link } from 'expo-router';


export default function loginPage() {
  const navigation = useRouter()
  return (
    <View style={styles.body}>
        {/* <Text>
            Login Page
        </Text> */}
        <View style={styles.login}>
            <Text style={[styles.header, styles.headerText]}>Welcome Back</Text>
            <Text style={[styles.header, styles.headerDescription]}>Sign in to access your financial aid dashboard</Text>
            <View style={styles.form}>
              <View style={styles.formItem}>
                  <Text>Email</Text>
                  <TextInput 
                  style={styles.formInput}
                  placeholder='name@university.edu.com'
                  />
              </View>
              <View style={styles.formItem}>
                  <Text>Password</Text>
                  <TextInput 
                  style={styles.formInput}
                  placeholder='********'
                  textContentType='newPassword'
                                    
                  />
              </View>
              <View style={[styles.formOptionsItems]}>
                  <View style={styles.formOptions}>
                    <Checkbox style={ {margin: 3} } />
                    <Text>Remember me</Text>
                  </View>

                  <View style={styles.formOptions}>
                    <Link href={'/(auth)/reset'}>Forgot password?</Link>
                  </View>
              </View>

              <View style={[styles.formOptionsItems]}>
                <TouchableOpacity style={styles.formSubmit}>
                  <Text style={styles.formSubmitText}>Sign In</Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.horizontal]}>
              </View>

              <View style={[styles.formOptionsItems]}>
                <TouchableOpacity style={styles.formRegister}
                  onPress={()=> navigation.navigate('/(auth)/register')}
                >
                  <Text style={styles.formRegisterText}>Sign Up</Text>
                </TouchableOpacity>
              </View>
              


            </View>

        </View>
        <Link href='/(dashboard)' target='_self'> Dashboard </Link>
        
    </View>
  );
}

const styles = StyleSheet.create({
    body: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100%'
    },
    login: {
      display: 'flex',
      alignItems: 'center',
      padding: 9
    },
    
    header: {
        textAlign: 'center',
    },
    
    headerText: {
      fontWeight: '800',
      fontSize: 20
    },
    headerDescription: {
      fontSize: 12
    },

    form: {
      margin: 20
    },
    formItem: {
      margin: 6
    },
    formInput: {
      borderColor: '#000000',
      borderWidth: .5,
      width: 300,
      height: 33,
      padding: 5,
      borderRadius: 3
    },
    formOptions: {
      display: 'flex',
      // justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 3,
    },
    formOptionsItems: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 3,
      marginRight: 6,
      marginLeft: 6
    },
    formSubmit: {
      width: 300,
      backgroundColor: '#000000',
      height: 30,
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'row',
      borderRadius: 2
    },
    formSubmitText: {
      color: '#FEFCFD',
      padding: 4
    },

    formRegister: {
      width: 300,
      backgroundColor: '#FEFCFD',
      height: 30,
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'row',
      borderRadius: 2,
      borderColor: '#000000',
      borderWidth: 1,
      marginTop: 3
    },
    formRegisterText: {
      color: '#000000',
      padding: 4
    },

    horizontal: {
      margin: 8,
      borderTopWidth: 0.4,
      borderColor: '#000000'

    }
    
});
