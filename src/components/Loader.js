import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';

export const Loader = () => (
    <View style={styles.body}>
        <ActivityIndicator size="large" color="#0060CC" />
    </View>
);

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 40,
    },
});