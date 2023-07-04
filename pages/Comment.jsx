import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button , ActivityIndicator ,ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import RenderHtml from "react-native-render-html";

import CommentRecursive from '../components/CommentRecursive';

export default function CommentScreen({ route, navigation }) {
  const {id}=route.params;

  const [loading,setLoading]=useState(true);
  const [commentLoading,setCommentLoading]=useState(true)

  const [article,setArticle]=useState();
  const [comments,setComments]=useState();

  useEffect(()=>{
    fetch(`https://dev.to/api/articles/${id}`)
      .then(res=>res.json())
      .then(data=>{
        setArticle(data);
        setLoading(false);
      })
      .catch(err=>console.log(err))

    fetch(`https://dev.to/api/comments?a_id=${id}?sort=-created_at`)
      .then((res) => res.json())
      .then(data=>{
        setComments(data)
        setCommentLoading(false);
      })
      .catch((err)=>console.log(err))
  },[id]);

  // console.log(comments)

  return (
    <View style={styles.container}>
      {
        loading ? 

        <ActivityIndicator size="large"/>

        :

        <View style={styles.container}>
          <ScrollView>
            <Card style={styles.card}>
                <View style={styles.profile}>
                  <Card.Cover style={styles.profileImg} source={{uri:article.user.profile_image}}/>
                  <Card.Content>
                    <Text>{article.user.name}</Text>
                  </Card.Content>
                </View>
                <Card.Title title={article.title} />
                <Card.Cover style={styles.img} source={{uri:article?.cover_image}}/>
                <Card.Content>
                  <Text>{article.description}</Text>
                </Card.Content>
            </Card>

            <View style={styles.commentsContainer}>
              <Text style={{fontSize:30 , fontWeight:600}}>Comments</Text>
                {
                  commentLoading ? 

                  <ActivityIndicator size="large"/>

                  :

                  comments?.map((comment,i)=>{
                    return(
                      <CommentRecursive key={i} user={comment.user} replies={comment.children} html={comment.body_html}></CommentRecursive>
                    )
                  })
                }
            </View>
          </ScrollView>
        </View>
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
  loader:{
    fontSize:200
  },
  card:{
    width:"100%",
    padding:20
    // justifyContent:"center"
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
  },
  img:{
    width:"100%",
    height:300,
    resizeMode:"cover"
  },
  commentsContainer:{
    // border:"10px solid red",
    flex:1,
    padding:10,
  }
});