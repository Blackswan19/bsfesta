let songs = [
    { id: 1, title: "3D", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/3D.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 2, title: "4k", artist: "Rotimi ft Wale", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/4K(feat.Darell).mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/3c/ba/55/3cba5535b7052934d8b08ea6d20d4c21.gif" },
    { id: 3, title: "A Bar Song", artist: "Rotimi ft Wale", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Shaboozey - A Bar Song (Tipsy) [Official Visualizer] - (320 Kbps).mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/e5/d8/ba/e5d8ba4cd3db402fcc8314073fd8cc48.gif" },
    { id: 4, title: "A Sky Full Of Stars", artist: "Coldplay", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/A Sky Full Of Stars.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/d8/e4/09/d8e4090a10c4d02bd4f8137e0b7dde56.gif" },
    { id: 5, title: "A Thousand Years", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/A Thousand Years.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 6, title: "After Hours", artist: "The Weeknd", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/After Hours.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/a3/4d/35/a34d354f65699afbbe40747bce37b14e.gif" },
    { id: 8, title: "Airplane pt.2", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Airplane pt.2.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 9, title: "ALIBI", artist: "Sevdaliza ft Pabllo Vittar Yseult", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Sevdaliza - ALIBI (Lyrics) ft. Pabllo Vittar Yseult (Lyrics).mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/e4/49/ae/e449ae59cdb2894f996bd5d6198d2889.gif" },
    { id: 10, title: "All Eyez on Remi", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/All Eyez on Remix.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/a3/4d/35/a34d354f65699afbbe40747bce37b14e.gif" },
    { id: 11, title: "All The Stars", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/All The Stars.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/cb/ea/2c/cbea2cdb7a8b8752bb85640c9b541cf8.gif" },
    { id: 12, title: "ANPANMAN", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/ANPANMAN.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 13, title: "ANTIFRAGILE", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/ANTIFRAGILE.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 14, title: "Anyone", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Anyone.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/75/26/44/752644448464bfda591650cbead1f084.gif" },
    { id: 15, title: "APT.", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/APT.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 16, title: "As Long As You Love Me", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/As Long As You Love Me.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/51/9b/76/519b76a147dfafe8244d574e3895c97f.gif" },
    { id: 17, title: "At My Worst", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/At My Worst.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/75/26/44/752644448464bfda591650cbead1f084.gif" },
    { id: 18, title: "Attack on Bangtan", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Attack on Bangtan.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 19, title: "Attention", artist: "Charlie Puth", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Charlie Puth - Attention (Lyrics).mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/e5/d8/ba/e5d8ba4cd3db402fcc8314073fd8cc48.gif" },
    { id: 20, title: "Attention", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/NewJeans Attention Lyrics (뉴진스 Attention 가사) (Color Coded Lyrics).mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 21, title: "BANG BANG BANG", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/BANG BANG BANG.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 22, title: "BATTER UP", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/BATTER UP.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 23, title: "BIBI Vengeance", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/BIBI Vengeance (Color Coded Lyrics).mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 24, title: "BIRTHDAY DANCE", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/BIRTHDAY DANCE.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/75/26/44/752644448464bfda591650cbead1f084.gif" },
    { id: 25, title: "BOLO (Feat. YDG)", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/BOLO.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 26, title: "Bad Boy", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Bad Boy.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/cb/ea/2c/cbea2cdb7a8b8752bb85640c9b541cf8.gif" },
    { id: 27, title: "Bad Decisions", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Bad Decisions.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 28, title: "Bananza", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Bananza.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/e4/49/ae/e449ae59cdb2894f996bd5d6198d2889.gif" },
    { id: 29, title: "Be Mine", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/Be Mine.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 30, title: "Beautiful Young Prince", artist: "Beautiful Young Prince", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/Beautiful Young Prince - Let Go.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/e5/d8/ba/e5d8ba4cd3db402fcc8314073fd8cc48.gif" },
    { id: 31, title: "Beggin", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/Beggin.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/e4/49/ae/e449ae59cdb2894f996bd5d6198d2889.gif" },
    { id: 32, title: "Begin", artist: "Rotimi ft Wale", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/BTS - Begin - (320 Kbps).mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/fc/08/bc/fc08bcf6a17f001f3cf0267374839f06.gif" },
    { id: 33, title: "Billie Jean", artist: "Michael Jackson", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/Billie Jean.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/e4/49/ae/e449ae59cdb2894f996bd5d6198d2889.gif" },
    { id: 34, title: "Black Swan", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Black Swan.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 35, title: "Black or White", artist: "Michael Jackson", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/Black or White.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/42/b6/6c/42b66caa3f11e5b14e42be3f137f4011.gif" },
    { id: 36, title: "Blinding Lights", artist: "The Weeknd", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/The Weeknd - Blinding Lights (Lyrics).mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/a6/a5/f9/a6a5f9425f553b6b4526d2bf41334f55.gif" },
    { id: 37, title: "Blood Sweat & Tears", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Blood Sweat & Tears.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 38, title: "Boombastic", artist: "Shaggy", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Boombastic.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/e4/49/ae/e449ae59cdb2894f996bd5d6198d2889.gif" },
    { id: 39, title: "BOOMBAYAH", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/BOOMBAYAH.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 40, title: "Boy In Luv", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Boy In Luv.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 41, title: "Boy With Luv", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Boy With Luv.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 42, title: "Boyfriend", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Boyfriend.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 43, title: "Brother Louie Mix 98", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Brother Louie Mix 98 (Radio Edit).mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/e4/49/ae/e449ae59cdb2894f996bd5d6198d2889.gif" },
    { id: 44, title: "Bite Me", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Bite me.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 45, title: "Butter", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Butte.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 46, title: "Butterfly", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Butterfly.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 47, title: "Bye Bye Bye", artist: "NSYNC", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/NSYNC - Bye Bye Bye (Lyrics) (Deadpool 3 Soundtrack).mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/d8/e4/09/d8e4090a10c4d02bd4f8137e0b7dde56.gif" },
    { id: 48, title: "BTBT", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/B.I, Soulja Boy BTBT Lyrics (feat. DeVita) (HanRomEng가사) Color Coded Lyrics.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 49, title: "Calm Down", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Calm Down.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/bd/a2/3a/bda23ae128ae414b1d73c664e0a2e8c5.gif" },
    { id: 309, title: "Cold Water", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Major Lazer - Cold Water (feat. Justin Bieber & MØ) [Official Lyric Video].mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/9d/62/bc/9d62bcaf38f51123b536cf947320fb7f.gif" },
    { id: 50, title: "Changes", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/changes.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/51/9b/76/519b76a147dfafe8244d574e3895c97f.gif" },
    { id: 51, title: "Cheap Thrills", artist: "Sia", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Cheap Thrills.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/15/6c/b2/156cb2371ce1b7f22709baf91c690eed.gif" },
    { id: 52, title: "Cheri Cheri Lady", artist: "Modern Talking", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Modern Talking - Cheri Cheri Lady.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/bd/a2/3a/bda23ae128ae414b1d73c664e0a2e8c5.gif" },
    { id: 53, title: "Ciao Adios", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Ciao Adios.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/05/60/e0/0560e0703b348198902acd68ee70e598.gif" },
    { id: 54, title: "Closer", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/Closer.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 55, title: "Closer to You", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/Closer to You.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/a3/4d/35/a34d354f65699afbbe40747bce37b14e.gif" },
    { id: 56, title: "Company", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Company.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/d8/e4/09/d8e4090a10c4d02bd4f8137e0b7dde56.gif" },
    { id: 57, title: "Cruel Summer", artist: "Taylor Swift", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Cruel Summer.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/75/26/44/752644448464bfda591650cbead1f084.gif" },
    { id: 58, title: "Dancing With Your Ghost", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Dancing With Your Ghost.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/e5/d8/ba/e5d8ba4cd3db402fcc8314073fd8cc48.gif" },
    { id: 59, title: "Danger", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Danger.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 60, title: "Dangerous", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/Dangerous.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/42/b6/6c/42b66caa3f11e5b14e42be3f137f4011.gif" },
    { id: 61, title: "Dangerous Woman", artist: "Ariana Grande", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Dangerous Woman.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/e6/7e/ac/e67eacefdf72adb077f8fb08c5d386ea.gif" },
    { id: 62, title: "Dangerously", artist: "Charlie Puth", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Charlie Puth - Dangerously (Lyrics).mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/51/9b/76/519b76a147dfafe8244d574e3895c97f.gif" },
    { id: 63, title: "Danza Kuduro", artist: "Don Omar", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Danza Kuduro.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/e4/49/ae/e449ae59cdb2894f996bd5d6198d2889.gif" },
    { id: 64, title: "DDU-DU DDU-DU", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/DDU-DU DDU-DU.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 65, title: "Die With A Smile", artist: "Lady Gaga, Bruno Mars", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Lady Gaga, Bruno Mars - Die With A Smile.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/51/9b/76/519b76a147dfafe8244d574e3895c97f.gif" },
    { id: 66, title: "Diet Pepsi", artist: "Rotimi ft Wale", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Addison Rae - Diet Pepsi (Lyrics) - (320 Kbps).mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/e5/d8/ba/e5d8ba4cd3db402fcc8314073fd8cc48.gif" },
    { id: 67, title: "Dimple", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Dimple.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 68, title: "Dionysus", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Dionysus.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 69, title: "Ditto", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Ditto.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 70, title: "DNA", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/DNA.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 71, title: "Do It Like That", artist: "TXT Jonas Brothers", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/TXT Jonas Brothers Do It Like That Official Audio.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/75/26/44/752644448464bfda591650cbead1f084.gif" },
    { id: 72, title: "Done for Me", artist: "Charlie Puth ft Kehlani", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Done for Me (feat. Kehlani).mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/75/26/44/752644448464bfda591650cbead1f084.gif" },
    { id: 73, title: "Don't Worry Be Happy", artist: "Rotimi ft Wale", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Bobby McFerrin - Don't Worry Be Happy (Official Music Video) - (320 Kbps).mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/3a/49/63/3a4963ce7cd31ab7f008844a259dd9ef.gif" },
    { id: 74, title: "Don’t Matter To Me", artist: "Rotimi ft Wale", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Drake - Don’t Matter To Me (feat. Michael Jackson) - (320 Kbps).mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/e5/d8/ba/e5d8ba4cd3db402fcc8314073fd8cc48.gif" },
    { id: 75, title: "Dope", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Dope.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 76, title: "Dream Glow", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Dream Glow.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 77, title: "Dreamers", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Dreamers.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 78, title: "DtMF", artist: "Unknown", cover: "songnameicon.png", url: "https://www8.hiphopkit.com/music/download/47207/", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 79, title: "Dynamite", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Dynamite.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 80, title: "Eastside", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Eastside.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/cb/ea/2c/cbea2cdb7a8b8752bb85640c9b541cf8.gif" },
    { id: 81, title: "Eenie Meenie", artist: "Justin Bieber", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Eenie Meenie.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/d8/e4/09/d8e4090a10c4d02bd4f8137e0b7dde56.gif" },
    { id: 82, title: "ELEVEN", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/ELEVEN.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 83, title: "EPIPHANY", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/EPIPHANY.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 84, title: "EASY", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/EASY.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 85, title: "Espresso", artist: "Sabrina Carpenter", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/Sabrina Carpenter - Espresso.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/d8/e4/09/d8e4090a10c4d02bd4f8137e0b7dde56.gif" },
    { id: 86, title: "Euphoria", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/JUNGKOOK (정국) Euphoria (Color Coded Lyrics HanRomEng가사).mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 87, title: "Extended Mix", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Extended Mix.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/42/b6/6c/42b66caa3f11e5b14e42be3f137f4011.gif" },
    { id: 312, title: "FREEDOM", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Pharrell Williams - Freedom (Audio).mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/ac/dc/cf/acdccf67a15bf7f6dde039f961f5bc1b.gif" },
    { id: 88, title: "FAKE LOVE", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/FAKE LOVE.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/26/86/46/268646032cde46546e0b17c570a181f0.gif" },
    { id: 89, title: "FE!N", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/fein.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/3c/ba/55/3cba5535b7052934d8b08ea6d20d4c21.gif" },
    { id: 90, title: "FEARLESS", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/FEARLESS.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 91, title: "FANCY", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/FANCY.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 92, title: "Family Affair", artist: "Mary J. Blige", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Family Affair.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/42/b6/6c/42b66caa3f11e5b14e42be3f137f4011.gif" },
    { id: 93, title: "Fat Juicy & Wet", artist: "Unknown", cover: "songnameicon.png", url: "https://www8.hiphopkit.com/music/download/47377/", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 94, title: "Favorite", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/favorite.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/15/6c/b2/156cb2371ce1b7f22709baf91c690eed.gif" },
    { id: 95, title: "Fire", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Fire.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 96, title: "FLOWER", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/FLOWER.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 97, title: "For You", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/For You.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/d8/e4/09/d8e4090a10c4d02bd4f8137e0b7dde56.gif" },
    { id: 98, title: "Forever", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/FOREVER.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/e8/fc/c5/e8fcc5e87dac741f8ec314c9bef7a5eb.gif" },
    { id: 99, title: "Friends", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/friends.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 100, title: "GO HARD", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/go hard.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 101, title: "GO HARD", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/go hard.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 102, title: "Gangnam style", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Gangnam style.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 103, title: "Gangstas Paradise", artist: "Coolio ft L.V.", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Coolio - Gangstas Paradise (Lyrics) ft. L.V..mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/42/b6/6c/42b66caa3f11e5b14e42be3f137f4011.gif" },
    { id: 104, title: "Gasolina", artist: "Daddy Yankee", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Gasolina.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/e4/49/ae/e449ae59cdb2894f996bd5d6198d2889.gif" },
    { id: 105, title: "Girls Like You", artist: "Maroon 5 ft Cardi B", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Maroon 5 - Girls Like You (Lyrics) ft. Cardi B.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/05/60/e0/0560e0703b348198902acd68ee70e598.gif" },
    { id: 106, title: "Girls Like You", artist: "Maroon 5", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Girls Like You.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/d8/e4/09/d8e4090a10c4d02bd4f8137e0b7dde56.gif" },
    { id: 107, title: "Give It To Me", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Give It To Me.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/e4/49/ae/e449ae59cdb2894f996bd5d6198d2889.gif" },
    { id: 108, title: "Gnarly", artist: "KATSEYE", cover: "songnameicon.png", url: "https://cdn.Bazeafrika.com/wp-content/uploads/2025/06/KATSEYE---Gnarly--Clean-Edit--Bazeafrika.com.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 109, title: "Godzilla", artist: "Eminem", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/Godzilla.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/42/b6/6c/42b66caa3f11e5b14e42be3f137f4011.gif" },
    { id: 110, title: "Haegeum", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Haegeum.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 111, title: "Happy", artist: "Rotimi ft Wale", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Pharrell Williams - Happy (Lyrics).mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/22/a2/ed/22a2ed183673a013f4f1ae42ebd9860d.gif" },
    { id: 112, title: "Harleys In Hawaii", artist: "Katy Perry", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Harleys In Hawaii.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/05/60/e0/0560e0703b348198902acd68ee70e598.gif" },
    { id: 299, title: "Hate that i made you love me", artist: "Rotimi ft Wale", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/hate that i made you love me.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/38/70/d1/3870d1fcd484fb466bffc0b80300afc7.gif" },
    { id: 113, title: "Hate Me", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Hate Me.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/e5/d8/ba/e5d8ba4cd3db402fcc8314073fd8cc48.gif" },
    { id: 114, title: "Hate You", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/Hate You.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 115, title: "Heartbeat", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Heartbeat (BTS WORLD OST).mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 116, title: "Heartbreak Anniversary", artist: "Giveon", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Heartbreak Anniversary.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/cb/ea/2c/cbea2cdb7a8b8752bb85640c9b541cf8.gif" },
    { id: 117, title: "Heat Waves", artist: "Glass Animals", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Glass Animals - Heat Waves.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/e5/d8/ba/e5d8ba4cd3db402fcc8314073fd8cc48.gif" },
    { id: 118, title: "Heat Waves", artist: "Glass Animals", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Heat Waves.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/a6/a5/f9/a6a5f9425f553b6b4526d2bf41334f55.gif" },
    { id: 119, title: "Hello", artist: "Adele", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Adele - Hello.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 120, title: "Him & I", artist: "G-Eazy Halsey", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Him & I.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/15/6c/b2/156cb2371ce1b7f22709baf91c690eed.gif" },
    { id: 121, title: "HIP", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/HIP.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 122, title: "Holssi", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Holssi.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 123, title: "Hope", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Hope.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 124, title: "Houdini", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/Houdini.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/e4/49/ae/e449ae59cdb2894f996bd5d6198d2889.gif" },
    { id: 125, title: "House Of Cards", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/House Of Cards (full length edition).mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 126, title: "How Long", artist: "Charlie Puth", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Charlie Puth - How Long (Lyrics_Vietsub).mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/75/26/44/752644448464bfda591650cbead1f084.gif" },
    { id: 127, title: "Hurts So Good", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Hurts So Good.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/15/6c/b2/156cb2371ce1b7f22709baf91c690eed.gif" },
    { id: 128, title: "Hymn For The Weekend", artist: "Coldplay", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Hymn For The Weekend.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 129, title: "Hype Boy", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Hype Boy.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 130, title: "I AM", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/I AM.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 310, title: "It Ain't Me", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Kygo, Selena Gomez  It Ain't Me (Lyrics).mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/dc/e6/59/dce659269993ee5c55a0543ecd2f159e.gif" },
    { id: 300, title: "I like the way you kiss me", artist: "Artemas", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Artemas - i like the way you kiss me (Lyrics).mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/75/26/44/752644448464bfda591650cbead1f084.gif" },
    { id: 131, title: "I Don't Care", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/I Don't Care.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 132, title: "I Wanna Be Yours", artist: "Arctic Monkeys", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Arctic Monkeys - I Wanna Be Yours.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 133, title: "I Was Never There", artist: "The Weeknd", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/I Was Never There.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 134, title: "I'm Fine", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/I'm Fine.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 135, title: "I'm Yours", artist: "Jason Mraz", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/I'm Yours.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 136, title: "Ill Show You", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/Ill Show You.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 137, title: "In Da Club", artist: "50 Cent", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/In Da Club.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 138, title: "In My Bed", artist: "Rotimi ft Wale", cover: "songnameicon.png", url: "https://files.vistanaij.com/wp-content/uploads/2024/09/Rotimi_-_In_My_Bed_feat_Wale__Vistanaij.com.ng.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/e5/d8/ba/e5d8ba4cd3db402fcc8314073fd8cc48.gif" },
    { id: 139, title: "INDUSTRY BABY", artist: "Lil Nas X", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/INDUSTRY BABY.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 140, title: "It Depends", artist: "Chris Brown Ft Bryson Tiller", cover: "songnameicon.png", url: "https://offblogmedia.com/wp-content/uploads/2025/07/Chris_Brown_Ft_Bryson_Tiller_-_It_Depends_Offblogmedia.com.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 141, title: "JADED", artist: "Fordo", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/Fordo - JADED.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/51/9b/76/519b76a147dfafe8244d574e3895c97f.gif" },
    { id: 142, title: "Jalebi Baby", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Jalebi Baby.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 143, title: "James Arthur", artist: "James Arthur ft Anne Marie", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Rewrite The Stars - James Arthur feat. Anne Marie LyricsVietsub.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/75/26/44/752644448464bfda591650cbead1f084.gif" },
    { id: 144, title: "Jump", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Jump.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 145, title: "Just A Dream", artist: "Rotimi ft Wale", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Nelly - Just A Dream (Lyric Video) - (320 Kbps).mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/9c/75/97/9c75975efc8f4203501b27614cdd9c46.gif" },
    { id: 146, title: "Kill This Love", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Kill This Love.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 147, title: "Kiss and Make Up", artist: "Dua Lipa, BLACKPINK", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/Dua Lipa, BLACKPINK - Kiss and Make Up (Lyrics).mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/15/6c/b2/156cb2371ce1b7f22709baf91c690eed.gif" },
    { id: 148, title: "Ku lo sa", artist: "Oxlade", cover: "songnameicon.png", url: "https://cdn.trendybeatz.com/audio/Oxlade-Ku-Lo-Sa-New-Song-(TrendyBeatz.com).mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 313, title: "LOVE & TEARS", artist: "Unknown", cover: "songnameicon.png", url: "english/GENER8ION-LOVE-_-TEARS-featuring-Yannis.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 149, title: "LALALALA", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/LALALALA.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 150, title: "LALISA", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/LALISA.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 151, title: "LEFT AND RIGHT", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/Charlie Puth - Left And Right (Lyrics) ft. Jungkook of BTS.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 152, title: "Let Go", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Let Go.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 153, title: "Let Her Go", artist: "Passenger", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Passenger - Let Her Go (Lyrics).mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 304, title: "Like Animals", artist: "Passenger", cover: "songnameicon.png", url: "english/BTS - Like Animals - (320 Kbps).mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/93/87/a7/9387a7f76e41d1ee9a635182f5bc4809.gif" },
    { id: 154, title: "Let Me Down Slowly", artist: "Alec Benjamin", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Let Me Down Slowly.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 155, title: "Let Me Love You", artist: "Justin Bieber", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Let Me Love You.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 156, title: "Lily", artist: "Alan Walker", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Lily.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 157, title: "Like Crazy", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/like crazy.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 158, title: "Like OOH-AHH", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Like OOH-AHH.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 159, title: "Living Hell", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Living Hell.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 160, title: "Lose My Mind", artist: "Don Toliver Ft Doja Cat", cover: "songnameicon.png", url: "https://offblogmedia.com/wp-content/uploads/2025/04/Don_Toliver_Ft_Doja_Cat_-_Lose_My_Mind_Offblogmedia.com.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 161, title: "Lose Yourself", artist: "Eminem", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/Lose Yourself.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 163, title: "Louder than bombs", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Louder than bombs.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 164, title: "Love Maze", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Love Maze.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 165, title: "Love Me Again", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Love Me Again.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 166, title: "Love Me Back", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Love Me Back.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 167, title: "Love Me Like You Do", artist: "Ellie Goulding", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Love Me Like You Do.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 168, title: "Love Story", artist: "Taylor Swift", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Love Story.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 169, title: "Love The Way You Lie", artist: "Eminem ft Rihanna", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Love The Way You Lie.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 171, title: "Love Your Voice", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Love Your Voice.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 172, title: "Love is Gone", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Love is Gone.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 173, title: "Love wins all", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Love wins all.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 174, title: "MAGIC SHOP", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Magic Shop.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 175, title: "MANIAC", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/MANIAC.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 176, title: "MEOW", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/MEOW.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 178, title: "MIC Drop", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/MIC Drop.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 179, title: "MILLION DOLLAR BABY", artist: "Tommy Richman", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Tommy Richman - MILLION DOLLAR BABY (Lyrics).mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 180, title: "Make It Right", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Make It Right (feat. Lauv).mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 181, title: "Marry You", artist: "Bruno Mars", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Marry You.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/d8/e4/09/d8e4090a10c4d02bd4f8137e0b7dde56.gif" },
    { id: 182, title: "Mask Off", artist: "Future", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Mask Off.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 183, title: "Middle of the Night", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Middle of the Night.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 184, title: "Mirror", artist: "Lil Wayne Ft Bruno Mars", cover: "songnameicon.png", url: "https://offblogmedia.com/wp-content/uploads/2025/07/Lil_Wayne_Ft_Bruno_Mars_-_Mirror_Offblogmedia.com.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 185, title: "Miss You", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Miss You.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 186, title: "Mockingbird", artist: "Eminem", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Mockingbird.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 187, title: "Montagem Coral", artist: "DJ HOLANDA", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/Montagem Coral - DJ HOLANDA.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/3c/ba/55/3cba5535b7052934d8b08ea6d20d4c21.gif" },
    { id: 188, title: "Moon", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Moon.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 189, title: "Moonlight", artist: "XXXTENTACION", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Moonlight.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 190, title: "Mortals", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Mortals.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 191, title: "Movements", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Movements.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 192, title: "My Time", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/My Time.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 193, title: "My Universe", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/My Universe.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 311, title: "What A Wonderful World", artist: "Rotimi ft Wale", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/What%20A%20Wonderful%20World.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/89/77/9e/89779ebdad6cda0831f05a306eebf7cd.gif" },
    { id: 305, title: "NORMAL", artist: "Rotimi ft Wale", cover: "songnameicon.png", url: "english/BTS - NORMAL (Explicit Ver.) - (320 Kbps).mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/3c/ba/55/3cba5535b7052934d8b08ea6d20d4c21.gif" },
    { id: 194, title: "NAAY MOOD", artist: "Rotimi ft Wale", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/YTMP3GG_YouTube_LIL-NAAY-MOOD-BRAZIL-VIDEO-OFICAL_Media_5OyTxEbT-fM_009_128k.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/3c/ba/55/3cba5535b7052934d8b08ea6d20d4c21.gif" },
    { id: 195, title: "NEW WOMAN", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/LISA - NEW WOMAN (Lyrics) ft. Rosalía.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 196, title: "NO BYSTANDERS", artist: "Travis Scott", cover: "songnameicon.png", url: "https://offblogmedia.com/wp-content/uploads/2025/03/Travis_Scott_-_NO_BYSTANDERS_Offblogmedia.com.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 197, title: "Natural", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/bsworld.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 198, title: "Never Let Go", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/Jung Kook (정국) Never Let Go Lyrics.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 199, title: "New Jeans", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/New Jeans.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 200, title: "New Rules", artist: "Dua Lipa", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/New Rules.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 201, title: "Night Changes", artist: "One Direction", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/One Direction - Night Changes (Lyrics).mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 202, title: "Not Afraid", artist: "Eminem", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/Not Afraid.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 203, title: "Not Like Us", artist: "Kendrick Lamar", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/Not Like Us.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 204, title: "Not Today", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Not Today.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 205, title: "OMG", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/OMG.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 206, title: "One Dance", artist: "Drake", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/One Dance.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 207, title: "One More Night", artist: "Rotimi ft Wale", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/OneMoreNight.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/3a/49/63/3a4963ce7cd31ab7f008844a259dd9ef.gif" },
    { id: 208, title: "Outro _ Tear", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Outro _ Tear.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 209, title: "Outro _ Wings", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Outro _ Wings.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 210, title: "PIMMIE'S DILEMMA", artist: "Rotimi ft Wale", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/PARTYNEXTDOOR, Drake, Pimmie - PIMMIE'S DILEMMA - (320 Kbps).mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/97/0b/1c/970b1c1805358254790eff7cd9ea1fdd.gif" },
    { id: 306, title: "Please", artist: "Rotimi ft Wale", cover: "songnameicon.png", url: "english/BTS - Please - (320 Kbps).mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/52/0f/e0/520fe083739954e4b434707000a7ad52.gif" },
    { id: 211, title: "PUSh 2 START", artist: "Tyla ft Sean Paul", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Tyla-PUSH-2-START-Official-Audio_Media_TcknaZhnO88_009_128k.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 212, title: "Panama", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Panama.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 212, title: "People", artist: "Unknown", cover: "songnameicon.png", url: "english/Libianca - People (Official Visualiser) ft. Ayra Starr, Omah Lay - (320 Kbps).mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 213, title: "Paradise", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Paradise.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 214, title: "PEGA LA", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/PEGA LA.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 215, title: "Pied Piper", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Pied Piper.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 216, title: "Pillow talk", artist: "ZAYN", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/PILLOWTALK.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 217, title: "Pink Venom", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Pink Venom.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 218, title: "Plain Jane", artist: "A$AP Ferg", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Plain Jane.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 219, title: "Play Date", artist: "Melanie Martinez", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Play Date.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 220, title: "Pocket locket", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/pocket locket.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 221, title: "Pon de Replay", artist: "Rotimi ft Wale", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Rihanna - Pon de Replay (Lyrics) - (320 Kbps).mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/3c/ba/55/3cba5535b7052934d8b08ea6d20d4c21.gif" },
    { id: 222, title: "Puta Mexicana", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Puta Mexicana.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 223, title: "Rap God", artist: "Eminem", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/Rap God.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 224, title: "Renegade", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Renegade.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 225, title: "Right Now Na Na", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Right Now Na Na.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 226, title: "ROCKABYE", artist: "Clean Bandit", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/ROCKABYE.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 227, title: "Roses", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Roses.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 228, title: "Rover", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Rover.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 229, title: "Run Free", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Run Free.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 230, title: "Run bts", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Run bts.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 231, title: "Sativa", artist: "Rotimi ft Wale", cover: "songnameicon.png", url: "english/Sativa.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/38/70/d1/3870d1fcd484fb466bffc0b80300afc7.gif" },
    { id: 231, title: "SAD GIRLZ LUV MONEY", artist: "Rotimi ft Wale", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Amaarae - SAD GIRLZ LUV MONEY Remix ft Kali Uchis (Lyric Video) - (320 Kbps).mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/38/70/d1/3870d1fcd484fb466bffc0b80300afc7.gif" },
    { id: 232, title: "SHEESH", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/SHEESH.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 233, title: "São Paulo", artist: "The Weeknd Anitta", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/The Weeknd Anitta - São Paulo (Studio Version) Prod. Zantoro.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/e4/49/ae/e449ae59cdb2894f996bd5d6198d2889.gif" },
    { id: 234, title: "Seesaw", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Seesaw.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 235, title: "Señorita", artist: "Shawn Mendes, Camila Cabello", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Shawn Mendes, Camila Cabello - Señorita (Lyrics) Letra.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/e8/fc/c5/e8fcc5e87dac741f8ec314c9bef7a5eb.gif" },
    { id: 236, title: "Seven", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Seven.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 237, title: "Shower", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/Shower.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 238, title: "Shot Glass of Tears", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Shot Glass of Tears.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 239, title: "Silver Spoon", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Silver Spoon.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 240, title: "Sing For The Moment", artist: "Eminem", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/Sing For The Moment.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 241, title: "Singularity", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Singularity.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 307, title: "SWIM", artist: "Unknown", cover: "songnameicon.png", url: "english/BTS - SWIM - (320 Kbps).mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/80/9e/02/809e0200d6d56972fed9c96e0a6083c3.gif" },
    { id: 243, title: "So What", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/So What.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 244, title: "Someone You Loved", artist: "Lewis Capaldi", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Lewis Capaldi - Someone You Loved (Lyrics).mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 245, title: "Songi Songi", artist: "Rotimi ft Wale", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Salima Chica - Songi Songi (Official Video) - (320 Kbps).mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/26/86/46/268646032cde46546e0b17c570a181f0.gif" },
    { id: 246, title: "Stay", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Stay.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 247, title: "Stay Alive", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Stay Alive.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 248, title: "Stay With Me", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Stay With Me.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 249, title: "Still D.R.E.", artist: "Dr. Dre ft Snoop Dogg", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Dr. Dre - Still D.R.E. (Lyrics) ft. Snoop Dogg.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/42/b6/6c/42b66caa3f11e5b14e42be3f137f4011.gif" },
    { id: 250, title: "Sugar", artist: "Maroon 5", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Maroon 5 - Sugar (Lyrics).mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 251, title: "Sunflower", artist: "Post Malone ft Swae Lee", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/Post Malone - Sunflower (Lyrics) ft. Swae Lee.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/bd/a2/3a/bda23ae128ae414b1d73c664e0a2e8c5.gif" },
    { id: 252, title: "Super", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/SEVENTEEN Super Lyrics (세븐틴 손오공 가사) (Color Coded Lyrics).mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 253, title: "Super Shy", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Super Shy.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 254, title: "Sweater Weather", artist: "The Neighbourhood", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/The Neighbourhood - Sweater Weather (Lyrics).mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/51/9b/76/519b76a147dfafe8244d574e3895c97f.gif" },
    { id: 255, title: "Tacata Tiagz", artist: "Tiagz", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Tacata Tiagz.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 256, title: "Taki Taki", artist: "DJ Snake", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Taki Taki.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 257, title: "Tattoo", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Tattoo.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 258, title: "Tattoo", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Tattoo.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 259, title: "Taylor Swift", artist: "Taylor Swift", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Taylor Swift.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 260, title: "That That", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/That That.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 261, title: "The Astronaut", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/The Astronaut.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 262, title: "The Box", artist: "Roddy Ricch", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/The Box.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 263, title: "The Color Violet", artist: "Rotimi ft Wale", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Tory Lanez - The Color Violet [Official Audio] - (320 Kbps).mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/26/86/46/268646032cde46546e0b17c570a181f0.gif" },
    { id: 264, title: "The Feels", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/The Feels.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 265, title: "The Way I Am", artist: "Charlie Puth", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Charlie Puth - The Way I Am (Lyrics).mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 266, title: "The Way I Are ft. Keri Hilson", artist: "Rotimi ft Wale", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Timbaland - The Way I Are ft. Keri Hilson, D.O.E., Sebastian - (320 Kbps).mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/3c/ba/55/3cba5535b7052934d8b08ea6d20d4c21.gif" },
    { id: 267, title: "THRIFT SHOP", artist: "Macklemore", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/THRIFT SHOP.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 268, title: "TT", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/TT.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 269, title: "TOMBOY", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/TOMBOY.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 270, title: "Toca Toca", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Toca Toca.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 271, title: "Too Many Nights", artist: "Metro Boomin Ft Don Toliver Future", cover: "songnameicon.png", url: "https://offblogmedia.com/wp-content/uploads/2025/03/Metro_Boomin_Ft_Don_Toliver_Future_-_Too_Many_Nights_Offblogmedia.com.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 272, title: "Too Sad to Dance", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Too Sad to Dance.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 273, title: "Typa Girl", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Typa Girl.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 274, title: "UNFORGIVEN", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/UNFORGIVEN.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 275, title: "Under The Influence", artist: "Chris Brown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Chris Brown - Under The Influence (Lyrics).mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 276, title: "Unforgettable", artist: "French Montana", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Unforgettable.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 277, title: "Until I Found You", artist: "Stephen Sanchez", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Until I Found You.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 278, title: "Uptown Funk", artist: "Mark Ronson ft Bruno Mars", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/Uptown Funk.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 279, title: "WAVE TO YOU", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Wave to you.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 280, title: "WE ON GO", artist: "Rotimi ft Wale", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/WEONGO.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/3c/ba/55/3cba5535b7052934d8b08ea6d20d4c21.gif" },
    { id: 281, title: "Wgft", artist: "Gunna Ft Burna Boy", cover: "songnameicon.png", url: "https://cdn.waveloaded.com/wp-content/uploads/2025/08/Gunna_Ft_Burna_Boy_-_WGFT.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 282, title: "What Did I Miss", artist: "Drake", cover: "songnameicon.png", url: "https://cdn.Bazeafrika.com/wp-content/uploads/2025/07/Drake---What-Did-I-Miss--Bazeafrika.com.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 283, title: "What Does It Mean To You", artist: "Rotimi ft Wale", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Carpetman – What Does It Mean To You - (320 Kbps).mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/fc/08/bc/fc08bcf6a17f001f3cf0267374839f06.gif" },
    { id: 284, title: "What It Is", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/What It Is.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 285, title: "What is Love", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/What is Love.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 286, title: "What Do You Mean", artist: "Justin Bieber", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/What Do You Mean.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 287, title: "Where are you now", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/Where are you now.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 288, title: "Who - Jimin", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/Jimin (지민) Who Lyrics (Color Coded Lyrics).mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 289, title: "Who - Jimin", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/Jimin (지민) Who Lyrics (Color Coded Lyrics).mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 290, title: "Wild Flower", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Wild Flower.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 291, title: "Wings", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Outro _ Wings.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 292, title: "Without Me", artist: "Halsey", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Halsey - Without Me (Lyrics).mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/15/6c/b2/156cb2371ce1b7f22709baf91c690eed.gif" },
    { id: 293, title: "Without Me", artist: "Eminem", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/Without Me.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 301, title: "Warrior", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/warrior.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/a6/a5/f9/a6a5f9425f553b6b4526d2bf41334f55.gif" },
    { id: 294, title: "Wolves", artist: "Selena Gomez", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Wolves.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 295, title: "YOU HAUNT ME", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/YOU HAUNT ME.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/e8/fc/c5/e8fcc5e87dac741f8ec314c9bef7a5eb.gif" },
    { id: 308, title: "Young and Beautiful", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/Lana Del Rey - Young and Beautiful (from The Great Gatsby Soundtrack).mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/dc/e6/59/dce659269993ee5c55a0543ecd2f159e.gif" },
    { id: 296, title: "YOUTHISENDING", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/YOUTHISENDING.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 297, title: "YAD eng ver", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/newadd/YAD (Яд) ENGLISH VERSION (lyric video).mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 298, title: "Zero O'Clock", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/korea/Zero O'Clock.mp3", duration: "0:00", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" },
    { id: 302, title: "ОТКЛЮЧАЮ ТЕЛЕФОН", artist: "Unknown", cover: "songnameicon.png", url: "https://blackswan19.github.io/bsfesta/english/ОТКЛЮЧАЮ ТЕЛЕФОН.mp3", duration: "3:20", bg: "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif" }

];
        let playlists = [];
        let currentSongIndex = -1;
        let isPlaying = false;
        let isShuffle = false;
        let repeatMode = false;
        let playNextQueue = [];
        let selectedSongId = null;
        let sharedSongIndex = -1;
        let currentView = 'home';
        let currentPlaylistIndex = null;
        
        const audio = document.getElementById('audio');

        let isAdvancing = false;
        let advanceCooldown = 0;

        function loadData() {
            const saved = localStorage.getItem('muse_playlists');
            if (saved) playlists = JSON.parse(saved);
        }
        
        function savePlaylists() {
            localStorage.setItem('muse_playlists', JSON.stringify(playlists));
        }

        function updateNowPlaying() {
            if (currentSongIndex === -1) return;
            const song = songs[currentSongIndex];
            
            // Bottom player
            document.getElementById('player-cover').src = song.cover || "songnameicon.png";
            document.getElementById('player-title').textContent = song.title || "Unknown";
            const artistEl = document.getElementById('player-artist');
            if (artistEl) artistEl.textContent = song.artist || "—";
            
            // Fullscreen
            const fsCover = document.getElementById('fs-cover');
            const fsTitle = document.getElementById('fs-title');
            const fsArtist = document.getElementById('fs-artist');
            const fsBg = document.getElementById('fs-background');
            
            if (fsCover) fsCover.src = song.cover || "songnameicon.png";
            if (fsTitle) fsTitle.textContent = song.title || "Unknown";
            if (fsArtist) fsArtist.textContent = song.artist || "—";
            if (fsBg) fsBg.style.backgroundImage = `url('${song.bg || "https://i.pinimg.com/originals/0f/d7/7c/0fd77c78e7dae4751eb19cf7ba3f9902.gif"}')`;
        }
        
        function renderSongList(displaySongs) {
            const container = document.getElementById('song-list');
            container.innerHTML = '';
            
            displaySongs.forEach(song => {
                const globalIndex = songs.findIndex(s => s.id === song.id);
                const div = document.createElement('div');
                div.className = `song-item ${globalIndex === currentSongIndex ? 'playing' : ''}`;
                div.innerHTML = `
                    <div class="songsectionmainhub">
                        <img src="${song.cover}" class="cover">
                        <div>
                            <div style="font-weight:500;">${song.title}</div>
                            <div style="color:#999;display:none">${song.artist || ''}</div>
                        </div>
                    </div>
                    <button class="menu-btn" onclick="showSongMenu(${song.id}); event.stopImmediatePropagation()">⋯</button>
                `;
                div.onclick = () => playSong(globalIndex);
                container.appendChild(div);
            });
        }
        
        function showSongMenu(id) {
            selectedSongId = id;
            const removeOption = document.getElementById('remove-option');
            removeOption.style.display = (currentView === 'playlist' && currentPlaylistIndex !== null) ? 'block' : 'none';
            document.getElementById('song-menu').style.display = 'flex';
        }
        
        function closeModals() {
            document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
        }
        
        function showToast(msg) {
            const toast = document.getElementById('toast');
            toast.textContent = msg;
            toast.style.display = 'block';
            setTimeout(() => toast.style.display = 'none', 3000);
        }
        
        function playSong(index) {
            if (index < 0 || index >= songs.length) return;
            
            audio.pause();
            isAdvancing = true;
            advanceCooldown = Date.now();
            
            currentSongIndex = index;
            playNextQueue = [];
            
            const song = songs[index];
            audio.src = song.url;
            
            audio.play().then(() => {
                isPlaying = true;
                updateNowPlaying();
                updatePlayerUI();
                renderCurrentView();
                setTimeout(() => { isAdvancing = false; }, 600);
            }).catch(() => {
                isPlaying = false;
                updatePlayerUI();
                renderCurrentView();
                isAdvancing = false;
            });
        }
        
        function updatePlayerUI() {
            const playIcon = document.getElementById('play-icon');
            const pauseIcon = document.getElementById('pause-icon');
            const fsPlayIcon = document.getElementById('fs-play-icon');
            const fsPauseIcon = document.getElementById('fs-pause-icon');

            if (isPlaying) {
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'inline';
                if (fsPlayIcon) fsPlayIcon.style.display = 'none';
                if (fsPauseIcon) fsPauseIcon.style.display = 'inline';
            } else {
                playIcon.style.display = 'inline';
                pauseIcon.style.display = 'none';
                if (fsPlayIcon) fsPlayIcon.style.display = 'inline';
                if (fsPauseIcon) fsPauseIcon.style.display = 'none';
            }
        }
        
        function togglePlay() {
            if (currentSongIndex === -1) {
                playSong(0);
                return;
            }
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        }
        
        function playNextInQueue() {
            const now = Date.now();
            if (isAdvancing || (now - advanceCooldown < 800)) return;
            
            isAdvancing = true;
            advanceCooldown = now;
            
            if (playNextQueue.length > 0) {
                const nextId = playNextQueue.shift();
                const index = songs.findIndex(s => s.id === nextId);
                if (index !== -1) {
                    playSong(index);
                    return;
                }
            }
        
            if (repeatMode) {
                audio.currentTime = 0;
                audio.play().catch(() => {});
                isAdvancing = false;
                return;
            }
        
            if (isShuffle) {
                let available = songs;
                if (currentView === 'playlist' && currentPlaylistIndex !== null) {
                    const pl = playlists[currentPlaylistIndex];
                    available = songs.filter(s => (pl.songs || []).includes(s.id));
                }
                if (available.length > 0) {
                    let randomIndex = Math.floor(Math.random() * available.length);
                    if (available.length > 1 && currentSongIndex !== -1) {
                        if (available[randomIndex].id === songs[currentSongIndex].id) {
                            randomIndex = (randomIndex + 1) % available.length;
                        }
                    }
                    const randomSong = available[randomIndex];
                    const globalIndex = songs.findIndex(s => s.id === randomSong.id);
                    if (globalIndex !== -1) playSong(globalIndex);
                }
                return;
            }
        
            if (currentView === 'playlist' && currentPlaylistIndex !== null) {
                const pl = playlists[currentPlaylistIndex];
                const playlistSongIds = pl.songs || [];
                if (playlistSongIds.length === 0) {
                    isAdvancing = false;
                    return;
                }
                
                const currentId = songs[currentSongIndex].id;
                let currentPos = playlistSongIds.indexOf(currentId);
                if (currentPos === -1) currentPos = 0;
                
                const nextPos = (currentPos + 1) % playlistSongIds.length;
                const nextId = playlistSongIds[nextPos];
                const nextIndex = songs.findIndex(s => s.id === nextId);
                
                if (nextIndex !== -1) playSong(nextIndex);
                return;
            }
        
            const nextIndex = (currentSongIndex + 1) % songs.length;
            playSong(nextIndex);
        }
        
        function nextSong() { 
            playNextInQueue(); 
        }
        
        function prevSong() {
            if (currentSongIndex === -1) return;
            let prev = currentSongIndex - 1;
            if (prev < 0) prev = songs.length - 1;
            playSong(prev);
        }
        
        function playSongNext() {
            if (!selectedSongId) return;
            playNextQueue.unshift(selectedSongId);
            showToast("Added to play next");
            closeModals();
        }
        
        function copySongLink() {
            const song = songs.find(s => s.id === selectedSongId);
            if (!song) return;
            const url = `${window.location.origin}${window.location.pathname}?song=${song.id}`;
            navigator.clipboard.writeText(url).then(() => showToast("Link copied"));
            closeModals();
        }
        function scrollToSong() {
    const urlParams = new URLSearchParams(window.location.search);
    const songId = urlParams.get('song');
    
    if (!songId) return;

    console.log(`🔍 Trying to scroll to song: ${songId}`); 
    const possibleSelectors = [
        `#song-${songId}`,
        `#song${songId}`,
        `[data-song-id="${songId}"]`,
        `[data-id="${songId}"]`
    ];

    let songElement = null;

    for (const selector of possibleSelectors) {
        songElement = document.querySelector(selector);
        if (songElement) break;
    }

    if (songElement) {
        const headerOffset = 100;
        const elementPosition = songElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        songElement.classList.add('highlight-song');
        setTimeout(() => songElement.classList.remove('highlight-song'), 2500);

        console.log('Scrolled to song:', songElement);
    } else {
        console.warn('Song not found for ID:', songId);
        
        const songsContainer = document.getElementById('songs-section') || 
                             document.querySelector('.songs, .song-list, .playlist');
        if (songsContainer) {
            songsContainer.scrollIntoView({ behavior: 'smooth' });
        }
    }
}
function initSongScroll() {
    scrollToSong();
    
    setTimeout(scrollToSong, 600);
    setTimeout(scrollToSong, 1200);
}

window.addEventListener('load', initSongScroll);
document.addEventListener('DOMContentLoaded', initSongScroll);
window.addEventListener('popstate', scrollToSong);
        function removeFromCurrentPlaylist() {
            if (currentPlaylistIndex === null || !selectedSongId) return;
            const pl = playlists[currentPlaylistIndex];
            pl.songs = pl.songs.filter(id => id !== selectedSongId);
            savePlaylists();
            showToast("Song removed from playlist");
            closeModals();
            renderCurrentView();
        }
        
        function showAddToPlaylistModal() {
    closeModals();
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'add-playlist-modal';
    modal.style.display = 'flex';
    
    const content = document.createElement('div');
    content.className = 'modal-content';
    
    const title = document.createElement('h3');
    title.textContent = 'Add to Playlist';
    content.appendChild(title);
    
    if (playlists.length === 0) {
        const empty = document.createElement('p');
        empty.textContent = 'No playlists yet. Create one first!';
        empty.style.color = '#999';
        content.appendChild(empty);
    } else {
        playlists.forEach((pl, i) => {
            const option = document.createElement('div');
            option.className = 'modal-option';
            option.textContent = pl.name;
            option.onclick = () => {
                addSongToPlaylist(i);
                setTimeout(() => closeModals(), 300);
            };
            content.appendChild(option);
        });
    }
   const closeBtn = document.createElement('button');
closeBtn.id = 'modal-close-btn'; 
closeBtn.textContent = 'Cancel';
closeBtn.style.marginTop = '15px';
closeBtn.onclick = closeModals;

content.appendChild(closeBtn);

modal.appendChild(content);
document.body.appendChild(modal);
}
        
        function addSongToPlaylist(playlistIdx) {
            const song = songs.find(s => s.id === selectedSongId);
            if (!song || !playlists[playlistIdx]) return;
            if (!playlists[playlistIdx].songs) playlists[playlistIdx].songs = [];
            if (!playlists[playlistIdx].songs.includes(song.id)) {
                playlists[playlistIdx].songs.push(song.id);
            }
            savePlaylists();
            showToast(`Added to "${playlists[playlistIdx].name}"`);
            closeModals();
        }
        
        function deletePlaylist(index) {
            if (confirm("Delete this playlist?")) {
                playlists.splice(index, 1);
                savePlaylists();
                renderPlaylists();
                if (currentPlaylistIndex === index) switchView('home');
                else if (currentPlaylistIndex > index) currentPlaylistIndex--;
                showToast("Playlist deleted");
            }
        }
        
        function renderCurrentView() {
            if (currentView === 'playlist' && currentPlaylistIndex !== null) {
                const pl = playlists[currentPlaylistIndex];
                const playlistSongs = songs.filter(s => (pl.songs || []).includes(s.id));
                renderSongList(playlistSongs);
                document.getElementById('page-title').textContent = pl.name;
            } else {
                renderSongList(songs);
                document.getElementById('page-title').textContent = "For You";
            }
        }
        
        function renderPlaylists() {
            const container = document.getElementById('playlists-list');
            container.innerHTML = '';
            playlists.forEach((pl, i) => {
                const div = document.createElement('div');
                div.className = 'playlist';
                div.innerHTML = `${pl.name} <span style="display: contents;" onclick="deletePlaylist(${i}); event.stopImmediatePropagation()"><svg style="fill: red;" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-437.85 277.08-234.92q-8.31 8.3-20.89 8.5-12.57.19-21.27-8.5-8.69-8.7-8.69-21.08 0-12.38 8.69-21.08L437.85-480 234.92-682.92q-8.3-8.31-8.5-20.89-.19-12.57 8.5-21.27 8.7-8.69 21.08-8.69 12.38 0 21.08 8.69L480-522.15l202.92-202.93q8.31-8.3 20.89-8.5 12.57-.19 21.27 8.5 8.69 8.7 8.69 21.08 0 12.38-8.69 21.08L522.15-480l202.93 202.92q8.3 8.31 8.5 20.89.19 12.57-8.5 21.27-8.7 8.69-21.08 8.69-12.38 0-21.08-8.69L480-437.85Z"/></svg></span>`;
                div.onclick = (e) => {
                    if (e.target.tagName !== 'SPAN') {
                        currentView = 'playlist';
                        currentPlaylistIndex = i;
                        renderCurrentView();
                    }
                };
                container.appendChild(div);
            });
        }
        
        function createPlaylist() {
            const name = prompt("New playlist name:");
            if (name) {
                playlists.push({ name: name.trim(), songs: [] });
                savePlaylists();
                renderPlaylists();
                showToast(`Playlist "${name}" created`);
            }
        }
        
        function updateProgress() {
            if (!audio.duration) return;
            const percent = (audio.currentTime / audio.duration) * 100;
            document.getElementById('progress').style.width = percent + '%';
            const fsProgress = document.getElementById('fs-progress');
            if (fsProgress) fsProgress.style.width = percent + '%';
        }
        
        function seek(e) {
            const rect = e.currentTarget.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            audio.currentTime = pos * audio.duration;
        }
        
        function setVolume() { 
            audio.volume = parseFloat(document.getElementById('volume-slider').value); 
        }
        
        function toggleMute() { 
            audio.volume = audio.volume > 0 ? 0 : 0.8; 
            document.getElementById('volume-slider').value = audio.volume; 
        }
        
        function toggleShuffle() {
            isShuffle = !isShuffle;
            const btns = [document.getElementById('shuffle-btn'), document.getElementById('fs-shuffle')];
            btns.forEach(btn => {
                if (btn) {
                    if (isShuffle) {
                        btn.style.color = '#1db954';
                        btn.style.backgroundColor = '#1e3a5f';
                        btn.style.borderRadius = '50%';
                        btn.style.padding = '8px';
                    } else {
                        btn.style.color = '#ccc';
                        btn.style.backgroundColor = 'transparent';
                    }
                }
            });
            showToast(isShuffle ? "Shuffle ON" : "Shuffle OFF");
        }
        
        function toggleRepeat() {
            repeatMode = !repeatMode;
            const btns = [document.getElementById('repeat-btn'), document.getElementById('fs-repeat')];
            btns.forEach(btn => {
                if (btn) {
                    if (repeatMode) {
                        btn.style.color = 'white';
                        btn.style.backgroundColor = 'blue';
                        btn.style.borderRadius = '999px';
                        btn.style.padding = '8px';
                    } else {
                        btn.style.color = '#ccc';
                        btn.style.backgroundColor = 'transparent';
                    }
                }
            });
            showToast(repeatMode ? "Repeat ONE" : "Repeat OFF");
        }
        
        function toggleFullscreen() {
            const fs = document.getElementById('fullscreen-player');
            const wasHidden = fs.style.display !== 'flex';
            fs.style.display = wasHidden ? 'flex' : 'none';
            if (wasHidden && currentSongIndex !== -1) {
                updateNowPlaying();
            }
        }
        
        function searchSongs() {
            const q = document.getElementById('search-input').value.toLowerCase();
            let filtered = songs;
            if (currentView === 'playlist' && currentPlaylistIndex !== null) {
                const pl = playlists[currentPlaylistIndex];
                filtered = songs.filter(s => (pl.songs || []).includes(s.id));
            }
            if (q) filtered = filtered.filter(s => 
                s.title.toLowerCase().includes(q) || (s.artist || "").toLowerCase().includes(q)
            );
            renderSongList(filtered);
        }
        
        function handleSharedSong() {
    const urlParams = new URLSearchParams(window.location.search);
    const songId = urlParams.get('song');
    
    if (!songId) return;

    const id = parseInt(songId);
    const songIndex = songs.findIndex(s => s.id === id);

    if (songIndex === -1) return;

    setTimeout(() => {
        const songElement = document.querySelector(`.song-item:nth-child(${songIndex + 1})`) ||
                            document.getElementById(`song-${id}`) ||
                            document.querySelector(`[data-song-id="${id}"]`);

        if (songElement) {
            songElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });

            songElement.classList.add('highlight-song');
            setTimeout(() => {
                songElement.classList.remove('highlight-song');
            }, 3000);
        }
    }, 400);

    setTimeout(() => {
        playSong(songIndex);
    }, 800);
}

function initSharedSong() {
    handleSharedSong();
}

window.addEventListener('load', initSharedSong);
document.addEventListener('DOMContentLoaded', initSharedSong);
        
        function switchView(view) {
            currentView = view;
            currentPlaylistIndex = null;
            renderCurrentView();
        }
        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('ended', playNextInQueue);
        audio.addEventListener('play', () => { 
            isPlaying = true; 
            updatePlayerUI(); 
        });
        audio.addEventListener('pause', () => { 
            isPlaying = false; 
            updatePlayerUI(); 
        });

        window.onload = () => {
            loadData();
            renderSongList(songs);
            renderPlaylists();
            handleSharedLink();
            updatePlayerUI();
            audio.volume = 0.8;
        };

        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('open');
        }

        
document.addEventListener("DOMContentLoaded", () => {
    const customMenu = document.querySelector(".custom-menu");

    document.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        customMenu.style.display = "block";
        customMenu.style.top = `${event.pageY}px`;
        customMenu.style.left = `${event.pageX}px`;
    });
    document.addEventListener("click", () => {
        customMenu.style.display = "none";
    });
});
