import { useState } from 'react'
import ChatbotIcon from "./components/ChatbotIcon.jsx"

import ChatForm from './components/ChatForm.jsx'
import ChatMessage from './components/ChatMessage.jsx'

import { suggestSongByMood } from './components/LocalAIModel.jsx';

function App() {

  const [chatHistory,setChatHistory]=useState([])

  //kendi üreteceğimiz yapay zeka modelinde generateBotResponse metodunun içerikleri değişecek


  //generateBotResponse, for API based AI
  // const generateBotResponse=async (history)=>{

  //   //updateHistory is a function that updates chat history
  //   const updateHistory=(text)=>{
  //     setChatHistory(prev=>[...prev.filter(msg => msg.text !== "Thinking..."), { role: "model", text }])
  //   }
  //   //Format chat history for API request

  //   history=history.map(({role,text})=>({role, parts:[{text}]}));

  //   const requestOptions={
  //     method:"POST",
  //     headers:{"Content-Type":"application/json"},
  //     body:JSON.stringify({contents:history})
  //   }

  //   try{
  //     //Make the API call to get the bot's response

  //     const response=await fetch(import.meta.env.VITE_API_URL,requestOptions);   
  //     const data= await response.json();
  //     if(!response.ok) throw new Error(data.error.message||"Something went wrong!")

  //     //clean and update chat history with bot's response
  //     const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
  //     updateHistory(apiResponseText);
  //   }catch(error){
  //     console.log(error)
  //   }
  // }



  //generateBotResponse, kendi yaptığımız AI modeli ile
  
  
  const generateBotResponse = async (history) => {
      // Önce "Thinking..." mesajını ekle
      setChatHistory(prev => [...prev, { role: "model", text: "Thinking..." }]);
      
      // Kullanıcının son mesajını al
      const lastUserMessage = history[history.length - 1].text;
      console.log("Son kullanıcı mesajı:", lastUserMessage); // Debug
      
      // Bot yanıtını oluştur

      
      const botReply = suggestSongByMood(lastUserMessage);
      console.log("Bot yanıtı:", botReply); // Debug
      
      // "Thinking..." mesajını kaldırıp gerçek yanıtı ekle
      setTimeout(()=>{
        
      })
      setChatHistory(prev => [
          ...prev.filter(msg => msg.text !== "Thinking..."), 
          { role: "model", text: botReply }
      ]);
  };

  return (
    <div className="container">
      <div className="chatbot-popup">
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon/>
            <h2 className="logo-text">Chatbot</h2>
          </div>
          
        </div>
        <div className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon/>
            <p className="message-text">
              Hey there 👋🏻 <br/> How can I help you today?
            </p>
          </div>
          {chatHistory.map((chat,index)=>{
            return <ChatMessage key={index} chat={chat}/>
          })}
          

          {/* Chatbot footer */}
          <div className="chat-footer">
            <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App


/* 
const apiResponseText = data?.candidates?.[0]?.content?.parts?.[0]?.text.replace(/\*\*(.*?)\*\*/ /*g, "$1").trim();
*/

/* 
data = await response.json() Açıklaması:

data = await response.json() satırı, bir API isteği sonrasında alınan response nesnesinin gövdesini (body) JSON formatından JavaScript nesnesine dönüştüren asenkron bir işlemdir. 
Yani, sunucudan gelen JSON verisi, JavaScript'in anlayabileceği bir nesne yapısına çevrilir ve data değişkenine atanır.


candidates, content, parts, text Özellikleri ve Neden Kullanıldıkları:

candidates (Adaylar):
Ne olabilir? Bir API isteğine karşılık olarak sunulan olası yanıtların bir dizisidir. Yapay zeka modelleri, en iyi sonucu üretmek için birden fazla "aday" çıktı üretebilir. Bu dizi, bu aday çıktılarını içerir.
Neden [0] kullanıyoruz? Genellikle, uygulamanız yalnızca en iyi veya ilk adayla ilgilenir. Bu nedenle [0] ile dizinin ilk elemanına (ilk adaya) erişilir. API'nin yalnızca bir aday döndürdüğü veya varsayılan olarak ilk adayın kullanıldığı senaryolarda bu yaygındır.




content (İçerik):
Ne olabilir? Seçilen adayın (candidate) asıl içeriğini barındıran bir nesnedir. Bu nesne, metin, resim, video gibi farklı türlerdeki içeriği temsil edebilir.
Neden kullanıyoruz? Üretken yapay zeka API'leri sadece metin değil, farklı modalitelerde içerik üretebilir. content özelliği, bu içeriğe erişmek için bir ara katman sağlar.



parts (Parçalar):
Ne olabilir? content içindeki içeriğin birden fazla parçaya ayrılmış olabileceği bir dizidir. Örneğin, bir metin yanıtı farklı bölümler halinde veya farklı modalitelerdeki (metin ve görsel gibi) içerikler ayrı ayrı parçalar halinde sunulabilir.
Neden [0] kullanıyoruz? Uygulamanızın genellikle yanıtın ilk metin parçasını beklediği veya işlediği senaryolarda kullanılır. Eğer API birden fazla metin parçası döndürüyorsa, uygulamanızın ihtiyacına göre farklı indekslere erişmeniz gerekebilir.



text (Metin):
Ne olabilir? İlgilenilen asıl metin içeriğini barındıran özelliktir. parts dizisinin bir elemanı genellikle farklı türde içerik taşıyabilir (örneğin, metin veya görsel bilgisi). text özelliği, bu parça bir metin ise, o metnin değerini içerir.
Neden kullanıyoruz? Uygulamanızın amacı, API'den üretilen metin yanıtını işlemek veya görüntülemek olduğunda bu özelliğe erişilir.


Özetle, 
Bu karmaşık erişim zinciri (data?.candidates?.[0]?.content?.parts?.[0]?.text), kullandığınız API'nin belirli bir yapıya sahip olduğunu ve uygulamanızın bu yapı içindeki ilk adayın, ilk içeriğinin, ilk parçasının metin içeriğiyle ilgilendiğini gösterir.

Güvenli erişim için kullanılan ?. (optional chaining) operatörleri, bu ara özelliklerden herhangi birinin null veya undefined olması durumunda hatayı önler ve zincirin erken sonlanmasını sağlar.
*/