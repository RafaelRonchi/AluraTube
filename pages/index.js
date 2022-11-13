import config from "../config.json";
import styled from "styled-components";
import React from "react";
import Menu from "../src/components/Menu";

import { StyledTimeline } from "../src/Timeline";
import { StyledFavorites } from "../src/components/Favoritos"

function HomePage() {
    
    const [valorDoFiltro, setValordoFiltro] = React.useState("");


    //console.log(config.playlists);
    

    return (
        <> 
            <div style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    // backgroundColor: "red",
                }}>
                        <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValordoFiltro} />
                        <Header />
                        <Timeline searchValue={valorDoFiltro} playlists={config.playlists}>
                            Conteúdo
                        </Timeline>
                        <Favorites favs={config.favorites}/>
     
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

    
    background-color: ${({ theme }) => theme.backgroundLevel1};

        img {
          width: 81px;
          height: 80px;
          border-radius: 50%;
        }

        .user-info {
            margin-top: 10px;
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
            <img src={config.banner} alt="Arvore" className="Banner"/>
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

    
function Timeline({searchValue, ...props}){
    const playlistNames = Object.keys(props.playlists);
    
    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = props.playlists[playlistName];
                console.log(playlistName);
                console.log(videos);
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                        {videos
                                .filter((video) => {
                                    const titleNormalized = video.title.toLowerCase();
                                    const searchValueNormalized = searchValue.toLowerCase();
                                    return titleNormalized.includes(searchValueNormalized)
                                })
                                .map((video) => {
                                    return (
                                        <a key={video.url} href={video.url}>
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

function Favorites(props) {
    const favorites = Object.keys(props.favs);
    return (
        <StyledFavorites>
        <div>
            {favorites.map((favoritesUser)=>{
                const favUsers = props.favs[favoritesUser];
                //console.log(favoritesUser);
                return (
                    <section>
                            <h2>{favoritesUser}</h2>
                            <div>
                                {favUsers
                                .map((fav) => {
                                    return (
                                        <a key={fav.git} href={fav.git}> 
                                            <img src={fav.img} />
                                            <span>
                                                {fav.name}
                                            </span>
                                        </a>
                                    )
                                })}
                            </div>

                    </section>
                )
            })}
        </div>

        </StyledFavorites>
    )
 }