var doges = {
    1:{name:"Buff Doge",src:"assets/doge1.png",reward:"1 Skill Point"},
    2:{name:"Dogecoin",src:"assets/doge2.png",reward:"100"},
    3:{name:"Swag Doge",src:"assets/doge3.png",reward:"85"},
    4:{name:"Doge Bread",src:"assets/doge4.png",reward:"70"},
    5:{name:"Doge",src:"assets/doge5.png",reward:"50"},
    6:{name:"Dogeminer",src:"assets/doge6.png",reward:"30"},
    7:{name:"Bonk Doge",src:"assets/doge7.png",reward:"20"}
}

class Grabber {
    occupied = [];
    launched = false;
    anchor_pos = 53;
    game_loop;

    start() {
        for(let i = 0; i < 7; i++) {
            this.move();

            this.switch++;
            while(true) {
                var cell_num = Math.floor(Math.random() * 7 + 1) * 7;

                var row = Math.ceil(cell_num / 7);
                if(row % 2 == 1) {
                    cell_num -= 6;
                }

                if(document.querySelector(`[data-id2='${cell_num + ((-1) + ((row % 2) * 2) )}']`).innerHTML == '') { /* prevents duplicates */
                    break;
                }
            }

            var cell = document.querySelector(`[data-id2='${cell_num}']`);
            while(cell.innerHTML == '') {
                var img = document.createElement("img");
                img.src = doges[row].src;
                cell.appendChild(img);
                cell.classList.add('has-img')
                this.occupied.push(cell_num);
            }
        }
        this.game_loop = setInterval(() => {
            this.move();

            this.switch++;
            while(true) {
                var cell_num = Math.floor(Math.random() * 7 + 1) * 7;

                var row = Math.ceil(cell_num / 7);
                if(row % 2 == 1) {
                    cell_num -= 6;
                }

                if(document.querySelector(`[data-id2='${cell_num + ((-1) + ((row % 2) * 2) )}']`).innerHTML == '') { /* prevents duplicates */
                    break;
                }
            }

            var cell = document.querySelector(`[data-id2='${cell_num}']`);
            while(cell.innerHTML == '') {
                var img = document.createElement("img");
                img.src = doges[row].src;
                cell.appendChild(img);
                cell.classList.add('has-img')
                this.occupied.push(cell_num);
            }
        }, 1000)
    }

    move() {
        const occupied = document.querySelectorAll(".has-img");
        for(var cell of occupied) {
            cell.innerHTML = '';
            var cell_num = parseInt(cell.dataset.id2);
            this.occupied.splice(this.occupied.indexOf(cell_num), 1);
            cell.classList.remove('has-img');

            var new_num = cell_num;
            if(Math.ceil(cell_num / 7) % 2 == 1) {
                if(cell_num % 7 == 0) {
                    continue;
                }
                new_num += 1;
            }else{
                if(cell_num % 7 == 1) {
                    continue;
                }
                new_num -= 1;
            }

            if(new_num > 0) {
                var new_cell = document.querySelector(`[data-id2='${new_num}']`);
                var img = document.createElement("img");
                var row = Math.ceil(new_num / 7);
                img.src = doges[row].src;
                new_cell.appendChild(img);
                new_cell.classList.add('has-img')
                this.occupied.push(new_num);
            }
        }

        if(this.launched) {
            document.querySelector(`[data-id2='${this.anchor_pos}']`).innerHTML = '';
            var grabber_text = document.getElementById("grabber-text");
            if(this.anchor_pos - 7 > 1) {
                this.anchor_pos -= 7;
                var anchor_cell = document.querySelector(`[data-id2='${this.anchor_pos}']`);
                if(anchor_cell.innerHTML != '') {
                    var doge = doges[Math.ceil(this.anchor_pos / 7)];
                    clearInterval(this.game_loop);
                    var amount = parseInt(doge.reward);
                    if(amount == 1) {
                        sp += 1;
                        grabber_text.innerHTML = `You caught a ${doge.name}! +${doge.reward}!`;
                    }else{
                        xp += amount *sBonuses.sEK;
                        grabber_text.innerHTML = `You caught a ${doge.name}! +${doge.reward*sBonuses.sEK} Adventure XP!`;
                    }
                    updateXp();
                }
                anchor_cell.innerHTML = '<i id="anchor" style="margin-top: 2px;margin-left: 2px;" class="fa-solid fa-anchor fa-lg"></i>';
            }else{
                grabber_text.innerHTML = `You catch nothing but an old boot... +$20`;
                bal += 20;
                this.anchor_pos = 53;
                this.launched = false;
                var anchor_cell = document.querySelector(`[data-id2='${this.anchor_pos}']`);
                anchor_cell.innerHTML = '<i id="anchor" style="margin-top: 2px;margin-left: 2px;" class="fa-solid fa-anchor fa-lg"></i>';
                clearInterval(this.game_loop);
            }
        }    
    }

    cast() {
        if(!this.launched) {
            this.launched = true;
        }   
    }
}

