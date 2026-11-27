import React, { useMemo, useState } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView, Image, Modal, Alert, StatusBar } from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";

const PURPLE = "#A855F7";
const DATA = [
  {id:"1",title:"Interestelar",type:"Filme",year:"2014",genre:"Ficção científica",description:"Uma equipe viaja além desta galáxia em busca de um novo lar para a humanidade.",url:"https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"},
  {id:"2",title:"Exemplo de série",type:"Série",year:"2025",genre:"Drama",description:"Cadastre seus próprios links de reprodução.",url:""},
  {id:"3",title:"Exemplo de anime",type:"Anime",year:"2024",genre:"Aventura",description:"Sua biblioteca de animes começa aqui.",url:""},
  {id:"4",title:"Exemplo de animação",type:"Animação",year:"2023",genre:"Família",description:"Organize desenhos e animações em um só lugar.",url:""}
];

function Player({url,onClose}) {
  const player = useVideoPlayer(url || null, p => { if(url) p.play(); });
  return <Modal visible animationType="slide" onRequestClose={onClose}>
    <SafeAreaView style={{flex:1,backgroundColor:"#09070D",justifyContent:"center"}}>
      <TouchableOpacity onPress={onClose} style={{padding:18}}><Text style={{color: PURPLE,fontSize:17}}>‹ Voltar</Text></TouchableOpacity>
      {url ? <VideoView player={player} style={{width:"100%",height:260}} allowsFullscreen allowsPictureInPicture /> :
        <Text style={{color:"#fff",textAlign:"center",padding:25}}>Este título ainda não possui um link de vídeo cadastrado.</Text>}
    </SafeAreaView>
  </Modal>;
}

export default function App() {
  const [items,setItems] = useState(DATA);
  const [tab,setTab] = useState("Início");
  const [query,setQuery] = useState("");
  const [favorites,setFavorites] = useState([]);
  const [selected,setSelected] = useState(null);
  const [form,setForm] = useState(false);
  const [draft,setDraft] = useState({title:"",type:"Filme",year:"",genre:"",description:"",url:""});
  const categories = ["Filme","Série","Anime","Animação"];
  const shown = useMemo(() => items.filter(x =>
    (tab==="Início" || tab==="Favoritos" ? true : x.type===tab) &&
    (tab!=="Favoritos" || favorites.includes(x.id)) &&
    (x.title.toLowerCase().includes(query.toLowerCase()) || x.genre.toLowerCase().includes(query.toLowerCase()))
  ),[items,tab,query,favorites]);

  const add = () => {
    if(!draft.title.trim()) return Alert.alert("Falta o título","Informe o nome do conteúdo.");
    setItems(old=>[{...draft,id:String(Date.now())},...old]);
    setDraft({title:"",type:"Filme",year:"",genre:"",description:"",url:""});
    setForm(false);
    setTab("Início");
  };
  const toggleFav = id => setFavorites(old=>old.includes(id)?old.filter(x=>x!==id):[...old,id]);

  return <SafeAreaView style={{flex:1,backgroundColor:"#09070D"}}>
    <StatusBar barStyle="light-content" backgroundColor="#09070D"/>
    <View style={{paddingHorizontal:18,paddingTop:10,paddingBottom:12,flexDirection:"row",alignItems:"center",gap:12}}>
      <Image source={require("./assets/logo.png")} style={{width:48,height:48,borderRadius:14}} />
      <View style={{flex:1}}><Text style={{color:"#fff",fontSize:25,fontWeight:"900"}}>NeGoP<Text style={{color:PURPLE}}>LAy</Text></Text><Text style={{color:"#9B91A8",fontSize:11}}>SEU UNIVERSO DE ENTRETENIMENTO</Text></View>
      <TouchableOpacity onPress={()=>setForm(true)} style={{backgroundColor:"#241333",padding:12,borderRadius:13}}><Text style={{color:"#fff",fontSize:20}}>＋</Text></TouchableOpacity>
    </View>
    <View style={{paddingHorizontal:16,paddingBottom:12}}>
      <TextInput value={query} onChangeText={setQuery} placeholder="Buscar filmes, séries, animes..." placeholderTextColor="#81778B"
        style={{backgroundColor:"#17121E",color:"#fff",borderWidth:1,borderColor:"#352344",borderRadius:14,padding:14}}/>
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{maxHeight:48,paddingLeft:12}}>
      {["Início",...categories,"Favoritos"].map(t=><TouchableOpacity key={t} onPress={()=>setTab(t)} style={{paddingHorizontal:15,paddingVertical:10,marginRight:6,borderRadius:20,backgroundColor:tab===t?"#6D28D9":"#17121E"}}>
        <Text style={{color:"#fff",fontWeight:tab===t?"700":"500"}}>{t==="Filme"?"Filmes":t==="Série"?"Séries":t==="Anime"?"Animes":t}</Text>
      </TouchableOpacity>)}
    </ScrollView>
    <ScrollView contentContainerStyle={{padding:16,paddingBottom:35}}>
      {tab==="Início" && <View style={{backgroundColor:"#21132F",borderRadius:20,padding:20,marginBottom:18,borderWidth:1,borderColor:"#49266B"}}>
        <Text style={{color:"#C084FC",fontWeight:"800",letterSpacing:1}}>BEM-VINDO AO NEGOPLAY</Text>
        <Text style={{color:"#fff",fontSize:23,fontWeight:"900",marginTop:8}}>Sua biblioteca. Suas escolhas.</Text>
        <Text style={{color:"#C8B8D8",marginTop:6}}>Adicione títulos e seus links de reprodução.</Text>
      </View>}
      <Text style={{color:"#fff",fontSize:20,fontWeight:"800",marginBottom:12}}>{tab==="Início"?"Sua biblioteca":tab}</Text>
      <View style={{flexDirection:"row",flexWrap:"wrap",justifyContent:"space-between"}}>
        {shown.map(item=><TouchableOpacity key={item.id} onPress={()=>setSelected(item)} style={{width:"48%",backgroundColor:"#17121E",borderRadius:16,marginBottom:14,overflow:"hidden",borderWidth:1,borderColor:"#30233B"}}>
          <View style={{height:125,backgroundColor:"#29183A",alignItems:"center",justifyContent:"center"}}>
            <Text style={{fontSize:34,color:"#C084FC"}}>▶</Text><Text style={{color:"#BDA9CE",fontSize:11,marginTop:5}}>{item.type.toUpperCase()}</Text>
          </View>
          <View style={{padding:11}}>
            <Text numberOfLines={1} style={{color:"#fff",fontWeight:"800",fontSize:15}}>{item.title}</Text>
            <Text style={{color:"#A99BB5",fontSize:12,marginTop:4}}>{item.year} · {item.genre || "Sem gênero"}</Text>
            <TouchableOpacity onPress={()=>toggleFav(item.id)} style={{marginTop:9}}><Text style={{color:PURPLE}}>{favorites.includes(item.id)?"★ Favorito":"☆ Favoritar"}</Text></TouchableOpacity>
          </View>
        </TouchableOpacity>)}
      </View>
      {shown.length===0 && <Text style={{color:"#A99BB5",paddingVertical:30,textAlign:"center"}}>Nenhum título encontrado.</Text>}
    </ScrollView>
    <View style={{flexDirection:"row",justifyContent:"space-around",padding:13,borderTopWidth:1,borderColor:"#2B2034",backgroundColor:"#100C15"}}>
      {["Início","Favoritos"].map(t=><TouchableOpacity key={t} onPress={()=>setTab(t)}><Text style={{color:tab===t?PURPLE:"#A99BB5",fontWeight:"700"}}>{t==="Início"?"⌂ Início":"★ Favoritos"}</Text></TouchableOpacity>)}
      <TouchableOpacity onPress={()=>setForm(true)}><Text style={{color:"#A99BB5",fontWeight:"700"}}>＋ Adicionar</Text></TouchableOpacity>
    </View>
    <Modal visible={!!selected} animationType="slide" transparent onRequestClose={()=>setSelected(null)}>
      <View style={{flex:1,backgroundColor:"#000B",justifyContent:"flex-end"}}>
        <View style={{backgroundColor:"#17121E",padding:22,borderTopLeftRadius:24,borderTopRightRadius:24}}>
          <Text style={{color:PURPLE,fontWeight:"800"}}>{selected?.type}</Text>
          <Text style={{color:"#fff",fontSize:24,fontWeight:"900",marginTop:5}}>{selected?.title}</Text>
          <Text style={{color:"#B9AFC2",marginTop:9}}>{selected?.year} · {selected?.genre}</Text>
          <Text style={{color:"#E4DDEB",marginVertical:15}}>{selected?.description}</Text>
          <TouchableOpacity onPress={()=>{const s=selected;setSelected(null);setTimeout(()=>setSelected({...s,play:true}),150);}} style={{backgroundColor:"#7C3AED",padding:15,borderRadius:13,alignItems:"center"}}><Text style={{color:"#fff",fontWeight:"900"}}>▶  ASSISTIR</Text></TouchableOpacity>
          <TouchableOpacity onPress={()=>toggleFav(selected.id)} style={{padding:14,alignItems:"center"}}><Text style={{color:PURPLE}}>☆ Adicionar/remover dos favoritos</Text></TouchableOpacity>
          <TouchableOpacity onPress={()=>setSelected(null)} style={{padding:10,alignItems:"center"}}><Text style={{color:"#A99BB5"}}>Fechar</Text></TouchableOpacity>
        </View>
      </View>
    </Modal>
    <Modal visible={form} animationType="slide" onRequestClose={()=>setForm(false)}>
      <SafeAreaView style={{flex:1,backgroundColor:"#09070D",padding:18}}>
        <Text style={{color:"#fff",fontSize:24,fontWeight:"900",marginVertical:16}}>Adicionar conteúdo</Text>
        {[
          ["title","Título"],["year","Ano"],["genre","Gênero"],["description","Sinopse"],["url","Link direto de vídeo (MP4/HLS)"]
        ].map(([k,label])=><TextInput key={k} value={draft[k]} onChangeText={v=>setDraft(d=>({...d,[k]:v}))} placeholder={label} placeholderTextColor="#81778B" multiline={k==="description"} autoCapitalize="none"
          style={{backgroundColor:"#17121E",color:"#fff",borderWidth:1,borderColor:"#352344",borderRadius:12,padding:13,marginBottom:10,minHeight:k==="description"?70:48}}/>)}
        <Text style={{color:"#BDA9CE",marginBottom:8}}>Categoria</Text>
        <View style={{flexDirection:"row",flexWrap:"wrap",gap:8,marginBottom:18}}>{categories.map(c=><TouchableOpacity key={c} onPress={()=>setDraft(d=>({...d,type:c}))} style={{backgroundColor:draft.type===c?"#6D28D9":"#241B2B",padding:10,borderRadius:10}}><Text style={{color:"#fff"}}>{c}</Text></TouchableOpacity>)}</View>
        <TouchableOpacity onPress={add} style={{backgroundColor:"#7C3AED",padding:15,borderRadius:13,alignItems:"center"}}><Text style={{color:"#fff",fontWeight:"900"}}>SALVAR NA BIBLIOTECA</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>setForm(false)} style={{padding:15,alignItems:"center"}}><Text style={{color:"#A99BB5"}}>Cancelar</Text></TouchableOpacity>
      </SafeAreaView>
    </Modal>
    {selected?.play && <Player url={selected.url} onClose={()=>setSelected(null)}/>}
  </SafeAreaView>;
}
