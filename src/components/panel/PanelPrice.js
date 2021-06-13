
import React, { Component, useContext, useState, useCallback, useEffect } from 'react';
import { Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  View,
  ScrollView,
  Pressable,
  ImageBackground,
  RefreshControl,
  Button
} from 'react-native';
var {height, width } = Dimensions.get('window');
import {Loader} from "../Loader";
import GlobalStyle from "../GlobalStyle";
import { openDatabase } from 'react-native-sqlite-storage';
import SlidingUpPanel from 'rn-sliding-up-panel';

export let gim;

export const lety = () => {
    gim.show();
}

export const PanelPrice = () => {
    const [panelPrice, setPanelPrice] = useState(false);

    gim = panelPrice;


    return (
    <SlidingUpPanel 
    draggableRange={{top: 240, bottom: 0}}
    ref={c => {
        setPanelPrice(c);
    }}
    >
    <View style={styles.containerPrice}>
        <FlatList
            style={styles.flatListPlaces}
            keyExtractor={(item, index) => index.toString()}
            data={[
                {text: 'Бесплатно'},
                {text: 'Платно'},
                {text: 'Неважно'}
            ]}
            renderItem={({ item, index }) => (
                <Pressable 
                key={index}
                style={styles.buttonPlacesItem}
                >
                    <Text 
                    style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textPlacesItem,
                    ]}
                    >
                        {item.text}
                    </Text>
                </Pressable>

            )}
        />
        <Pressable 
        onPress={() => panelPrice.hide()} 
        style={styles.buttonClous}
        >
            <Text 
            style={[
                GlobalStyle.CustomFontRegular,
                styles.textbuttonClous,
            ]}
            >
                Отменить
            </Text>
        </Pressable>
    </View>
    </SlidingUpPanel>
    );
}

const styles = StyleSheet.create({
    flatListPlaces: {
        width: '100%',
        paddingTop: 30,
        paddingLeft: 32,
        paddingRight: 32,
    },
    textPlacesItem: {
        width: '100%',
        height: 48,
    },
    textbuttonClous: {
        paddingLeft: width/2 - 45,
    },
    buttonClous: {
        backgroundColor: '#fff',
        width: '100%',
        height: 60,
        position: 'absolute',
        bottom: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
        alignContent: 'center',
        justifyContent: 'center',
    },
    containerPlaces: {
        width,
        height: 500,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    containerPrice: {
        width,
        height: 240,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    scrollViewFilter: {
    },
    cartSearchLiner: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        width: '100%',
        height: 45,
    },
    buttonFilterM: {
        marginRight: 15,
    },
    iconFilter: {
        marginTop: 4,
        width: 24,
        height: 16,
    },
    buttonFilter: {
        width: 80,
        height: 29,
        backgroundColor: '#E6E6F0',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        paddingLeft: 10,
        marginRight: 10,
    },
    iconFilterMen: {
        marginTop: 4,
        width: 7.5,
        height: 3.75,
    },
    textFilterItem: {
        width: 54,
        color: '#000',
        fontSize: 15,
    },
    scrollViewMenu: {
        height: 40,
    },
});

