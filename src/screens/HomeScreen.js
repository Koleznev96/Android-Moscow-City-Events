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
  ImageBackground,
  AsyncStorage
} from 'react-native';
var {height, width } = Dimensions.get('window');
import Swiper from 'react-native-swiper';
import {useHttp} from "../hooks/http.hook";
import {Loader} from "../components/Loader";
import GlobalStyle from "../components/GlobalStyle";
import {httpServer, api_key} from '../const';
import Carousel from 'react-native-snap-carousel';
import { openDatabase } from 'react-native-sqlite-storage';
import {AuthContext} from "../context/authContext";

var db = openDatabase({ name: 'UserDatabase.db' });

function HomeScreen({ navigation }) {
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    const [topBanne, setTopBanne] = useState([]);
    const [forBanne, setForBanne] = useState([]);
    const [geolocationBanne, setGeolocationBanne] = useState([]);
    const [concert, setconcert] = useState([]);
    const [children, setchildren] = useState([]);
    const [musem, setmusem] = useState([]);
    const [date, setDate] = useState('">date_from":"2021-06-12","<date_to":"2021-06-19"');
    const [free_f, setFree] = useState(null);
    const [form, setForm] = useState({
        email: '', password: ''
    });

    const getTopList = useCallback(async (free=null, temp=null) => {
        try {
            if (free === null) free = '';
            const uri = '?page=1&expand=spheres&fields=id,title,label,image,date_from,date_to,kind,free&filter={">date_from":"2021-06-12","<date_to":"2021-06-19"' + free +'}';
            let data = await request(uri, 'GET', null, {});
            if(temp)
            for (let i=0; i < data.items.length; i++) {
                data.items[i].like = false;
                for (let k=0; k < temp.length; k++) {
                    if (data.items[i].id == temp[k]) {
                        data.items[i].like = true;
                    }
                }
            }
            setTopBanne(data.items);

            let uri_new = '?page=1&expand=spheres&fields=id,title,label,image,date_from,date_to,kind,free&filter={">date_from":"2021-06-12","<date_to":"2021-06-19","=ebs_agent_uid":"museum245"}';
            data = await request(uri_new, 'GET', null, {});
            setForBanne([data.items[1], data.items[2], data.items[3], data.items[4], data.items[5]]);

            uri_new = '?page=1&expand=spheres&fields=id,title,label,image,date_from,date_to,kind,free&filter={">date_from":"2021-06-12","<date_to":"2021-06-19","=ebs_agent_uid":"museum201"}';
            data = await request(uri_new, 'GET', null, {});
            setGeolocationBanne(data.items);

            uri_new = '?page=1&expand=spheres&fields=id,title,label,image,date_from,date_to,kind,free&filter={">date_from":"2021-06-12","<date_to":"2021-06-19","=ebs_agent_uid":"museum118"}';
            data = await request(uri_new, 'GET', null, {});
            setconcert(data.items);

            uri_new = '?page=1&expand=spheres&fields=id,title,label,image,date_from,date_to,kind,free&filter={">date_from":"2021-06-12","<date_to":"2021-06-19","=ebs_agent_uid":"museum117"}';
            data = await request(uri_new, 'GET', null, {});
            setchildren(data.items);

            uri_new = '?page=1&expand=spheres&fields=id,title,label,image,date_from,date_to,kind,free&filter={">date_from":"2021-06-12","<date_to":"2021-06-19","=ebs_agent_uid":"museum13"}';
            data = await request(uri_new, 'GET', null, {});
            setmusem(data.items);
        } catch (e) {
        }
    }, [request]);

    const getTopListFI = useCallback(async (free=null) => {
        console.log("auth-", auth.token)
        db.transaction((tx) => {
            tx.executeSql(
            'SELECT * FROM table_user',
            [],
            (tx, results) => {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i) {
                    if (results.rows.item(i).user_name == auth.token) {
                        temp.push(results.rows.item(i).like);
                    }                    
                }
                getTopList(null, temp);
            }
            );
        });
        if (topBanne.length === 0) {
            getTopList();
        }
    }, [request]);

    useEffect(() => {
        getTopListFI();
    }, [getTopListFI])

    const onPressHandler = async (id) => {
        console.log(id);
        navigation.navigate('event', {
            itemId: id,
        });
    };

    const onLikeHandler = (item) => {
        if (item.like) {
            db.transaction((tx) => {
                tx.executeSql(
                  'DELETE FROM  table_user where like=?',
                  [item.id]
                );
            });
            item.like = false;
            console.log("delete-like-", item.id);
        }
        else {
            db.transaction(function (tx) {
                tx.executeSql(
                  'INSERT INTO table_user (user_name, like) VALUES (?,?)',
                  [auth.token, item.id]
                );
            });
            item.like = true;
            console.log("add-like-", item.id);
        }
        // auth.login(auth.token)
        setTopBanne([...topBanne]);
    };

    const onSerchSpeakHandler = async () => {
        console.log("onSerchSpeakHandler");
    };

    const onFreeHandler = () => {
        console.log("onFreeHandler")
        setFree(',"=free":"1"');
        getTopList(',"=free":"1"');
        getForList(',"=free":"1"');
        getGeolocationList(',"=free":"1"');
    };

    const onPlatHandler = () => {
        console.log("onPlatHandler")
        setFree(',"=free":"0"');
        getTopList(',"=free":"0"');
        getForList(',"=free":"0"');
        getGeolocationList(',"=free":"0"');
    };

    const onMenuSaveHandler = () => {
        navigation.navigate('MyIvents');
    };
    const onMenuIventsHandler = () => {
        navigation.navigate('Ivents');
    };
    
    
    
    let renderItem = ({item, index}) => {
        return (
            <Pressable 
            key={index}
            style={styles.bannerItem} 
            resizeMode="contain"
            onPress={() => onPressHandler(item.id)}
            >
                <ImageBackground 
                style={styles.imageBanner} 
                source={{uri: "https://www.mos.ru" + item.image.small.src}}
                >
                    <Pressable 
                    onPress={() => onLikeHandler(item)}
                    style={styles.likeButton}
                    >   
                        {item.like ? (
                            <Image
                            style={styles.iconLike}
                            source={require('../image/likeActive.png')}
                            />
                        ) : (
                            <Image
                            style={styles.iconLike}
                            source={require('../image/like.png')}
                            />
                        )}
                        
                    </Pressable>
                </ImageBackground>
                <View style={styles.itemData}>

                    <Text 
                    style={[
                        GlobalStyle.CustomFontBold,
                        styles.textItemName,
                    ]}
                    >
                        {item.title}
                    </Text>

                    <Text 
                    style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textItemDate,
                    ]}
                    >
                        {item.date_from.substring(0, item.date_from.length-9)}
                    </Text>
                    
                    <View style={styles.itemDataLiner}>
                        <View style={styles.itemDataLinerKategore}>
                            <Text 
                            style={[
                                GlobalStyle.CustomFontRegular,
                                styles.textitemDataLinerKategore,
                            ]}
                            >
                                {item.free === 1 ? "Бесплатное" : "Платное"}
                            </Text>

                            <Text 
                            style={[
                                GlobalStyle.CustomFontRegular,
                                styles.textitemDataLinerKategore,
                            ]}
                            >
                                {/* {item.Cells.Name} */}
                                Категория
                            </Text>
                        </View>
                    </View>
                </View>
            </Pressable>
            // <Image style={styles.imageBanner} resizeMode="contain" source={{uri:itembann}}/>
        );
    }

    return (
        <View style={styles.body}>

                <View style={styles.glavMenu}>
                <ScrollView 
                contentOffset={{x: 70, y: 0}}
                horizontal={true}
                style={styles.scrollViewMenu}
                >
                <Pressable 
                onPress={() => onMenuIventsHandler()}
                >
                    <Text 
                    style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textMenuItem,
                    ]}
                    >
                        Все мероприятия
                    </Text>
                </Pressable>
                <Pressable 
                >
                    <Text 
                    style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textMenuItemActiv,
                    ]}
                    >
                        Мероприятия
                    </Text>
                </Pressable>
                <Pressable 
                onPress={() => onMenuSaveHandler()}
                >
                    <Text 
                    style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textMenuItem,
                    ]}
                    >
                        Мои события
                    </Text>
                </Pressable>
                <Pressable 
                >
                    <Text 
                    style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textMenuItem,
                    ]}
                    >
                        Календарь
                    </Text>
                </Pressable>
                </ScrollView>
                </View>
            

                <View style={styles.cartSearch}>
                    <View style={styles.cartSearchLiner}>
                        <TextInput
                        style={styles.input}
                        placeholder='Поиск мероприятий'
                        onChangeText={(value)=>setForm({email: value, password: form.password})}
                        />

                        <View style={styles.searchHr} />
                    </View>
                    {false ? (

                    
                    <View style={styles.cartSearchKategoreLiner}>
                        <FlatList
                        horizontal={true}
                        data={[
                            {text: 'Бесплатныое', type: "free"},
                            {text: 'Платное', type: "plat"},
                            {text: 'Dominic', type: "plat"},
                            {text: 'Jackson', type: "plat"},
                            {text: 'James', type: "plat"},
                            {text: 'Joel', type: "plat"},
                        ]}
                        renderItem={({item, index}) => 
                            <Pressable 
                            key={index}
                            onPress={() => {item.type === "free" ? onFreeHandler() : onPlatHandler()}}
                            >
                                <Text 
                                key={index}
                                style={[
                                    GlobalStyle.CustomFontRegular,
                                    styles.textitemDataLinerKategore,
                                ]}
                                >
                                    {/* {item.Cells.Name} */}
                                    {item.text}
                                </Text>
                            </Pressable>
                        }
                        />
                            
                    </View>
                    ): null}
                </View>
            <ScrollView style={styles.scrollView}>
                <Text
                style={[
                    GlobalStyle.CustomFontBold,
                    styles.textConstHeaderBanner,
                ]}
                >
                    Лучшее на этой неделе
                </Text>

                <Carousel
                layout={'default'}
                data={topBanne}
                renderItem={renderItem}
                sliderWidth={width}
                itemWidth={300}
                style={styles.mainBanner}
                />

                <Text
                style={[
                    GlobalStyle.CustomFontBold,
                    styles.textConstHeaderBanner,
                ]}
                >
                    Специально для вас
                </Text>

                <Carousel
                layout={'default'}
                data={forBanne}
                renderItem={renderItem}
                sliderWidth={width}
                itemWidth={300}
                style={styles.mainBanner}
                />

                <Text
                style={[
                    GlobalStyle.CustomFontBold,
                    styles.textConstHeaderBanner,
                ]}
                >
                    В вашем районе
                </Text>

                <Carousel
                layout={'default'}
                data={geolocationBanne}
                renderItem={renderItem}
                sliderWidth={width}
                itemWidth={300}
                />

                <Text
                style={[
                    GlobalStyle.CustomFontBold,
                    styles.textConstHeaderBanner,
                ]}
                >
                    Концерты
                </Text>

                <Carousel
                layout={'default'}
                data={concert}
                renderItem={renderItem}
                sliderWidth={width}
                itemWidth={300}
                />

                <Text
                style={[
                    GlobalStyle.CustomFontBold,
                    styles.textConstHeaderBanner,
                ]}
                >
                    С детьми
                </Text>

                <Carousel
                layout={'default'}
                data={children}
                renderItem={renderItem}
                sliderWidth={width}
                itemWidth={300}
                />

                <Text
                style={[
                    GlobalStyle.CustomFontBold,
                    styles.textConstHeaderBanner,
                ]}
                >
                    Музеи
                </Text>

                <Carousel
                layout={'default'}
                data={musem}
                renderItem={renderItem}
                sliderWidth={width}
                itemWidth={300}
                />
                
            </ScrollView>

            <Pressable 
            style={styles.buttonFilter}
            >
                <Image
                    style={styles.iconFilter}
                    source={require('../image/filter.png')}
                />
            </Pressable>
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
    scrollViewMenu: {
        height: 40,
    },
    glavMenu: {
        width: '100%',
        height: 60,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    textMenuItem: {
        color: '#888B8E',
        fontSize: 20,
        paddingLeft: 25,
        paddingTop: 5,

    },
    textMenuItemActiv: {
        color: '#0060CC',
        fontSize: 20,
        paddingLeft: 25,
        paddingTop: 5,
    },
    scrollView: {
        width: '100%',
    },
    mainBanner: {
        width: '100%',
    },
    textConstHeaderBanner: {
        marginHorizontal: 32,
        paddingTop: 10,
        paddingBottom: 10,
    },
    slide: {
        backgroundColor: 'red',
    },
    bannerItem: {
        width: 300,
        borderRadius:5,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    imageBanner: {
        height: 100,
        width: '100%',
        borderRadius: 5,
    },
    itemData: {
        width: '100%',
        paddingLeft: 16,
        paddingRight: 16,
        marginTop: 8,
    },
    textItemName: {
        color: '#000',
        fontSize: 14,
    },
    textItemDate: {
        color: '#5E5E5E',
        fontSize: 12,
        marginTop: 6,
    },
    itemDataLiner: {
        width: '100%',
        marginTop: 8,
        flexDirection: 'row',
        marginBottom: 10,
    },
    itemDataLinerKategore: {
        width: 250,
        flexDirection: 'row',
    },
    textitemDataLinerKategore: {
        paddingLeft: 11,
        paddingRight: 11,
        borderRadius: 10,
        marginRight: 10,
        color: '#17569E',
        height: 18,
        fontSize: 12,
        borderWidth: 1,
        borderColor: '#96B8EB',
    },
    itemDataLinerLike: {
        width: 50,
    },
    textName: {
        color: '#000',
        fontSize: 18,
    },
    item: {
        margin: 10,
        backgroundColor: '#4ae1fa',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#000',
        fontSize: 18,
        fontStyle: 'italic',
        margin: 10,
    },
    cartSearch: {
        width: '100%',
        paddingLeft: 16,
        paddingRight: 16,
    },
    input: {
        width: width,
        height: 40,
        paddingRight: 10,
    },
    searchHr: {
        backgroundColor: '#9D9D9D',
        width: '100%',
        height: 1,
    },
    cartSearchKategoreLiner: {
        marginTop: 10,
        marginBottom: 10,
        width: '100%',
        flexDirection: 'row',
    },
    inputMultiline: {
        width: 300,
        height: 100,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 20,
        paddingLeft: 10,
        paddingRight: 10,
    },
    headerLine: {
        width: '100%',
        height: 1,
        backgroundColor: '#E8E8E8'
    },
    main: {
        padding: 30,
        width: '100%',
        height: 80,
    },
    likeButton: {
        width: '100%',
        height: 50,
    },
    mainBannerLiner: {
        width: width, 
        alignItems:'center'
    },
    mainBannerLinerSwiper: {
        height: 150,
    },
    iconLike: {
        width: 26.67,
        height: 24.47,
        position: 'absolute',
        right: 15,
        top: 15,
    },
    iconSpeck: {
        width: 18,
        height: 18,
    },
    buttonFilter: {
        width: 50,
        height: 50,
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: '#fff',
        borderRadius: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        alignItems:'center',
        justifyContent: 'center',
    },
    iconFilter: {
        width: 24,
        height: 16,
    },
});

export default HomeScreen;

