async function getmatchdata() {
    // const url = "https://www.cricbuzz.com/cricket-match/live-scores";
    // const response = await fetch(url);
    // const data = await response.json();
    // console.log(data);
    // return data;
    //return await fetch("https://www.cricbuzz.com/cricket-match/live-scores").then((response) => response.json());
    return await fetch("https://api.cricapi.com/v1/currentMatches?apikey=c2ff199f-3183-4e28-ab3d-4124d2c8a616&offset=0")
        .then(data=>data.json())
        .then(data=>{
            if(data.status !="success") return;
            const matches=data.data;
            if(!matches) return [];
            const relevantData = matches
            .filter(match => match.series_id === "76ae85e2-88e5-4e99-83e4-5f352108aebc")
            .map(match => {
            const matchInfo = `${match.name}, ${match.status}, ${match.venue}`;
            const scoreInfo = match.score.map(score => `${score.r}/${score.w} in ${score.o} overs (${score.inning})`).join(', ');
            return `${matchInfo}, ${scoreInfo}`;
          });
            document.getElementById("mmatches").innerHTML = relevantData.map(match => `<li>${match}</li>`).join('');
            return relevantData;
        })
}
getmatchdata();