var score_j1 = 0;
var score_j2 = 0;
// $('body').append('<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js">  </script>
// <script src="http://code.jquery.com/jquery.min.js"></script>
// <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
// <script type="text/javascript" src="Puissance4.js"></script>
//     <input id="line" type="text" pattern="^[0-9]*$">
//     <input id="columns" type="text" pattern="^[0-9]*$">
//     <span>Couleur J1</span>
//      <select id="color_player1" name="color_player1" >
//         <option value="red">Rouge</option>
//         <option value="yellow">Jaune</option>
//         <option value="green">Vert</option>
//         <option value="black">Noir</option>
//         <option value="purple">Violet</option>
//         <option value="blue">Bleu</option>
//     </select>
//     <span>Couleur J2</span>
//     <select id="color_player2" name="color_player2">
//         <option value="yellow">Jaune</option>
//         <option value="red">Rouge</option>
//         <option value="green">Vert</option>
//         <option value="black">Noir</option>
//         <option value="purple">Violet</option>
//         <option value="blue">Bleu</option>
//     </select>
//     <input id="boutton" type="submit">
// <div id="grid" class="container-fluid">
// </div>');
$(document).ready (function()
{
    
    function grid(x, y)
    {
        $('#grid').append(  '<table id="table">' );
        for (i = 0; i < x; i++)
        {
            $('table').append( '<tr id="row' + i + '"></tr>');
            for (e = 0; e < y; e++)
            {
                $("#row" + i).append('<td id="row' + i +'-columns' + e + '"><img width="60" height="60" src="grille.png"></td>');
            }
        }    
    }
    $('#boutton').click (function()
    {

        $('#tour_player').remove();
        var regex_numb = "^[0-9]*$";
        $('#score').remove();
        $('body').append('<div id="score"><h3>J1 ' + score_j1 + '   j2 ' + score_j2 + '</h3></div>');
        var joueur = 1;
        $('body').append('<div id="tour_player"><h3>tour du joueur 1</h3></div>');
        var win = 0;
        var color_j1 = $('#color_player1').val();
        var color_j2 = $('#color_player2').val();
        var x = $('#line').val();
        var y = $('#columns').val();
        

        if (x.match(regex_numb) && y.match(regex_numb))
        {
            if ($('#line').val() !== "" && $('#columns').val() !== "" && $('#line').val() >= 4 && $('#columns').val() >= 4 && $('#line').val() <= 15 && $('#columns').val() <= 15 && color_j1 !== color_j2)
            {
                console.log("OUI");
                $('#error').remove();
                $('#table').remove();
                grid(x, y);
            }
            else if ($('#line').val() == "" || $('#columns').val() == "")
            {
                $('#table').remove();
                $('#tour_player').remove();
                $('#error').remove();
                $('body').append('<div id="error"><p id="error">vous devez remplire les champ</p></div>');
            }
            else if ($('#line').val() <= 3 || $('#columns').val() <= 3)
            {
                $('#table').remove();
                $('#tour_player').remove();
                $('#error').remove();
                $('body').append('<div id="error"><p id="error">vous ne pouvez pas mettre moin de 3 ou 0 collone/ligne</p></div>');
            }
            else if ($('#line').val() > 15 || $('#columns').val() > 15 )
            {
                $('#table').remove();
                $('#tour_player').remove();
                $('#error').remove();
                $('body').append('<div id="error"><p id="error">Vous ne pouvez pas mette plus de 15 lignes ou colones</p></div>');
            }
            else if (color_j1 == color_j2)
            {   
                $('#table').remove();
                $('#tour_player').remove();
                $('#error').remove();
                $('body').append('<div id="error"><p id="error">Les deux joueur ne peuve pas avoir la meme couleur</p></div>');
            } 
        }
        else
        {
            $('#table').remove();
            $('#tour_player').remove();
            $('#error').remove();
            $('#score').remove()
            alert('Vous ne pouvez mettre que des nombre entier');
        }
        
        // $("td").mouseover(function()
        // {
        //     var color = $(this).css('background-color');
        //     if (color !== 'rgb(255, 0, 0)' && color !== 'rgb(255, 255, 0)' && color !== 'rgb(128, 128, 128)' && color !== 'rgba(0, 0, 0, 0)')
        //     {
        //         $(this).css('background-color','grey');
        //     }
            
        // })
        
        // .mouseout(function()
        // {
        //     var color = $(this).css('background-color');
        //     console.log(color);
        //     if (color !== 'rgb(255, 0, 0)' && color !== 'rgb(255, 255, 0)' )
        //     {
        //         console.log("toto");
        //         $('td').css('background-color', 'white');
        //     } 
        // });
        $('td').click(function()
        {   
            var statique_x_y = 0;
            if (statique_x_y == 0)
            {
                var x = $('#line').val() - 1;
                var y = $('#columns').val() - 1;
                statique_x_y = 1;
            }
            var collone_plein = 0;
                if (joueur == 1)
                {
                    $('#tour_player').remove();
                    $('body').append('<div id="tour_player"><h3>tour du joueur 2</h3></div>');
                }
                else
                {
                    $('#tour_player').remove();
                    $('body').append('<div id="tour_player"><h3>tour du joueur 1</h3></div>');
                }
            if (win === 0)
            {
               
                var recup_pos =  $(this).attr('id');
                var recup_columns = recup_pos.split("-");
                recup_columns = recup_columns[1];
                var color = $(this).css('background-color');
                
                for (j = x; j >= 0; j--)
                {
                    var verif_color = $('#row' + j + '-' + recup_columns).css('background-color');
                    if (verif_color === 'rgba(0, 0, 0, 0)')
                    {
                        if (joueur == 1)
                        {
                            joueur = 2;
                            $('#row' + j + '-' + recup_columns).css('background-color', color_j1);
                            var position_du_jeton = '#row' + j + '-' + recup_columns;
                            var color_of_player = $('#row' + j + '-' + recup_columns).css('background-color');
                            verif_horizontal(color_of_player);
                            verif_verticale(recup_columns, color_of_player);
                            verif_diagonale_droite(position_du_jeton, color_of_player);
                            verif_diagonale_gauche(position_du_jeton, color_of_player);
                            break;                
                        }
                        else if(joueur == 2)
                        {
                            joueur = 1;
                            $('#row' + j + '-' + recup_columns).css('background-color', color_j2);
                            var color_of_player = $('#row' + j + '-' + recup_columns).css('background-color');
                            var position_du_jeton = '#row' + j + '-' + recup_columns;
                            verif_horizontal(color_of_player);
                            verif_verticale(recup_columns, color_of_player);
                            verif_diagonale_droite(position_du_jeton, color_of_player);
                            verif_diagonale_gauche(position_du_jeton, color_of_player);
                            break;
                        }
                    }
                    else if (collone_plein == x && joueur == 1)
                    {
                        $('#tour_player').remove();
                        $('body').append('<div id="tour_player"><h3>tour du joueur 1</h3></div>');
                        alert('colonne pleine');
                    }
                    else if (collone_plein == x && joueur == 2)
                    {
                        $('#tour_player').remove();
                        $('body').append('<div id="tour_player"><h3>tour du joueur 2</h3></div>');
                        alert('colonne pleine');
                    }
                    else
                    {
                        collone_plein++;
                        
                    }
                } 
                var check = 0;
                var x2 = x + 1;
                var y2 = y + 1;
                var verif_null = x2 * y2;
                if (win === 0)
                {
                    $('td').each(function()
                    {
                        if ($(this).css('background-color') !== "rgba(0, 0, 0, 0)")
                        {
                            check++;
                            if (check == verif_null)
                            {
                                setTimeout(function(){ alert('matche NULL'); }, 100);
                            }
                        }
                    });
                }
                check = 0;
            }
            else
            {
                alert('La partie est fini veuillez relancer une partir');
            }
        });
        function verif_horizontal(color_of_player)
        {
            var victoire = 0;
            if (win === 0)
            {
                for (a = 0; a <= y; a++)
                {
                    var verif_horizontale = '#row' + j + '-' + 'columns' + a;
                    var verif_color_victoir = $(verif_horizontale).css('background-color');
                    if(verif_color_victoir === color_of_player)
                    {
                        victoire++;
                    }
                    else if (victoire >= 4 && joueur == 2)
                    {
                        score_j1++;
                        win = 1;
                        $('#tour_player').remove();
                        setTimeout(function(){ alert('joueur un a gagné bravo'); }, 100);
                        $('body').append('<div id="tour_player"><h3>Fin de partie</h3></div>');
                        break;
                    }
                    else if (victoire >= 4 && joueur == 1)
                    {
                        score_j2++;
                        win = 1;
                        $('#tour_player').remove();
                        setTimeout(function(){ alert('joueur deux a gagné bravo'); }, 100);
                        $('body').append('<div id="tour_player"><h3>Fin de partie</h3></div>');
                        break;
                    }
                    else
                    {
                        victoire = 0;
                    }
                }
            }
        }
        function verif_verticale(recup_columns, color_of_player)
        {
            if (win === 0)
            {
                victoire = 0;
                for (i = 0; i <= x; i++)
                {
                    var verif_vertical = '#row' + i + '-' + recup_columns;
                    var verif_color_victoire = $(verif_vertical).css('background-color'); 
                    if (verif_color_victoire === color_of_player)
                    {
                        victoire++;
                    }
                    else if (victoire >= 4 && joueur == 2)
                    {
                        score_j1++;
                        win = 1;
                        $('#tour_player').remove();
                        setTimeout(function(){ alert('joueur un a gagné bravo'); }, 100);
                        $('body').append('<div id="tour_player"><h3>Fin de partie</h3></div>');
                        
                        break;
                    }
                    else if(victoire >= 4 && joueur == 1)
                    {
                        score_j2++;
                        win = 1;
                        $('#tour_player').remove();
                        setTimeout(function(){ alert('joueur deux a gagné bravo'); }, 100);
                        $('body').append('<div id="tour_player"><h3>Fin de partie</h3></div>');
                        break;
                    }
                    else
                    {
                        victoire = 0;
                    }
                }
            }
        }
        function verif_diagonale_droite(position_du_jeton, color_of_player)
        {
            if (win === 0)
            {    
                var victoire = 0;
                var recup_pos = position_du_jeton.split('-');
                var row = recup_pos[0];
                var columns = recup_pos[1];
                var num_row = row.substr(4,6);
                var num_columns = columns.substr(7,9);
                var num_row2 = row.substr(4,6);
                var num_columns2 = columns.substr(7,9);
                for (i = 0; i < 15; i++ )
                {
                    var pos = '#row' + num_row + '-columns' + num_columns;
                    verif_color = $(pos).css('background-color');
                    if (color_of_player ==  verif_color)
                    {
                        victoire++
                    }
                    else if (victoire >= 4 && joueur == 2)
                    {
                        score_j1++;
                        win = 1;
                        $('#tour_player').remove();
                        setTimeout(function(){ alert('joueur un a gagné bravo'); }, 100);
                        $('body').append('<div id="tour_player"><h3>Fin de partie</h3></div>');
                        break;
                    }
                    else if (victoire >= 4 && joueur == 1)
                    {
                        score_j2++;
                        win = 1;
                        $('#tour_player').remove();
                        setTimeout(function(){ alert('joueur deux a gagné bravo'); }, 100);
                        $('body').append('<div id="tour_player"><h3>Fin de partie</h3></div>');
                        break;
                    }
                    else if (verif_color == "rgba('0, 0, 0, 0)" || verif_color !== color_of_player)
                    {
                        break;
                    }
                    num_columns++;
                    num_row--;
                }
                if (win === 0)
                {
                    for (j = 0; j < 15; j++)
                    {
                        num_columns2--;
                        num_row2++;
                        var pos2 = '#row' + num_row2 + '-columns' + num_columns2;
                        var verif_color2 = $(pos2).css('background-color');
                        if (color_of_player ==  verif_color2)
                        {
                            victoire++
                        }
                        else if(victoire >= 4 && joueur == 2)
                        {
                            score_j1++;;
                            win = 1;
                            $('#tour_player').remove();
                            setTimeout(function()
                            { 
                                alert('joueur un a gagné bravo');
                                
                            },100);
                            $('body').append('<div id="tour_player"><h3>Fin de partie</h3></div>');
                            break;
                        }
                        else if(victoire >= 4 && joueur == 1)
                        {
                            score_j2++;
                            win = 1;
                            $('#tour_player').remove();
                            setTimeout(function(){ alert('joueur deux a gagné bravo'); }, 100);
                            $('body').append('<div id="tour_player"><h3>Fin de partie</h3></div>');
                            break;
                        }
                        else if (verif_color2 == "rgba('0, 0, 0, 0)" || verif_color2 !== color_of_player)
                        {
                            break;
                        }  
                    }
                }
            }
        }
        function verif_diagonale_gauche(position_du_jeton, color_of_player)
        {
            if (win === 0)
            {    
                var victoire = 0;
                var recup_pos = position_du_jeton.split('-');
                var row = recup_pos[0];
                var columns = recup_pos[1];
                var num_row = row.substr(4,6);
                var num_columns = columns.substr(7,9);
                var num_row2 = row.substr(4,6);
                var num_columns2 = columns.substr(7,9);
                for (i = 0; i < 15; i++ )
                {
                    var pos = '#row' + num_row + '-columns' + num_columns;
                    verif_color = $(pos).css('background-color');
                    if (color_of_player ==  verif_color)
                    {
                        victoire++
                    }
                    else if (victoire >= 4 && joueur == 2)
                    {
                        score_j1++;
                        win = 1;
                        $('#tour_player').remove();
                        setTimeout(function(){ alert('joueur un a gagné bravo'); }, 100);
                        $('body').append('<div id="tour_player"><h3>Fin de partie</h3></div>');
                        break;
                    }
                    else if (victoire >= 4 && joueur == 1)
                    {
                        score_j2++;
                        win = 1;
                        $('#tour_player').remove();
                        setTimeout(function(){ alert('joueur deux a gagné bravo'); }, 100);
                        $('body').append('<div id="tour_player"><h3>Fin de partie</h3></div>');
                        break;
                    }
                    else if (verif_color == "rgba('0, 0, 0, 0)" || verif_color !== color_of_player)
                    {
                        break;
                    }
                    num_columns++;
                    num_row++;
                }
                if (win === 0)
                {
                    for (j = 0; j < 15; j++)
                    {
                        num_columns2--;
                        num_row2--;
                        var pos2 = '#row' + num_row2 + '-columns' + num_columns2;
                        var verif_color2 = $(pos2).css('background-color');
                        if (color_of_player ==  verif_color2)
                        {
                            victoire++
                        }
                        else if(victoire >= 4 && joueur == 2)
                        {
                            score_j1++;
                            win = 1;
                            setTimeout(function(){ alert('joueur un a gagné bravo'); }, 100);
                            break;
                        }
                        else if(victoire >= 4 && joueur == 1)
                        {
                            score_j2++;
                            win = 1;
                            setTimeout(function(){ alert('joueur deux a gagné bravo'); }, 100);
                            break;
                        }
                        else if (verif_color2 == "rgba('0, 0, 0, 0)" || verif_color2 !== color_of_player)
                        {
                            break;
                        }  
                    }
                }
            }
        }
    });
});



