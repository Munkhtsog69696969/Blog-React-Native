import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Avatar, Card } from 'react-native-paper';

export default function HomeScreen({navigation}) {
    const theme=useTheme();
    const [articles,setArticles]=useState();

    useEffect(()=>{
        fetch("https://dev.to/api/articles")
            .then(res=>res.json())
            .then(data=>setArticles(data))
            .catch(err=>console.log(err))
    },[]);

    // console.log(articles)

    return (
        <ScrollView>
            <View style={styles.container}>
                {
                    articles?.map((article,i)=>{
                        return(
                            <Card style={styles.card} key={i}>
                                <View style={styles.profile}>
                                    <Card.Cover style={styles.profileImg} source={{uri:article?.user.profile_image}}/>
                                    <Card.Content>
                                        <Text style={{color:"white"}}>{article.user.name}</Text>
                                    </Card.Content>
                                </View>

                                <Card.Title title={article.title}/>

                                <Card.Cover style={styles.cardImg} source={{uri:article?.cover_image}}/>

                                <Card.Content>
                                    <Text style={{color:"white"}}>{article.description}</Text>
                                </Card.Content>

                                <Button
                                    title='See comments'
                                    onPress={()=>navigation.navigate("Comments",{
                                        id:article.id,
                                    })}
                                />
                            </Card>
                        )
                    })
                }
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"white",
        alignItems: 'center',
        // justifyContent: 'center',
    },
    card:{
        padding:20,
        margin:10,
        width:"80%",
    },
    cardImg:{
        width:"100%",
        height:300,
        resizeMode:"cover"
    },
    profile:{
        flex:1,
        flexDirection:"row",
        alignItems:"center"
    },
    profileImg:{
        width:50,
        height:50,
        resizeMode:"cover",
        borderRadius:400/2
    }
});