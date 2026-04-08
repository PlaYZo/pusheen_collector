function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}

function randomChoice(lst) {
    return lst[Math.floor(Math.random()*lst.length)]
};

function parseId(e) {
    return parseInt(e.target.getAttribute("data-cell_id"))
}

var minesweeper_text = document.getElementById("minesweeper-text");
var minesweeper_reward = document.getElementById("minesweeper-reward");
var board = document.getElementById("board")
class Minesweeper {
    game_over = false;
    first_click = true;
    second_chance = 0;
    bombs = [];
    flagged = [];
    clicks = 0;
    revealed_cells = 0;

    generate_board() {
        for(var i = 0; i < 11; i++) {
            var mine_cell;
            while (true) {
                mine_cell = Math.floor(Math.random() * 49 + 1);
                if(this.bombs.includes(mine_cell)) {
                    /* get a new cell cuz duplicates */
                }else{
                    break;
                }
            }
            this.bombs.push(mine_cell);
        }
    }

    row(cell) {
        return Math.ceil(cell/7 - 1)
    }

    col(cell) {
        return cell % 7 - 1
    }

    count_bombs(cell) {
        var bomb_count = 0;
        for(var i = this.row(cell)-1; i < this.row(cell)+2; i++) {
            if([-1,7].includes(i)) {
                continue;}
            for(var j = -1; j < 2; j++) {
                var adj_cell = cell + (7*(i-this.row(cell))) + j;
                if(adj_cell > 49) {continue}
                if((adj_cell / 7) > (i+1)) {continue} /* right side */
                if((adj_cell / 7) == i) {continue} /* left side */
                if(adj_cell == cell) {}
                else{
                    if(this.bombs.includes(adj_cell)) {
                        bomb_count++;
                    }
                }
            }   
        }
        if(bomb_count == 0) {
            document.querySelector(`[data-cell_id='${cell}']`).innerHTML = 'ㅤ';
        }else{
            document.querySelector(`[data-cell_id='${cell}']`).innerHTML = bomb_count;
        }
        return bomb_count;
    }

    reveal_adj(cell) {
        for(var i = this.row(cell)-1; i < this.row(cell)+2; i++) {
            if([-1,7].includes(i)) {
                continue;}
            for(var j = -1; j < 2; j++) {
                var adj_cell = cell + (7*(i-this.row(cell))) + j;
                if(adj_cell < 1) {continue}
                if(adj_cell > 49) {continue}
                if((adj_cell / 7) > (i+1)) {continue} /* right side */
                if((adj_cell / 7) == i) {continue} /* left side */
                if(document.querySelector(`[data-cell_id='${adj_cell}']`).classList.contains('revealed')) {continue}
                if(adj_cell == cell) {}
                else{
                    if(!this.bombs.includes(adj_cell)) {
                        document.querySelector(`[data-cell_id='${adj_cell}']`).classList.add('revealed');
                        if(this.count_bombs(adj_cell) == 0) {
                            this.reveal_adj(adj_cell);
                        };
                        this.revealed_cells++;
                    }
                }
            }   
        }
    }

    click(e) {
        if(this.game_over) {return}

        var cell_num = parseId(e);
        var cell = document.querySelector(`[data-cell_id='${cell_num}']`);

        if(this.first_click) {
            this.generate_board();

            if(this.bombs.includes(cell_num)) {
                var no_bomb = range(49, 1).filter(n => !this.bombs.includes(n));
                var new_cell = randomChoice(no_bomb);

                this.bombs.splice(this.bombs.indexOf(cell_num), 1);
                this.bombs.push(new_cell);
                this.count_bombs(cell_num);
                this.clicks++;
            }
            
            this.reveal_adj(cell_num);
        }
        
        if(e.button == 0 || this.first_click == true) {
            this.first_click = false;
            if(this.flagged.includes(cell_num)) {return}
            if(this.bombs.includes(cell_num)) {
                cell.classList.add('bombed');
                if(cell.innerHTML == '') {
                    cell.innerHTML = '<i class="fa-solid fa-bomb fa-xl"></i>'
                    document.querySelectorAll(".live")[this.second_chance].style.color = 'gray';
                    if(this.second_chance == 0) {
                        this.second_chance = 1;
                    } else {
                        minesweeper_text.innerHTML = "GAME OVER";
                        minesweeper_text.classList.add("hakuna");
                        this.game_over = true;
                        for (var cell_num of this.bombs) {
                            document.querySelector(`[data-cell_id='${cell_num}']`).innerHTML = '<i class="fa-solid fa-bomb fa-xl"></i>';
                        }
                    }
                }
            }else{
                cell.classList.add('revealed');
                if(cell.innerHTML == '') {
                    if(this.count_bombs(cell_num) == 0) {
                        this.reveal_adj(cell_num);
                    };
                    this.clicks++;
                    if(this.clicks >= (38 - this.revealed_cells)) {
                        minesweeper_text.innerHTML = "YOU WIN!";
                        minesweeper_text.classList.add("hakuna");
                        this.game_over = true;
    
                        var gained = 100*sBonuses.sEK;
                        minesweeper_reward.innerHTML = `+${Math.floor(gained)} Adventure XP`
                        minesweeper_reward.style.display = 'inline';
                        xp += gained;
                        updateXp();
                    }
                }else{}
            }
        }else if(e.button == 2) {
            if(cell.innerHTML == '') {
                cell.innerHTML = '<i class="fa-solid fa-flag" style="font-size: 25px; margin-right: 2px; margin-top: 4px;"></i>';
                this.flagged.push(cell_num);
            }else if(this.flagged.includes(cell_num)) {
                cell.innerHTML = '';
                this.flagged.splice(this.flagged.indexOf(cell_num), 1);
            }
        }
    }
}