import { StyledRegisterVideo } from "./styles";
import React from "react";
import { createClient } from "@supabase/supabase-js";

function useForm(propsdoForm) {
    const [values, setValues] = React.useState(propsdoForm.initialValues);

    return {
        values, 
        handleChange: (evento) => {
                const value = evento.target.value;
                const name =evento.target.name
                setValues({
                    ...values,
                    [name]: value,
                });
        },
        clearForm() {
            setValues({});
        }
    };
}

const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inltandrand4dnRyY2l6emxvb2pzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzODM1OTksImV4cCI6MTk4Mzk1OTU5OX0.YgR4HTtt6hM0mRigBGeYt-bn5mR1Z3_IM1_XoCyl3fI"
const PROJECT_URL = "https://ymjwkjwxvtrcizzloojs.supabase.co";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

function getThumbnail(url) {
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}


export default function RegisterVideo(){
    const formCadastro = useForm({
        initialValues: {titulo: "Conheça o canal da ALura!", url: "https://youtu.be/94yuIVdoevc"}
    });
    
    const [formVisivel, setFormVisivel] = React.useState(false);
    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={()=>setFormVisivel(true)}>
                +
            </button>
            {formVisivel
            ?(
                <form onSubmit={(evento) => {
                    evento.preventDefault();

                    supabase.from("video").insert({
                        title: formCadastro.values.titulo,
                        url: formCadastro.values.url,
                        thumb: getThumbnail(formCadastro.values.url),
                        playlist: "jogos",
                    })
                    .then((oqueveio) => {
                        console.log(oqueveio);
                     })
                     .catch((err) => {
                        console.log(err);
                     })

                    setFormVisivel(false);
                    formCadastro.clearForm();
                }}>
                    <div>
                    <button type="button" className="close-modal" onClick={()=>setFormVisivel(false)}>
                        X
                    </button>
                    <input 
                        placeholder="Titulo do video" 
                        name="titulo"
                        value={formCadastro.values.titulo} 
                        onChange={formCadastro.handleChange}
                    />
                    <input 
                        placeholder="URL" 
                        name="url"
                        value={formCadastro.values.url}
                        onChange={formCadastro.handleChange}
                    />

                    <button type="Submit">
                    Cadastrar
                    </button>
                    </div> 
                </form>
            )
        :null}
        </StyledRegisterVideo>
    )
}