import React, {useState, useContext} from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import {SortContext} from "../context/sortContext";

export let status = false;

export const HeaderButton = () => {
    const list_sort = useContext(SortContext);

    return (
    <View style={styles.header}>
        <Pressable 
        style={styles.headerButton}
        onPress={() => {list_sort.changeListConveniences(list_sort.listConveniences);}}
        >
            <Image
                style={styles.iconSeting}
                source={require('../image/seting.png')}
            />
        </Pressable>
    </View>
    );
};

const styles = StyleSheet.create({
    headerButton: {
        marginLeft: 25,
        width: 60,
        paddingLeft: 46,
    },
    header: {
        paddingLeft: 16,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginRight: 26,
    },
    iconSeting: {
      width: 4,
      height: 16,
    }
});