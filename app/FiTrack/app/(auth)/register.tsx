import { StyleSheet, View, Text} from 'react-native';
import Checkbox from 'expo-checkbox';
import { useRouter } from 'expo-router';
import { Tabs, TabSlot, TabTrigger } from 'expo-router/ui';
import * as React from 'react'
import { FormNav } from '@/components/ui/registration/forms';




export default function RegistrationPage() {
  const navigation = useRouter()
  return (
      // Tab per request
      <View style={styles.body}>
          {/* tabs message */}
          <View style={styles.message}>
            <Text style={{ color: '#FEFCFD'}}>Display Message</Text>
          </View>

          {/* tabs */}
          <View style={styles.form}>
            {/* Use tab*/}
            {/* <Tabs>
              <TabSlot>
                <TabTrigger name='personal' >
                    <Text>Home</Text>
                </TabTrigger>
              </TabSlot>
            </Tabs> */}

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
      backgroundColor: '#000000',
      marginBottom: 4,
      borderRadius: 3,
      marginTop: 15
    },
    
    form: {
      flex: 4,
      justifyContent: 'flex-start',
      // alignItems: 'center',
      backgroundColor: '#FEFCFD',
      marginBottom: 4,
      display: 'flex'
    }
    
});
