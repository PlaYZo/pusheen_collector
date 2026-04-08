console.log("[=== Hey, Galaxy Cat here. Cheated cats won't love you as much... or do they? ===]")

function randomChoice(lst) {
    return lst[Math.floor(Math.random()*lst.length)]
};

function shuffleArray(array) {
    let new_arr = array;
    for (let i = new_arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [new_arr[i], new_arr[j]] = [new_arr[j], new_arr[i]];
    }
    return new_arr;
}

function escapeSelector(myid) {
    return "#" + myid.replace( /(\/|:|\.|\[|\]|,|=|@)/g, "\\$1" );
}

var savefile = {'bal':0,'xp':0,'cats':[],'home_cats':[],'cCats':[]};
var {bal, xp, cats, home_cats, cCats} = savefile;

/* cookies */

[...document.getElementsByClassName("cookies_accept")].forEach(btn => {
    btn.addEventListener("click", function() {
        document.getElementById("cookiesLearnMore_container").remove();
        document.getElementById("cookies_container").remove();
        createDialog('Thank you for letting us sell your data :)');
        /* insert fancy cookie stuff here*/
    });
});

document.getElementById("cookies_learnMore").addEventListener("click", function() {
    document.getElementById("cookies_container").style.display = 'none';
    document.getElementById("cookiesLearnMore_container").style.display = 'block';
})

document.getElementById("cookies_confirm").addEventListener("click", function() {
    if(document.getElementById("cookies-neccesary").checked || !document.getElementById("cookies-savefile").checked) {
        window.location.href = 'crash';
    }else if(document.getElementById("cookies-personalization").checked || !document.getElementById('cookies-sell_data').checked) {
        createDialog('Thank you for letting us sell your data :)');
    }else {
        createDialog("Choices confirmed successfully!")
    }

    document.getElementById("cookiesLearnMore_container").remove();
    document.getElementById("cookies_container").remove();
})

pages = {
    1:document.getElementById("home"),
    2:document.getElementById("adventure"),
    3:document.getElementById("collection"),
    4:document.getElementById("upgrades"),
    5:document.getElementById("trader"),
    6:document.getElementById("cCollection"),
    7:document.getElementById("minesweeper"),
    8:document.getElementById("grabber")
};

/* Keybinds */
window.addEventListener("keydown", function(e) {
    if(e.code == 'KeyQ') {
        minigame_switch_switch.click();
    }else if(e.code == 'Digit1') {
        document.getElementById("tohome").click();
    }else if(e.code == 'Digit2') {
        document.getElementById("toadventure").click();
    }else if(e.code == 'Digit3') {
        document.getElementById("tovc").click();
    }else if(e.code == 'Digit4') {
        document.getElementById("toupgrades").click();
    }else if(e.code == 'Digit5') {
        document.getElementById("totrader").click();
    }
})

const body = document.getElementById("body");
const minigame_switch = document.getElementById("minigame_switch");

function show(element) {
    for (var key in pages) {
        if (pages.hasOwnProperty(key)) {
            if(key == element) {
                document.getElementById("dogecoin_equiv_display").style.display = 'none';
                minigame_switch.style.display = 'none';
                if(key == 4) {
                    pages[key].style.display = "flex";
                }else if(key == 5) {
                    pages[key].style.display = "flex";
                    document.getElementById("dogecoin_equiv_display").style.display = 'block';
                }else if(key == 1) {
                    pages[key].style.display = 'inline';
                    btnMenu.style.display = "inline";
                }else if([2,7,8].includes(element)) {
                    pages[key].style.display = 'inline';
                    minigame_switch.style.display = 'block';
                }else{
                    pages[key].style.display = 'inline';
                }
                /* Allows scrolling only on the collection page */
                if([3,6].includes(element)) {
                    body.style.overflow = "scroll";
                }else{
                    body.style.overflow = "hidden";
                };
                if(element !== 1) {
                    home_text.style.display = 'none';
                }
                
            }else{
                pages[key].style.display = "none";
                clearInterval(intTraderImg);
            }
        }
    }
};

var uid;
function createDialog(note) {
    try {
        $(`#dialog${uid}`).dialog('destroy');
        document.getElementById(uid).remove();
    }catch{}
    var timeout;
    uid = Math.floor(Math.random() * 999).toString();
    var div = document.createElement("div");
    $(function() { /* *loud sigh* jquery... ... */
        div.id = uid;
        div.innerHTML = `
        <div id="d-box${uid}" style="position:fixed;bottom:25px;left:0;"></div>
        <div id="dialog${uid}" title="${note}" style="letter-spacing: normal;"></div>`
        document.getElementById("main").appendChild(div);

        $(`#dialog${uid}`).dialog({resizable: false, draggable: false, title: note, width: 'auto', position: { my: "left center", at: "left bottom", of: `#d-box${uid}` }});
        $(".ui-dialog :button").blur();
        timeout = setTimeout(fadeDialog, 4000, uid);
    });
    return {
        "t":timeout,
        "id":uid
    };
}

function fadeDialog(uid) {
    $(function() {
        $(`#dialog${uid}`).dialog("widget").fadeTo('slow', 0, function() {
            $(`#dialog${uid}`).dialog('destroy');
            document.getElementById(uid).remove();
        })
    })
}

/* Change selected menu */

[...document.getElementsByClassName("menu-btn")].forEach(btn => {
    btn.addEventListener("click", function(e) {
        document.getElementsByClassName("selected")[0].classList.remove('selected');
        e.target.classList.add('selected');
        changeMode("Normal");
        if(e.target.id !== 'toadventure') {
            first_time = true;
        }
    });
});

[...document.getElementsByClassName("prev-col")].forEach(btn => {
    btn.addEventListener("click", show_collection);
});

function reload() {
    home_collection.innerHTML = "";
    home_cats = shuffleArray(cats).slice(0, 12);
    for(let cat of home_cats) {
        createImg(cat.src);
        try {
            document.getElementById(`${cat.src}a`).innerHTML = '<i title="Remove Cat From Home" class="fa-solid fa-minus"></i>';
        } catch (error) {}
    }

    document.getElementById("size").value = document.getElementById("speed").value = 1;
    document.getElementById("reverse").checked = document.getElementById("rSize").checked = document.getElementById("rSpeed").checked = false;
    document.getElementById("spin").checked = true;

};

function trash() {
    for(let cat of home_cats) {
        try {
            document.getElementById(`${cat.src}a`).innerHTML = '<i title="Add Cat To Home" class="fa-solid fa-plus"></i>';
        } catch (error) {}
    }
    home_cats = [];
    home_collection.innerHTML = "";

}

const sTrigger = document.getElementById("settingX");
const setting = document.getElementById("settings");

function settings() {
    if(setting.style.display == "block") {
        setting.style.display = "none";
        sTrigger.innerHTML = `<i class="fa fa-2xl fa-cog">`
    }else {
        setting.style.display = "block";
        sTrigger.innerHTML = `<i class="fa-solid fa-2xl fa-xmark"></i>`
    }
}

var mode = "Normal";
function changeMode(new_mode) {
    mode = new_mode;
    if(mode == "Normal") {
        body.style.cursor = "default";
        /*Removes popup when changing screens */
        if(escVar) {
            esc();
        }
    }
    else if(mode == "Preview") {
        body.style.cursor = "none";
        document.getElementById("nave").style.display = "none";
        document.getElementById("home_text").style.display = "none";
    }
    else {
        document.getElementById("nave").style.opacity = "0.5";
        body.style.cursor = "grab";
    }
    return mode;
}

function move() {
    changeMode("Move");
    hide();
    $(function() {
        $(".img_").each(function() {
            $(escapeSelector(this.id)).draggable("enable");
        })
    });
    
}

var escVar;
const btnMenu = document.getElementById("btn-menu");
function hide() {
    btnMenu.style.display = "none";
    escVar = createDialog(`Press [ESC] To Leave ${mode} Mode`);
    
    document.addEventListener("keydown", function(e) {
        if(e.code == "Escape") {
            esc();
        }
    })
}

function esc() {
    if(mode == "Move") {
        $(function() {
            $(".img_").each(function() {
                $(escapeSelector(this.id)).draggable("disable");
            })
        });
    }

    document.getElementById("nave").style.opacity = "1";
    document.getElementById("nave").style.display = "block";
    document.getElementById("home_text").style.display = "absolute";
    btnMenu.style.display = "inline";
    if(escVar) {
        clearTimeout(escVar.t);
        fadeDialog(escVar.id);
        escVar = '';
    }
    changeMode("Normal");
}

function toggleSpin() {
    var imgs = Array.from(document.getElementsByClassName("img_")); 
    const checked = document.getElementById("spin").checked;

    if (checked) {
        for(const img of imgs) {
            img.classList.add("image");
        }
    }else {
        for(const img of imgs) {
            img.classList.remove("image");
        }
    }
}

function toggleReverse() {
    var imgs = Array.from(document.getElementsByClassName("img_")); 
    const checked = document.getElementById("reverse").checked;

    if (checked) {
        for(const img of imgs) {
            img.style.animationDirection = "reverse";
        }
    }else {
        for(const img of imgs) {
            img.style.animationDirection = "normal";
        }
    }
}

function toggleSize() {
    var imgs = Array.from(document.getElementsByClassName("img_"));
    const size = document.getElementById("size").value;
    const checked = document.getElementById("rSize").checked;

    if(checked) {
        for(let img of imgs) {
            img.style.maxWidth = `${20 * size}%`;
        }
    }else{
        for(let img of imgs) {
            img.style.maxWidth = `${parseInt(img.dataset.width) * size}%`;
        }
    }
}

function toggleSpeed() {
    var imgs = Array.from(document.getElementsByClassName("img_"));
    const speed = document.getElementById("speed").value;
    const checked = document.getElementById("rSpeed").checked;

    if(checked) {
        for(let img of imgs) {
            img.style.animationDuration = `${5 / speed}s`
        }
    }else{
        for(let img of imgs) {
            img.style.animationDuration = `${parseInt(img.dataset.speed) / speed}s`
        }
    }
}

var catDiv;
function show_collection(e) {
    var pOrM;
    var title;
    if(typeof e == "string") {
        var name = catList.find(({src}) => src === e).name;
        document.getElementById("tovc").click();
    }else{
        try {
            var name = e.target.parentNode.id;
        }
        catch(err) {
            var name = found.name;
            document.getElementById("tovc").click();
        }
    }

    var catCount = 0;
    var totalCount = 0;
    
    for(var cat of catList) {
        if(cat.name == name) {
            if(cats.includes(cat)) {
                catCount += 1;
            }
            totalCount += 1;
        }
    }

    var pcat = document.getElementById("pcat"); /*Subtitle */
    pcat.innerHTML = `${name} (${catCount}/${totalCount})`;

    if(catCount == totalCount) {
        pcat.style.color = "#edc705";
        let subtitle = document.querySelector(`#${name} button`)
        subtitle.style.color = "#edc705"
    }else{
        pcat.style.color = "black";
    }

    try {
        catDiv.style.display = "none";
    } catch (error) {}
    catDiv = document.getElementById(`C${name}`);

    if(catCount == 0) {
        home_text.style.display = 'block';
    }else{
        for(let cat of cats) {
            if(cat.name == name) {
                if(home_cats.includes(cat)) {
                    pOrM = "minus";
                    title = "Remove Cat From Home";
                }else{
                    pOrM = "plus";
                    title = "Add Cat To Home";
                }
    
                if(!cCats.includes(cat)) {
                    let div = document.createElement('div');
                    div.classList.add("cContainer");
                    div.innerHTML = `
                    <img src="${cat.src}" class="c-img">
                    <div class="topright no-overflow">
                        <a id="${cat.src}a" onclick="addCat('${cat.src}')"><i title='${title}' class="fa-solid fa-${pOrM}"></i></a>
                    </div>`
    
                    catDiv.appendChild(div);
                    cCats.push(cat);
                }
            };
        };
    }

    catDiv.style.display = 'inline';
    show(6);
}

function addCat(catSrc) {
    var pOrM = document.getElementById(catSrc+"a");
    var cat = catList.find(({src}) => src === catSrc);
    if(pOrM.innerHTML.includes("plus")) {
        if(home_cats.length < 10) {
            home_cats.push(cat);
            createImg(catSrc);
            pOrM.innerHTML = '<i title="Remove Cat From Home" class="fa-solid fa-minus"></i>';
            var text = "Added to Home!";
        }else{
            createDialog("Too Many Cats! (Max 10)");
            return;
        }
    }else{
        const index = home_cats.indexOf(cat);
        home_cats.splice(index, 1);
        document.getElementById(catSrc).remove();
        pOrM.innerHTML = '<i title="Add Cat To Home" class="fa-solid fa-plus"></i>';
        var text = "Removed from Home!";
    }

    createDialog(text);
}

const home_collection = document.getElementById("home_collection");
function createImg(src) {
    let img = document.createElement("img");
    img.src = src;
    img.id = src;
    img.classList.add("img_");
    img.classList.add("image");
    img.style.top = `${Math.floor(Math.random()*70+10)}%`;
    img.style.left = `${Math.floor(Math.random()*80+5)}%`;
    img.dataset.width = img.style.maxWidth = `${Math.floor(Math.random()*10+15)}%`;
    img.dataset.speed = img.style.animationDuration = `${Math.floor(Math.random()*8+2)}s`;
    img.style.animationDirection = `${randomChoice(["normal","reverse"])}`;

    $(function() {
        $(escapeSelector(img.id)).draggable({scroll: false});
        $(escapeSelector(img.id)).draggable("disable");
    });

    img.addEventListener("click", function(e) {
        if(mode !== "Move") {
            show_collection(e.target.getAttribute('src'))
        };
    })

    home_collection.appendChild(img);
}

function home() {
    show(1);
};

const catList = [
    {name:"DD",src:"assets/pusheen1.gif"},
    {name:"DD",src:"assets/pusheen2.gif"},
    {name:"DD",src:"assets/pusheen3.gif"},
    {name:"DD",src:"assets/pusheen4.gif"},

    {name:"Oscar",src:"assets/pugsheen1.gif"},
    {name:"Oscar",src:"assets/pugsheen2.gif"},
    {name:"Oscar",src:"assets/pugsheen3.gif"},
    {name:"Oscar",src:"assets/pugsheen4.gif"},

    {name:"Pippy",src:"assets/dragonsheen1.gif"},
    {name:"Pippy",src:"assets/dragonsheen2.gif"},
    {name:"Pippy",src:"assets/dragonsheen3.gif"},
    {name:"Pippy",src:"assets/dragonsheen3.gif"},

    {name:"Sky",src:"assets/pusheenicorn1.gif"},
    {name:"Sky",src:"assets/pusheenicorn2.gif"},
    {name:"Sky",src:"assets/pusheenicorn3.gif"},
    {name:"Sky",src:"assets/pusheenicorn4.gif"},

    {name:"Rosie",src:"assets/pastel1.gif"},
    {name:"Rosie",src:"assets/pastel2.gif"},
    {name:"Rosie",src:"assets/pastel3.gif"},
    {name:"Rosie",src:"assets/pastel4.gif"},

    {name:"Gonzo",src:"assets/mermaid1.gif"},
    {name:"Gonzo",src:"assets/mermaid2.gif"},
    {name:"Gonzo",src:"assets/mermaid2.gif"},
    {name:"Gonzo",src:"assets/mermaid3.gif"}]

var found;
const home_text = document.getElementById("home_text");
const ascendBtn = document.getElementById("ascend-btn");

document.addEventListener('contextmenu', event => event.preventDefault());
var no_minigame = 0; /* For newer players, make sure that they don't get minesweeper too early on and think the game is about minesweeper */
var ms_init = false;
var grabber;
var first_time = true;
const minigame_switch_switch = document.getElementById("minigame_switch_switch");

function adventure(from) {
    if(from == 'minigame') {
        no_minigame = 0;
    }else if(from == 'menu' && !first_time) {
        return;
    }
    
    first_time = false;
    if(no_minigame < 5) {
        no_minigame++;
    }else{
        if(document.getElementById('minigame_switch_switch').checked) {}
        else {
        if(Math.random() < 0.02) {
            if(Math.random() > 0.499) {
                try {
                    clearInterval(grabber.game_loop);
                } catch (error) {}
                grabber = new Grabber();
                document.getElementById('grabber-text').innerHTML = 'A wild doge pond has appeared!'
                var anchor = document.querySelector(`[data-id2='53']`);
                anchor.innerHTML = '<i id="anchor" style="margin-top: 2px;margin-left: 2px;" class="fa-solid fa-anchor fa-lg"></i>';
                anchor.addEventListener("click", function(e) {
                    grabber.cast();
                })
                grabber.start();
                show(8);
                return
            }else{
                show(7);
                game = new Minesweeper();
                var cells = [...document.getElementsByClassName("cell")];
                cells.forEach(cell => {
                    if(!ms_init) {
                        cell.addEventListener("mousedown", function(e) {
                            game.click(e);
                        }); 
                    }else{
                        cell.innerHTML = '';
                        cell.classList.remove('bombed');
                        cell.classList.remove('revealed');
                    }
                });
                if(ms_init) {
                    [...document.getElementsByClassName("live")].forEach(heart => {
                        heart.style.color = 'red';
                    });
                    minesweeper_text.innerHTML = "A wild minefield has appeared!";
                    minesweeper_text.classList.remove('hakuna');
                    document.getElementById("minesweeper-reward").style.display = 'none';
                }
                ms_init = true;
                return;
            }
        }
    }
    }
    
    show(2);
    
    found = randomChoice(catList);
    document.getElementById("adventure_display").src = found.src;
    let text = document.getElementById("adventure_text");
    if(cats.includes(found)) {
        text.innerHTML = `You found ${found.name}! (Duplicate)`;
        var gained = Math.floor(Math.random()*3+sBonuses.sAdventure);
        bal += gained;
        text.innerHTML += `<br><span style="font-size: 13px;">+$${gained}</span>`;
    }else{
        text.innerHTML = `You found ${found.name}!`
        cats.unshift(found);

        let prev_img = document.getElementById("P"+found.name);
        prev_img.src = found.src;

        if(home_cats.length < 10) {
            home_cats.push(found);
            createImg(found.src);
        };

        var gained = Math.floor(Math.random()*3+(10.5+(0.5*lvl)));
        xp += gained;

        if(xp >= 100*(1.1**(xp_lvl-1))) {
            text.innerHTML += `<br><span style="font-size: 13px;">+${gained} Adventure XP - Level up!</span>`;
        }else{
            text.innerHTML += `<br><span style="font-size: 13px;">+${gained} Adventure XP</span>`;
        }
        updateXp();
    };
};

function collection() {
    if(cats.length == catList.length) {
        ascendBtn.style.display = 'inline';
    }

    /* y is this so long bruh */
    let catListNames = catList.map(cat => cat.name);
    let catListSet = Array.from(new Set(catListNames))
    let catsNames = cats.map(cat => cat.name)
    for(let i = 0; i < catListSet.length; i++) {
        var currentCount = catsNames.filter(catName => catName === catListSet[i]).length;
        var totalCount = catListNames.filter(catName => catName === catListSet[i]).length;
        if(currentCount == totalCount) {
            let subtitle = document.querySelector(`#${catListSet[i]} button`);
            subtitle.style.color = "#edc705";
        }
    }

    show(3);
};

function upgrades() {
    esc();
    show(4);
    document.getElementById("home").style.display = "inline";
    btnMenu.style.display = "none";
}
var intTraderImg;
function trader() {
    show(5);
    let dogecoin_price = document.querySelector(".cryptoboxes span").innerHTML;
    document.getElementById("btn-buyCat").innerHTML = `BUY ${Math.round(((100/dogecoin_price) + Number.EPSILON) * 100) / 100}Ð`;
    var undiscovered = shuffleArray(catList.filter(cat => !cats.includes(cat)));
    if(undiscovered.length == 0) {
        document.getElementById("btn-buyCat").classList.add("btn-warning-light");
        trades.src = 'assets/undiscovered.png';
    }
    updateTraderImg(undiscovered);
    intTraderImg = setInterval(updateTraderImg, 2000, undiscovered);
}

var trades = document.getElementById('trades');
var index = 0;
var dogecoin_equiv_display = document.getElementById("dogecoin_equiv_display");
function updateTraderImg(undiscovered) {
    let dogecoin_price = document.querySelector(".cryptoboxes span").innerHTML;
    let dogecoin_equiv = bal / dogecoin_price
    dogecoin_equiv_display.innerHTML = `${Math.round((dogecoin_equiv + Number.EPSILON) * 100) / 100}ÐOGE`;
    document.getElementById("btn-buyCat").innerHTML = `BUY $${100*(1+(0.2*cats_bought))}`;
    if(undiscovered.length > 0) {
        if(index >= undiscovered.length) {
            index = 0;
        }
        trades.src = undiscovered[index].src;
        index++;
    }else{
        trades.src = 'assets/undiscovered.png';
    }
    buy_cat.innerHTML = "BUY CAT";
}

var buy_cat = document.getElementById("buy-cat");
var unlock_btn = document.getElementById("unlock-trader");
var cats_bought = 0;
function buyCat() {
    if(bal >= 100*(1+(0.2*cats_bought))) {
        var undiscovered = catList.filter(cat => !cats.includes(cat));
        if(undiscovered.length == 0) {
            createDialog("All cats unlocked!");
        }
        else{
            var newCat = shuffleArray(undiscovered)[0];
            cats.unshift(newCat);
            bal -= 100*(1+(0.2*cats_bought));
            update();
            cats_bought++;
            document.getElementById("catsBought").innerHTML = cats_bought;
            if(cats_bought >= 10) {
                if(trader_bonus == 1) {
                    unlock_btn.classList.remove("btn-warning-light");
                }
            }
            if(undiscovered.length - 1 == 0) {
                document.getElementById("btn-buyCat").classList.add("btn-warning-light");
                trades.src = 'assets/undiscovered.png';
            }
            document.getElementById("btn-buyCat").innerHTML = `BUY ${100*(1+(0.2*cats_bought))}`;
            clearInterval(intTraderImg);
            var imgs = shuffleArray(catList.filter(cat => !cats.includes(cat)));
            updateTraderImg([newCat]);
            buy_cat.innerHTML = "BOUGHT!";
            setTimeout(() => {clearInterval(intTraderImg);intTraderImg = setInterval(updateTraderImg, 2000, imgs)},2000)
            
            var prev_img = document.getElementById("P"+newCat.name);
            prev_img.src = newCat.src;
        }
    }else{
        createDialog("Not enough money!")
    }
}

var trader_bonus = 1;
function unlockTrader() {
    if(cats_bought >= 10) {
        trader_bonus = 1.5;
        unlock_btn.innerHTML = "UNLOCKED";
        unlock_btn.classList.add("btn-warning-light");
    }
}

var dBal = document.getElementById("bal");

var xp_lvl = 1;
var sp = 0;
var counter = document.getElementById("sp");
var toNext = document.getElementById("nextPoint");

setInterval(update,1000);
function update() {
    if(lvl == 1) {
        multiplier = 0;
    }else{
        multiplier = lvl/10;
    }
    bal += (cats.length * (1+multiplier)) * sBonuses.sIdle * trader_bonus;
    dBal.innerHTML = `$${Math.floor(bal)}`;    
}

function updateXp() {
    if(xp >= 100*(1.1**(xp_lvl-1))) {
        xp -= 100*(1.1**(xp_lvl-1))
        xp_lvl += 1;
        sp += 1;
    }

    counter.innerHTML = sp;
    toNext.innerHTML = `${Math.floor((100*(1.1**(xp_lvl-1)))-xp)} XP until next`
}

var sBonuses = {
    "sAdventure":2,
    "sIdle":1,
    "sEK":1
}

function addSp(skill) {
    if(sp >= 1) {
        if(skill == "sAdventure") {
            sBonuses["sAdventure"] += 1;
        }
        else if(skill == "sIdle") {
            sBonuses["sIdle"] += 0.2;
        }else if(skill == "sEK") {
            sBonuses["sEK"] += 0.2;
        }

        sp -= 1;
        var sDisplay = document.getElementById(skill);
        var invested = parseInt(sDisplay.innerHTML);
        invested++;
        sDisplay.innerHTML = invested;

        updateXp();

    }else{
        createDialog("Not enough skill points!")
    }
}

var lvl = 1;
function ascend() {
    if (bal >= Math.ceil((lvl*1000)**(0.995+(0.005*lvl)))) {
        lvl += 1
        cats = [];
        home_cats = [];
        cCats = [];
        bal = 0;
        update();
        home_collection.innerHTML = '';
        ascendBtn.style.display = 'none';
        home_text.style.display = 'block';
        document.getElementById("tohome").click();
        imgs = document.getElementsByClassName("preview");
        for(var img of imgs) {
            img.src = 'assets/undiscovered.png';
        }
        document.getElementById("ascend-sub").innerHTML = `$${Math.ceil((lvl*1000)**(0.995+(0.005*lvl)))}`;
        
        var img = document.createElement("img");
        img.classList.add("ascend-img");
        img.src = "assets/ascend.png";
        img.style.left = `${Math.random()*90}%`;
        if(Math.random() < 0.5) {
            img.style.transform = "scaleX(-1)";
        }
        document.getElementById("ascend-counter").appendChild(img);
        document.getElementById("btn-buyCat").classList.remove("btn-warning-light");

        let catListNames = new Set(catList.map(cat => cat.name));
        for(var cat of catListNames) {
            let subtitle = document.querySelector(`#${cat} button`);
            subtitle.style.color = "black";
        }

        home();
    } else {
        createDialog("Not enough money!");
    }
}

reload();