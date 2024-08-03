const clientID = 'da62e5b1d4ff4defb5d811992c1f23f4';
const redirectUri="https://main--spotify-react-project.netlify.app/";
//http://localhost:3000/
let accessToken;

const Spotify={
    getAccessToken(){
        if(accessToken){
            alert("Access Token Granted Already");
            return accessToken;
        }
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expireInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if(accessTokenMatch && expireInMatch){
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expireInMatch[1]);

            window.setTimeout(()=>(
                accessToken=""
            ),expiresIn*1000);

            window.history.pushState("Access Token",null,"/");
            alert("Access Token Granted");
            return accessToken;
        }else{
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
            //alert("Access Url Granted");
        }
    },

    search(term){
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
        }).then(response=>{
            alert("Search first response");
            return response.json();
        }).then(jsonResponse=>{
            alert("Search second response");
            if(!jsonResponse.tracks){
                alert("Search empty");
                return [];
            }
            alert("Search success");
            return jsonResponse.tracks.items.map(track=>({
                id:track.id,
                name:track.name,
                artist:track.artists[0].name,
                album:track.album.name,
                uri:track.uri
            }));
        });
    },
    savePlaylist(name,trackUris){
        if(!name || !trackUris.length){
            alert("Empty inputs");
            return;
        }
        const accessToken = Spotify.getAccessToken();
        const headers = {Authorization:`Bearer ${accessToken}`}
        let userID;

        alert("Starting...");

        return fetch("https://api.spotify.com/v1/me",{headers:headers})
        .then(response=>{
            alert("Save first response");
            return response.json();
        }).then(jsonResponse=>{
            alert("Save second response");
            userID = jsonResponse.id;

            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,{
                headers:headers,
                method:"POST",
                body:JSON.stringify({name:name})
            }).then(response=>{
                alert("Save Name first response");
                return response.json();
            }).then(jsonResponse=>{
                alert("Save name second response");
                const playlistID = jsonResponse.id;
                alert("Save Playlist");
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,{
                    headers:headers,
                    method:"POST",
                    body:JSON.stringify({uris:trackUris})
                });
            });
        });
    }
};

export default Spotify;
