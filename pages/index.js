import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/Timeline";
import { StyledFavorits } from "../src/components/Favoritos"

function HomePage() {
    //const mensagemPagina = "AluraTube";
    const estiloHomePage = {
        //backgroundColor: "red"
    };

    //console.log(config.playlists);

    return (
        <> 
            <CSSReset />
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    // backgroundColor: "red",
                }}>
                        <Menu banner={config.banner} />
                        <Header />
                        <Timeline playlists={config.playlists} >
                            Conteúdo
                        </Timeline>
                        <Favoritos />
     
            </div>
     </>
    );
};
 
export default HomePage

//  function Menu(){
//     return (
//        <div> 
//             Menu
//        </div>
//    )
//}  

const StyledHeader = styled.div`
        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
        }

        .user-info {
            margin-top: 50px;
            display: flex;
            align-items: center;
            width: 100%;
            padding: 16px 32px;
            gap: 16px;
        }
        .Banner{
      width: 100%;
      height: 350px;
      left: 0px;
      top: 46px;
      border-radius: 0%;
      object-fit: cover;
    }
  
`;
function Header(){
        return (
        <StyledHeader>
             <img src={config.banner} alt="Mão psicodelica" className="Banner"/>

                <section className="user-info">   
                    <img src={`https://github.com/${config.github}.png`} />
                    <div> 
                        <h2>
                            {config["name:"]}
                        </h2>
                        <p>
                            {config.job}
                       </p>
                    </div> 
                </section>
        </StyledHeader>
     )
}

    
function Timeline(props){
    const playlistNames = Object.keys(props.playlists);
    
    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = props.playlists[playlistName];
                console.log(playlistName);
                console.log(videos);
                return (
                    <section>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.map((video) => {
                                return (
                                    <a href={video.url}>
                                        <img src={video.thumb} />
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
    }
function Favoritos(){
    return(
        <StyledFavorits>
            <section>
                <h2> 
                    Favoritos
                </h2>
                <div>
                    {config.Favoritos.map((youtuber) => {
                        return (
                            <a key={youtuber.url} href={youtuber.url}>
                                <img src={youtuber.img} />
                                <span>
                                     {youtuber.nome}
                                </span> 
                            </a>
                        )
                    }
                    
                    )}
                </div>
            </section>
        </StyledFavorits>
    )

}