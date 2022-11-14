import React from "react";
import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu";

import { videoService } from "../src/services/videoService";
import { StyledTimeline } from "../src/components/Timeline";



function HomePage() {
    const service = videoService();
    const [valorDoFiltro, setValordoFiltro] = React.useState("");
    const [playlists, setPlaylists] = React.useState({ jogos: [] });
    //    const playlists = {
    //      "jogos": []
    //};

    React.useEffect(() => {
        console.log("useEffect");
        service
            .getAllVideos()
            .then((dados) => {
                console.log(dados.data);
                // Forma imutavel
                const novasPlaylists = {};
                dados.data.forEach((video) => {
                    if (!novasPlaylists[video.playlist]) novasPlaylists[video.playlist] = [];
                    novasPlaylists[video.playlist] = [
                        video,
                        ...novasPlaylists[video.playlist],
                    ];
                });

                setPlaylists(novasPlaylists);
            });
    }, []);




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
                <Timeline searchValue={valorDoFiltro} playlists={config.playlists} favoritos={config.favorites}>
                    Conteúdo
                </Timeline>

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
function Header() {
    return (
        <StyledHeader>
            <img src={config.banner} alt="Arvore" className="Banner" />
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


function Timeline({ searchValue, ...props }) {
    const playlistNames = Object.keys(props.playlists);
    const favoritosNames = Object.keys(props.favoritos);

    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = props.playlists[playlistName];
                //console.log(playlistName);
                //console.log(videos);
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
            {favoritosNames.map((favoritosName) => {
                const favoritos = props.favoritos[favoritosName];
                return (
                    <section key={favoritosName}>
                        <h2>{favoritosName}</h2>
                        <div className="favoritos">
                            {favoritos
                                .map((favorito) => {
                                    return (
                                        <a
                                            key={favorito.name}
                                            className="favorito-container"
                                            href={favorito.url}
                                            target="_blank" rel="noreferrer"
                                        >
                                            <img
                                                className="favorito-img"
                                                src={`https://github.com/${favorito.github}.png`}
                                            />
                                            <span className="favorito-text">{favorito.name}</span>
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