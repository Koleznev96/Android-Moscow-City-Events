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
import {useHttp} from "../../hooks/http.hook";
import {Loader} from "../../components/Loader";
import GlobalStyle from "../../components/GlobalStyle";
import {httpServer, api_key} from '../../const';
import {SortContext} from "../../context/sortContext";

import {status} from "../../components/HeaderButton";

function TicketScreen({ route, navigation }) {
    const list_sort = useContext(SortContext);
    const {loading, request, error, clearError} = useHttp();
    const [ivent, setIvente] = useState(null);
    const { itemId } = route.params;
    const { statusSeting } = route.params;

    const getIvent = useCallback(async () => {
        try {
            const data = await request('/' + itemId, 'GET', null, {});
            setIvente(data);
        } catch (e) {}
    }, [request]);


    useEffect(() => {
        getIvent();
    }, [getIvent]);

    const onRegistrHandler = async (id) => {
        console.log("Добраться-", id);
    };

    return (
        <View style={styles.body}>
            {list_sort.listConveniences ? (
            <View style={styles.cartSeting}>
                    <Image
                    style={styles.cartSetingImg}
                    source={require('../../image/set.png')} 
                    />
            </View>
            ) : null}
            <ImageBackground 
            style={styles.imageBanner} 
            source={require('../../image/rectangle.png')}
            >
                <View style={styles.banerLiner}>
                    <View style={styles.banerLinerDate}>
                        <Text
                        style={[
                            GlobalStyle.CustomFontBold,
                            styles.textBilet,
                        ]}
                        >
                            Билет № 1234567890
                        </Text>

                        <Text
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textScan,
                        ]}
                        >
                            Отсканируйте QR-код при входе или покажите его контроллёру                        
                        </Text>
                    </View>
                    <Image
                    style={styles.scaner}
                    source={require('../../image/scan.png')} 
                    />
                </View>
                
                <Text
                style={[
                    GlobalStyle.CustomFontRegular,
                    styles.textCartVremy,
                ]}
                >
                    Начнется через 3 часа                    
                </Text>
            </ImageBackground>
            <ScrollView style={styles.scrollView}>
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
                        <View style={styles.socIconD}>
                            <Image style={styles.iconDate} source={require('../../image/date.png')} />
                        </View>

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
                        <View style={styles.socIconD}>
                            <Image style={styles.iconVremy} source={require('../../image/vremy.png')} />
                        </View>

                        <Text
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textDate,
                        ]}
                        >
                            {ivent && ivent.date_from.substring(11, ivent.date_from.length-3)}
                        </Text>
                    </View>

                    <View style={styles.iventDataItemLiner}>
                        <View style={styles.socIconD}>
                            <Image style={styles.iconPlace} source={require('../../image/place.png')} />
                        </View>

                        <Text
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textDate,
                        ]}
                        >
                            улица Вавилова, дом 57
                        </Text>
                    </View>

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
                            Как добраться?
                        </Text>
                    </Pressable>
                    
                    <View style={styles.socLinerIconCart}>
                        <Text
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textConstSoc,
                        ]}
                        >
                            Подпишитесь на соц.сети мероприятия, чтобы следить за обновлениями
                        </Text>

                        <View style={styles.socLiner}>
                            <View style={styles.socLinerIcon}>
                                <Image style={styles.socLinerItemVk} source={require('../../image/vk.png')} />
                            </View>
                            <View style={styles.socLinerIcon}>
                                <Image style={styles.socLinerItemFacebock} source={require('../../image/facebock.png')} />
                            </View>
                            <View style={styles.socLinerIcon}>
                                <Image style={styles.socLinerItem} source={require('../../image/telegram.png')} />
                            </View>
                            <View style={styles.socLinerIcon}>
                                <Image style={styles.socLinerItem} source={require('../../image/vk.png')} />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.linerButtonRegistr}>
                
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
        paddingRight: 16,
        paddingLeft: 16,
    },
    cartSeting: {
        width: '100%',
        height: 230,
        backgroundColor: '#fff',
        zIndex: 2,
    },
    cartSetingImg: {
        width: '100%',
        height: 230,
    },
    scrollView: {
        width: '100%',
    },
    imageBanner: {
        height: 200,
        width: '100%',
    },
    banerLiner: {
        marginLeft: 10,
        marginTop: 50,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    scaner: {
        position: 'absolute',
        right: 30,
        width: 100,
        height: 100,
        backgroundColor: '#767676',
    },
    textBilet: {
        color: '#fff',
        fontSize: 16,
    },
    textScan: {
        marginTop: 10,
        color: '#fff',
        width: '50%',
        fontSize: 14,
    },
    iventData: {
        width: '100%',
    },
    textName: {
        marginTop: 20,
        marginBottom: 20,
        fontSize: 17,
    },
    textDate: {
        fontSize: 16,
        marginLeft: 15,
    },
    textConstSoc: {
        fontSize: 14,
        marginTop: 20,
    },
    socLinerIconCart: {
        
    },
    socLiner: {
        marginTop: 5,
        width: '100%',
        flexDirection: 'row',
    },
    socLinerItemVk: {
        width: 24,
        height: 14,
    },
    socLinerItemFacebock: {
        width: 12,
        height: 24,
    },
    buttonRegistr: {
        backgroundColor: '#0060CC',
        width: 180,
        height: 41,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: 10,
    },
    textConstButtonRegistr: {
        color: '#fff',
        fontSize: 16,
    },
    textCartVremy: {
        width: 160,
        height: 22,
        backgroundColor: '#0060CC',
        borderRadius: 10,
        color: '#fff',
        fontSize: 12,
        paddingTop: 2,
        paddingLeft: 12,
        marginTop: 35,
        marginLeft: 10,
    },
    socLinerIcon: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    iventDataItemLiner: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    iconDate: {
        width: 18,
        height: 20,
    },
    iconVremy: {
        width: 20,
        height: 20,
    },
    iconPlace: {
        width: 14,
        height: 20,
        marginRight: 5,
    },
    socIconD: {
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default TicketScreen;

