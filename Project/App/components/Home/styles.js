import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
    homeDiv: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
    },
    homePageImage: {
        width: '75%',
        height: '50%',
    },
    header: {
        fontSize: 30,
        color: 'orange',
        textAlign: 'center',
        ...Platform.select({
            ios: {
                fontFamily: 'Heiti SC'
            },
            android: {
                fontFamily: 'monospace'
            }
        })
    }
})

export default styles;
