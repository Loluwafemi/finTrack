import { StyleSheet, View, Text } from 'react-native';


export default function Dashboard() {
  return (
    <View style={styles.body}>
        <Text>
            Dashboard
        </Text>
    </View>
  );
}

const styles = StyleSheet.create({
    body: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        // color: 'black',
        height: '100%'
    }
});
