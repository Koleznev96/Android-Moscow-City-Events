import React, { Component, useContext, useState, useCallback, useEffect } from 'react';
import { Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  View,
  ScrollView,
  TextInput,
  Pressable,
  ImageBackground
} from 'react-native';
var {height, width } = Dimensions.get('window');
import Swiper from 'react-native-swiper';
import {useHttp} from "../hooks/http.hook";
import {Loader} from "../components/Loader";
import GlobalStyle from "../components/GlobalStyle";
import {httpServer, api_key} from '../const';

function IventScreen({ route, navigation }) {
    const {loading, request, error, clearError} = useHttp();
    const [ivent, setIvente] = useState(null);
    const { itemId } = route.params;

    const getIvent = useCallback(async () => {
        try {
            const data = await request('/' + itemId, 'GET', null, {});
            setIvente(data);
        } catch (e) {}
    }, [request]);


    useEffect(() => {
        getIvent();
    }, [getIvent]);

    if (loading) {
        return <Loader />
    }

    const onLikeHandler = async (id) => {
        console.log("like-", id);
    };

    const onTravelHandler = async (id) => {
        console.log("Travel-", id);
    };

    const onRegistrHandler = async (id) => {
        console.log("Registr-", id);
    };
    
    

    return (
        <View style={styles.body}>
            <ImageBackground 
            style={styles.imageBanner} 
            source={{uri: ivent ? "https://www.mos.ru" + ivent.image.small.src : ""}}
            >
                <View style={styles.itemDataLinerLike}>
                    <Pressable 
                    onPress={() => onLikeHandler(itemId)}
                    >
                        <Image
                            style={styles.iconLike}
                            source={require('../image/like.png')}
                        />
                    </Pressable>
                </View>
            </ImageBackground>
            <ScrollView style={styles.scrollView}>
                
                {/* <Image style={styles.imageBanner} resizeMode="contain" source={{uri:itembann}}/> */}
                
                <View style={styles.iventData}>
                    <Text
                    style={[
                        GlobalStyle.CustomFontBold,
                        styles.textName,
                    ]}
                    >
                        {ivent && ivent.title}
                    </Text>
                    
                    <View style={styles.iventDataItemLiner}>
                        <View style={styles.iventDataItemLinerPopit} />

                        <Text
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textDate,
                        ]}
                        >
                            {ivent && ivent.date_from.substring(0, ivent.date_from.length-9)}
                        </Text>
                    </View>

                    <View style={styles.iventDataItemLiner}>
                        <View style={styles.iventDataItemLinerPopit} />

                        <Text
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textPlace,
                        ]}
                        >
                            {/* {ivent && ivent.title} */}
                        </Text>
                    </View>

                    <View style={styles.iventDataItemLiner}>
                        <View style={styles.iventDataItemLinerPopit} />

                        <Text
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textDuration,
                        ]}
                        >
                            {ivent && ivent.date_to_timestamp-ivent.date_from_timestamp}
                        </Text>
                    </View>

                    <View style={styles.iventDataItemLiner}>
                        <View style={styles.iventDataItemLinerPopit} />

                        <Text
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textTravelTime,
                        ]}
                        >
                            {ivent && "ivent"}
                        </Text>

                        <Pressable 
                        onPress={() => onTravelHandler(itemId)}
                        style={styles.ButtomTravel}
                        >
                        <Text
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textButtomTravel,
                        ]}
                        >
                            Как добраться?
                        </Text>
                        </Pressable>
                    </View>

                    <View style={styles.linerDescription} >
                        <Text
                        style={[
                            GlobalStyle.CustomFontBold,
                            styles.textConstDescription,
                        ]}
                        >
                            Подробнее о событии:
                        </Text>

                        <Text
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textDescription,
                        ]}
                        >
                            {ivent && ivent.text.substring(3, ivent.text.length-4)}                        
                        </Text>

                    </View>

                </View>
            </ScrollView>

            <View style={styles.linerButtonRegistr}>
                <Pressable 
                onPress={() => onRegistrHandler(itemId)}
                style={styles.buttonRegistr}
                >
                    <Text
                    style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textConstButtonRegistr,
                    ]}
                    >
                        {ivent ? "Зарегистрироваться" : ""}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
    },
    scrollView: {
        width: '100%',
    },
    itemDataLinerLike: {
        position: 'absolute',
        right: 10,
        bottom: 10,
    },
    iventData: {
        width: '100%',
        height: '100%',
        padding: (0, 16, 0, 16),
    },
    iventDataItemLiner: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    iventDataItemLinerPopit: {
        backgroundColor: '#C4C4C4',
        width: 18,
        height: 18,
        marginRight: 10,
    },
    textName: {
        marginBottom: 15,
    },
    textDate: {
        fontSize: 18,
    },
    textPlace: {
        color: '#000',
        fontSize: 18,
    },
    textDuration: {
        color: '#000',
        fontSize: 18,
    },
    textTravelTime: {
        color: '#000',
        fontSize: 18,
    },
    ButtomTravel: {
        position: 'absolute',
        right: 0,
    },
    textButtomTravel: {
        textDecorationLine: 'underline',
    },
    imageBanner: {
        height: 200,
        width: '100%',
    },
    iconLike: {
        width: 26,
        height: 26,
    },
    linerDescription: {

    },
    textConstDescription: {
        color: '#000',
        fontSize: 18,
    },
    textDescription: {
        color: '#000',
        fontSize: 18,
    },
    linerButtonRegistr: {
        width: '100%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonRegistr: {
        backgroundColor: '#0060CC',
        width: '80%',
        height: 41,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    textConstButtonRegistr: {
        color: '#fff',
    }
});

export default IventScreen;

