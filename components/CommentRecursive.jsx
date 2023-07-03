import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button , ActivityIndicator ,ScrollView } from 'react-native';
import RenderHtml from "react-native-render-html";

export default function CommentRecursive({html , replies}) {
    const src={
        html:`
            ${html}
        `
    }

    console.log(replies)

    return (
        <View style={{paddingLeft:50}}>
            <RenderHtml
                source={src}
            />

            {
                replies?.map((reply,i)=>{
                    return(
                      <CommentRecursive key={i} replies={reply.children} html={reply.body_html}></CommentRecursive>
                    )
                })
            }
        </View>
    );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    // alignItems:"center",
    // border:"1px solid red"
  },
});