// export const songs: song[] = [
//     {
//         "title": "Playboi carti - Stop Breating",
//         "url": "./audio/Playboi Carti - Stop Breathing.mp3"
//     },
//     {
//         "title": "Drake - Forever",
//         "url": "https://cdnstore.xyz/download.php?zc_tid=0&id=76041&url=drake-forever&title=Rm9yZXZlcg==&artist=RHJha2U=&method=load",
//     },
//     {
//         "title": "Lil Uzi Vert_-_Cigarette",
//         "url": "./audio/Lil_Uzi_Vert_-_Cigarette.mp3"
//     },
//     {
//         "title": "Lil uzi vert - Watch this (Arizonatears Pluggnb Remix)",
//         "url": "./audio/Lil uzi vert - Watch this (Arizonatears Pluggnb Remix).mp3"
//     },
// ];

export const songs: song[] = [
    {
        poster: "https://upload.wikimedia.org/wikipedia/en/0/01/Drake-Forever.jpg",
        artists: ["Drake"],
        "title": "Forever",
        "url": "https://cdnstore.xyz/download.php?zc_tid=0&id=76041&url=drake-forever&title=Rm9yZXZlcg==&artist=RHJha2U=&method=load",
    },

    {
        poster: "https://upload.wikimedia.org/wikipedia/en/5/5d/Ariana_Grande_-_positions.png",
        artists: ["Ariana Grande"],
        title: "positions",
        url: "https://soundloud.net/index.php?do=download&id=11286"
    },
    {
        poster: "https://mp3store.cc/uploads/cover/artist/250x250/79030867413adea98893ff6fb5dfdd28.jpg",
        artists: ["Playboi Carti"],
        title: "dotthatshit!",
        url: "https://mp3store.cc/download.php?file=eyJpZCI6IjkxMTAyIiwidXJsIjoicGxheWJvaS1jYXJ0aS1kb3RoYXRzaGl0IiwidHlwZSI6ImxvYWQiLCJibG9jayI6IjAifQ=="
    },
    {
        poster: "https://mp3store.cc/uploads/cover/artist/250x250/79030867413adea98893ff6fb5dfdd28.jpg",
        artists: ["Playboi Carti"],
        title: "Slay3r",
        url: "https://mp3store.cc/download.php?file=eyJpZCI6IjM5MjIyMyIsInVybCI6InBsYXlib2ktY2FydGktc2xheTNyIiwidHlwZSI6ImxvYWQiLCJibG9jayI6IjAifQ=="
    },
    {
        poster: "https://decoryourspace.store/wp-content/uploads/2020/05/71QDPDnIHZL.jpg",
        artists: ["Lil Uzi Vert", "Playboi carti"],
        title: "Watch this (Arizonatears Pluggnb Remix)",
        url: "./audio/Lil uzi vert - Watch this (Arizonatears Pluggnb Remix).mp3"
    },
    {
        poster: "https://upload.wikimedia.org/wikipedia/en/7/77/Post_Malone_-_Hollywood%27s_Bleeding.png",
        artists: ["Post Malone"],
        title: "Go Flex",
        url: "https://mp3store.cc/download.php?file=eyJpZCI6IjM3ODIzMCIsInVybCI6InBvc3QtbWFsb25lLWdvLWZsZXgiLCJ0eXBlIjoibG9hZCIsImJsb2NrIjoiMCJ9"
    },
    {
        poster: "https://upload.wikimedia.org/wikipedia/en/7/77/Post_Malone_-_Hollywood%27s_Bleeding.png",
        artists: ["Post Malone"],
        title: "Circles",
        url: "https://mp3store.cc/download.php?file=eyJpZCI6IjQyMzYiLCJ1cmwiOiJwb3N0LW1hbG9uZS1jaXJjbGVzLWRqc3VsZWltYW5uLWluZGFtaXgiLCJ0eXBlIjoibG9hZCIsImJsb2NrIjoiMCJ9"
    },
    {
        poster: "https://mp3store.cc/uploads/cover/artist/250x250/79030867413adea98893ff6fb5dfdd28.jpg",
        artists: ["Playboi Carti"],
        title: "Lame Niggaz",
        url: "https://mp3store.cc/download.php?file=eyJpZCI6IjM1NTQyNiIsInVybCI6InBsYXlib2ktY2FydGktbGFtZS1uaWdnYXoiLCJ0eXBlIjoibG9hZCIsImJsb2NrIjoiMCJ9"
    },
    {
        poster: "https://d32pdiva8u1wax.cloudfront.net/images/lil-uzi-vert/red-white.webp",
        artists: ["Lil Uzi Vert"],
        "title": "Cigarette",
        "url": "./audio/Lil_Uzi_Vert_-_Cigarette.mp3"
    },
];

export interface song{
    poster: string;
    artists: string[];
    title:string;
    url:string;
}