import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator, ScrollView, Image } from 'react-native';
import { Card } from 'react-native-paper';
import RenderHtml from "react-native-render-html";

export default function CommentRecursive({html , replies , user}) {
    const src={
        html:`
            ${html}
        `
    }

    // console.log(user)

    return (
        <Card style={{paddingLeft:10}}>

            <View>
                <View style={styles.profile}>
                    <Card.Cover
                        source={{uri:user?.profile_image}}
                        style={styles.profileImg}
                    />
                    <Text>{user?.name}</Text>
                </View>
                <RenderHtml
                    source={src}
                />
            </View>

            {
                replies?.map((reply,i)=>{
                    return(
                      <CommentRecursive key={i} user={reply.user} replies={reply.children} html={reply.body_html}></CommentRecursive>
                    )
                })
            }
        </Card>
    );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    // alignItems:"center",
    // border:"1px solid red"
  },
  card:{

  },
  profile:{
    // border:"1px solid blue",
    alignItems:"center",
    flexDirection:"row"
  },
  profileImg:{
    width:50,
    height:50,
    resizeMode:"cover",
    borderRadius:400/2
  }
});